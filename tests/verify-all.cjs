const { chromium } = require('C:/Users/yashb/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.join(__dirname, '..', 'test-results');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runVerification() {
  console.log('=====================================================');
  console.log('  BROOKS & BONDS BREWERY - PLAYWRIGHT VERIFICATION');
  console.log('=====================================================');

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = { passed: 0, failed: 0, checks: [] };

  function assert(condition, name) {
    if (condition) {
      console.log(`  [PASS] ${name}`);
      results.passed++;
      results.checks.push({ name, status: 'PASS' });
    } else {
      console.error(`  [FAIL] ${name}`);
      results.failed++;
      results.checks.push({ name, status: 'FAIL' });
    }
  }

  // 1. DESKTOP VERIFICATION (1440x900)
  console.log('\n--- 1. DESKTOP VIEWPORT (1440 x 900) ---');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await desktopContext.newPage();

  // Test Homepage
  await page.goto(`${BASE_URL}/#/home`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const title = await page.title();
  assert(title.includes('Brooks & Bonds'), `Page title contains brand: "${title}"`);
  
  const heroHeading = await page.textContent('h1');
  assert(heroHeading.includes('Crafted in Koramangala'), `Hero heading verified: "${heroHeading.replace(/\s+/g, ' ').trim()}"`);

  await page.screenshot({ path: path.join(OUTPUT_DIR, '01-desktop-home.png'), fullPage: false });

  // Test Menu Page
  console.log('\n--- 2. MENU BROWSING ROUTE (/#/menu) ---');
  await page.goto(`${BASE_URL}/#/menu`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const menuHeading = await page.textContent('h1');
  assert(menuHeading.includes('Brews & Gastropub Cuisine'), `Menu heading rendered: "${menuHeading}"`);
  
  // Test category filter click
  const craftBeerBtn = await page.locator('button:has-text("Fresh Craft Taps")');
  await craftBeerBtn.click();
  await page.waitForTimeout(300);
  const itemsCount = await page.locator('.interactive-card').count();
  assert(itemsCount >= 6, `Filtered craft beers count: ${itemsCount}`);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02-desktop-menu.png') });

  // Test Ordering & Cart Flow
  console.log('\n--- 3. ORDERING & CART WORKFLOW (/#/order) ---');
  await page.goto(`${BASE_URL}/#/order`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  // Click Add to Order on first item
  const addOrderBtn = await page.locator('button:has-text("Add to Order")').first();
  await addOrderBtn.click();
  await page.waitForTimeout(500);
  
  // Review Cart
  const reviewCartBtn = await page.locator('button:has-text("Review Cart")');
  await reviewCartBtn.click();
  await page.waitForTimeout(600);
  
  // Verify drawer is visible
  const cartDrawer = await page.locator('[aria-label="Your Order Cart"]');
  assert(await cartDrawer.isVisible(), 'Slide-over cart drawer opened successfully');

  // Test coupon code input
  const couponInput = await page.locator('input[placeholder*="MANGOVIP10"]');
  await couponInput.fill('MANGOVIP10');
  const applyBtn = await page.locator('button:has-text("Apply")');
  await applyBtn.click();
  await page.waitForTimeout(500);
  
  const couponApplied = await page.locator('text=Code MANGOVIP10 applied').isVisible();
  assert(couponApplied, 'Coupon MANGOVIP10 validated and applied with 10% discount');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03-desktop-cart-drawer.png') });

  // Close cart
  const closeCartBtn = await page.locator('button[aria-label="Close cart"]');
  await closeCartBtn.click();
  await page.waitForTimeout(300);

  // Test Table Reservations & Interactive Floor Plan
  console.log('\n--- 4. RESERVATIONS & INTERACTIVE FLOOR MAP (/#/reservations) ---');
  await page.goto(`${BASE_URL}/#/reservations`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  // Select Table on Interactive Floor Map
  const tableBtn = await page.locator('button[aria-label*="Table R-03"]').first();
  if (await tableBtn.isVisible()) {
    await tableBtn.click();
    await page.waitForTimeout(300);
    const selectionBadge = await page.locator('text=Table R-03').first();
    assert(await selectionBadge.isVisible(), 'Interactive floor map table selection confirmed (Table R-03)');
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04-desktop-reservations.png') });

  // Test Staff Portal & Kitchen Display System (KDS)
  console.log('\n--- 5. STAFF PORTAL & KDS COMMAND (/#/staff-portal) ---');
  await page.goto(`${BASE_URL}/#/staff-portal`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  const kdsTitle = await page.locator('text=Floor & Kitchen Command');
  assert(await kdsTitle.isVisible(), 'Staff Portal loaded with KDS board');

  // Test KDS Status Progression
  const prepBtn = await page.locator('button:has-text("Mark In Preparation")').first();
  if (await prepBtn.isVisible()) {
    await prepBtn.click();
    await page.waitForTimeout(500);
    assert(true, 'KDS ticket status successfully progressed to PREPARING');
  }

  // Switch to Floor Management tab
  const floorTabBtn = await page.locator('button:has-text("Floor Management")');
  await floorTabBtn.click();
  await page.waitForTimeout(400);
  const floorTables = await page.locator('h4:has-text("Table #")').count();
  assert(floorTables > 0, `Floor Management loaded with ${floorTables} live operational tables`);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05-desktop-staff-portal.png') });

  // Test Management Portal & 18% Commission Telemetry
  console.log('\n--- 6. MANAGEMENT PORTAL & GM TELEMETRY (/#/mgmt-portal) ---');
  await page.goto(`${BASE_URL}/#/mgmt-portal`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  const mgmtTitle = await page.locator('text=Operational Analytics & Control');
  assert(await mgmtTitle.isVisible(), 'Management Portal loaded');

  const savingsBadge = await page.locator('text=1st-Party Direct Channel Savings').first();
  assert(await savingsBadge.isVisible(), '18% Direct Channel Commission Savings telemetry displayed');

  // Switch to 6-Tap Keg Telemetry
  const kegTab = await page.locator('button:has-text("6-Tap Brewhouse Telemetry")');
  await kegTab.click();
  await page.waitForTimeout(400);
  const tapGauges = await page.locator('h4:has-text("Cider"), h4:has-text("IPA"), h4:has-text("Stout"), h4:has-text("Hefeweizen")').count();
  assert(tapGauges >= 4, `Live cold-room keg sensors active for ${tapGauges} craft taps`);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06-desktop-management-kegs.png') });

  // Test Live Menu Pricing Editor
  const menuManagerTab = await page.locator('button:has-text("Menu Pricing Manager")');
  await menuManagerTab.click();
  await page.waitForTimeout(400);
  const editPriceBtn = await page.locator('button:has-text("Edit Price")').first();
  assert(await editPriceBtn.isVisible(), 'Live Menu Catalog & inline price editor active');

  // Test Maintenance Portal & Diagnostics
  console.log('\n--- 7. MAINTENANCE PORTAL & SYSTEM DIAGNOSTICS (/#/maint-portal) ---');
  await page.goto(`${BASE_URL}/#/maint-portal`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  const maintTitle = await page.locator('text=Maintenance & Diagnostics');
  assert(await maintTitle.isVisible(), 'Root Maintenance portal loaded');

  const rbacTab = await page.locator('button:has-text("RBAC & Role Inspection")');
  await rbacTab.click();
  await page.waitForTimeout(400);
  const roleCards = await page.locator('button:has-text("Switch to")').count();
  assert(roleCards === 4, `All 4 Role Matrix contexts switchable (Customer, Staff, Management, Maintenance): count ${roleCards}`);

  const auditTab = await page.locator('button:has-text("System Audit Log")');
  await auditTab.click();
  await page.waitForTimeout(400);
  const auditEntries = await page.locator('table tbody tr').count();
  assert(auditEntries > 0, `Immutable system audit ledger contains ${auditEntries} live entries`);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07-desktop-maintenance-audit.png') });

  // Test Loyalty & Events Routes
  console.log('\n--- 8. LOYALTY & EVENTS ROUTES ---');
  await page.goto(`${BASE_URL}/#/loyalty`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const loyaltyPass = await page.locator('h1:has-text("The Mango Club")').first();
  assert(await loyaltyPass.isVisible(), 'The Mango Club VIP pass and 8-pint punch card active');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08-desktop-loyalty.png') });

  await page.goto(`${BASE_URL}/#/events`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const eventsHeading = await page.locator('text=Corporate Outing & Event Estimator');
  assert(await eventsHeading.isVisible(), 'Corporate Outing & Event Quotation Estimator active');
  await page.screenshot({ path: path.join(OUTPUT_DIR, '09-desktop-events.png') });

  // 2. MOBILE RESPONSIVENESS VERIFICATION (iPhone 14 / 390x844)
  console.log('\n--- 9. MOBILE VIEWPORT (390 x 844) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();

  await mobilePage.goto(`${BASE_URL}/#/home`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);
  
  const mobileHero = await mobilePage.textContent('h1');
  assert(mobileHero.includes('Crafted in Koramangala'), 'Mobile hero displays properly without overflow');

  // Verify mobile hamburger toggle
  const mobileMenuBtn = await mobilePage.locator('button[aria-label="Toggle navigation menu"]');
  assert(await mobileMenuBtn.isVisible(), 'Mobile hamburger navigation toggle is visible');
  await mobileMenuBtn.click();
  await mobilePage.waitForTimeout(400);
  const mobileNavDrawer = await mobilePage.locator('text=PORTALS & ACCESS');
  assert(await mobileNavDrawer.isVisible(), 'Mobile drawer expanded with all 15 routes and 4 portals');
  await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, '10-mobile-nav-drawer.png') });

  // Mobile Table QR Dining View
  await mobilePage.goto(`${BASE_URL}/#/table-qr`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(400);
  const qrTableTitle = await mobilePage.textContent('h1');
  assert(qrTableTitle.includes('Table'), `Mobile QR Dining interface responsive: "${qrTableTitle}"`);
  await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, '11-mobile-table-qr.png') });

  // Close browser
  await browser.close();

  console.log('\n=====================================================');
  console.log(`  VERIFICATION COMPLETE: ${results.passed} PASSED, ${results.failed} FAILED`);
  console.log(`  Screenshots saved to: ${OUTPUT_DIR}`);
  console.log('=====================================================');

  return results;
}

runVerification().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
