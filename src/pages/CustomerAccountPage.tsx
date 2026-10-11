import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { Order } from '../types';
import { ReceiptModal } from '../components/ReceiptModal';
import { User, Calendar, ShoppingBag, Sparkles, MapPin, Clock, CheckCircle2, ChevronRight, Receipt } from 'lucide-react';

interface CustomerAccountPageProps {
  onNavigate?: (tab: string) => void;
}

export const CustomerAccountPage: React.FC<CustomerAccountPageProps> = ({ onNavigate }) => {
  const { currentUser, reservations, orders, loyaltyProfiles, setCurrentRoute } = useStore();
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  const handleNav = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    else setCurrentRoute(tab);
  };
  const profile = loyaltyProfiles[0];

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px', minHeight: '100vh', paddingBottom: '96px' }}>
      <section style={{ padding: '30px 0 20px', textAlign: 'center' }}>
        <div className="container">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: 'var(--gold)',
              textTransform: 'uppercase'
            }}
          >
            Portal 1: Customer Experience
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--warm-cream)', marginTop: '8px' }}>
            Patron Account &amp; Order Tracking
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14.5px' }}>
            Track active dining reservations, live kitchen tickets, and VIP Mango Club rewards.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Profile Header Card */}
        <div
          className="glass-panel-elevated"
          style={{
            padding: '28px',
            marginBottom: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--burgundy) 0%, var(--charcoal) 100%)',
                border: '1.5px solid var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--warm-cream)'
              }}
            >
              <User size={26} color="var(--gold)" />
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--warm-cream)' }}>
                {profile.name}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {profile.phone} · {profile.email}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span className="badge badge-gold" style={{ fontSize: '12px', padding: '6px 14px' }}>
              <Sparkles size={12} /> {profile.tier}
            </span>
            <button
              onClick={() => handleNav('loyalty')}
              className="btn btn-outline"
              style={{ fontSize: '11.5px', padding: '8px 16px' }}
            >
              The Mango Club Pass
            </button>
          </div>
        </div>

        {/* Active Reservations */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="var(--gold)" />
              <h2 style={{ fontSize: '18px', color: 'var(--warm-cream)' }}>
                Your Table Bookings
              </h2>
            </div>
            <button
              onClick={() => handleNav('reservations')}
              className="btn btn-gold"
              style={{ fontSize: '11px', padding: '6px 14px' }}
            >
              Book New Table
            </button>
          </div>

          {reservations.length === 0 ? (
            <p style={{ color: 'var(--text-dim)', fontSize: '13px' }}>No bookings found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {reservations.map((res) => (
                <div
                  key={res.id}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    background: 'rgba(25, 23, 25, 0.7)',
                    border: '1px solid var(--hairline)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gold)', fontSize: '13px' }}>
                        #{res.id}
                      </span>
                      <span className="badge badge-optimal" style={{ fontSize: '10px' }}>
                        {res.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--warm-cream)' }}>
                      {res.party_size} Guests · {res.level} {res.table_id ? `(Table ${res.table_id})` : ''}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Date: {res.date} at {res.time} · {res.occasion || 'Dining'}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-dim)' }}>
                    <div>Instant Hold Active</div>
                    <div style={{ color: 'var(--gold)' }}>WhatsApp Verified</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Orders & Kitchen Status */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={18} color="var(--gold)" />
              <h2 style={{ fontSize: '18px', color: 'var(--warm-cream)' }}>
                Orders &amp; Kitchen Tracking
              </h2>
            </div>
            <button
              onClick={() => handleNav('order')}
              className="btn btn-outline"
              style={{ fontSize: '11px', padding: '6px 14px' }}
            >
              Order Online
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map((ord) => (
              <div
                key={ord.id}
                style={{
                  padding: '18px',
                  borderRadius: '10px',
                  background: 'rgba(25, 23, 25, 0.7)',
                  border: '1px solid var(--hairline)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gold)', fontSize: '14px' }}>
                      ORDER #{ord.id}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-dim)', marginLeft: '10px' }}>
                      {ord.type} {ord.table_id ? `· Table ${ord.table_id}` : ''} ({ord.created_at})
                    </span>
                  </div>
                  <span className="badge badge-burgundy" style={{ fontSize: '11px' }}>
                    {ord.status}
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: 'var(--champagne)', marginBottom: '12px' }}>
                  {ord.items.map((it) => `${it.quantity}x ${it.menuItem.name}`).join(', ')}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--hairline)', paddingTop: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Payment: <strong>{ord.payment_app ? `Demo UPI (${ord.payment_app})` : (ord.payment_method || 'UPI')}</strong> · <span style={{ color: ord.payment_status === 'PAID' ? '#10B981' : '#F59E0B', fontWeight: 600 }}>{ord.payment_status || 'PAID'}</span>
                    </div>
                    {ord.payment_transaction_id && (
                      <div style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginTop: '2px' }}>
                        Txn: {ord.payment_transaction_id}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => setSelectedReceiptOrder(ord)}
                      className="btn btn-outline"
                      style={{ padding: '6px 12px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <Receipt size={13} color="var(--gold)" />
                      <span>View Receipt</span>
                    </button>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                      ₹{ord.total}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Receipt Modal */}
      <ReceiptModal
        isOpen={!!selectedReceiptOrder}
        onClose={() => setSelectedReceiptOrder(null)}
        order={selectedReceiptOrder}
      />
    </div>
  );
};
