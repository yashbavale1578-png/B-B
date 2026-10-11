import React from 'react';
import { MapPin, Phone, Clock, Car, Accessibility, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ContactPageProps {
  onNavigate?: (tab: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { setCurrentRoute } = useStore();
  const handleNav = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    else setCurrentRoute(tab);
  };
  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px', minHeight: '100vh', paddingBottom: '96px' }}>
      <section style={{ padding: '40px 0 20px', textAlign: 'center' }}>
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
            Location &amp; Access
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              marginTop: '8px',
              marginBottom: '12px',
              color: 'var(--warm-cream)'
            }}
          >
            Find Us in Koramangala
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '15px' }}>
            Prominently located on the 100 Feet Road retail corridor, Koramangala 5th Block, Bengaluru. Valet parking provided at the front entrance.
          </p>
        </div>
      </section>

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px',
            alignItems: 'start'
          }}
        >
          {/* Contact Details Card */}
          <div className="glass-panel-elevated" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '22px', color: 'var(--warm-cream)', marginBottom: '24px' }}>
              Venue Coordinates
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <MapPin size={22} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: '2px' }}>
                    PHYSICAL LOCATION
                  </div>
                  <div style={{ fontSize: '15px', color: 'var(--warm-cream)', fontWeight: 600, lineHeight: 1.4 }}>
                    4, 100 Feet Road, KHB Block, Koramangala 5th Block, Bengaluru, Karnataka 560095
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Opposite prominent 100 Feet Road retail corridor
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <Phone size={22} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: '2px' }}>
                    TELEPHONE &amp; RESERVATIONS
                  </div>
                  <a
                    href="tel:+919739555576"
                    style={{ fontSize: '17px', color: 'var(--gold)', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
                  >
                    +91 97395 55576
                  </a>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Lines active from 11:30 AM to 12:30 AM daily
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <Clock size={22} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: '2px' }}>
                    OPERATING HOURS
                  </div>
                  <div style={{ fontSize: '15px', color: 'var(--warm-cream)', fontWeight: 600 }}>
                    12:00 PM – 01:00 AM
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Monday through Sunday (All 7 Days)
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
              <a
                href="https://maps.app.goo.gl/m9Qen1YnZoU6BsDH9"
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold"
                style={{ flex: 1, padding: '12px', textDecoration: 'none' }}
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={14} />
              </a>
              <button
                onClick={() => handleNav('reservations')}
                className="btn btn-burgundy"
                style={{ flex: 1, padding: '12px' }}
              >
                <span>Reserve Table</span>
              </button>
            </div>
          </div>

          {/* Guest Policies & Amenities */}
          <div className="glass-panel" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '22px', color: 'var(--warm-cream)', marginBottom: '20px' }}>
              Guest Amenities &amp; Policies
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <Car size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--warm-cream)', marginBottom: '2px' }}>
                    Complimentary Valet Parking
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Dedicated valet attendants stationed at the main portico on 100 Feet Road.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <Accessibility size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--warm-cream)', marginBottom: '2px' }}>
                    Wheelchair Accessible
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Ground-floor entrance ramp and designated ground-floor accessible restrooms available.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <ShieldCheck size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--warm-cream)', marginBottom: '2px' }}>
                    Stag-Friendly Hospitality Policy
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Welcoming stag patrons across all three floors, setting Brooks &amp; Bonds apart from restrictive Koramangala clubs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
