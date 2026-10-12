import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderStatus, TableStatus, UserRole } from '../types';
import type {
  BeerTap,
  MenuItem,
  VenueTable,
  Reservation,
  WaitlistParty,
  Order,
  CartItem,
  LoyaltyProfile,
  CorporateEnquiry,
  ServerAlert,
  AuditLogEntry,
  UserAccount,
  VenueLevel,
  AuthSession
} from '../types';
import {
  SEED_TAPS,
  SEED_MENU,
  SEED_TABLES,
  SEED_RESERVATIONS,
  SEED_WAITLIST,
  SEED_ORDERS,
  SEED_LOYALTY_PROFILES,
  SEED_USERS
} from '../data/seedData';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'alert';
}

import { VALID_ROUTES, parseRouteFromLocation } from '../utils/router';

interface StoreContextType {
  // Navigation & routing state
  currentRoute: string;
  isRouteValid: boolean;
  setCurrentRoute: (route: string) => void;
  navigate: (route: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Authentication & Session
  isAuthenticated: boolean;
  currentSession: AuthSession | null;
  currentUser: UserAccount;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  login: (role: UserRole, identifier: string, password: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  oneClickLogin: (role: UserRole) => void;
  logout: () => void;

  // Domain data
  taps: BeerTap[];
  menu: MenuItem[];
  menuItems: MenuItem[]; // alias
  tables: VenueTable[];
  reservations: Reservation[];
  waitlist: WaitlistParty[];
  orders: Order[];
  events: CorporateEnquiry[]; // alias
  corporateEnquiries: CorporateEnquiry[];
  loyaltyAccount: LoyaltyProfile; // active loyalty profile
  loyaltyProfiles: LoyaltyProfile[];
  serverAlerts: ServerAlert[];
  serverCalls: ServerAlert[]; // alias
  auditLogs: AuditLogEntry[];
  cart: CartItem[];
  appliedCoupon: { code: string; discountPct: number } | null;
  toasts: ToastItem[];
  activeTableContext: string;
  systemAlerts: { id: string; message: string; severity: 'INFO' | 'WARNING'; timestamp: string }[];

  // Actions
  addToCart: (item: MenuItem, quantity?: number, customization?: any) => void;
  updateCartQty: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  placeOrder: (orderPayload: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateTableStatus: (tableId: string, status: TableStatus) => void;
  createReservation: (data: Omit<Reservation, 'id' | 'status' | 'created_at'>) => Reservation;
  updateReservationStatus: (resId: string, status: Reservation['status']) => void;
  joinWaitlist: (customer_name: string, phone: string, party_size: number, target_level: VenueLevel) => WaitlistParty;
  seatWaitlistParty: (waitlistId: string, tableId: string) => void;
  seatWaitlistGuest: (waitlistId: string) => void;
  callServer: (table_id: string, level: VenueLevel, request_type: ServerAlert['request_type']) => void;
  resolveServerAlert: (alertId: string) => void;
  resolveServerCall: (alertId: string) => void; // alias
  updateMenuItemPrice: (itemId: string, newPrice: number) => void;
  toggleMenuItemAvailability: (itemId: string) => void;
  submitCorporateEnquiry: (enquiryData: Omit<CorporateEnquiry, 'id' | 'status' | 'created_at'>) => CorporateEnquiry;
  switchRole: (role: UserRole) => void;
  updateUserPermissions: (userId: string, permissions: string[]) => void;
  resetDemoData: () => void;
  simulateKegPour: (tapId: number, pctDelta?: number) => void;
  setActiveTableContext: (tableId: string) => void;
  settleTableBill: (tableId: string, paymentDetails: { amount: number; paymentApp: string; transactionId: string }) => void;
  addToast: (title: string, message?: string, type?: ToastItem['type']) => void;
  removeToast: (id: string) => void;
}

const STORAGE_KEY = 'bnb_state_v1';

const StoreContext = createContext<StoreContextType | null>(null);

const getStoredSession = (): AuthSession | null => {
  try {
    const saved = localStorage.getItem(`${STORAGE_KEY}_auth_session`);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const checkRouteAccess = (
  route: string,
  session?: AuthSession | null
): { allowed: boolean; redirect?: string; reason?: string } => {
  const active = session !== undefined ? session : getStoredSession();

  if (route === 'account') {
    if (!active) {
      return {
        allowed: false,
        redirect: 'login/customer',
        reason: 'Please sign in to view your patron account, orders, and receipts.'
      };
    }
    return { allowed: true };
  }

  if (route === 'staff-portal') {
    if (!active) {
      return {
        allowed: false,
        redirect: 'login/staff',
        reason: 'Staff authentication required to access Floor & Kitchen Display operations.'
      };
    }
    if (active.role === 'CUSTOMER') {
      return {
        allowed: false,
        redirect: 'login/staff',
        reason: 'Access Denied: Customer session active. Please sign in with Staff credentials to view KDS operations.'
      };
    }
    return { allowed: true };
  }

  if (route === 'mgmt-portal') {
    if (!active) {
      return {
        allowed: false,
        redirect: 'login/staff',
        reason: 'Executive Management authentication required.'
      };
    }
    if (active.role === 'CUSTOMER') {
      return {
        allowed: false,
        redirect: 'login/staff',
        reason: 'Access Denied: Executive Management authorization required.'
      };
    }
    return { allowed: true };
  }

  if (route === 'maint-portal') {
    if (!active) {
      return {
        allowed: false,
        redirect: 'login/maintenance',
        reason: 'Maintenance authentication required to access System Diagnostics.'
      };
    }
    if (active.role !== 'MAINTENANCE') {
      return {
        allowed: false,
        redirect: 'login/maintenance',
        reason: `Access Denied: ${active.role} session cannot access Root Maintenance Command.`
      };
    }
    return { allowed: true };
  }

  return { allowed: true };
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSession, setCurrentSession] = useState<AuthSession | null>(() => {
    return getStoredSession();
  });

  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    try {
      const saved = getStoredSession();
      if (saved?.user) return saved.user;
    } catch {}
    return {
      id: 'u-guest',
      name: 'Guest Patron',
      email: 'guest@koramangala.in',
      role: UserRole.CUSTOMER,
      permissions: ['view_menu', 'create_order']
    };
  });

  const initialInfo = parseRouteFromLocation();
  const initialGuard = checkRouteAccess(initialInfo.route, currentSession);
  const initialRoute = initialGuard.allowed ? initialInfo.route : (initialGuard.redirect || 'login');

  const [currentRoute, setCurrentRouteState] = useState<string>(initialRoute);
  const [isRouteValid, setIsRouteValid] = useState<boolean>(initialGuard.allowed ? initialInfo.isValid : true);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Sync initial hash if redirected
  useEffect(() => {
    if (!initialGuard.allowed && initialGuard.redirect) {
      window.location.hash = `/${initialGuard.redirect}`;
    }
  }, []);

  const navigate = (to: string, sessionOverride?: AuthSession | null) => {
    const clean = to.replace(/^#\/?/, '').replace(/^\//, '').trim() || 'home';
    const effectiveSession = sessionOverride !== undefined ? sessionOverride : getStoredSession();
    const guard = checkRouteAccess(clean, effectiveSession);
    const targetRoute = guard.allowed ? clean : (guard.redirect || 'login');

    if (!guard.allowed && guard.reason) {
      addToast('Authentication Required', guard.reason, 'alert');
    }

    const targetHash = targetRoute === 'home' ? '/' : `/${targetRoute}`;
    if (window.location.hash.replace(/^#\/?/, '') !== targetRoute) {
      window.location.hash = targetHash;
    }
    const valid = VALID_ROUTES.has(targetRoute);
    setCurrentRouteState(targetRoute);
    setIsRouteValid(valid);
    window.scrollTo(0, 0);
  };

  const setCurrentRoute = (route: string) => {
    navigate(route);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const { route, isValid } = parseRouteFromLocation();
      const effectiveSession = getStoredSession();
      const guard = checkRouteAccess(route, effectiveSession);
      if (!guard.allowed) {
        const redirectRoute = guard.redirect || 'login';
        if (guard.reason) {
          addToast('Authentication Required', guard.reason, 'alert');
        }
        window.location.hash = `/${redirectRoute}`;
        setCurrentRouteState(redirectRoute);
        setIsRouteValid(true);
      } else {
        setCurrentRouteState(route);
        setIsRouteValid(isValid);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Normalize seed data for seamless UI access
  const initialTaps: BeerTap[] = SEED_TAPS.map((t, idx) => ({
    ...t,
    id: `TAP-${t.tap_id}`,
    tapNumber: t.tap_id,
    beerName: t.name,
    currentLevelPct: t.level_pct,
    temperature: t.temp_c,
    pressurePsi: idx % 2 === 0 ? 14.5 : 15.2
  }));

  const initialTables: VenueTable[] = SEED_TABLES.map(t => {
    const levelStr = t.level || '';
    return {
      ...t,
      id: t.table_id,
      number: t.table_id,
      floor: levelStr.includes('Level 1') ? 1 : levelStr.includes('Level 2') ? 2 : 3,
      section: t.level || 'Level 1: Brewery Bar',
      capacity: t.seats
    };
  });

  const [taps, setTaps] = useState<BeerTap[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_taps`);
    return saved ? JSON.parse(saved) : initialTaps;
  });

  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_menu`);
    return saved ? JSON.parse(saved) : SEED_MENU.map(m => ({
      ...m,
      isVeg: m.dietary === 'veg' || m.dietary === 'vegan',
      isAvailable: m.available
    }));
  });

  const [tables, setTables] = useState<VenueTable[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tables`);
    return saved ? JSON.parse(saved) : initialTables;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_reservations`);
    return saved ? JSON.parse(saved) : SEED_RESERVATIONS.map(r => ({
      ...r,
      customerName: r.customer_name,
      partySize: r.party_size,
      tableNumber: r.table_id
    }));
  });

  const [waitlist, setWaitlist] = useState<WaitlistParty[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_waitlist`);
    return saved ? JSON.parse(saved) : SEED_WAITLIST.map(w => ({
      ...w,
      customerName: w.customer_name,
      partySize: w.party_size,
      estimatedWaitMins: w.wait_mins_estimated
    }));
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
    return saved ? JSON.parse(saved) : SEED_ORDERS.map(o => ({
      ...o,
      customerName: o.customer_name,
      tableNumber: o.table_id,
      createdAt: o.created_at
    }));
  });

  const [loyaltyProfiles, setLoyaltyProfiles] = useState<LoyaltyProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_loyalty`);
    return saved ? JSON.parse(saved) : SEED_LOYALTY_PROFILES.map(lp => ({
      ...lp,
      points: lp.points_balance,
      pintsPoured: lp.punch_card_stamps,
      memberSince: 'Oct 2023'
    }));
  });

  const [corporateEnquiries, setCorporateEnquiries] = useState<CorporateEnquiry[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_enquiries`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'CORP-801',
        companyName: 'Infosys Innovation Lab',
        contactName: 'Sneha Nair',
        email: 'sneha.n@infosys.com',
        phone: '+91 99001 23456',
        guestCount: 45,
        packageType: 'Gold Craft & Gourmet Dinner',
        date: '2026-10-24',
        estimatedBudget: 99000,
        notes: 'Private rooftop section requested for engineering offsite',
        eventType: 'Corporate Mixer',
        status: 'SUBMITTED',
        created_at: '2026-10-10'
      },
      {
        id: 'CORP-802',
        companyName: 'Swiggy Tech Org',
        contactName: 'Vikram Joshi',
        email: 'vikram.j@swiggy.in',
        phone: '+91 98860 54321',
        guestCount: 30,
        packageType: 'Silver Craft Beer Sampler',
        date: '2026-10-30',
        estimatedBudget: 54000,
        notes: 'Pint pouring demo requested from head brewer',
        eventType: 'Team Celebration',
        status: 'CONFIRMED',
        created_at: '2026-10-09'
      }
    ];
  });

  const [serverAlerts, setServerAlerts] = useState<ServerAlert[]>([
    {
      id: 'ALT-101',
      table_id: 'R-01',
      tableNumber: 'R-01',
      level: 'Level 3: Rooftop',
      type: 'SERVER',
      request_type: 'SERVER',
      timestamp: '19:42',
      createdAt: '19:42',
      resolved: false
    }
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'LOG-01',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: 'System Engine',
      action: 'BOOT_NOMINAL',
      details: 'Brooks & Bonds telemetry layer online',
      portal: UserRole.MAINTENANCE
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPct: number } | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activeTableContext, setActiveTableContext] = useState<string>('R-01');

  // Diagnostic system alerts
  const systemAlerts = [
    { id: 'SYS-1', message: 'Keg Sensor Tap #2 (Mango Cider) running high volume throughput', severity: 'INFO' as const, timestamp: '19:30' },
    { id: 'SYS-2', message: 'Rooftop level occupancy reached 82% threshold', severity: 'WARNING' as const, timestamp: '19:45' },
    { id: 'SYS-3', message: 'Kitchen Display response time averaging 14.2 minutes', severity: 'INFO' as const, timestamp: '19:50' }
  ];

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_taps`, JSON.stringify(taps));
  }, [taps]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_menu`, JSON.stringify(menu));
  }, [menu]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_tables`, JSON.stringify(tables));
  }, [tables]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_reservations`, JSON.stringify(reservations));
  }, [reservations]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_waitlist`, JSON.stringify(waitlist));
  }, [waitlist]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_loyalty`, JSON.stringify(loyaltyProfiles));
  }, [loyaltyProfiles]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_enquiries`, JSON.stringify(corporateEnquiries));
  }, [corporateEnquiries]);

  const addToast = (title: string, message: string = '', type: ToastItem['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAudit = (actor: string, action: string, details: string, portal: UserRole) => {
    const entry: AuditLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor,
      action,
      details,
      portal
    };
    setAuditLogs((prev) => [entry, ...prev.slice(0, 49)]);
  };

  // Cart operations
  const addToCart = (item: MenuItem, quantity: number = 1, customization?: any) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...prev, { menuItem: item, quantity, customization }];
    });
    addToast("Item Added", `${quantity}x ${item.name} added to your selection.`, 'success');
  };

  const updateCartQty = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.menuItem.id === itemId ? { ...ci, quantity } : ci))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (upper === 'MANGOVIP10' || upper === 'BROOKS10') {
      setAppliedCoupon({ code: upper, discountPct: 10 });
      addToast("Coupon Applied", "10% VIP Discount applied!", 'success');
      return true;
    } else if (upper === 'BROOKTOBER20' || upper === 'HAPPY40') {
      const pct = upper === 'HAPPY40' ? 40 : 20;
      setAppliedCoupon({ code: upper, discountPct: pct });
      addToast("Special Offer Applied", `${pct}% celebratory discount active!`, 'success');
      return true;
    }
    addToast("Invalid Code", "Please check your coupon code and try again.", 'alert');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Workflows
  // Workflows
  const placeOrder = (orderPayload: Partial<Order>): Order => {
    const orderItems = orderPayload.items && orderPayload.items.length > 0 ? orderPayload.items : [...cart];
    const subtotal = orderPayload.subtotal !== undefined
      ? orderPayload.subtotal
      : orderItems.reduce((acc, ci) => acc + ci.menuItem.price * ci.quantity, 0);
    const discount = orderPayload.discount !== undefined
      ? orderPayload.discount
      : (appliedCoupon ? (subtotal * appliedCoupon.discountPct) / 100 : 0);
    const gst_vat = orderPayload.gst_vat !== undefined
      ? orderPayload.gst_vat
      : Math.round((subtotal - discount) * 0.05);
    const delivery_fee = orderPayload.delivery_fee !== undefined
      ? orderPayload.delivery_fee
      : (orderPayload.type === 'DELIVERY' ? 60 : 0);
    const total = orderPayload.total !== undefined
      ? orderPayload.total
      : Math.round(subtotal - discount + gst_vat + delivery_fee);

    const now = new Date();
    const formattedTimestamp = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const orderId = orderPayload.id || `BB-${Math.floor(100 + Math.random() * 900)}`;
    const txnId = orderPayload.payment_transaction_id || `UPI-BB-${Date.now().toString().slice(-8)}`;
    const paymentMethod = orderPayload.payment_method || 'UPI';
    const paymentApp = orderPayload.payment_app || 'PhonePe';
    const paymentStatus = orderPayload.payment_status || 'PAID';

    const newOrder: Order = {
      id: orderId,
      type: orderPayload.type || 'DINE_IN_QR',
      table_id: orderPayload.table_id || activeTableContext,
      tableNumber: orderPayload.table_id || activeTableContext,
      customer_name: orderPayload.customer_name || currentUser.name || "Guest Patron",
      customerName: orderPayload.customer_name || currentUser.name || "Guest Patron",
      phone: orderPayload.phone || "+91 98450 00000",
      delivery_address: orderPayload.delivery_address,
      items: orderItems,
      subtotal,
      discount,
      gst_vat,
      delivery_fee,
      total,
      coupon_code: appliedCoupon?.code,
      status: OrderStatus.RECEIVED,
      payment_method: paymentMethod,
      payment_app: paymentApp,
      payment_status: paymentStatus,
      payment_transaction_id: txnId,
      payment_timestamp: formattedTimestamp,
      receipt: orderPayload.receipt || {
        transactionId: txnId,
        orderId: orderId,
        amount: total,
        paymentMethod: paymentMethod,
        paymentApp: paymentApp,
        paymentStatus: paymentStatus,
        timestamp: formattedTimestamp,
        payerVpa: (orderPayload.customer_name || 'patron').toLowerCase().replace(/[^a-z0-9]/g, '.') + '@okhdfcbank',
        payeeVpa: 'brooksnbonns@icici'
      },
      created_at: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimated_mins: 20
    };

    setOrders((prev) => [newOrder, ...prev]);

    // If table order, update table status & bill
    if (newOrder.type === 'DINE_IN_QR' && newOrder.table_id) {
      setTables((prev) =>
        prev.map((t) =>
          t.table_id === newOrder.table_id || t.id === newOrder.table_id
            ? {
                ...t,
                status: TableStatus.OCCUPIED,
                current_bill_total: (t.current_bill_total || 0) + newOrder.total,
                order_count: (t.order_count || 0) + 1,
                order_time_elapsed: t.order_time_elapsed === '0m' ? '5m' : t.order_time_elapsed
              }
            : t
        )
      );
    }

    // Award loyalty points (1 point per ₹20 spent)
    const pointsAwarded = Math.floor(newOrder.total / 20);
    setLoyaltyProfiles((prev) =>
      prev.map((lp) => {
        if (lp.phone === newOrder.phone || lp.guest_id === 'C-101') {
          return {
            ...lp,
            points: (lp.points || lp.points_balance || 0) + pointsAwarded,
            points_balance: (lp.points_balance || 0) + pointsAwarded,
            lifetime_spend: (lp.lifetime_spend || 0) + newOrder.total,
            punch_card_stamps: ((lp.punch_card_stamps || 0) + 1) % 8,
            pintsPoured: ((lp.pintsPoured || 0) + 1) % 8
          };
        }
        return lp;
      })
    );

    logAudit(
      newOrder.customerName || 'Customer',
      "Order Placed",
      `Order #${newOrder.id} for ₹${newOrder.total} paid via Demo UPI (${newOrder.payment_app || newOrder.payment_method}) [Txn: ${newOrder.payment_transaction_id}]`,
      UserRole.CUSTOMER
    );

    // If placed from active cart, clear the cart
    if (!orderPayload.items || orderPayload.items.length === 0) {
      clearCart();
    }

    addToast(
      "Order Transmitted",
      `Order #${newOrder.id} confirmed via ${newOrder.payment_app || 'UPI'}! KDS & floor staff alerted.`,
      'success'
    );

    return newOrder;
  };

  const settleTableBill = (tableId: string, paymentDetails: { amount: number; paymentApp: string; transactionId: string }) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.table_id === tableId || o.tableNumber === tableId
          ? {
              ...o,
              payment_status: 'PAID',
              payment_app: paymentDetails.paymentApp,
              payment_transaction_id: paymentDetails.transactionId
            }
          : o
      )
    );

    setTables((prev) =>
      prev.map((t) =>
        t.table_id === tableId || t.id === tableId
          ? {
              ...t,
              current_bill_total: 0
            }
          : t
      )
    );

    logAudit(
      `Table ${tableId}`,
      "Table Bill Settled",
      `Settled ₹${paymentDetails.amount} via Demo UPI (${paymentDetails.paymentApp}) · Txn ${paymentDetails.transactionId}`,
      UserRole.CUSTOMER
    );

    addToast(
      "Bill Settled",
      `Table ${tableId} bill of ₹${paymentDetails.amount} settled via ${paymentDetails.paymentApp}.`,
      'success'
    );
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    logAudit(currentUser.name, "Order Status Updated", `Order #${orderId} moved to ${status}`, UserRole.STAFF);
    addToast("Status Updated", `Order #${orderId} is now ${status}.`, 'info');
  };

  const updateTableStatus = (tableId: string, status: TableStatus) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId || t.table_id === tableId ? { ...t, status } : t
      )
    );
  };

  const createReservation = (data: Omit<Reservation, 'id' | 'status' | 'created_at'>): Reservation => {
    const newRes: Reservation = {
      ...data,
      id: `RES-${Math.floor(9800 + Math.random() * 200)}`,
      customerName: data.customer_name || (data as any).customerName,
      partySize: data.party_size || (data as any).partySize,
      status: 'CONFIRMED',
      created_at: new Date().toLocaleString()
    };

    setReservations((prev) => [newRes, ...prev]);

    if (newRes.table_id) {
      setTables((prev) =>
        prev.map((t) =>
          t.table_id === newRes.table_id || t.id === newRes.table_id
            ? { ...t, status: TableStatus.RESERVED, current_guest: newRes.customerName }
            : t
        )
      );
    }

    logAudit(
      newRes.customerName || 'Customer',
      "Reservation Confirmed",
      `${newRes.partySize} guests on ${newRes.date} at ${newRes.time}`,
      UserRole.CUSTOMER
    );

    addToast(
      "Table Confirmed",
      `Reservation confirmed for ${newRes.partySize} guests!`,
      'success'
    );

    return newRes;
  };

  const updateReservationStatus = (resId: string, status: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status } : r))
    );
  };

  const joinWaitlist = (
    customer_name: string,
    phone: string,
    party_size: number,
    target_level: VenueLevel
  ): WaitlistParty => {
    const newParty: WaitlistParty = {
      id: `W-${Math.floor(400 + Math.random() * 100)}`,
      customer_name,
      customerName: customer_name,
      phone,
      party_size,
      partySize: party_size,
      target_level,
      wait_mins_estimated: Math.floor(10 + Math.random() * 15),
      estimatedWaitMins: Math.floor(10 + Math.random() * 15),
      status: 'WAITING',
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setWaitlist((prev) => [...prev, newParty]);
    logAudit(customer_name, "Joined Waitlist", `Party of ${party_size} for ${target_level}`, UserRole.CUSTOMER);
    addToast("Added to Queue", `Queue token #${newParty.id}. We'll notify you on WhatsApp!`, 'info');
    return newParty;
  };

  const seatWaitlistParty = (waitlistId: string, tableId: string) => {
    const party = waitlist.find((w) => w.id === waitlistId);
    if (!party) return;

    setWaitlist((prev) => prev.filter((w) => w.id !== waitlistId));
    setTables((prev) =>
      prev.map((t) =>
        t.table_id === tableId || t.id === tableId
          ? {
              ...t,
              status: TableStatus.OCCUPIED,
              current_guest: party.customerName || party.customer_name,
              order_time_elapsed: '0m',
              current_bill_total: 0
            }
          : t
      )
    );

    addToast("Party Seated", `${party.customerName || party.customer_name} seated at ${tableId}.`, 'success');
  };

  const seatWaitlistGuest = (waitlistId: string) => {
    const openTable = tables.find(t => t.status === TableStatus.AVAILABLE);
    if (openTable) {
      seatWaitlistParty(waitlistId, openTable.id || openTable.table_id || 'T-101');
    } else {
      addToast("No Free Tables", "All tables occupied. Clear a table to seat guest.", 'alert');
    }
  };

  const callServer = (table_id: string, level: VenueLevel, request_type: ServerAlert['request_type']) => {
    const newAlert: ServerAlert = {
      id: `ALT-${Date.now()}`,
      table_id,
      tableNumber: table_id,
      level,
      type: request_type,
      request_type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      resolved: false
    };

    setServerAlerts((prev) => [newAlert, ...prev]);
    logAudit(`Table ${table_id}`, "Service Call", `${request_type} requested`, UserRole.CUSTOMER);
    addToast("Server Summoned", `Floor captain alerted for Table ${table_id}.`, 'info');
  };

  const resolveServerAlert = (alertId: string) => {
    setServerAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  const resolveServerCall = (alertId: string) => {
    resolveServerAlert(alertId);
  };

  const updateMenuItemPrice = (itemId: string, newPrice: number) => {
    setMenu((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, price: newPrice } : item))
    );
    const item = menu.find((i) => i.id === itemId);
    logAudit(currentUser.name, "Menu Price Updated", `${item?.name} price updated to ₹${newPrice}`, UserRole.MANAGEMENT);
    addToast("Price Updated", `Updated price for ${item?.name} to ₹${newPrice}.`, 'success');
  };

  const toggleMenuItemAvailability = (itemId: string) => {
    setMenu((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, available: !item.available, isAvailable: !item.isAvailable } : item))
    );
  };

  const submitCorporateEnquiry = (
    enquiryData: Omit<CorporateEnquiry, 'id' | 'status' | 'created_at'>
  ): CorporateEnquiry => {
    const newEnquiry: CorporateEnquiry = {
      ...enquiryData,
      id: `CORP-${Math.floor(100 + Math.random() * 900)}`,
      companyName: enquiryData.company_name || (enquiryData as any).companyName,
      contactName: enquiryData.contact_person || (enquiryData as any).contactName,
      guestCount: enquiryData.guest_count || (enquiryData as any).guestCount,
      estimatedBudget: enquiryData.estimated_grand_total || (enquiryData as any).estimatedBudget,
      status: 'SUBMITTED',
      created_at: new Date().toLocaleDateString()
    };
    setCorporateEnquiries((prev) => [newEnquiry, ...prev]);
    addToast("Corporate Quote Ready", `Proposal saved for ${newEnquiry.companyName}!`, 'success');
    return newEnquiry;
  };

  const login = async (
    role: UserRole,
    identifier: string,
    password: string,
    _remember: boolean = true
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPwd = password.trim();

    if (!cleanId) {
      return { success: false, error: 'Please enter your email or identifier.' };
    }
    if (!cleanPwd) {
      return { success: false, error: 'Please enter your password.' };
    }

    const matchedUser = SEED_USERS.find(
      (u) =>
        (u.email.toLowerCase() === cleanId ||
          u.employeeId?.toLowerCase() === cleanId ||
          u.phone?.toLowerCase() === cleanId ||
          u.id.toLowerCase() === cleanId) &&
        u.role === role
    ) || SEED_USERS.find((u) => u.role === role);

    if (!matchedUser) {
      return { success: false, error: `Account not found for role ${role}.` };
    }

    const expectedPwd = matchedUser.demoPassword || (role === 'CUSTOMER' ? 'customer123' : role === 'STAFF' ? 'staff123' : 'maint123');
    if (cleanPwd !== expectedPwd && cleanPwd !== 'demo' && cleanPwd !== 'admin') {
      return {
        success: false,
        error: `Invalid password. In this demo sandbox, use: "${expectedPwd}"`
      };
    }

    const newSession: AuthSession = {
      user: matchedUser,
      role: matchedUser.role,
      sessionToken: `tok_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDemoSession: true
    };

    setCurrentSession(newSession);
    setCurrentUser(matchedUser);
    localStorage.setItem(`${STORAGE_KEY}_auth_session`, JSON.stringify(newSession));

    logAudit(matchedUser.name, 'USER_LOGIN', `Signed in as ${matchedUser.role}`, matchedUser.role);
    addToast(`Welcome, ${matchedUser.name}`, `Active session: ${matchedUser.role}`, 'success');

    if (role === 'CUSTOMER') navigate('account', newSession);
    else if (role === 'STAFF') navigate('staff-portal', newSession);
    else if (role === 'MANAGEMENT') navigate('mgmt-portal', newSession);
    else if (role === 'MAINTENANCE') navigate('maint-portal', newSession);

    return { success: true };
  };

  const oneClickLogin = (role: UserRole) => {
    const matchedUser = SEED_USERS.find((u) => u.role === role) || SEED_USERS[0];
    const newSession: AuthSession = {
      user: matchedUser,
      role: matchedUser.role,
      sessionToken: `tok_demo_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDemoSession: true
    };

    setCurrentSession(newSession);
    setCurrentUser(matchedUser);
    localStorage.setItem(`${STORAGE_KEY}_auth_session`, JSON.stringify(newSession));

    logAudit(matchedUser.name, 'ONE_CLICK_LOGIN', `One-click demo sign in as ${role}`, role);
    addToast(`Signed In as ${matchedUser.name}`, `Active role: ${role}`, 'success');

    if (role === 'CUSTOMER') navigate('account', newSession);
    else if (role === 'STAFF') navigate('staff-portal', newSession);
    else if (role === 'MANAGEMENT') navigate('mgmt-portal', newSession);
    else if (role === 'MAINTENANCE') navigate('maint-portal', newSession);
  };

  const logout = () => {
    const prevUser = currentUser.name;
    const prevRole = currentUser.role;
    localStorage.removeItem(`${STORAGE_KEY}_auth_session`);
    setCurrentSession(null);
    setCurrentUser({
      id: 'u-guest',
      name: 'Guest Patron',
      email: 'guest@koramangala.in',
      role: UserRole.CUSTOMER,
      permissions: ['view_menu', 'create_order']
    });

    logAudit(prevUser, 'LOGOUT', `Terminated ${prevRole} session`, prevRole);
    addToast('Signed Out', 'You have been signed out of the session.', 'info');
    if (prevRole === 'CUSTOMER') navigate('login/customer', null);
    else if (prevRole === 'STAFF') navigate('login/staff', null);
    else if (prevRole === 'MAINTENANCE') navigate('login/maintenance', null);
    else navigate('login', null);
  };

  const switchRole = (role: UserRole) => {
    const user = SEED_USERS.find((u) => u.role === role) || {
      id: `u-${role.toLowerCase()}`,
      name: `${role} User`,
      email: `${role.toLowerCase()}@brooksbonds.in`,
      role,
      permissions: ['all']
    };
    const newSession: AuthSession = {
      user,
      role,
      sessionToken: `tok_switch_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDemoSession: true
    };
    setCurrentSession(newSession);
    setCurrentUser(user);
    localStorage.setItem(`${STORAGE_KEY}_auth_session`, JSON.stringify(newSession));
    logAudit("Security", "Role Switch", `Active portal profile switched to ${role}`, UserRole.MAINTENANCE);
    addToast("Portal Context Switched", `Active role is now ${role}.`, 'info');
  };

  const updateUserPermissions = (userId: string, permissions: string[]) => {
    if (currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, permissions }));
    }
  };

  const simulateKegPour = (tapId: number, pctDelta: number = 2) => {
    setTaps((prev) =>
      prev.map((tap) => {
        if (tap.tap_id === tapId || tap.tapNumber === tapId) {
          const nextLevel = Math.max(0, (tap.level_pct || tap.currentLevelPct || 100) - pctDelta);
          const status = nextLevel <= 20 ? 'CRITICAL_LOW' : nextLevel <= 35 ? 'WARNING' : 'OPTIMAL';
          return { ...tap, level_pct: nextLevel, currentLevelPct: nextLevel, status };
        }
        return tap;
      })
    );
  };

  const resetDemoData = () => {
    setTaps(initialTaps);
    setMenu(SEED_MENU.map(m => ({ ...m, isVeg: m.dietary === 'veg' || m.dietary === 'vegan', isAvailable: m.available })));
    setTables(initialTables);
    setReservations(SEED_RESERVATIONS.map(r => ({ ...r, customerName: r.customer_name, partySize: r.party_size, tableNumber: r.table_id })));
    setWaitlist(SEED_WAITLIST.map(w => ({ ...w, customerName: w.customer_name, partySize: w.party_size, estimatedWaitMins: w.wait_mins_estimated })));
    setOrders(SEED_ORDERS.map(o => ({ ...o, customerName: o.customer_name, tableNumber: o.table_id, createdAt: o.created_at })));
    setLoyaltyProfiles(SEED_LOYALTY_PROFILES.map(lp => ({ ...lp, points: lp.points_balance, pintsPoured: lp.punch_card_stamps, memberSince: 'Oct 2023' })));
    setCorporateEnquiries([]);
    setServerAlerts([]);
    localStorage.clear();
    setCurrentSession(null);
    setCurrentUser({
      id: 'u-guest',
      name: 'Guest Patron',
      email: 'guest@koramangala.in',
      role: UserRole.CUSTOMER,
      permissions: ['view_menu', 'create_order']
    });
    addToast("Data Reset", "Demo database restored to initial seed configuration.", 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        currentRoute,
        isRouteValid,
        setCurrentRoute,
        navigate,
        isCartOpen,
        setIsCartOpen,
        isAuthenticated: currentSession !== null,
        currentSession,
        currentUser,
        currentRole: currentUser.role,
        setCurrentRole: switchRole,
        login,
        oneClickLogin,
        logout,
        taps,
        menu,
        menuItems: menu,
        tables,
        reservations,
        waitlist,
        orders,
        events: corporateEnquiries,
        corporateEnquiries,
        loyaltyAccount: loyaltyProfiles[0],
        loyaltyProfiles,
        serverAlerts,
        serverCalls: serverAlerts,
        auditLogs,
        cart,
        appliedCoupon,
        toasts,
        activeTableContext,
        systemAlerts,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        placeOrder,
        updateOrderStatus,
        updateTableStatus,
        createReservation,
        updateReservationStatus,
        joinWaitlist,
        seatWaitlistParty,
        seatWaitlistGuest,
        callServer,
        resolveServerAlert,
        resolveServerCall,
        updateMenuItemPrice,
        toggleMenuItemAvailability,
        submitCorporateEnquiry,
        switchRole,
        updateUserPermissions,
        resetDemoData,
        simulateKegPour,
        setActiveTableContext,
        settleTableBill,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
};
