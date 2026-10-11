# DEMO FEATURES & APPLICATION SPECIFICATION

**Project:** Brooks & Bonds Brewery Sales Demonstration  
**Document ID:** DF-BB-2026-V1 (Audited)  
**Target:** Interactive Sales Prototype [SIMULATED DEMO SCOPE]  
**Scope:** Customer-Facing Digital Experience & Management Operations Suite [SIMULATED DEMO ARCHITECTURE]  
**Date of Document:** October 2026 | **Audit Status:** Rigorously Audited & Grounded

---

## 1. Prototype Architecture Overview

The software prototype demonstrates an interconnected digital ecosystem. Actions performed on the **Customer-Facing Portal** immediately update the state of the **Admin Operations Dashboard** [SIMULATED REAL-TIME INTERACTION]:

```
+--------------------------------------------------------------------------+
|                     INTERCONNECTED PROTOTYPE STATE                       |
+--------------------------------------------------------------------------+
|  CUSTOMER PORTAL ACTION            --->   ADMIN DASHBOARD REFLECTION     |
|  * Submits table reservation       --->   New row in Booking Pipeline    |
|  * Joins live waitlist queue       --->   Waitlist counter & table alert |
|  * Registers for "The Mango Club"  --->   New CRM profile & LTV tracking |
|  * Configures corporate party quote--->   New Lead in B2B Event Pipeline |
|  * Submits simulated table QR order--->   Active KDS kitchen ticket alert|
+--------------------------------------------------------------------------+
```

---

## 2. Customer-Facing Features & User Flows

### 2.1 Feature 1: Cinematic Brand Website & Interactive Brew Explorer
* **Purpose:** Establish an authoritative owned web presence that outclasses local competitors ([The Bier Library](https://www.thebierlibrary.in/), [Ganbeii](https://ganbeii.in/)).
* **Key Components:**
  - *Hero Section:* Industrial-rustic visual theme (warm amber, copper, dark slate) with ambient brewpub video reel simulation, headline: *"Crafted in Koramangala. Renowned for Mango Beer."* [PROTOTYPE VISUAL ASSET]
  - *Interactive Tap Wall:* Dynamic cards for all 6 draft taps (Mango Cider, Apple Cider, Hefeweizen, Belgian Wit, Stout, Season IPA). Displays simulated ABV, simulated IBU, tasting notes, food pairings, and real-time keg volume status (e.g., *"Tap 1: Mango Cider — 84% Full | Pouring Cold"*).  
    *Audit Note:* Exact ABV and IBU metrics are [SIMULATED DEMO VALUES / NEEDS CLIENT VERIFICATION] based on standard Karnataka microbrewery norms.
  - *3-Floor Venue Navigator:* Interactive selector allowing users to view Level 1 (Brewery Bar & Kettles), Level 2 (Dance Floor & DJ Console), and Level 3 (Open-Air Rooftop & Terrace) [VERIFIED PHYSICAL LAYOUT].
  - *Verified Social Proof Widget:* Embeds live Google Maps review badges (4.1★, 12,023+ reviews) [VERIFIED METRIC] highlighting customer testimonials regarding the Mango Beer and rooftop vibe.

### 2.2 Feature 2: Direct Table Reservation & Live Queue Flow
* **Purpose:** Bypass aggregator commissions and address peak weekend table drop-offs.
* **User Flow [SIMULATED INTERACTIVE DEMO]:**
  1. *Step 1: Party Details:* User selects Date, Time Slot (e.g., 8:00 PM), and Party Size (1 to 20+ guests).
  2. *Step 2: Floor Selection:* User chooses preferred seating zone [VERIFIED ZONES]:
     - Level 3: Open-Air Rooftop Terrace (Alfresco, panoramic views)
     - Level 2: Mid-Level Lounge & Dance Floor (Near DJ, high energy)
     - Level 1: Ground Floor Brewery Bar (Craft tanks, relaxed conversation)
  3. *Step 3: Guest Information:* Name, Phone (+91), Email, Special Occasion (Birthday, Corporate Outing, Date Night).
  4. *Step 4: Instant Confirmation & WhatsApp Simulation:* Modal displays booking confirmation card with a simulated WhatsApp message delivery preview: *"Your table at Brooks & Bonds Rooftop is locked for 8:00 PM tonight. Reply 'RUNNING LATE' to extend table hold by 20 minutes."* [SIMULATED NOTIFICATION]
* **Live Waitlist Queue Mode (When at 100% Capacity):**
  - Displays dynamic wait time (e.g., *"18 mins estimated wait — 3 parties ahead of you"*) [SIMULATED TELEMETRY].
  - Live animated progress bar showing real-time queue position with SMS notification simulation when table is ready.

### 2.3 Feature 3: "The Mango Club" Loyalty & Membership Prototype
* **Purpose:** Monetize the massive cult following of the signature Mango Cider and drive weekday repeat visits.
* **Tiers & Mechanics [PROPOSED LOYALTY SPECIFICATION]:**
  - *Tier 1: Mango Explorer (Free Entry):* Digital loyalty card, 5% cashback in Brew Points, complimentary taster on every visit.
  - *Tier 2: Brewmaster Crew (10 Pints or ₹3,000 Spend):* 10% points, priority weekend guestlist entry before 9:30 PM, invitation to seasonal Brooktoberfest tastings.
  - *Tier 3: The Mango Legend (VIP Mug Club):* Custom engraved ceramic Mango Club Mug stored on-premise, 15% points, personal table reservation concierge, invitations to private first-pour brew days.
* **Interactive UI:**
  - Digital wallet pass preview with QR code [SIMULATED COMPONENT].
  - Interactive "Punch Card" tracker: *"3 more pints to unlock a complimentary Wood-Fired Pizza."*

### 2.4 Feature 4: Corporate Event & Group Booking Estimator
* **Purpose:** Capture corporate team outings from nearby tech hubs (Embassy GolfLinks, Koramangala startups) without paying 15%–20% broker fees to VenueMonk.
* **Interactive Estimator Calculator [PROPOSED COMMERCIAL MODEL / NEEDS CLIENT VERIFICATION]:**
  - *Guest Count Slider:* 10 to 150 guests.
  - *Beverage Package Selector (Proposed Tiers):*
    - Bronze Package (₹1,099/head) [PROPOSED DEMO PRICING]: Unlimited Draught Beer (Mango Cider, Wheat, Lager) + Soft Drinks (3 Hours).
    - Silver Package (₹1,599/head) [PROPOSED DEMO PRICING]: Unlimited Craft Beers + House Spirits + Signature Cocktails (3 Hours).
    - Gold VIP Package (₹2,199/head) [PROPOSED DEMO PRICING]: Premium Single Malts + Craft Beers + Cocktails + Full Bar (3.5 Hours).
  - *Food Menu Selector:* Choice of 3 Veg Starters, 3 Non-Veg Starters (including Andhra Chilli Chicken and Ghee Roast [VERIFIED DISHES]), 2 Pizzas, and Main Course Buffet.
  - *Instant Output:* Real-time estimated total, tax breakdown (5% GST + VAT), and a simulated **"Download Corporate Proposal"** button that produces an instant formal PDF quotation [SIMULATED EXPORT].

### 2.5 Feature 5: Offline-Resilient QR Menu & Table Ordering Demo
* **Purpose:** Address the 40–50 minute food service delay and mobile signal dead zones identified in customer reviews.
* **Key Functionality [PROPOSED PROTOTYPE DEMO]:**
  - *Local Caching Simulation:* Demonstrates instantaneous page load even when the guest's mobile connection drops.
  - *Digital Menu Browsing:* Filter by dietary preference (Non-Veg, Veg, Vegan, Gluten-Free) and spice level.
  - *Interactive Bill Splitter:* Splits total bill equally or by item among up to 8 table guests.
  - *Server Call Button:* Triggers instant alerts to floor staff: *"Water Refill"*, *"Call Server"*, or *"Request Bill"*.
  - *Simulated UPI Payment:* 1-click checkout modal simulating PhonePe, Google Pay, and Paytm payments with instant payment receipt generation [SIMULATED PAYMENT GATEWAY].

---

## 3. Management Operations & Admin Dashboard

### 3.1 Live Venue Operations Center [SIMULATED MANAGEMENT UI]
* **KPI Metrics Bar [SIMULATED DEMO TELEMETRY]:**
  - Active Floor Occupancy: 82% (148 / 180 Seated Guests) [SIMULATED]
  - Current Waitlist Queue: 4 Parties (Avg. wait: 14 mins) [SIMULATED]
  - Today's Direct Reservations: 28 Bookings (0% aggregator commission paid) [SIMULATED]
  - Direct Margin Saved Today: ₹14,280 (Estimated savings vs. 18% aggregator cut) [SIMULATED]
* **Interactive Floor Grid (Levels 1, 2, 3) [SIMULATED DEMO FLOOR SPECIFICATION]:**
  - Displays tables as interactive cards colored by status:
    - 🟢 Green: Available
    - 🔴 Red: Occupied (displays dining duration, e.g., *"Table R-04: 48 mins"*)
    - 🟡 Yellow: Reserved (displays arrival countdown, e.g., *"Table R-08: Due in 12 mins"*)
    - 🔵 Blue: Order in Kitchen (displays KDS timer, e.g., *"Starters: 12 mins elapsed"*)
  - Clicking any table opens an action modal to seat guests, clear table, or view current tab.

### 3.2 Real-Time Keg & Draft Inventory Telemetry [SIMULATED TELEMETRY]
* Displays live digital gauges for all brewery taps:
  - **Tap 1: Mango Cider:** 84% Remaining (Estimated 142 Pints left — Normal) [SIMULATED]
  - **Tap 2: Apple Cider:** 62% Remaining (Normal) [SIMULATED]
  - **Tap 3: German Hefeweizen:** 31% Remaining (⚠️ Restock Warning) [SIMULATED]
  - **Tap 4: Belgian Witbier:** 90% Remaining (Normal) [SIMULATED]
  - **Tap 5: Roasted Stout:** 45% Remaining (Normal) [SIMULATED]
  - **Tap 6: Seasonal Brooktoberfest IPA:** 18% Remaining (🚨 Low Keg Alert — Switch to Keg #2) [SIMULATED]

### 3.3 Live Waitlist Controller [SIMULATED UI]
* Table of waiting walk-ins with party size, target floor, wait duration, and 1-click actions:
  - [Seat Table] -> Assigns table on active floor map.
  - [Send WhatsApp Alert] -> Simulates sending automated ready notifications.
  - [+10 Min Grace] -> Extends hold time when guest texts "Running Late".

### 3.4 First-Party CRM & Guest Profiles [SIMULATED DEMO RECORDS]
* Searchable guest directory populated by reservations and Mango Club sign-ups:
  - Guest Name, Phone, VIP Tier, Total Visits, Lifetime Spend, Favorite Brew, Dietary Notes.
  - Filterable by: *VIP Mango Club Members, High-Spend Corporate Organizers, At-Risk Lapsed Guests.*

---

## 4. Seeded Demonstration Data Schema (JSON)

*CRITICAL AUDIT NOTICE: All customer names, phone numbers, table IDs, and staff allocations in this schema are purely FICTITIOUS DATA created exclusively to power the interactive sales demonstration. Staff names (Mathew, Vijay, Vishwajeet, Suhag) are historical names referenced in public user reviews whose current active employment roles are unverified and utilized here strictly as simulated demo roles.*

```json
{
  "venue_summary": {
    "name": "Brooks & Bonds Brewery",
    "location": "Koramangala 5th Block, Bengaluru",
    "total_capacity_simulated": 350,
    "active_taps_count": 6,
    "data_classification": "SIMULATED DEMO SPECIFICATION"
  },
  "seed_tables": [
    {"table_id": "R-01", "level": "Level 3: Rooftop", "seats": 4, "status": "OCCUPIED", "simulated_server": "Mathew (Role Sim)", "order_time_elapsed": "38m", "data_tag": "SIMULATED DEMO DATA"},
    {"table_id": "R-02", "level": "Level 3: Rooftop", "seats": 6, "status": "OCCUPIED", "simulated_server": "Vijay (Role Sim)", "order_time_elapsed": "14m", "data_tag": "SIMULATED DEMO DATA"},
    {"table_id": "R-03", "level": "Level 3: Rooftop", "seats": 2, "status": "AVAILABLE", "simulated_server": "Unassigned", "order_time_elapsed": "0m", "data_tag": "SIMULATED DEMO DATA"},
    {"table_id": "D-01", "level": "Level 2: Dance Floor", "seats": 8, "status": "RESERVED", "reserved_for": "Priya Sharma [FICTITIOUS GUEST NAME]", "arrival_eta": "15m", "data_tag": "SIMULATED DEMO DATA"},
    {"table_id": "D-02", "level": "Level 2: Dance Floor", "seats": 4, "status": "OCCUPIED", "simulated_server": "Vishwajeet (Role Sim)", "order_time_elapsed": "52m", "data_tag": "SIMULATED DEMO DATA"},
    {"table_id": "B-01", "level": "Level 1: Brewery Bar", "seats": 2, "status": "OCCUPIED", "simulated_server": "Suhag (Role Sim)", "order_time_elapsed": "22m", "data_tag": "SIMULATED DEMO DATA"},
    {"table_id": "B-02", "level": "Level 1: Brewery Bar", "seats": 4, "status": "AVAILABLE", "simulated_server": "Unassigned", "order_time_elapsed": "0m", "data_tag": "SIMULATED DEMO DATA"}
  ],
  "seed_taps": [
    {"tap_id": 1, "beer": "Signature Mango Cider", "simulated_abv": "4.8%", "simulated_ibu": 12, "level_pct": 84, "status": "OPTIMAL", "data_tag": "SIMULATED DEMO DATA"},
    {"tap_id": 2, "beer": "Crisp Apple Cider", "simulated_abv": "4.5%", "simulated_ibu": 10, "level_pct": 62, "status": "OPTIMAL", "data_tag": "SIMULATED DEMO DATA"},
    {"tap_id": 3, "beer": "Bavarian Hefeweizen", "simulated_abv": "5.2%", "simulated_ibu": 15, "level_pct": 31, "status": "WARNING", "data_tag": "SIMULATED DEMO DATA"},
    {"tap_id": 4, "beer": "Belgian Witbier", "simulated_abv": "4.9%", "simulated_ibu": 14, "level_pct": 90, "status": "OPTIMAL", "data_tag": "SIMULATED DEMO DATA"},
    {"tap_id": 5, "beer": "Dark Roasted Stout", "simulated_abv": "6.0%", "simulated_ibu": 32, "level_pct": 45, "status": "OPTIMAL", "data_tag": "SIMULATED DEMO DATA"},
    {"tap_id": 6, "beer": "Brooktoberfest IPA", "simulated_abv": "6.5%", "simulated_ibu": 48, "level_pct": 18, "status": "CRITICAL_LOW", "data_tag": "SIMULATED DEMO DATA"}
  ],
  "seed_crm_guests": [
    {
      "guest_id": "C-101",
      "name": "Arun Kumar [FICTITIOUS DEMO RECORD]",
      "phone": "+91 98450 00000 [DUMMY DEMO PHONE]",
      "tier": "The Mango Legend (VIP)",
      "visits": 14,
      "lifetime_spend": "₹34,500 [SIMULATED]",
      "favorite_beverage": "Mango Cider (Pitcher)",
      "notes": "Prefers Rooftop Table R-01; mock profile for VIP demonstration.",
      "data_tag": "SIMULATED DEMO DATA"
    },
    {
      "guest_id": "C-102",
      "name": "Neha Sundaram [FICTITIOUS DEMO RECORD]",
      "phone": "+91 97422 00000 [DUMMY DEMO PHONE]",
      "tier": "Brewmaster Crew",
      "visits": 6,
      "lifetime_spend": "₹16,200 [SIMULATED]",
      "favorite_beverage": "Belgian Witbier",
      "notes": "Corporate team organizer; mock profile for B2B demonstration.",
      "data_tag": "SIMULATED DEMO DATA"
    }
  ]
}
```\n