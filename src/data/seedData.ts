import type { BeerTap, MenuItem, VenueTable, Reservation, WaitlistParty, LoyaltyProfile, CorporatePackage, UserAccount, Order } from '../types';

export const SEED_TAPS: BeerTap[] = [
  {
    tap_id: 1,
    name: "Signature Mango Cider",
    style: "Fruit Craft Cider",
    abv: "4.8%",
    ibu: 12,
    level_pct: 84,
    temp_c: 3.2,
    tasting_notes: "Bengaluru's viral craft favorite. Natural Alphonso sweetness, tropical bouquet, crisp refreshing carbonation.",
    food_pairing: "Andhra Style Chilli Chicken & Wood-Fired Pepperoni Pizza",
    status: "OPTIMAL",
    batch_number: "MC-2026-B84"
  },
  {
    tap_id: 2,
    name: "Crisp Apple Cider",
    style: "Heritage Hard Cider",
    abv: "4.5%",
    ibu: 10,
    level_pct: 62,
    temp_c: 3.4,
    tasting_notes: "Pressed Himalayan green apples, champagne-style clarity, balanced acidity with a dry clean finish.",
    food_pairing: "Jalapeno Emmental Stuffed Mushrooms & Calamari Fritti",
    status: "OPTIMAL",
    batch_number: "AC-2026-B41"
  },
  {
    tap_id: 3,
    name: "Bavarian Hefeweizen",
    style: "Traditional German Wheat",
    abv: "5.2%",
    ibu: 15,
    level_pct: 31,
    temp_c: 4.1,
    tasting_notes: "Unfiltered Bavarian classic. Pronounced ripe banana notes, subtle clove spice, and creamy golden foam.",
    food_pairing: "California Fried Chicken & Loaded Brewery Nachos",
    status: "WARNING",
    batch_number: "HW-2026-B19"
  },
  {
    tap_id: 4,
    name: "Belgian Witbier",
    style: "Spiced Wheat Ale",
    abv: "4.9%",
    ibu: 14,
    level_pct: 90,
    temp_c: 3.8,
    tasting_notes: "Brewed with curated coriander seeds and sun-dried Valencia orange peel. Silky and aromatic.",
    food_pairing: "Chicken Ghee Roast & Verdure Italiano Pizza",
    status: "OPTIMAL",
    batch_number: "BW-2026-B92"
  },
  {
    tap_id: 5,
    name: "Dark Roasted Stout",
    style: "Oatmeal Dry Stout",
    abv: "6.0%",
    ibu: 32,
    level_pct: 45,
    temp_c: 6.0,
    tasting_notes: "Deep espresso and dark artisanal chocolate notes. Velvet roasted malt backbone with espresso finish.",
    food_pairing: "Mamsam Vepudu & Sizzling Walnut Fudge Brownie",
    status: "OPTIMAL",
    batch_number: "ST-2026-B12"
  },
  {
    tap_id: 6,
    name: "Brooktoberfest IPA",
    style: "Seasonal West Coast IPA",
    abv: "6.5%",
    ibu: 48,
    level_pct: 18,
    temp_c: 4.5,
    tasting_notes: "Limited autumnal brew. Pine resin aroma, bright grapefruit zest, and assertive lupulin punch.",
    food_pairing: "Pork Chilly Pepper & Margherita Classico",
    status: "CRITICAL_LOW",
    batch_number: "BF-2026-B03"
  }
];

export const SEED_MENU: MenuItem[] = [
  // Craft Beers
  {
    id: "beer-1",
    name: "Signature Mango Cider (Pint 500ml)",
    category: "craft_beer",
    price: 345,
    description: "Our legendary house brew crafted with fresh Indian mango pulp. Sweet, aromatic, and deeply satisfying.",
    dietary: "vegan",
    isBestseller: true,
    isChefSpecial: true,
    beerPairing: "Andhra Chilli Chicken",
    available: true,
    imageUrl: "/assets/mango-beer.png"
  },
  {
    id: "beer-2",
    name: "Crisp Apple Cider (Pint 500ml)",
    category: "craft_beer",
    price: 345,
    description: "Tart and invigorating Himalayan cider with fine carbonation and crisp finish.",
    dietary: "vegan",
    isBestseller: false,
    beerPairing: "Calamari Fritti",
    available: true,
    imageUrl: "/assets/mango-beer.png"
  },
  {
    id: "beer-3",
    name: "Bavarian Hefeweizen (Pint 500ml)",
    category: "craft_beer",
    price: 325,
    description: "Classic unfiltered German wheat ale boasting aroma of clove and ripe banana.",
    dietary: "vegan",
    isBestseller: true,
    beerPairing: "Brewery Nachos",
    available: true,
    imageUrl: "/assets/mango-beer.png"
  },
  {
    id: "beer-4",
    name: "Belgian Witbier (Pint 500ml)",
    category: "craft_beer",
    price: 325,
    description: "Citrusy and smooth wheat ale with organic coriander and orange peel.",
    dietary: "vegan",
    beerPairing: "Chicken Ghee Roast",
    available: true,
    imageUrl: "/assets/mango-beer.png"
  },
  {
    id: "beer-5",
    name: "Dark Roasted Stout (Pint 500ml)",
    category: "craft_beer",
    price: 345,
    description: "Rich dark brew layered with roast coffee beans, cacao nibs, and creamy foam.",
    dietary: "vegan",
    beerPairing: "Sizzling Brownie",
    available: true,
    imageUrl: "/assets/mango-beer.png"
  },
  {
    id: "beer-6",
    name: "Brooktoberfest IPA (Pint 500ml)",
    category: "craft_beer",
    price: 365,
    description: "Limited seasonal single-batch dry-hopped with Citra and Mosaic hops.",
    dietary: "vegan",
    isChefSpecial: true,
    beerPairing: "Pork Chilly Pepper",
    available: true,
    imageUrl: "/assets/mango-beer.png"
  },

  // Starters
  {
    id: "food-1",
    name: "Andhra Style Chilli Chicken",
    category: "starters",
    price: 395,
    description: "Fiery boneless chicken tossed with slit green chillies, curry leaves, and regional spice marinade.",
    dietary: "non-veg",
    spiceLevel: 3,
    isBestseller: true,
    beerPairing: "Signature Mango Cider",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },
  {
    id: "food-2",
    name: "Mangalorean Chicken Ghee Roast",
    category: "starters",
    price: 445,
    description: "Slow-roasted tender chicken morsels drenched in pure Byadgi chilli ghee masala in cast iron skillet.",
    dietary: "non-veg",
    spiceLevel: 2,
    isBestseller: true,
    isChefSpecial: true,
    beerPairing: "Belgian Witbier",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },
  {
    id: "food-3",
    name: "California Fried Chicken",
    category: "starters",
    price: 385,
    description: "Crunchy double-dipped buttermilk fried chicken tenders served with house smoked chipotle mayo.",
    dietary: "non-veg",
    spiceLevel: 1,
    isBestseller: true,
    beerPairing: "Bavarian Hefeweizen",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },
  {
    id: "food-4",
    name: "Brooks & Bonds Signature Nachos",
    category: "starters",
    price: 325,
    description: "Artisanal corn tortilla chips baked with Monterrey Jack cheese, jalapeño rings, salsa roja, and sour cream.",
    dietary: "veg",
    spiceLevel: 1,
    beerPairing: "Crisp Apple Cider",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },
  {
    id: "food-5",
    name: "Jalapeno Emmental Stuffed Mushrooms",
    category: "starters",
    price: 345,
    description: "Button mushroom caps packed with molten Swiss Emmental cheese and charred jalapeño crumb.",
    dietary: "veg",
    spiceLevel: 1,
    beerPairing: "Crisp Apple Cider",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },
  {
    id: "food-6",
    name: "Pork Chilly Pepper",
    category: "starters",
    price: 465,
    description: "Succulent pork cuts wok-tossed with freshly crushed Tellicherry black pepper and scallions.",
    dietary: "non-veg",
    spiceLevel: 3,
    beerPairing: "Brooktoberfest IPA",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },
  {
    id: "food-7",
    name: "Calamari Fritti",
    category: "starters",
    price: 425,
    description: "Crisp golden salt & pepper squid rings served with zesty caper tartar sauce and grilled lemon.",
    dietary: "non-veg",
    spiceLevel: 1,
    beerPairing: "Crisp Apple Cider",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },

  // Wood-Fired Pizzas
  {
    id: "pizza-1",
    name: "Margherita Classico Pizza",
    category: "wood_fired_pizza",
    price: 450,
    description: "11-inch thin crust fermented for 48 hours. San Marzano tomato sauce, fresh mozzarella fior di latte, and basil.",
    dietary: "veg",
    isBestseller: true,
    beerPairing: "Belgian Witbier",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },
  {
    id: "pizza-2",
    name: "Pork Pepperoni Rustica Pizza",
    category: "wood_fired_pizza",
    price: 580,
    description: "Wood-fired crust with generous imported cured pork pepperoni, aged mozzarella, and spicy hot honey drizzle.",
    dietary: "non-veg",
    isBestseller: true,
    isChefSpecial: true,
    beerPairing: "Signature Mango Cider",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },
  {
    id: "pizza-3",
    name: "Verdure Italiano Pizza",
    category: "wood_fired_pizza",
    price: 480,
    description: "Fire-roasted zucchini, bell peppers, Kalamata olives, sundried tomatoes, and balsamic reduction.",
    dietary: "veg",
    beerPairing: "Belgian Witbier",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },
  {
    id: "pizza-4",
    name: "Spicy Roasted Chicken Pizza",
    category: "wood_fired_pizza",
    price: 520,
    description: "Herb-marinated smoked chicken strips, pickled red onions, bird's eye chilli, and house BBQ drizzle.",
    dietary: "non-veg",
    spiceLevel: 2,
    beerPairing: "Bavarian Hefeweizen",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },

  // Mains
  {
    id: "main-1",
    name: "Spaghetti Aglio Olio Peperoncino",
    category: "pastas_mains",
    price: 395,
    description: "Al dente spaghetti tossed in golden extra virgin garlic oil, red pepper flakes, parsley, and shaved Grana Padano.",
    dietary: "veg",
    spiceLevel: 1,
    beerPairing: "Belgian Witbier",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },
  {
    id: "main-2",
    name: "Hyderabadi Dum Chicken Biryani",
    category: "pastas_mains",
    price: 425,
    description: "Fragrant long-grain basmati rice cooked on dum with succulent bone-in spiced chicken, saffron, and mirchi ka salan.",
    dietary: "non-veg",
    spiceLevel: 2,
    isBestseller: true,
    beerPairing: "Signature Mango Cider",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },
  {
    id: "main-3",
    name: "Mushroom Stroganoff with Herb Butter Rice",
    category: "pastas_mains",
    price: 395,
    description: "Creamy Dijon mustard mushroom stew with sour cream and paprika over fragrant butter-tossed rice.",
    dietary: "veg",
    beerPairing: "Dark Roasted Stout",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  },

  // Desserts
  {
    id: "dessert-1",
    name: "Sizzling Walnut Fudge Brownie",
    category: "desserts",
    price: 265,
    description: "Warm dense chocolate walnut brownie served on a piping hot iron skillet with Madagascar vanilla bean gelato and hot Belgian chocolate fudge sauce.",
    dietary: "veg",
    isBestseller: true,
    isChefSpecial: true,
    beerPairing: "Dark Roasted Stout",
    available: true,
    imageUrl: "/assets/culinary-spread.png"
  }
];

export const SEED_TABLES: VenueTable[] = [
  // Level 3: Rooftop (Outdoor Alfresco Terrace)
  { table_id: "R-01", level: "Level 3: Rooftop", seats: 4, status: "OCCUPIED", simulated_server: "Mathew K.", order_time_elapsed: "38m", current_guest: "Arun Kumar (VIP)", current_bill_total: 2180, order_count: 2 },
  { table_id: "R-02", level: "Level 3: Rooftop", seats: 6, status: "OCCUPIED", simulated_server: "Vijay S.", order_time_elapsed: "14m", current_guest: "Kavita Reddy", current_bill_total: 1420, order_count: 1 },
  { table_id: "R-03", level: "Level 3: Rooftop", seats: 2, status: "AVAILABLE", simulated_server: "Unassigned", order_time_elapsed: "0m" },
  { table_id: "R-04", level: "Level 3: Rooftop", seats: 4, status: "AVAILABLE", simulated_server: "Unassigned", order_time_elapsed: "0m" },
  { table_id: "R-05", level: "Level 3: Rooftop", seats: 8, status: "RESERVED", simulated_server: "Mathew K.", order_time_elapsed: "0m", current_guest: "Swiggy Tech Outing", current_bill_total: 0 },
  { table_id: "R-06", level: "Level 3: Rooftop", seats: 4, status: "AVAILABLE", simulated_server: "Unassigned", order_time_elapsed: "0m" },

  // Level 2: Mid-Tier Lounge & Dance Floor
  { table_id: "D-01", level: "Level 2: Dance Floor", seats: 8, status: "RESERVED", simulated_server: "Vishwajeet P.", order_time_elapsed: "0m", current_guest: "Priya Sharma", current_bill_total: 0 },
  { table_id: "D-02", level: "Level 2: Dance Floor", seats: 4, status: "OCCUPIED", simulated_server: "Vishwajeet P.", order_time_elapsed: "52m", current_guest: "Rohan & Friends", current_bill_total: 3100, order_count: 3 },
  { table_id: "D-03", level: "Level 2: Dance Floor", seats: 4, status: "AVAILABLE", simulated_server: "Unassigned", order_time_elapsed: "0m" },
  { table_id: "D-04", level: "Level 2: Dance Floor", seats: 6, status: "OCCUPIED", simulated_server: "Vishwajeet P.", order_time_elapsed: "26m", current_guest: "Gaurav Malhotra", current_bill_total: 1950, order_count: 1 },
  { table_id: "D-05", level: "Level 2: Dance Floor", seats: 2, status: "AVAILABLE", simulated_server: "Unassigned", order_time_elapsed: "0m" },

  // Level 1: Brewery Bar & Kettles
  { table_id: "B-01", level: "Level 1: Brewery Bar", seats: 2, status: "OCCUPIED", simulated_server: "Suhag M.", order_time_elapsed: "22m", current_guest: "Deepak Rao", current_bill_total: 690, order_count: 1 },
  { table_id: "B-02", level: "Level 1: Brewery Bar", seats: 4, status: "AVAILABLE", simulated_server: "Unassigned", order_time_elapsed: "0m" },
  { table_id: "B-03", level: "Level 1: Brewery Bar", seats: 4, status: "AVAILABLE", simulated_server: "Unassigned", order_time_elapsed: "0m" },
  { table_id: "B-04", level: "Level 1: Brewery Bar", seats: 6, status: "RESERVED", simulated_server: "Suhag M.", order_time_elapsed: "0m", current_guest: "Koramangala Beer Club", current_bill_total: 0 }
];

export const SEED_RESERVATIONS: Reservation[] = [
  {
    id: "RES-9821",
    customer_name: "Priya Sharma",
    phone: "+91 98450 12345",
    email: "priya.sharma@example.com",
    date: "2026-10-11",
    time: "20:00",
    party_size: 8,
    level: "Level 2: Dance Floor",
    table_id: "D-01",
    occasion: "Birthday Celebration",
    status: "CONFIRMED",
    notes: "Requires birthday sparkler with chocolate brownie",
    created_at: "2026-10-11 14:30"
  },
  {
    id: "RES-9822",
    customer_name: "Koramangala Beer Club",
    phone: "+91 97422 55500",
    email: "events@beerclubblr.com",
    date: "2026-10-11",
    time: "20:30",
    party_size: 6,
    level: "Level 1: Brewery Bar",
    table_id: "B-04",
    occasion: "Craft Beer Tasting",
    status: "CONFIRMED",
    notes: "Wants brew tour with head brewer",
    created_at: "2026-10-11 15:10"
  },
  {
    id: "RES-9820",
    customer_name: "Arun Kumar",
    phone: "+91 98450 00000",
    email: "arun.vip@example.com",
    date: "2026-10-11",
    time: "19:00",
    party_size: 4,
    level: "Level 3: Rooftop",
    table_id: "R-01",
    occasion: "VIP Dining",
    status: "SEATED",
    notes: "Prefers corner rooftop view, extra mango cider pints",
    created_at: "2026-10-11 12:00"
  }
];

export const SEED_WAITLIST: WaitlistParty[] = [
  {
    id: "W-401",
    customer_name: "Siddharth Sen",
    phone: "+91 98860 11223",
    party_size: 4,
    target_level: "Level 3: Rooftop",
    wait_mins_estimated: 15,
    status: "WAITING",
    created_at: "2026-10-11 19:40"
  },
  {
    id: "W-402",
    customer_name: "Ananya Deshmukh",
    phone: "+91 99000 44556",
    party_size: 2,
    target_level: "Level 2: Dance Floor",
    wait_mins_estimated: 10,
    status: "WAITING",
    created_at: "2026-10-11 19:45"
  }
];

export const SEED_LOYALTY_PROFILES: LoyaltyProfile[] = [
  {
    guest_id: "C-101",
    name: "Arun Kumar",
    phone: "+91 98450 00000",
    email: "arun.vip@example.com",
    tier: "The Mango Legend (VIP)",
    points_balance: 1420,
    lifetime_spend: 34500,
    total_visits: 14,
    punch_card_stamps: 6, // 6 of 8 for free pizza
    favorite_beverage: "Signature Mango Cider (Pitcher)",
    transactions: [
      { id: "TX-1", date: "2026-10-04", description: "Dine-in at Rooftop", points_delta: 340, type: "EARNED" },
      { id: "TX-2", date: "2026-09-28", description: "Brooktoberfest Tasting Event", points_delta: 200, type: "BONUS" },
      { id: "TX-3", date: "2026-09-15", description: "Redeemed Pitcher Voucher", points_delta: -500, type: "REDEEMED" }
    ],
    notes: "Long-standing regular. Enjoys Table R-01 on weekends."
  },
  {
    guest_id: "C-102",
    name: "Neha Sundaram",
    phone: "+91 97422 00000",
    email: "neha.sundaram@startupcorp.io",
    tier: "Silver",
    points_balance: 680,
    lifetime_spend: 16200,
    total_visits: 6,
    punch_card_stamps: 4,
    favorite_beverage: "Belgian Witbier",
    transactions: [
      { id: "TX-4", date: "2026-10-01", description: "Corporate Friday Outing", points_delta: 420, type: "EARNED" }
    ],
    notes: "Organizes engineering outings from Embassy GolfLinks."
  }
];

export const CORPORATE_PACKAGES: CorporatePackage[] = [
  {
    tier_id: 'bronze',
    name: "Bronze Brew Team Mixer",
    price_per_head: 1099,
    duration_hours: 3,
    beverages_included: ["Unlimited Mango Cider, Wheat & Lager", "Craft Soft Brews & Mocktails"],
    food_courses: "3 Veg Starters, 2 Non-Veg Starters (incl. California Fried Chicken), 2 Wood-Fired Pizzas, Loaded Nachos"
  },
  {
    tier_id: 'silver',
    name: "Silver Gastropub Celebration",
    price_per_head: 1599,
    duration_hours: 3.5,
    beverages_included: ["All 6 Craft Brewery Taps", "House Spirits (Whiskey, Vodka, Rum)", "Signature Gin & Beer Cocktails"],
    food_courses: "4 Veg Starters, 4 Non-Veg Starters (Andhra Chilli Chicken & Ghee Roast), 3 Pizzas, Biryani & Brownie Buffet"
  },
  {
    tier_id: 'gold_vip',
    name: "Gold VIP Executive Reserve",
    price_per_head: 2199,
    duration_hours: 4,
    beverages_included: ["Full Craft Beer Taps", "Premium Single Malts & Aged Spirits", "Champagne Cider Toast", "Artisanal Cocktails"],
    food_courses: "Full 5-Course Lavish Buffet, Live Wood-Fired Pizza Counter, Mamsam Vepudu, Calamari, Sizzling Dessert Bar"
  }
];

export const SEED_USERS: UserAccount[] = [
  {
    id: "u-cust",
    name: "Arun Kumar (VIP Patron)",
    email: "arun.vip@koramangala.in",
    phone: "+91 98450 12345",
    demoPassword: "customer123",
    role: "CUSTOMER",
    title: "The Mango Club Legend",
    department: "Guest Experience",
    permissions: ["view_menu", "create_order", "book_table", "join_loyalty", "view_receipts"]
  },
  {
    id: "u-staff",
    name: "Mathew V. (Floor Lead & KDS)",
    employeeId: "EMP-402",
    email: "mathew.staff@brooksbonds.in",
    phone: "+91 98860 44321",
    demoPassword: "staff123",
    role: "STAFF",
    title: "Floor Captain & KDS Dispatch",
    department: "Floor & Kitchen Operations",
    permissions: ["manage_tables", "seat_waitlist", "update_kds", "view_orders", "resolve_alerts"]
  },
  {
    id: "u-mgmt",
    name: "Vikram Nair (General Manager)",
    employeeId: "GM-101",
    email: "vikram.gm@brooksbonds.in",
    phone: "+91 97400 11223",
    demoPassword: "mgmt123",
    role: "MANAGEMENT",
    title: "General Manager & Beverage Director",
    department: "Executive Management",
    permissions: ["view_revenue", "edit_menu_pricing", "view_crm", "view_keg_telemetry", "manage_staff"]
  },
  {
    id: "u-maint",
    name: "DevOps & Systems Lead",
    employeeId: "SYS-ADMIN-01",
    email: "sysadmin@brooksbonds.in",
    phone: "+91 98440 99887",
    demoPassword: "maint123",
    role: "MAINTENANCE",
    title: "Infrastructure & Telemetry Admin",
    department: "Systems Engineering",
    permissions: ["manage_rbac", "reset_data", "view_diagnostics", "view_audit_logs", "simulate_errors", "manage_flags"]
  }
];

export interface DemoCredential {
  role: 'CUSTOMER' | 'STAFF' | 'MAINTENANCE' | 'MANAGEMENT';
  label: string;
  badge: string;
  identifier: string;
  password: string;
  account: UserAccount;
  portalRoute: string;
  loginRoute: string;
  description: string;
}

export const DEMO_CREDENTIALS: DemoCredential[] = [
  {
    role: 'CUSTOMER',
    label: 'Patron Experience',
    badge: 'Loyalty VIP',
    identifier: 'arun.vip@koramangala.in',
    password: 'customer123',
    account: SEED_USERS[0],
    portalRoute: 'account',
    loginRoute: 'login/customer',
    description: 'Browse craft menu, checkout with simulated PhonePe/GPay/Paytm, inspect demo receipts, and track orders.'
  },
  {
    role: 'STAFF',
    label: 'Floor Lead & Kitchen Display (KDS)',
    badge: 'Operations',
    identifier: 'mathew.staff@brooksbonds.in',
    password: 'staff123',
    account: SEED_USERS[1],
    portalRoute: 'staff-portal',
    loginRoute: 'login/staff',
    description: 'Monitor active kitchen tickets, update dish prep statuses, assign floor tables, and resolve server calls.'
  },
  {
    role: 'MAINTENANCE',
    label: 'Systems & Diagnostics Command',
    badge: 'Root Access',
    identifier: 'sysadmin@brooksbonds.in',
    password: 'maint123',
    account: SEED_USERS[3],
    portalRoute: 'maint-portal',
    loginRoute: 'login/maintenance',
    description: 'Audit telemetry logs, toggle operational feature flags, run diagnostics, and reseed demo database.'
  }
];

export const SEED_ORDERS: Order[] = [
  {
    id: "BB-701",
    type: "DINE_IN_QR",
    table_id: "R-01",
    customer_name: "Arun Kumar (VIP)",
    phone: "+91 98450 00000",
    items: [
      { menuItem: SEED_MENU[0], quantity: 2 }, // Mango Cider
      { menuItem: SEED_MENU[6], quantity: 1 }, // Andhra Chilli Chicken
      { menuItem: SEED_MENU[14], quantity: 1 } // Pork Pepperoni Pizza
    ],
    subtotal: 1665,
    discount: 166.5,
    gst_vat: 149.85,
    delivery_fee: 0,
    total: 1648.35,
    coupon_code: "MANGOVIP10",
    status: "PREPARING",
    payment_method: "UPI",
    payment_status: "PAID",
    created_at: "2026-10-11 19:15",
    estimated_mins: 15
  },
  {
    id: "BB-702",
    type: "DINE_IN_QR",
    table_id: "D-02",
    customer_name: "Rohan & Friends",
    phone: "+91 98860 77889",
    items: [
      { menuItem: SEED_MENU[2], quantity: 3 }, // Hefeweizen
      { menuItem: SEED_MENU[8], quantity: 2 }, // Brewery Nachos
      { menuItem: SEED_MENU[7], quantity: 1 }  // Ghee Roast
    ],
    subtotal: 2070,
    discount: 0,
    gst_vat: 207,
    delivery_fee: 0,
    total: 2277,
    status: "SERVED",
    payment_method: "Card",
    payment_status: "PAID",
    created_at: "2026-10-11 18:40",
    estimated_mins: 0
  }
];
