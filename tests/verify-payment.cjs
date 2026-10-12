const path = require('path');
const fs = require('fs');

// Path to installed Playwright Core
const PLAYWRIGHT_PATH = 'C:/Users/yashb/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core';
const { chromium } = require(PLAYWRIGHT_PATH);

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.join(__dirname, '..', 'test-results-payment');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

let passedCount = 0;
let failedCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failedCount++;
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function run() {
  console.log('=====================================================');
  console.log('  BROOKS & BONDS BREWERY - DEMO UPI PAYMENT VERIFICATION');
  console.log('=====================================================\n');

  const browser = await chromium.launch({
    headless: true,
    channel: 'msedge'
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  try {
    // 1. NAVIGATE TO /order & ADD ITEM TO CART
    console.log('--- 1. ADD ITEM & OPEN CART DRAWER ---');
    await page.goto(`${BASE_URL}/#/order`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    // Click "Add to Order" on the first item
    const addBtn = page.locator('button:has-text("Add to Order")').first();
    await addBtn.click();
    await page.waitForTimeout(300);

    // Open Cart Drawer
    const reviewCartBtn = page.locator('button:has-text("Review Cart")');
    await reviewCartBtn.click();
    await page.waitForTimeout(400);

    const cartDrawer = page.locator('[role="dialog"][aria-label="Your Order Cart"]');
    assert(await cartDrawer.isVisible(), 'Cart drawer opened successfully');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01-cart-drawer.png') });

    // 2. VERIFY DEMO UPI METHOD SELECTOR (PhonePe, Google Pay, Paytm)
    console.log('\n--- 2. VERIFY DEMO UPI SELECTOR & APPS ---');
    assert(await page.locator('text=DEMO UPI GATEWAY').isVisible(), 'DEMO UPI GATEWAY badge visible');
    assert(await page.locator('button:has-text("Demo UPI")').first().isVisible(), 'Demo UPI mode button visible');
    assert(await page.locator('button:has-text("PhonePe")').first().isVisible(), 'PhonePe app selector visible');
    assert(await page.locator('button:has-text("Google Pay")').first().isVisible(), 'Google Pay app selector visible');
    assert(await page.locator('button:has-text("Paytm")').first().isVisible(), 'Paytm app selector visible');

    // Switch to Google Pay
    await page.locator('button:has-text("Google Pay")').first().click();
    await page.waitForTimeout(200);

    const checkoutBtn = page.locator('button:has-text("Pay")').last();
    const checkoutBtnText = await checkoutBtn.textContent();
    assert(checkoutBtnText.includes('Google Pay'), 'Checkout button dynamically reflects Google Pay selection');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02-upi-app-selected.png') });

    // 3. LAUNCH DEMO UPI PAYMENT MODAL
    console.log('\n--- 3. LAUNCH DEMO UPI PAYMENT MODAL ---');
    await checkoutBtn.click();
    await page.waitForTimeout(400);

    const upiModal = page.locator('[role="dialog"][aria-label="Demo UPI Payment Gateway"]');
    assert(await upiModal.isVisible(), 'Demo UPI Payment Gateway modal is visible');
    assert(await upiModal.locator('text=DEMO UPI PAYMENT').isVisible(), 'Modal title reflects Demo UPI Payment');
    assert(await upiModal.locator('text=SANDBOX SIMULATION').isVisible(), 'Modal clearly indicates Sandbox Simulation');
    assert(await upiModal.locator('text=DEMO SIMULATION:').isVisible(), 'Honest disclaimer text is visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03-upi-modal-idle.png') });

    // 4. TEST SIMULATED FAILURE & RETRY SEQUENCE
    console.log('\n--- 4. TEST SIMULATED PAYMENT FAILURE & RETRY ---');
    // Check "Simulate Payment Failure" checkbox
    const failureCheckbox = upiModal.locator('input[type="checkbox"]');
    await failureCheckbox.check();
    assert(await failureCheckbox.isChecked(), 'Simulate Payment Failure toggle is checked');

    // Click Authorize & Pay button
    const authorizeBtn = upiModal.locator('button:has-text("Authorize & Pay")');
    await authorizeBtn.click();

    // Verify processing screen
    await page.waitForTimeout(500);
    assert(await upiModal.locator('text=Processing UPI Payment').isVisible(), 'Processing spinner and title visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04-upi-processing-failure.png') });

    // Wait for failure screen (takes ~1.8s)
    await page.waitForTimeout(2000);
    assert(await upiModal.locator('text=Payment Declined (Simulated)').isVisible(), 'Simulated Payment Declined error screen visible');
    assert(await upiModal.locator('text=ERR_UPI_PSP_TIMEOUT_U30').isVisible(), 'Simulated PSP timeout error code displayed');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05-upi-declined-screen.png') });

    // Click "Retry Payment"
    const retryBtn = upiModal.locator('button:has-text("Retry Payment")');
    assert(await retryBtn.isVisible(), 'Retry Payment button is available');
    await retryBtn.click();
    await page.waitForTimeout(300);

    // Verify returned to IDLE stage with failure unchecked
    assert(await upiModal.locator('text=Select UPI Application').isVisible(), 'Returned to application selector after retry');
    assert(!(await failureCheckbox.isChecked()), 'Simulate failure automatically reset upon retry');

    // 5. TEST SUCCESSFUL PAYMENT FLOW (Google Pay)
    console.log('\n--- 5. TEST SUCCESSFUL UPI PAYMENT (Google Pay) ---');
    // Select Google Pay inside modal
    await upiModal.locator('text=Google Pay').first().click();
    await page.waitForTimeout(200);

    // Click Authorize & Pay
    await upiModal.locator('button:has-text("Authorize & Pay")').click();

    // Wait for success screen
    await page.waitForTimeout(2500);
    assert(await upiModal.locator('text=Payment Successful!').isVisible(), 'Payment Successful confirmation visible');
    assert(await upiModal.locator('text=Google Pay').isVisible(), 'Confirmation indicates Google Pay');
    assert(await upiModal.locator('text=UPI-BB-').isVisible(), 'Unique Demo Transaction ID generated');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '06-upi-success-screen.png') });

    // 6. TEST OFFICIAL RECEIPT GENERATION & PRINT VIEW
    console.log('\n--- 6. TEST OFFICIAL RECEIPT MODAL & PRINT/DOWNLOAD ---');
    const viewReceiptBtn = upiModal.locator('button:has-text("View Official Receipt")');
    await viewReceiptBtn.click();
    await page.waitForTimeout(400);

    const receiptModal = page.locator('[role="dialog"][aria-label="Payment Receipt"]');
    assert(await receiptModal.isVisible(), 'Official Receipt modal is displayed');
    assert(await receiptModal.locator('text=BROOKS & BONDS BREWERY').first().isVisible(), 'Brewery branding in receipt');
    assert(await receiptModal.locator('text=OFFICIAL DEMO RECEIPT').isVisible(), 'Official Demo Receipt banner visible');
    assert(await receiptModal.locator('text=SIMULATED UPI TRANSACTION · DEMO ONLY').isVisible(), 'Demo Transaction watermark visible');
    assert(await receiptModal.locator('text=Print Receipt').isVisible(), 'Print Receipt button is available');
    assert(await receiptModal.locator('text=Download Slip').isVisible(), 'Download Slip button is available');
    assert(await receiptModal.locator('text=Google Pay').first().isVisible(), 'Receipt metadata reflects Google Pay');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '07-receipt-modal.png') });

    // Close receipt modal
    await receiptModal.locator('button:has-text("Done")').click();
    await page.waitForTimeout(400);

    // 7. VERIFY ORDER PERSISTENCE IN CUSTOMER ACCOUNT
    console.log('\n--- 7. VERIFY ORDER IN CUSTOMER ACCOUNT (/account) ---');
    await page.goto(`${BASE_URL}/#/login/customer`, { waitUntil: 'networkidle' });
    await page.locator('#customer-one-click-btn').click();
    await page.waitForTimeout(300);
    await page.goto(`${BASE_URL}/#/account`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    assert(await page.locator('text=Demo UPI (Google Pay)').first().isVisible(), 'Customer account shows Demo UPI (Google Pay)');
    assert(await page.locator('button:has-text("View Receipt")').first().isVisible(), 'View Receipt button visible on customer order card');

    // Click "View Receipt" from account
    await page.locator('button:has-text("View Receipt")').first().click();
    await page.waitForTimeout(300);
    assert(await page.locator('[role="dialog"][aria-label="Payment Receipt"]').isVisible(), 'Receipt re-opens accurately from Customer Account');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '08-account-receipt-view.png') });

    await page.locator('[role="dialog"][aria-label="Payment Receipt"] button:has-text("Done")').click();
    await page.waitForTimeout(200);

    // 8. VERIFY ORDER & PAYMENT IN STAFF PORTAL KDS (/staff-portal)
    console.log('\n--- 8. VERIFY ORDER & PAYMENT IN STAFF PORTAL KDS (/staff-portal) ---');
    await page.goto(`${BASE_URL}/#/login/staff`, { waitUntil: 'networkidle' });
    await page.locator('#staff-one-click-btn').click();
    await page.waitForTimeout(300);
    await page.goto(`${BASE_URL}/#/staff-portal`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    assert(await page.locator('text=Kitchen Display (KDS)').isVisible(), 'KDS Board is active');
    assert(await page.locator('text=PAID via Demo UPI (Google Pay)').first().isVisible(), 'Staff KDS explicitly displays PAID via Demo UPI (Google Pay)');
    assert(await page.locator('text=UPI-BB-').first().isVisible(), 'Staff KDS card displays transaction ID');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '09-staff-kds-paid-order.png') });

    // 9. VERIFY TABLE QR SETTLEMENT (/table-qr)
    console.log('\n--- 9. VERIFY TABLE QR PAYMENT SETTLEMENT (/table-qr) ---');
    await page.goto(`${BASE_URL}/#/table-qr`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const payTabBtn = page.locator('button:has-text("Pay Tab (Demo UPI)")');
    assert(await payTabBtn.isVisible(), 'Pay Tab (Demo UPI) button is present on Table QR page');
    await payTabBtn.click();
    await page.waitForTimeout(300);

    assert(await page.locator('[role="dialog"][aria-label="Demo UPI Payment Gateway"]').isVisible(), 'Table QR opens Demo UPI Payment modal');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '10-table-qr-upi-modal.png') });
    await page.locator('[role="dialog"][aria-label="Demo UPI Payment Gateway"] button[aria-label="Close UPI Payment modal"]').click();

    console.log('\n=====================================================');
    console.log(`  DEMO PAYMENT VERIFICATION: ${passedCount} PASSED, ${failedCount} FAILED`);
    console.log(`  Screenshots saved to: ${OUTPUT_DIR}`);
    console.log('=====================================================');

  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    await browser.close();
  }
}

run();
