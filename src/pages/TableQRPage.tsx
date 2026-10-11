import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { VenueLevel, PaymentReceipt } from '../types';
import { DemoUpiPaymentModal, type DemoPaymentResult } from '../components/DemoUpiPaymentModal';
import { ReceiptModal } from '../components/ReceiptModal';
import { 
  QrCode, 
  Bell, 
  Droplet, 
  Receipt, 
  Users, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Split, 
  ShieldCheck,
  Smartphone
} from 'lucide-react';

interface TableQRPageProps {
  onNavigate?: (tab: string) => void;
  onOpenCart?: () => void;
}

export const TableQRPage: React.FC<TableQRPageProps> = ({ onNavigate, onOpenCart }) => {
  const { 
    tables, 
    orders, 
    activeTableContext, 
    setActiveTableContext, 
    callServer, 
    serverAlerts,
    menu,
    addToCart,
    setCurrentRoute,
    setIsCartOpen,
    settleTableBill
  } = useStore();

  const handleNav = onNavigate || ((tab: string) => setCurrentRoute(tab));
  const handleOpenCart = onOpenCart || (() => setIsCartOpen(true));

  const [splitCount, setSplitCount] = useState(2);
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [generatedReceipt, setGeneratedReceipt] = useState<PaymentReceipt | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const currentTable = tables.find((t) => t.table_id === activeTableContext) || tables[0];
  const tableOrders = orders.filter((o) => o.table_id === activeTableContext);

  const activeAlertsForTable = serverAlerts.filter((a) => a.table_id === activeTableContext);

  const handleServiceCall = (type: 'WATER' | 'SERVER' | 'BILL' | 'ASSISTANCE') => {
    callServer(activeTableContext, currentTable.level, type);
  };

  const handleUpiSuccess = (result: DemoPaymentResult) => {
    setShowUpiModal(false);
    settleTableBill(activeTableContext, {
      amount: result.amount,
      paymentApp: result.paymentApp,
      transactionId: result.transactionId
    });

    const receipt: PaymentReceipt = {
      transactionId: result.transactionId,
      orderId: `TAB-${activeTableContext}`,
      amount: result.amount,
      paymentMethod: 'UPI',
      paymentApp: result.paymentApp,
      paymentStatus: 'PAID',
      timestamp: result.timestamp,
      payerVpa: result.payerVpa,
      payeeVpa: result.payeeVpa
    };

    setGeneratedReceipt(receipt);
    setShowReceiptModal(true);
  };

  const billTotal = currentTable.current_bill_total || tableOrders.reduce((sum, o) => sum + o.total, 0);
  const splitAmount = Math.ceil(billTotal / splitCount);

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Table Context Banner */}
      <section style={{ padding: '30px 0 20px', textAlign: 'center' }}>
        <div className="container">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(84, 26, 43, 0.4)',
              border: '1px solid var(--burgundy-border)',
              marginBottom: '14px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--champagne)'
            }}
          >
            <QrCode size={13} color="var(--gold)" />
            <span>IN-VENUE CONTACTLESS DINING EXPERIENCE</span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--warm-cream)', marginBottom: '8px' }}>
            Table {currentTable.table_id} · {currentTable.level}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '580px', margin: '0 auto' }}>
            Assigned Server: <strong>{currentTable.simulated_server || 'Mathew (Lead)'}</strong> · Offline-resilient local cache active.
          </p>

          {/* Quick Table Switcher for Demonstration */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
              SIMULATE TABLE QR SCAN:
            </span>
            {['R-01', 'R-02', 'D-02', 'B-01'].map((tId) => (
              <button
                key={tId}
                onClick={() => setActiveTableContext(tId)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  background: activeTableContext === tId ? 'var(--gold)' : 'rgba(25, 23, 25, 0.8)',
                  color: activeTableContext === tId ? '#111' : 'var(--warm-cream)',
                  border: '1px solid var(--hairline)'
                }}
              >
                Table {tId}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Service Action Quick Bar */}
        <div
          className="glass-panel"
          style={{
            padding: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '32px'
          }}
        >
          <button
            onClick={() => handleServiceCall('WATER')}
            className="btn btn-outline"
            style={{ padding: '12px', fontSize: '12px' }}
          >
            <Droplet size={15} color="var(--info)" />
            <span>Water Refill</span>
          </button>

          <button
            onClick={() => handleServiceCall('SERVER')}
            className="btn btn-outline"
            style={{ padding: '12px', fontSize: '12px' }}
          >
            <Bell size={15} color="var(--gold)" />
            <span>Call Server</span>
          </button>

          <button
            onClick={() => setShowSplitModal(true)}
            className="btn btn-outline"
            style={{ padding: '12px', fontSize: '12px' }}
          >
            <Split size={15} color="var(--champagne)" />
            <span>Split Bill</span>
          </button>

          <button
            onClick={() => {
              setPaymentAmount(billTotal > 0 ? billTotal : 850);
              setShowUpiModal(true);
            }}
            className="btn btn-gold"
            style={{ padding: '12px', fontSize: '12px' }}
          >
            <Smartphone size={15} />
            <span>Pay Tab (Demo UPI)</span>
          </button>

          <button
            onClick={() => handleServiceCall('BILL')}
            className="btn btn-burgundy"
            style={{ padding: '12px', fontSize: '12px' }}
          >
            <Receipt size={15} />
            <span>Request Final Bill</span>
          </button>
        </div>

        {/* Active Staff Alert Notice if submitted */}
        {activeAlertsForTable.length > 0 && (
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '10px',
              background: 'rgba(185, 154, 98, 0.15)',
              border: '1px solid var(--gold)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '13px',
              color: 'var(--gold)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={16} />
              <span>
                Staff notified for: <strong>{activeAlertsForTable.map((a) => a.request_type).join(', ')}</strong>. Attendant en route.
              </span>
            </div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)' }}>LIVE</span>
          </div>
        )}

        {/* Active Orders at Table */}
        <div className="glass-panel-elevated" style={{ padding: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', color: 'var(--warm-cream)' }}>
              Active Kitchen &amp; Tap Status
            </h2>
            <button
              onClick={handleOpenCart}
              className="btn btn-gold"
              style={{ fontSize: '11.5px', padding: '6px 14px' }}
            >
              <Plus size={14} />
              <span>Order More Items</span>
            </button>
          </div>

          {tableOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-dim)' }}>
              <p style={{ marginBottom: '14px' }}>No active kitchen orders placed for Table {activeTableContext} yet.</p>
              <button onClick={() => handleNav('menu')} className="btn btn-burgundy" style={{ fontSize: '12px' }}>
                Browse Food &amp; Craft Beers
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {tableOrders.map((order) => {
                const isReceived = order.status === 'RECEIVED';
                const isPrep = order.status === 'PREPARING';
                const isReady = order.status === 'READY';
                const isServed = order.status === 'SERVED';

                return (
                  <div
                    key={order.id}
                    style={{
                      padding: '20px',
                      borderRadius: '10px',
                      background: 'rgba(25, 23, 25, 0.7)',
                      border: '1px solid var(--hairline)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: 'var(--gold)' }}>
                          ORDER #{order.id}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-dim)', marginLeft: '10px' }}>
                          Placed at {order.created_at}
                        </span>
                      </div>
                      <span className="badge badge-burgundy" style={{ fontSize: '11px' }}>
                        {order.status}
                      </span>
                    </div>

                    {/* Order Status Progress Pipeline */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '6px',
                        marginBottom: '18px',
                        textAlign: 'center',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {[
                        { label: '1. Received', active: true },
                        { label: '2. Preparing', active: isPrep || isReady || isServed },
                        { label: '3. Ready', active: isReady || isServed },
                        { label: '4. Served', active: isServed }
                      ].map((step, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '6px',
                            borderRadius: '4px',
                            background: step.active ? 'rgba(121, 45, 67, 0.4)' : 'rgba(0,0,0,0.3)',
                            color: step.active ? 'var(--warm-cream)' : 'var(--text-dim)',
                            border: `1px solid ${step.active ? 'var(--burgundy-bright)' : 'var(--hairline)'}`
                          }}
                        >
                          {step.label}
                        </div>
                      ))}
                    </div>

                    {/* Ordered Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: 'var(--champagne)' }}>
                      {order.items.map((it, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{it.quantity}x {it.menuItem.name}</span>
                          <span style={{ fontFamily: 'var(--font-mono)' }}>₹{it.menuItem.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        borderTop: '1px solid var(--hairline)',
                        paddingTop: '10px',
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 600,
                        fontSize: '14px'
                      }}
                    >
                      <span>Subtotal &amp; Taxes</span>
                      <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>₹{order.total}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bill Split Modal */}
        {showSplitModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 3000,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="glass-panel-elevated" style={{ maxWidth: '420px', width: '100%', padding: '28px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
                Split Table Bill
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>
                Total Tab: <strong>₹{billTotal}</strong> for Table {activeTableContext}
              </p>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', display: 'block', marginBottom: '8px' }}>
                  NUMBER OF DINERS: {splitCount}
                </label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={splitCount}
                  onChange={(e) => setSplitCount(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold)' }}
                />
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(185, 154, 98, 0.1)',
                  border: '1px solid var(--gold-glow)',
                  marginBottom: '24px'
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  EACH PERSON OWES
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  ₹{splitAmount}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Includes 5% GST &amp; Microbrewery VAT
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setShowSplitModal(false)}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '10px' }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowSplitModal(false);
                    setPaymentAmount(splitAmount);
                    setShowUpiModal(true);
                  }}
                  className="btn btn-burgundy"
                  style={{ flex: 1.2, padding: '10px' }}
                >
                  Pay My Share (₹{splitAmount})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Demo UPI Payment Modal */}
        <DemoUpiPaymentModal
          isOpen={showUpiModal}
          onClose={() => setShowUpiModal(false)}
          amount={paymentAmount}
          customerName={`Table ${activeTableContext} Diner`}
          onPaymentSuccess={handleUpiSuccess}
        />

        {/* Official Receipt Modal */}
        <ReceiptModal
          isOpen={showReceiptModal}
          onClose={() => setShowReceiptModal(false)}
          receipt={generatedReceipt}
        />
      </div>
    </div>
  );
};
