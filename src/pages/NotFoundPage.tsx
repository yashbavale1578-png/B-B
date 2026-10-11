import React from 'react';
import { useStore } from '../context/StoreContext';
import { Beer, Home, Compass, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface NotFoundPageProps {
  requestedRoute?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ requestedRoute }) => {
  const { setCurrentRoute } = useStore();

  const publicRoutes = [
    { id: 'home', label: 'Taproom Home' },
    { id: 'menu', label: 'Brews & Gastropub Menu' },
    { id: 'order', label: 'Online Ordering & Takeaway' },
    { id: 'reservations', label: 'Direct Table Bookings' },
    { id: 'table-qr', label: 'In-Venue QR Dining' },
    { id: 'events', label: 'Corporate Outings & Functions' },
    { id: 'loyalty', label: 'The Mango Club VIP' },
    { id: 'promotions', label: 'Happy Hours & Seasonal IPAs' },
    { id: 'gallery', label: 'Venue Photo Gallery' },
    { id: 'story', label: 'Brewing Heritage & Values' },
    { id: 'contact', label: 'Location & Valet Access' },
    { id: 'account', label: 'Customer Account & Tracking' }
  ];

  const portalRoutes = [
    { id: 'staff-portal', label: 'Staff Operations & Kitchen KDS' },
    { id: 'mgmt-portal', label: 'Executive Management Telemetry' },
    { id: 'maint-portal', label: 'Maintenance & RBAC Command' }
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: '120px', minHeight: '100vh', paddingBottom: '96px' }}>
      <section style={{ padding: '40px 0 30px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          {/* Eyebrow badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(217, 4, 41, 0.15)',
              border: '1px solid rgba(217, 4, 41, 0.4)',
              marginBottom: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: '#fca5a5',
              textTransform: 'uppercase'
            }}
          >
            <ShieldAlert size={13} color="#fca5a5" />
            <span>404 · Barrel Tap Empty</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '0.04em',
              color: 'var(--warm-cream)',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            This Vintage Has Run Dry.
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: 'var(--champagne)',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              maxWidth: '620px',
              margin: '0 auto 24px'
            }}
          >
            The corridor or route{' '}
            <code
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--gold)',
                background: 'rgba(0,0,0,0.5)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontStyle: 'normal'
              }}
            >
              /{requestedRoute || 'unknown'}
            </code>{' '}
            does not exist in the Brooks &amp; Bonds cellar. Please choose from our verified routes below.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '56px' }}>
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                setCurrentRoute('home');
              }}
              className="btn btn-gold"
              style={{ padding: '12px 28px', fontSize: '12.5px' }}
            >
              <Home size={15} />
              <span>Return to Taproom Home</span>
            </a>
            <a
              href="#/menu"
              onClick={(e) => {
                e.preventDefault();
                setCurrentRoute('menu');
              }}
              className="btn btn-burgundy"
              style={{ padding: '12px 28px', fontSize: '12.5px' }}
            >
              <Beer size={15} />
              <span>Explore 6 Craft Taps</span>
            </a>
          </div>

          {/* Directory Grid */}
          <div
            className="glass-panel-elevated"
            style={{
              padding: '36px',
              textAlign: 'left'
            }}
          >
            <div style={{ marginBottom: '28px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--gold)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase'
                }}
              >
                Available Cellar Routes
              </span>
              <h2 style={{ fontSize: '20px', color: 'var(--warm-cream)', marginTop: '4px' }}>
                Complete Site Index
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
                marginBottom: '32px'
              }}
            >
              {publicRoutes.map((r) => (
                <a
                  key={r.id}
                  href={`#/${r.id === 'home' ? '' : r.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentRoute(r.id);
                  }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: 'rgba(25, 23, 25, 0.7)',
                    border: '1px solid var(--hairline)',
                    color: 'var(--champagne)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold)';
                    e.currentTarget.style.color = 'var(--warm-cream)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--hairline)';
                    e.currentTarget.style.color = 'var(--champagne)';
                  }}
                >
                  <span>{r.label}</span>
                  <ArrowRight size={13} color="var(--gold)" />
                </a>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '20px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                Operational Demonstration Portals
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {portalRoutes.map((p) => (
                  <a
                    key={p.id}
                    href={`#/${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentRoute(p.id);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      background: 'rgba(84, 26, 43, 0.3)',
                      border: '1px solid var(--burgundy-border)',
                      color: 'var(--warm-cream)',
                      textDecoration: 'none',
                      fontSize: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{p.label}</span>
                    <ArrowRight size={12} color="var(--gold)" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
