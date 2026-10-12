const { chromium } = require('C:/Users/yashb/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve(__dirname, '../test-results-auth');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

let passedCount = 0;
let failedCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passedCount++;
  } else {
    console.error(`  [FAIL] ${testName}`);
    failedCount++;
    throw new Error(`Assertion failed: ${testName}`);
  }
}

async function run() {
  console.log('================================================================');
  console.log('  BROOKS & BONDS BREWERY - COMPLETE DEMO AUTH & ACCESS SUITE');
  console.log('================================================================\n');

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    // ---------------------------------------------------------------
    // 1. LOGIN LANDING PAGE & ENTRY POINTS
    // ---------------------------------------------------------------
    console.log('--- 1. VERIFY /login HUB & ENTRY POINTS ---');
    await page.goto(`${BASE_URL}/#/login`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    const loginTitle = await page.textContent('h1');
    assert(loginTitle.includes('Demo Authentication'), '/#/login renders main title');
    assert(await page.locator('text=Commercial Demonstration Sandbox').isVisible(), 'Sandbox security boundary badge visible');
    assert(await page.locator('text=Patron & Dining Guest').isVisible(), 'Customer role card present');
    assert(await page.locator('text=Staff Operations & KDS').isVisible(), 'Staff role card present');
    assert(await page.locator('text=Maintenance & Systems').isVisible(), 'Maintenance role card present');
    assert(await page.locator('text=Open Demo Centre').isVisible(), 'Demo Centre link visible in /login banner');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01-login-hub.png') });

    // Verify Navbar Sign In Dropdown
    console.log('\n--- 2. VERIFY NAVBAR SIGN IN DROPDOWN ---');
    await page.goto(`${BASE_URL}/#/`, { waitUntil: 'networkidle' });
    const navSignInBtn = page.locator('#nav-signin-btn');
    assert(await navSignInBtn.isVisible(), 'Navbar displays visible Sign In button');
    await navSignInBtn.click();
    await page.waitForTimeout(200);

    assert(await page.locator('text=Patron Sign In').first().isVisible(), 'Dropdown contains Patron Sign In');
    assert(await page.locator('text=Staff Operations').first().isVisible(), 'Dropdown contains Staff Operations');
    assert(await page.locator('text=Maintenance Command').first().isVisible(), 'Dropdown contains Maintenance Command');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02-navbar-signin-dropdown.png') });

    // Verify Footer Portal Links
    console.log('\n--- 3. VERIFY FOOTER PORTAL DISCOVERABILITY ---');
    assert(await page.locator('footer a[href="#/demo"]').isVisible(), 'Footer links to Demo Presentation Centre');
    assert(await page.locator('footer a[href="#/login"]').isVisible(), 'Footer links to Sign In Hub');
    assert(await page.locator('footer a[href="#/login/customer"]').isVisible(), 'Footer links to Patron Login');
    assert(await page.locator('footer a[href="#/login/staff"]').isVisible(), 'Footer links to Staff Terminal');
    assert(await page.locator('footer a[href="#/login/maintenance"]').isVisible(), 'Footer links to Maintenance Console');

    // ---------------------------------------------------------------
    // 2. ROUTE GUARDS: UNAUTHENTICATED ACCESS ATTEMPTS
    // ---------------------------------------------------------------
    console.log('\n--- 4. TEST ROUTE GUARDS ON UNAUTHENTICATED SESSIONS ---');
    // Clear storage to guarantee unauthenticated state
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    // Try opening /account -> should redirect to /login/customer
    await page.goto(`${BASE_URL}/#/account`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    assert(page.url().includes('/login/customer'), 'Unauthenticated /account redirects to /#/login/customer');
    assert(await page.locator('h1:has-text("Demo Patron Sign In")').isVisible(), 'Customer login heading visible after guard redirect');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03-guard-account-to-login.png') });

    // Try opening /staff-portal -> should redirect to /login/staff
    await page.goto(`${BASE_URL}/#/staff-portal`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    assert(page.url().includes('/login/staff'), 'Unauthenticated /staff-portal redirects to /#/login/staff');
    assert(await page.locator('h1:has-text("Staff Terminal Login")').isVisible(), 'Staff login heading visible after guard redirect');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04-guard-staff-to-login.png') });

    // Try opening /maint-portal -> should redirect to /login/maintenance
    await page.goto(`${BASE_URL}/#/maint-portal`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    assert(page.url().includes('/login/maintenance'), 'Unauthenticated /maint-portal redirects to /#/login/maintenance');
    assert(await page.locator('h1:has-text("Maintenance Console Login")').isVisible(), 'Maintenance console login visible after guard redirect');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05-guard-maint-to-login.png') });

    // ---------------------------------------------------------------
    // 3. CUSTOMER AUTHENTICATION & PORTAL ACCESS
    // ---------------------------------------------------------------
    console.log('\n--- 5. CUSTOMER ONE-CLICK LOGIN & PATRON PORTAL ---');
    await page.goto(`${BASE_URL}/#/login/customer`, { waitUntil: 'networkidle' });
    
    // Check credentials box
    assert(await page.locator('text=arun.vip@koramangala.in').first().isVisible(), 'Demo patron email displayed in credentials box');
    assert(await page.locator('text=customer123').first().isVisible(), 'Demo patron password displayed in credentials box');

    // Click One-Click Demo Sign In
    const custOneClickBtn = page.locator('#customer-one-click-btn');
    assert(await custOneClickBtn.isVisible(), 'Customer One-Click Demo Sign In button present');
    await custOneClickBtn.click();
    await page.waitForTimeout(500);

    // Verify redirected to /account
    assert(page.url().includes('/account'), 'Successful customer login redirected to /#/account');
    assert(await page.locator('text=Arun Kumar').first().isVisible(), 'Active patron name Arun Kumar displayed in account card');
    assert(await page.locator('text=CUSTOMER ROLE').isVisible(), 'Customer role badge displayed in account card');
    assert(await page.locator('#customer-logout-btn').isVisible(), 'Customer Sign Out button is visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '06-customer-account-active.png') });

    // ---------------------------------------------------------------
    // 4. RESTRICTION: CUSTOMER CANNOT ACCESS STAFF/MAINTENANCE PORTALS
    // ---------------------------------------------------------------
    console.log('\n--- 6. RESTRICTION: CUSTOMER BLOCKED FROM STAFF/MAINT PORTALS ---');
    // While logged in as customer, try directly navigating to /staff-portal
    await page.goto(`${BASE_URL}/#/staff-portal`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    assert(page.url().includes('/login/staff'), 'Customer attempting /staff-portal is blocked and redirected to /#/login/staff');

    // While logged in as customer, try directly navigating to /maint-portal
    await page.goto(`${BASE_URL}/#/maint-portal`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    assert(page.url().includes('/login/maintenance'), 'Customer attempting /maint-portal is blocked and redirected to /#/login/maintenance');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '07-customer-access-denied.png') });

    // ---------------------------------------------------------------
    // 5. SESSION PERSISTENCE ACROSS PAGE REFRESH & BROWSER HISTORY
    // ---------------------------------------------------------------
    console.log('\n--- 7. SESSION PERSISTENCE & HISTORY NAVIGATION ---');
    await page.goto(`${BASE_URL}/#/account`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    assert(page.url().includes('/account'), 'Re-opened /#/account with existing customer session');

    // Refresh page
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    assert(page.url().includes('/account'), 'Customer remains on /#/account after page refresh');
    assert(await page.locator('text=Arun Kumar').first().isVisible(), 'Customer session data persisted across reload');

    // Browser back and forward
    await page.goto(`${BASE_URL}/#/menu`, { waitUntil: 'networkidle' });
    assert(page.url().includes('/menu'), 'Navigated to /menu');
    await page.goBack();
    await page.waitForTimeout(300);
    assert(page.url().includes('/account'), 'Browser Back button returned to /#/account');
    assert(await page.locator('text=Arun Kumar').first().isVisible(), 'Customer session still intact after back navigation');

    // ---------------------------------------------------------------
    // 6. LOGOUT FUNCTIONALITY
    // ---------------------------------------------------------------
    console.log('\n--- 8. TEST LOGOUT BEHAVIOR ---');
    await page.locator('#customer-logout-btn').click();
    await page.waitForTimeout(400);

    // Verify logged out and redirected to login
    assert(page.url().includes('/login/customer'), 'Logout clears session and returns to /#/login/customer');
    assert(await page.locator('#nav-signin-btn').isVisible(), 'Navbar displays Sign In button after logout');

    // Try returning to /account now that we are logged out -> should be blocked
    await page.goto(`${BASE_URL}/#/account`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    assert(page.url().includes('/login/customer'), 'Visiting /account after logout is blocked by route guard');

    // ---------------------------------------------------------------
    // 7. STAFF LOGIN & KDS TERMINAL ACCESS
    // ---------------------------------------------------------------
    console.log('\n--- 9. STAFF TERMINAL LOGIN & LOGOUT ---');
    await page.goto(`${BASE_URL}/#/login/staff`, { waitUntil: 'networkidle' });
    assert(await page.locator('text=EMP-402').first().isVisible(), 'Staff EMP-402 displayed in credentials');

    // Click One-Click Demo Sign In for staff
    await page.locator('#staff-one-click-btn').click();
    await page.waitForTimeout(500);

    assert(page.url().includes('/staff-portal'), 'Staff login successfully opens /#/staff-portal');
    assert(await page.locator('text=EMP-402').first().isVisible(), 'Staff header displays EMP-402');
    assert(await page.locator('#staff-logout-btn').isVisible(), 'Staff Sign Out button is visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '08-staff-portal-active.png') });

    // Staff logout
    await page.locator('#staff-logout-btn').click();
    await page.waitForTimeout(400);
    assert(page.url().includes('/login/staff'), 'Staff logout redirects to /#/login/staff');

    // ---------------------------------------------------------------
    // 8. MAINTENANCE LOGIN & ROOT CONSOLE ACCESS
    // ---------------------------------------------------------------
    console.log('\n--- 10. MAINTENANCE CONSOLE LOGIN & LOGOUT ---');
    await page.goto(`${BASE_URL}/#/login/maintenance`, { waitUntil: 'networkidle' });
    assert(await page.locator('text=SYS-ADMIN-01').first().isVisible(), 'Maintenance SYS-ADMIN-01 displayed in credentials');

    // Click One-Click Demo Sign In for maintenance
    await page.locator('#maint-one-click-btn').click();
    await page.waitForTimeout(500);

    assert(page.url().includes('/maint-portal'), 'Maintenance login opens /#/maint-portal');
    assert(await page.locator('text=SYS-ADMIN-01').first().isVisible(), 'Maintenance header displays SYS-ADMIN-01');
    assert(await page.locator('#maint-logout-btn').isVisible(), 'Maintenance Sign Out button is visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '09-maint-portal-active.png') });

    // Maintenance logout
    await page.locator('#maint-logout-btn').click();
    await page.waitForTimeout(400);
    assert(page.url().includes('/login/maintenance'), 'Maintenance logout redirects to /#/login/maintenance');

    // ---------------------------------------------------------------
    // 9. DEMO CENTRE (/#/demo) PRESENTATION EXPERIENCE
    // ---------------------------------------------------------------
    console.log('\n--- 11. DEMO CENTRE PRESENTATION EXPERIENCE (/#/demo) ---');
    await page.goto(`${BASE_URL}/#/demo`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    const demoTitle = await page.textContent('h1');
    assert(demoTitle.includes('Demonstration Centre'), 'Demo Centre renders heading');
    assert(await page.locator('text=Evaluation Showcase & Architecture').isVisible(), 'Demo Centre showcase tag visible');
    assert(await page.locator('#demo-enter-customer-btn').isVisible(), 'Demo Centre Enter Customer button present');
    assert(await page.locator('#demo-enter-staff-btn').isVisible(), 'Demo Centre Enter Staff button present');
    assert(await page.locator('#demo-enter-maint-btn').isVisible(), 'Demo Centre Enter Maintenance button present');
    assert(await page.locator('text=The Complete Connected Journey').isVisible(), 'Connected journey guide visible');
    assert(await page.locator('text=Reset Demo Data to Initial State').isVisible(), 'Database reseed button present in Demo Centre');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '10-demo-centre.png') });

    // ---------------------------------------------------------------
    // 10. CONNECTED END-TO-END DEMO JOURNEY
    // ---------------------------------------------------------------
    console.log('\n--- 12. CONNECTED END-TO-END JOURNEY ---');
    console.log('  12a. Launching Customer via Demo Centre...');
    await page.locator('#demo-enter-customer-btn').click();
    await page.waitForTimeout(500);
    assert(page.url().includes('/account'), 'Demo Centre customer launcher opened /#/account');

    console.log('  12b. Customer orders item and completes simulated PhonePe payment...');
    await page.goto(`${BASE_URL}/#/order`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    // Add first item to cart
    await page.locator('button:has-text("Add to Order")').first().click();
    await page.waitForTimeout(300);
    await page.locator('button:has-text("Review Cart")').click();
    await page.waitForTimeout(300);

    // Select PhonePe in Cart Drawer
    await page.locator('button:has-text("PhonePe")').first().click();
    await page.waitForTimeout(200);

    // Open UPI Modal
    await page.locator('button:has-text("Pay")').last().click();
    await page.waitForTimeout(400);

    const upiModal = page.locator('[role="dialog"][aria-label="Demo UPI Payment Gateway"]');
    assert(await upiModal.isVisible(), 'Demo UPI Modal opened for customer checkout');

    // Complete simulated payment
    await upiModal.locator('button:has-text("Authorize & Pay")').click();
    await page.waitForTimeout(2500);

    assert(await upiModal.locator('text=Payment Successful!').isVisible(), 'Payment Successful confirmed');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '11-e2e-payment-success.png') });

    // Open Receipt
    await upiModal.locator('button:has-text("View Official Receipt")').click();
    await page.waitForTimeout(400);
    const receiptModal = page.locator('[role="dialog"][aria-label="Payment Receipt"]');
    assert(await receiptModal.isVisible(), 'Official Demo Receipt modal displayed');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '12-e2e-receipt.png') });

    await receiptModal.locator('button:has-text("Done")').click();
    await page.waitForTimeout(300);

    console.log('  12c. Verifying order appears in Customer Account...');
    await page.goto(`${BASE_URL}/#/account`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    assert(await page.locator('text=Demo UPI (PhonePe)').first().isVisible(), 'Customer account displays newly placed PhonePe order');
    assert(await page.locator('button:has-text("View Receipt")').first().isVisible(), 'View Receipt button visible on new order');

    console.log('  12d. Staff logs in separately and verifies order in Kitchen Display (KDS)...');
    await page.goto(`${BASE_URL}/#/login/staff`, { waitUntil: 'networkidle' });
    await page.locator('#staff-one-click-btn').click();
    await page.waitForTimeout(500);
    assert(page.url().includes('/staff-portal'), 'Staff logged in and viewing /#/staff-portal');

    // Check KDS has the customer order
    assert(await page.locator('text=Kitchen Display (KDS)').isVisible(), 'KDS is visible');
    assert(await page.locator('text=PAID via Demo UPI (PhonePe)').first().isVisible(), 'Staff KDS shows customer order PAID via Demo UPI (PhonePe)');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '13-e2e-staff-kds.png') });

    console.log('  12e. Maintenance logs in separately and inspects system health & audit log...');
    await page.goto(`${BASE_URL}/#/login/maintenance`, { waitUntil: 'networkidle' });
    await page.locator('#maint-one-click-btn').click();
    await page.waitForTimeout(500);
    assert(page.url().includes('/maint-portal'), 'Maintenance logged in and viewing /#/maint-portal');

    await page.locator('button:has-text("System Audit Log")').click();
    await page.waitForTimeout(300);
    assert(await page.locator('text=Immutable Audit Ledger').isVisible(), 'Maintenance inspects audit ledger');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '14-e2e-maint-audit.png') });

    // ---------------------------------------------------------------
    // 11. MOBILE LOGIN & RESPONSIVE VIEWPORT TEST (390 x 844)
    // ---------------------------------------------------------------
    console.log('\n--- 13. MOBILE LOGIN & NAVIGATION TEST ---');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/#/login/customer`, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(300);

    assert(await mobilePage.locator('h1:has-text("Demo Patron Sign In")').isVisible(), 'Mobile renders customer login form cleanly');
    await mobilePage.locator('#customer-one-click-btn').click();
    await mobilePage.waitForTimeout(500);

    assert(mobilePage.url().includes('/account'), 'Mobile customer login redirects to /#/account');
    assert(await mobilePage.locator('text=Arun Kumar').first().isVisible(), 'Mobile displays patron profile');
    await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, '15-mobile-customer-account.png') });

    await mobileContext.close();

    console.log('\n================================================================');
    console.log(`  ALL AUTH & DEMO TESTS PASSED: ${passedCount} PASSED, ${failedCount} FAILED`);
    console.log(`  Screenshots saved to: ${OUTPUT_DIR}`);
    console.log('================================================================\n');

  } catch (err) {
    console.error('\n❌ Test execution failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
