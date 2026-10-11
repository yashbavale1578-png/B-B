import React from 'react';
import { useStore } from '../context/StoreContext';
import { Flame, Sparkles, Tag, Clock, ArrowRight, Copy } from 'lucide-react';

interface PromotionsPageProps {
  onNavigate?: (tab: string) => void;
}

export const PromotionsPage: React.FC<PromotionsPageProps> = ({ onNavigate }) => {
  const { applyCoupon, addToast } = useStore();

  const offers = [
    {
      code: "HAPPY40",
      title: "Midweek Craft Happy Hours",
      discount: "40% OFF CRAFT BEERS",
      timing: "Monday through Thursday All Day | Fri–Sun until 7:00 PM",
      description: "Enjoy 40% off all draft pints poured directly from our in-house microbrewery taps.",
      badge: "Verified Weekly Special"
    },
    {
      code: "BROOKTOBER20",
      title: "Brooktoberfest Harvest Special",
      discount: "20% OFF STEINS & PLATTERS",
      timing: "Seasonal Autumnal Tapline",
      description: "Celebrating our seasonal dry-hopped Brooktoberfest West Coast IPA paired with pub sausage & wings.",
      badge: "Limited Seasonal Batch"
    },
    {
      code: "MANGOVIP10",
      title: "The Mango Club VIP First Order",
      discount: "10% OFF TOTAL BILL",
      timing: "Exclusive Member Welcome",
      description: "Applies across all food and craft beers for registered guests. Earn 2x bonus Brew Points.",
      badge: "VIP Club Perk"
    }
  ];

  const handleCopyCode = (code: string) => {
    applyCoupon(code);
    addToast("Code Applied", `Coupon ${code} automatically applied to your cart!`, 'success');
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
            Direct Patron Privileges
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              marginTop: '8px',
              marginBottom: '12px',
              color: 'var(--warm-cream)'
            }}
          >
            Featured Offers &amp; Happy Hours
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '15px' }}>
            Exclusive direct booking offers and seasonal brewhouse promotions for our Bengaluru community.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '960px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {offers.map((offer) => (
            <div
              key={offer.code}
              className="glass-panel-elevated interactive-card"
              style={{
                padding: '32px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '24px'
              }}
            >
              <div style={{ maxWidth: '580px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-gold">{offer.badge}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {offer.timing}
                  </span>
                </div>
                <h2 style={{ fontSize: '22px', color: 'var(--warm-cream)', marginBottom: '6px' }}>
                  {offer.title}
                </h2>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  {offer.discount}
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {offer.description}
                </p>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px dashed var(--gold)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--champagne)',
                    letterSpacing: '0.1em'
                  }}
                >
                  {offer.code}
                </div>
                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className="btn btn-burgundy"
                  style={{ fontSize: '11.5px', padding: '8px 16px' }}
                >
                  <Copy size={13} />
                  <span>Apply to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
