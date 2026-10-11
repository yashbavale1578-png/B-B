const { chromium } = require('C:/Users/yashb/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve(__dirname, '../test-results-multipage');

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
  }
}

async function run() {
  console.log('=====================================================');
  console.log('  BROOKS & BONDS BREWERY - TRUE MULTI-PAGE VERIFICATION');
  console.log('=====================================================\n');

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    // 1. HOME ROUTE (/)
    console.log('--- 1. HOME ROUTE (/) ---');
    await page.goto(`${BASE_URL}/#/`, { waitUntil: 'networkidle' });
    const heroTitle = await page.textContent('h1');
    assert(heroTitle.includes('Crafted in Koramangala'), 'Home page renders hero headline');
    assert(await page.locator('text=Explore 6 Craft Taps').isVisible(), 'Hero CTA "Explore 6 Craft Taps" visible');
    assert(await page.locator('text=Reserve a Table').first().isVisible(), 'Hero CTA "Reserve a Table" visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01-home.png'), fullPage: false });

    // 2. DEDICATED MENU PAGE (/#/menu)
    console.log('\n--- 2. DEDICATED MENU PAGE (/#/menu) ---');
    await page.goto(`${BASE_URL}/#/menu`, { waitUntil: 'networkidle' });
    const menuHeading = await page.textContent('h1');
    assert(menuHeading.includes('Brews & Gastropub Cuisine'), 'Menu page renders dedicated heading');
    assert(await page.locator('input[placeholder*="Search dishes"]').isVisible(), 'Menu search input visible');
    assert(await page.locator('text=Wood-Fired Pizzas').first().isVisible(), 'Menu category pills visible');
    // Verify it doesn't render the home hero
    assert(!(await page.locator('text=Crafted in Koramangala. Renowned for Mango Beer.').isVisible()), 'Home hero is NOT rendered on Menu page');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02-menu.png'), fullPage: false });

    // 3. DEDICATED ORDERING PAGE (/#/order)
    console.log('\n--- 3. DEDICATED ORDERING PAGE (/#/order) ---');
    await page.goto(`${BASE_URL}/#/order`, { waitUntil: 'networkidle' });
    const orderHeading = await page.textContent('h1');
    assert(orderHeading.includes('Order Fresh Pints & Gastropub Fare'), 'Order page renders dedicated heading');
    assert(await page.locator('text=Review Cart').isVisible(), 'Review cart button visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03-order.png'), fullPage: false });

    // 4. DEDICATED RESERVATIONS PAGE (/#/reservations)
    console.log('\n--- 4. DEDICATED RESERVATIONS PAGE (/#/reservations) ---');
    await page.goto(`${BASE_URL}/#/reservations`, { waitUntil: 'networkidle' });
    const resHeading = await page.textContent('h1');
    assert(resHeading.includes('Reserve Your Table'), 'Reservations page renders dedicated heading');
    assert(await page.locator('text=Level 3: Rooftop').first().isVisible(), 'Floor plan level selector visible');
    assert(await page.locator('button:has-text("Lock Reservation")').isVisible(), 'Booking submit button visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04-reservations.png'), fullPage: false });

    // 5. DEDICATED TABLE QR DINING (/#/table-qr)
    console.log('\n--- 5. DEDICATED TABLE QR DINING (/#/table-qr) ---');
    await page.goto(`${BASE_URL}/#/table-qr`, { waitUntil: 'networkidle' });
    assert(await page.locator('h1:has-text("Table R-01")').isVisible(), 'Active table context badge visible');
    assert(await page.locator('button:has-text("Call Server")').isVisible(), 'Call server button visible');
    assert(await page.locator('button:has-text("Split Bill")').isVisible(), 'Bill splitting button visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05-table-qr.png'), fullPage: false });

    // 6. DEDICATED EVENTS PAGE (/#/events)
    console.log('\n--- 6. DEDICATED EVENTS PAGE (/#/events) ---');
    await page.goto(`${BASE_URL}/#/events`, { waitUntil: 'networkidle' });
    const eventsHeading = await page.textContent('h1');
    assert(eventsHeading.includes('Corporate Outing'), 'Events page renders dedicated heading');
    assert(await page.locator('text=Guest Count').isVisible(), 'Guest count slider visible');
    assert(await page.locator('button:has-text("Proposal PDF")').isVisible(), 'PDF quotation download simulator visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '06-events.png'), fullPage: false });

    // 7. DEDICATED THE MANGO CLUB LOYALTY (/#/loyalty)
    console.log('\n--- 7. DEDICATED LOYALTY PAGE (/#/loyalty) ---');
    await page.goto(`${BASE_URL}/#/loyalty`, { waitUntil: 'networkidle' });
    const loyaltyHeading = await page.textContent('h1');
    assert(loyaltyHeading.includes('The Mango Club VIP Society'), 'Loyalty page renders dedicated heading');
    assert(await page.locator('text=Digital Craft Pint Punch Card').isVisible(), '8-Pint punch card visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '07-loyalty.png'), fullPage: false });

    // 8. DEDICATED PROMOTIONS PAGE (/#/promotions)
    console.log('\n--- 8. DEDICATED PROMOTIONS PAGE (/#/promotions) ---');
    await page.goto(`${BASE_URL}/#/promotions`, { waitUntil: 'networkidle' });
    assert(await page.locator('text=Direct Patron Privileges').isVisible(), 'Promotions page eyebrow visible');
    assert(await page.locator('text=HAPPY40').isVisible(), 'Promo coupon HAPPY40 visible');
    assert(await page.locator('text=MANGOVIP10').isVisible(), 'Promo coupon MANGOVIP10 visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '08-promotions.png'), fullPage: false });

    // 9. DEDICATED GALLERY PAGE (/#/gallery)
    console.log('\n--- 9. DEDICATED GALLERY PAGE (/#/gallery) ---');
    await page.goto(`${BASE_URL}/#/gallery`, { waitUntil: 'networkidle' });
    assert(await page.locator('text=Atmospheric Visual Archive').isVisible(), 'Gallery page eyebrow visible');
    assert(await page.locator('text=Brooks & Bonds at Twilight').isVisible(), 'Gallery image caption visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '09-gallery.png'), fullPage: false });

    // 10. DEDICATED STORY PAGE (/#/story)
    console.log('\n--- 10. DEDICATED STORY PAGE (/#/story) ---');
    await page.goto(`${BASE_URL}/#/story`, { waitUntil: 'networkidle' });
    const storyHeading = await page.textContent('h1');
    assert(storyHeading.includes('The Soul of Brooks & Bonds'), 'Story page heading visible');
    assert(await page.locator('text=The Koramangala Taproom Genesis').isVisible(), 'Story genesis section visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '10-story.png'), fullPage: false });

    // 11. DEDICATED CONTACT PAGE (/#/contact)
    console.log('\n--- 11. DEDICATED CONTACT PAGE (/#/contact) ---');
    await page.goto(`${BASE_URL}/#/contact`, { waitUntil: 'networkidle' });
    const contactHeading = await page.textContent('h1');
    assert(contactHeading.includes('Find Us in Koramangala'), 'Contact page heading visible');
    assert(await page.locator('text=4, 100 Feet Road').first().isVisible(), 'Contact address details visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '11-contact.png'), fullPage: false });

    // 12. DEDICATED CUSTOMER ACCOUNT (/#/account)
    console.log('\n--- 12. DEDICATED CUSTOMER ACCOUNT (/#/account) ---');
    await page.goto(`${BASE_URL}/#/account`, { waitUntil: 'networkidle' });
    const accountHeading = await page.textContent('h1');
    assert(accountHeading.includes('Patron Account & Order Tracking'), 'Account page heading visible');
    assert(await page.locator('text=Orders & Kitchen Tracking').isVisible(), 'Active kitchen tickets section visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '12-account.png'), fullPage: false });

    // 13. OPERATIONAL PORTALS
    console.log('\n--- 13. OPERATIONAL PORTALS ---');
    // Staff Portal
    await page.goto(`${BASE_URL}/#/staff-portal`, { waitUntil: 'networkidle' });
    assert(await page.locator('text=Kitchen Display (KDS)').isVisible(), 'Staff Portal KDS board visible');
    assert(await page.locator('text=Floor Management').isVisible(), 'Staff Floor Management visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '13-staff-portal.png'), fullPage: false });

    // Management Portal
    await page.goto(`${BASE_URL}/#/mgmt-portal`, { waitUntil: 'networkidle' });
    assert(await page.locator('text=1st-Party Direct Channel Savings').isVisible(), 'Management 18% commission savings visible');
    await page.locator('button:has-text("6-Tap Brewhouse Telemetry")').click();
    await page.waitForTimeout(300);
    assert(await page.locator('text=Cold-Room Keg Level Sensors').isVisible(), 'Management keg telemetry visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '14-mgmt-portal.png'), fullPage: false });

    // Maintenance Portal
    await page.goto(`${BASE_URL}/#/maint-portal`, { waitUntil: 'networkidle' });
    assert(await page.locator('text=ROOT PRIVILEGE / LEVEL 4').isVisible(), 'Maintenance Root Privilege visible');
    assert(await page.locator('text=Reset All Demo Data').isVisible(), 'Maintenance state reset button visible');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '15-maint-portal.png'), fullPage: false });

    // 14. 404 NOT FOUND PAGE (/#/some-unknown-vintage)
    console.log('\n--- 14. 404 NOT FOUND PAGE ---');
    await page.goto(`${BASE_URL}/#/some-unknown-vintage`, { waitUntil: 'networkidle' });
    const notFoundTitle = await page.textContent('h1');
    assert(notFoundTitle.includes('This Vintage Has Run Dry'), 'Dedicated 404 Not Found page rendered for invalid route');
    assert(await page.locator('text=/some-unknown-vintage').isVisible(), 'Requested invalid route displayed in 404 UI');
    assert(await page.locator('text=Return to Taproom Home').isVisible(), '404 page provides "Return to Home" button');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '16-not-found-404.png'), fullPage: false });

    // 15. BROWSER HISTORY: BACK & FORWARD BUTTONS
    console.log('\n--- 15. BROWSER HISTORY: BACK & FORWARD BUTTONS ---');
    await page.goto(`${BASE_URL}/#/menu`, { waitUntil: 'networkidle' });
    await page.goto(`${BASE_URL}/#/order`, { waitUntil: 'networkidle' });
    assert(page.url().includes('/order'), 'Browser is on /order');
    
    await page.goBack();
    await page.waitForTimeout(200);
    assert(page.url().includes('/menu'), 'Browser back button successfully returns to /menu');
    assert(await page.locator('h1').textContent().then(t => t.includes('Brews & Gastropub Cuisine')), 'Menu page content restored on browser back');

    await page.goForward();
    await page.waitForTimeout(200);
    assert(page.url().includes('/order'), 'Browser forward button successfully returns to /order');

    // 16. REFRESH PRESERVES ROUTE
    console.log('\n--- 16. PAGE REFRESH PRESERVES ROUTE ---');
    await page.goto(`${BASE_URL}/#/events`, { waitUntil: 'networkidle' });
    await page.reload({ waitUntil: 'networkidle' });
    assert(page.url().includes('/events'), 'Page reload preserves /events route');
    assert(await page.locator('h1').textContent().then(t => t.includes('Corporate Outing')), 'Events page content remains active after reload');

    // 17. MOBILE VIEWPORT NAVIGATION (390 x 844)
    console.log('\n--- 17. MOBILE VIEWPORT (390 x 844) ---');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/#/`, { waitUntil: 'networkidle' });
    
    const hamburger = mobilePage.locator('#mobile-nav-toggle');
    assert(await hamburger.isVisible(), 'Mobile hamburger toggle is visible');
    await hamburger.click();
    await mobilePage.waitForTimeout(250);

    const mobileDrawer = mobilePage.locator('#mobile-nav-drawer');
    assert(await mobileDrawer.isVisible(), 'Mobile navigation drawer opened');

    // Click on "Menu & 6 Craft Taps" from mobile drawer
    await mobilePage.locator('#mobile-nav-drawer a[href="#/menu"]').click();
    await mobilePage.waitForTimeout(250);
    assert(mobilePage.url().includes('/menu'), 'Mobile drawer navigated to /menu');
    assert(!(await mobileDrawer.isVisible()), 'Mobile drawer automatically closed upon navigation');
    await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, '17-mobile-menu.png'), fullPage: false });

    await mobileContext.close();

    // 18. SHARED DEMO SYSTEM WORKFLOW (CROSS-PORTAL SYNC)
    console.log('\n--- 18. SHARED DEMO SYSTEM WORKFLOW (CROSS-PORTAL SYNC) ---');
    // Go to /mgmt-portal and change a price
    await page.goto(`${BASE_URL}/#/mgmt-portal`, { waitUntil: 'networkidle' });
    await page.locator('button:has-text("Menu Pricing Manager")').click();
    await page.waitForTimeout(200);

    // Edit price of first item
    const editBtn = page.locator('button:has-text("Edit Price")').first();
    await editBtn.click();
    const priceInput = page.locator('input[type="number"]');
    await priceInput.fill('385');
    await page.locator('table button.btn-primary').first().click(); // Save button
    await page.waitForTimeout(300);

    // Navigate to /order and check that price updated
    await page.goto(`${BASE_URL}/#/order`, { waitUntil: 'networkidle' });
    assert(await page.locator('text=₹385').first().isVisible(), 'Updated price ₹385 appears immediately on /order');

    console.log('\n=====================================================');
    console.log(`  VERIFICATION COMPLETE: ${passedCount} PASSED, ${failedCount} FAILED`);
    console.log(`  Screenshots saved to: ${OUTPUT_DIR}`);
    console.log('=====================================================');

  } catch (err) {
    console.error('Test execution failed with error:', err);
  } finally {
    await browser.close();
  }
}

run();
