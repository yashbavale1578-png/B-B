export type DietaryType = 'veg' | 'non-veg' | 'vegan' | 'gluten-free';

export interface MenuItem {
  id: string;
  name: string;
  category: 'craft_beer' | 'starters' | 'wood_fired_pizza' | 'pastas_mains' | 'desserts' | 'cocktails' | string;
  price: number;
  description: string;
  dietary?: DietaryType;
  isVeg?: boolean;
  spiceLevel?: 0 | 1 | 2 | 3;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  beerPairing?: string;
  available?: boolean;
  isAvailable?: boolean;
  imageUrl?: string;
}

export interface BeerTap {
  id?: string;
  tap_id?: number;
  tapNumber?: number;
  name?: string;
  beerName?: string;
  style: string;
  abv: string | number;
  ibu: number;
  level_pct?: number; // 0 - 100
  currentLevelPct?: number;
  temp_c?: number;
  temperature?: number;
  pressurePsi?: number;
  tasting_notes?: string;
  food_pairing?: string;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL_LOW';
  batch_number?: string;
}

export type VenueLevel = 'Level 1: Brewery Bar' | 'Level 2: Dance Floor' | 'Level 3: Rooftop' | string;

export const TableStatus = {
  AVAILABLE: 'AVAILABLE',
  OCCUPIED: 'OCCUPIED',
  RESERVED: 'RESERVED'
} as const;
export type TableStatus = typeof TableStatus[keyof typeof TableStatus];

export interface VenueTable {
  id?: string;
  table_id?: string;
  number?: string | number;
  floor?: number;
  section?: string;
  capacity?: number;
  level?: VenueLevel;
  seats?: number;
  status: TableStatus | 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';
  simulated_server?: string;
  order_time_elapsed?: string;
  current_guest?: string;
  current_bill_total?: number;
  order_count?: number;
  currentReservationId?: string;
}

export interface Reservation {
  id: string;
  customer_name?: string;
  customerName?: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  party_size?: number;
  partySize?: number;
  floor?: number;
  level?: VenueLevel;
  table_id?: string;
  tableNumber?: string | number;
  occasion?: string;
  status: 'CONFIRMED' | 'SEATED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  created_at?: string;
}

export interface WaitlistParty {
  id: string;
  customer_name?: string;
  customerName?: string;
  phone: string;
  party_size?: number;
  partySize?: number;
  target_level?: VenueLevel;
  wait_mins_estimated?: number;
  estimatedWaitMins?: number;
  status: 'WAITING' | 'NOTIFIED' | 'SEATED' | 'CANCELLED';
  created_at?: string;
}

export interface OrderCustomization {
  chilliHeat?: 'Mild' | 'Spicy' | 'Fiery';
  preparation?: 'Regular' | 'Extra Crispy' | 'No Onion/Garlic';
  addons?: { name: string; price: number }[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customizations?: string;
  customization?: OrderCustomization;
  instructions?: string;
}

export type OrderType = 'DINE_IN_QR' | 'TAKEAWAY' | 'DELIVERY';

export const OrderStatus = {
  RECEIVED: 'RECEIVED',
  PREPARING: 'PREPARING',
  READY: 'READY',
  SERVED: 'SERVED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
} as const;
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export type UpiApp = 'PhonePe' | 'Google Pay' | 'Paytm';

export interface PaymentReceipt {
  transactionId: string;
  orderId: string;
  amount: number;
  paymentMethod: 'UPI' | 'Card' | 'Cash' | 'Corporate Account' | string;
  paymentApp?: UpiApp | string;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  timestamp: string;
  payerVpa?: string;
  payeeVpa?: string;
  failureReason?: string;
}

export interface Order {
  id: string;
  type: OrderType;
  table_id?: string;
  tableNumber?: string | number;
  customer_name?: string;
  customerName?: string;
  phone?: string;
  delivery_address?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  gst_vat?: number;
  delivery_fee?: number;
  total: number;
  coupon_code?: string;
  status: OrderStatus;
  payment_method?: 'UPI' | 'Card' | 'Cash' | 'Corporate Account' | string;
  payment_app?: UpiApp | string;
  payment_status?: 'PAID' | 'PENDING' | 'FAILED';
  payment_transaction_id?: string;
  payment_timestamp?: string;
  receipt?: PaymentReceipt;
  created_at?: string;
  createdAt?: string;
  estimated_mins?: number;
}

export type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'VIP' | 'The Mango Legend (VIP)';

export interface LoyaltyTransaction {
  id: string;
  date: string;
  description: string;
  points_delta: number;
  type: 'EARNED' | 'REDEEMED' | 'BONUS';
}

export interface LoyaltyProfile {
  guest_id?: string;
  name: string;
  phone: string;
  email?: string;
  tier: LoyaltyTier;
  points?: number;
  points_balance?: number;
  lifetime_spend?: number;
  total_visits?: number;
  punch_card_stamps?: number;
  pintsPoured?: number;
  memberSince?: string;
  favorite_beverage?: string;
  transactions?: LoyaltyTransaction[];
  notes?: string;
}

export interface CorporatePackage {
  tier_id: 'bronze' | 'silver' | 'gold_vip';
  name: string;
  price_per_head: number;
  duration_hours: number;
  beverages_included: string[];
  food_courses: string;
}

export interface CorporateEnquiry {
  id: string;
  companyName?: string;
  company_name?: string;
  contactName?: string;
  contact_person?: string;
  email: string;
  phone: string;
  guestCount?: number;
  guest_count?: number;
  packageType?: string;
  package_tier?: 'bronze' | 'silver' | 'gold_vip';
  date: string;
  estimatedBudget?: number;
  estimated_subtotal?: number;
  estimated_tax?: number;
  estimated_grand_total?: number;
  notes?: string;
  eventType?: string;
  status: 'SUBMITTED' | 'PROPOSAL_DOWNLOADED' | 'CONFIRMED';
  created_at?: string;
}

export const UserRole = {
  CUSTOMER: 'CUSTOMER',
  STAFF: 'STAFF',
  MANAGEMENT: 'MANAGEMENT',
  MAINTENANCE: 'MAINTENANCE'
} as const;
export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
  employeeId?: string;
  phone?: string;
  demoPassword?: string;
  title?: string;
  department?: string;
  avatarUrl?: string;
}

export interface AuthSession {
  user: UserAccount;
  role: UserRole;
  sessionToken: string;
  loginTime: string;
  expiresAt?: string;
  isDemoSession: boolean;
}

export interface ServerAlert {
  id: string;
  table_id?: string;
  tableNumber?: string | number;
  level?: VenueLevel;
  type?: string;
  request_type?: 'WATER' | 'SERVER' | 'BILL' | 'ASSISTANCE';
  timestamp?: string;
  createdAt?: string;
  resolved: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  portal: UserRole;
}
