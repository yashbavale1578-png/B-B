import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { Order, UpiApp } from '../types';
import { DemoUpiPaymentModal, type DemoPaymentResult } from './DemoUpiPaymentModal';
import { ReceiptModal } from './ReceiptModal';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, ShieldCheck, Check, Smartphone } from 'lucide-react';

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOrderSuccess?: (orderId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onOrderSuccess }) => {
  const { 
    cart, 
    updateCartQty, 
    removeFromCart, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    placeOrder, 
    activeTableContext,
    isCartOpen,
    setIsCartOpen,
    setCurrentRoute
  } = useStore();

  const openState = isOpen !== undefined ? isOpen : isCartOpen;
  const handleClose = onClose || (() => setIsCartOpen(false));
  const handleSuccess = onOrderSuccess || ((id: string) => { setCurrentRoute('account'); });

  const [orderType, setOrderType] = useState<'DINE_IN_QR' | 'TAKEAWAY' | 'DELIVERY'>('DINE_IN_QR');
  const [couponInput, setCouponInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Cash'>('UPI');
  const [selectedUpiApp, setSelectedUpiApp] = useState<UpiApp>('PhonePe');
  const [addressInput, setAddressInput] = useState('Flat 402, Embassy Habitat, Koramangala');
  const [customerName, setCustomerName] = useState('Arun Kumar');
  const [phoneInput, setPhoneInput] = useState('+91 98450 00000');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo Payment and Receipt states
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discountPct) / 100 : 0;
  const gst = Math.round((subtotal - discount) * 0.05);
  const deliveryFee = orderType === 'DELIVERY' ? 60 : 0;
  const total = Math.round(subtotal - discount + gst + deliveryFee);

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;
    if (paymentMethod === 'UPI') {
      setShowUpiModal(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder({
        type: orderType,
        table_id: orderType === 'DINE_IN_QR' ? activeTableContext : undefined,
        customer_name: customerName,
        phone: phoneInput,
        delivery_address: orderType === 'DELIVERY' ? addressInput : undefined,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'Cash' ? 'PENDING' : 'PAID'
      });
      setIsSubmitting(false);
      setCompletedOrder(order);
      setShowReceiptModal(true);
      handleClose();
    }, 700);
  };

  const handleUpiSuccess = (result: DemoPaymentResult) => {
    const order = placeOrder({
      type: orderType,
      table_id: orderType === 'DINE_IN_QR' ? activeTableContext : undefined,
      customer_name: customerName,
      phone: phoneInput,
      delivery_address: orderType === 'DELIVERY' ? addressInput : undefined,
      payment_method: 'UPI',
      payment_app: result.paymentApp,
      payment_status: 'PAID',
      payment_transaction_id: result.transactionId,
      payment_timestamp: result.timestamp
    });
    setCompletedOrder(order);
  };

  const handleCloseUpiModal = () => {
    setShowUpiModal(false);
    if (completedOrder) {
      setShowReceiptModal(true);
      handleClose();
    }
  };

  if (!openState && !showReceiptModal && !showUpiModal) return null;

  if (!openState) {
    return (
      <>
        <DemoUpiPaymentModal
          isOpen={showUpiModal}
          onClose={handleCloseUpiModal}
          amount={total}
          orderId={completedOrder?.id}
          customerName={customerName}
          onPaymentSuccess={handleUpiSuccess}
        />
        <ReceiptModal
          isOpen={showReceiptModal}
          onClose={() => {
            setShowReceiptModal(false);
            if (completedOrder) {
              handleSuccess(completedOrder.id);
            }
          }}
          order={completedOrder}
          receipt={completedOrder?.receipt}
        />
      </>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)'
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Your Order Cart"
    >
      <div
        className="glass-panel-elevated"
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid var(--hairline-strong)',
          borderRadius: '0',
          background: 'rgba(21, 19, 21, 0.98)',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.85)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--hairline)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>
              Your Selection
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              Brooks &amp; Bonds Brewery · Koramangala
            </div>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--champagne)',
              cursor: 'pointer',
              padding: '6px'
            }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Order Mode Selector */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {[
              { id: 'DINE_IN_QR', label: `Table ${activeTableContext}` },
              { id: 'TAKEAWAY', label: 'Takeaway' },
              { id: 'DELIVERY', label: 'Delivery' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setOrderType(mode.id as any)}
                style={{
                  padding: '8px 4px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: orderType === mode.id ? 600 : 400,
                  cursor: 'pointer',
                  background: orderType === mode.id ? 'var(--burgundy)' : 'rgba(25, 23, 25, 0.6)',
                  color: orderType === mode.id ? 'var(--warm-cream)' : 'var(--text-muted)',
                  border: orderType === mode.id ? '1px solid var(--burgundy-bright)' : '1px solid var(--hairline)'
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {orderType === 'DELIVERY' && (
            <div style={{ marginTop: '12px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Delivery Address (Bengaluru Area)
              </label>
              <input
                className="input-control"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                style={{ fontSize: '12.5px', padding: '8px 12px', minHeight: '38px' }}
                placeholder="Enter street & apartment"
              />
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-dim)' }}>
              <div style={{ fontSize: '42px', marginBottom: '12px' }}>🍺</div>
              <div style={{ fontSize: '16px', color: 'var(--warm-cream)', marginBottom: '6px' }}>Your Cart is Empty</div>
              <div style={{ fontSize: '13px' }}>Explore our craft beers, fiery bar bites, and wood-fired pizzas.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cart.map((item) => (
                <div
                  key={item.menuItem.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(25, 23, 25, 0.6)',
                    border: '1px solid var(--hairline)'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--warm-cream)' }}>
                      {item.menuItem.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                      ₹{item.menuItem.price} each
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'rgba(0,0,0,0.4)',
                        borderRadius: '6px',
                        border: '1px solid var(--hairline)'
                      }}
                    >
                      <button
                        onClick={() => updateCartQty(item.menuItem.id, item.quantity - 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--warm-cream)',
                          padding: '6px 8px',
                          cursor: 'pointer'
                        }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        style={{
                          padding: '0 6px',
                          fontSize: '12.5px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.menuItem.id, item.quantity + 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--warm-cream)',
                          padding: '6px 8px',
                          cursor: 'pointer'
                        }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.menuItem.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-dim)',
                        cursor: 'pointer',
                        padding: '6px'
                      }}
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coupon Code Section */}
        {cart.length > 0 && (
          <div style={{ padding: '14px 24px', borderTop: '1px solid var(--hairline)', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                className="input-control"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Try MANGOVIP10 or BROOKS10"
                style={{ fontSize: '12px', minHeight: '38px', textTransform: 'uppercase' }}
              />
              <button
                onClick={() => {
                  if (couponInput) applyCoupon(couponInput);
                }}
                className="btn btn-outline"
                style={{ padding: '8px 14px', minHeight: '38px', fontSize: '11px' }}
              >
                Apply
              </button>
            </div>
            {appliedCoupon && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', fontSize: '11.5px', color: 'var(--gold)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Tag size={12} /> Code {appliedCoupon.code} applied ({appliedCoupon.discountPct}% off)
                </span>
                <button
                  onClick={removeCoupon}
                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '11px' }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pricing Breakdown & Checkout */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--hairline-strong)', background: 'rgba(25, 23, 25, 0.9)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold)' }}>
                  <span>VIP Discount</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>-₹{discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GST &amp; State Taxes (5%)</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₹{gst}</span>
              </div>
              {deliveryFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery Charge</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>₹{deliveryFee}</span>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--warm-cream)',
                  borderTop: '1px solid var(--hairline)',
                  paddingTop: '8px',
                  marginTop: '4px'
                }}
              >
                <span>Grand Total</span>
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>₹{total}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Payment Method
                </span>
                <span style={{ fontSize: '10px', color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  DEMO UPI GATEWAY
                </span>
              </div>

              {/* Main Mode Toggle: Demo UPI vs Others */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '6px', marginBottom: '10px' }}>
                <button
                  onClick={() => setPaymentMethod('UPI')}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: paymentMethod === 'UPI' ? 'rgba(84, 26, 43, 0.45)' : 'transparent',
                    color: paymentMethod === 'UPI' ? 'var(--gold)' : 'var(--text-muted)',
                    border: paymentMethod === 'UPI' ? '1.5px solid var(--gold)' : '1px solid var(--hairline)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Smartphone size={13} />
                  <span>Demo UPI</span>
                </button>

                {(['Card', 'Cash'] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      background: paymentMethod === method ? 'rgba(185, 154, 98, 0.2)' : 'transparent',
                      color: paymentMethod === method ? 'var(--gold)' : 'var(--text-muted)',
                      border: paymentMethod === method ? '1px solid var(--gold)' : '1px solid var(--hairline)'
                    }}
                  >
                    {method}
                  </button>
                ))}
              </div>

              {/* If UPI is selected, show PhonePe, Google Pay, Paytm quick selector */}
              {paymentMethod === 'UPI' && (
                <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.35)', border: '1px solid var(--hairline)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                    SELECT UPI APPLICATION:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                    {[
                      { id: 'PhonePe', label: 'PhonePe', color: '#5f259f' },
                      { id: 'Google Pay', label: 'Google Pay', color: '#1a73e8' },
                      { id: 'Paytm', label: 'Paytm', color: '#002970' }
                    ].map((app) => (
                      <button
                        key={app.id}
                        onClick={() => setSelectedUpiApp(app.id as UpiApp)}
                        style={{
                          padding: '6px 4px',
                          borderRadius: '6px',
                          fontSize: '10.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          background: selectedUpiApp === app.id ? `${app.color}44` : 'rgba(255,255,255,0.02)',
                          color: selectedUpiApp === app.id ? '#fff' : 'var(--text-muted)',
                          border: selectedUpiApp === app.id ? `1.5px solid ${app.color}` : '1px solid var(--hairline)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: app.color }} />
                        <span>{app.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              disabled={isSubmitting}
              onClick={handleCheckoutClick}
              className="btn btn-burgundy"
              style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 600 }}
            >
              {isSubmitting ? (
                <span>Transmitting Order...</span>
              ) : (
                <>
                  <span>
                    Pay ₹{total} via {paymentMethod === 'UPI' ? selectedUpiApp : paymentMethod}
                  </span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '10px', fontSize: '11px', color: 'var(--text-dim)' }}>
              <ShieldCheck size={12} color="var(--success)" />
              <span>Simulated demo checkout. Direct table &amp; KDS transmission.</span>
            </div>
          </div>
        )}
      </div>

      {/* Demo UPI Payment Modal */}
      <DemoUpiPaymentModal
        isOpen={showUpiModal}
        onClose={handleCloseUpiModal}
        amount={total}
        orderId={completedOrder?.id}
        customerName={customerName}
        onPaymentSuccess={handleUpiSuccess}
      />

      {/* Official Receipt Modal */}
      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => {
          setShowReceiptModal(false);
          if (completedOrder) {
            handleSuccess(completedOrder.id);
          }
        }}
        order={completedOrder}
        receipt={completedOrder?.receipt}
      />
    </div>
  );
};
