import React from 'react';
import { MapPin, Phone, Clock, Award, Shield, Globe, Share2, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { setCurrentRoute } = useStore();
  const handleNav = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    else setCurrentRoute(tab);
  };
  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, var(--noir) 0%, #0d0c0e 100%)',
        borderTop: '1px solid var(--hairline)',
        padding: '80px 0 36px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        {/* Top Pre-Footer Cinematic Invitation */}
        <div
          className="glass-panel-burgundy"
          style={{
            padding: '48px 40px',
            marginBottom: '64px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--gold)',
                textTransform: 'uppercase'
              }}
            >
              The Koramangala Craft Flagship
            </span>
            <h3
              style={{
                fontSize: '28px',
                marginTop: '8px',
                marginBottom: '10px',
                color: 'var(--warm-cream)'
              }}
            >
              Experience Bengaluru’s Iconic Mango Beer Live
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.6 }}>
              Three vertical levels of craft brewing, artisanal wood-fired dining, high-energy dance floors, and breezy open-air rooftop dining. Reserve direct to skip aggregator queues.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href="#/reservations"
              onClick={(e) => {
                e.preventDefault();
                handleNav('reservations');
              }}
              className="btn btn-gold"
              style={{ padding: '12px 28px' }}
            >
              Reserve Table Direct
            </a>
            <a
              href="#/order"
              onClick={(e) => {
                e.preventDefault();
                handleNav('order');
              }}
              className="btn btn-outline"
              style={{ padding: '12px 24px' }}
            >
              Order Online
            </a>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}
        >
          {/* Col 1: Brand & Verified Location */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--warm-cream)',
                marginBottom: '12px'
              }}
            >
              BROOKS &amp; BONDS
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: 1.6, marginBottom: '20px' }}>
              Microbrewery, Gastropub &amp; Nightlife Landmark established in Koramangala 5th Block. Famous for signature fruit ciders, fresh craft taps, and regional delicacies.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--champagne)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="var(--gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>4, 100 Feet Road, KHB Block, Koramangala 5th Block, Bengaluru, Karnataka 560095</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={15} color="var(--gold)" style={{ flexShrink: 0 }} />
                <a href="tel:+919739555576" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +91 97395 55576
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={15} color="var(--gold)" style={{ flexShrink: 0 }} />
                <span>12:00 PM – 01:00 AM Daily</span>
              </div>
            </div>
          </div>

          {/* Col 2: Public Navigation */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--gold)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '18px'
              }}
            >
              Guest Discovery
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              {[
                { id: 'menu', label: 'Craft Brews & Food Menu' },
                { id: 'order', label: 'Online Takeaway & Delivery' },
                { id: 'reservations', label: 'Direct Table Bookings' },
                { id: 'table-qr', label: 'Table QR Ordering' },
                { id: 'events', label: 'Corporate Outings & Parties' },
                { id: 'loyalty', label: 'The Mango Club Loyalty' },
                { id: 'promotions', label: 'Happy Hours & Seasonal IPAs' }
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#/${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.id);
                    }}
                    style={{
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      fontSize: 'inherit',
                      transition: 'color 0.2s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Authentication & Portals */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--gold)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '18px'
              }}
            >
              Access &amp; Demo Portals
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              {[
                { id: 'demo', label: '★ Demo Presentation Centre' },
                { id: 'login', label: 'Sign In & Authentication Hub' },
                { id: 'login/customer', label: 'Patron Access Portal' },
                { id: 'login/staff', label: 'Staff Terminal (KDS)' },
                { id: 'login/maintenance', label: 'Maintenance Console' },
                { id: 'account', label: 'Customer Account & Tracking' },
                { id: 'staff-portal', label: 'Staff Operations & Floor KDS' },
                { id: 'mgmt-portal', label: 'Management Executive Telemetry' },
                { id: 'maint-portal', label: 'Maintenance & RBAC Command' },
                { id: 'gallery', label: 'Atmospheric Photo Gallery' },
                { id: 'story', label: 'Brewing Heritage & Values' }
              ].map((portal) => (
                <li key={portal.id}>
                  <a
                    href={`#/${portal.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(portal.id);
                    }}
                    style={{
                      color: portal.id === 'demo' ? 'var(--gold)' : 'var(--text-muted)',
                      fontWeight: portal.id === 'demo' ? 600 : 400,
                      textDecoration: 'none',
                      cursor: 'pointer',
                      fontSize: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = portal.id === 'demo' ? 'var(--gold)' : 'var(--text-muted)')}
                  >
                    <span>{portal.label}</span>
                    <ArrowUpRight size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Accreditations & Social */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--gold)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '18px'
              }}
            >
              Verified Accolades
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="var(--gold)" />
                <span>4.2★ Rating (22,850+ Ratings)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} color="var(--gold)" />
                <span>Karnataka Commercial Microbrewery</span>
              </div>
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: '8px' }}>
                  CONNECT ON SOCIAL
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href="https://maps.app.goo.gl/m9Qen1YnZoU6BsDH9"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: 'rgba(25, 23, 25, 0.9)',
                      border: '1px solid var(--hairline)',
                      borderRadius: '8px',
                      padding: '8px',
                      color: 'var(--champagne)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                    aria-label="Google Maps Profile"
                  >
                    <MapPin size={16} />
                  </a>
                  <a
                    href="#social"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      background: 'rgba(25, 23, 25, 0.9)',
                      border: '1px solid var(--hairline)',
                      borderRadius: '8px',
                      padding: '8px',
                      color: 'var(--champagne)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                    aria-label="Instagram Profile"
                  >
                    <Globe size={16} />
                  </a>
                  <a
                    href="#social"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      background: 'rgba(25, 23, 25, 0.9)',
                      border: '1px solid var(--hairline)',
                      borderRadius: '8px',
                      padding: '8px',
                      color: 'var(--champagne)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                    aria-label="Facebook Profile"
                  >
                    <Share2 size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Grounded Simulation Notice */}
        <div
          style={{
            borderTop: '1px solid var(--hairline)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px',
            color: 'var(--text-dim)'
          }}
        >
          <div>
            &copy; 2026 Brooks &amp; Bonds Brewery. All rights reserved. 4, 100 Feet Road, Koramangala 5th Block, Bengaluru.
          </div>
          <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--font-mono)' }}>
            <span>Commercial Sales Prototype [SIMULATED DATA LAYER]</span>
            <span>·</span>
            <span>Zero-Alcohol to Minors Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
