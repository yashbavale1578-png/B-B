import React from 'react';
import { useStore } from '../context/StoreContext';

interface StoryPageProps {
  onNavigate?: (tab: string) => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigate }) => {
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
            Heritage &amp; Brewhouse Alchemy
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              marginTop: '8px',
              marginBottom: '12px',
              color: 'var(--warm-cream)'
            }}
          >
            The Soul of Brooks &amp; Bonds
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '15px' }}>
            Rooted in the bustling heart of Koramangala 5th Block. How a multi-level industrial brewpub became synonymous with Bengaluru’s craft cider revolution.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '880px' }}>
        <div className="glass-panel-elevated" style={{ padding: '40px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--warm-cream)', marginBottom: '16px' }}>
            The Koramangala Taproom Genesis
          </h2>
          <p style={{ color: 'var(--champagne)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
            Established in 2016 on the vibrant 100 Feet Road corridor, Brooks &amp; Bonds was conceived to bridge two worlds: the unhurried precision of traditional European microbrewing and the electric, fast-moving social pulse of India’s Silicon Valley.
          </p>
          <p style={{ color: 'var(--champagne)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
            Where many establishments adopted sleek corporate designs, Brooks &amp; Bonds embraced industrial authenticity—reclaimed red brick walls, exposed ducting, high-ceiling brewing tanks, and open copper lines connecting fermentation vessels straight to our draft towers.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--hairline)'
            }}
          >
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                350+
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Simulated Guest Capacity</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                6 Draft Taps
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fresh Unfiltered Brews</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                3 Levels
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Brewhouse, Dance Floor, Rooftop</div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '36px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--warm-cream)', marginBottom: '14px' }}>
            The Cult of Mango Beer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.7, marginBottom: '16px' }}>
            Bengaluru loves craft beer, but our <strong>Signature Mango Cider</strong> became an organic sensation. Fermented with natural ripe Alphonso mango essence, it achieved cult acclaim across thousands of local patrons on Google Maps, Zomato, and Swiggy Dineout.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.7 }}>
            By pairing fruit-forward ciders with fiery regional bar delicacies like Mangalorean Ghee Roast and Andhra Chilli Chicken, Brooks &amp; Bonds established a distinct culinary identity unique to Bengaluru’s pub culture.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => handleNav('reservations')}
            className="btn btn-burgundy"
            style={{ padding: '14px 32px' }}
          >
            <span>Experience Brooks &amp; Bonds Tonight</span>
          </button>
        </div>
      </div>
    </div>
  );
};
