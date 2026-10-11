import React, { useState } from 'react';
import { Camera, X, Sparkles } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const galleryItems = [
    {
      title: "Brooks & Bonds at Twilight",
      caption: "3-level industrial gastropub architecture on 100 Feet Road, Koramangala.",
      src: "/assets/venue-hero.png",
      tag: "Venue Architecture",
      span: "col-span-2"
    },
    {
      title: "Signature Mango Cider",
      caption: "Cold-poured fresh craft cider with natural Alphonso mango essence and crisp effervescence.",
      src: "/assets/mango-beer.png",
      tag: "Craft Brews",
      span: "col-span-1"
    },
    {
      title: "Ground Floor Brew Cellar",
      caption: "Copper brew kettles, stainless steel fermenters, and draft tap towers.",
      src: "/assets/brewery-tanks.png",
      tag: "Brewhouse Infrastructure",
      span: "col-span-1"
    },
    {
      title: "Open-Air Rooftop Terrace",
      caption: "Level 3 alfresco dining with vertical living plant wall under the Bengaluru night sky.",
      src: "/assets/rooftop-terrace.png",
      tag: "Rooftop Ambience",
      span: "col-span-2"
    },
    {
      title: "Wood-Fired Pizza & Gastropub Feast",
      caption: "Andhra chilli chicken, slow-cooked ghee roast, and thin-crust artisan pizzas.",
      src: "/assets/culinary-spread.png",
      tag: "Culinary Highlights",
      span: "col-span-2"
    },
    {
      title: "The Mango Club VIP Mug",
      caption: "Handcrafted ceramic mug reserved for VIP mug club members in our brewhouse.",
      src: "/assets/mango-club-vip.png",
      tag: "VIP Membership",
      span: "col-span-1"
    }
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px', minHeight: '100vh', paddingBottom: '96px' }}>
      <section style={{ padding: '40px 0 30px', textAlign: 'center' }}>
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
            Atmospheric Visual Archive
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              marginTop: '8px',
              marginBottom: '12px',
              color: 'var(--warm-cream)'
            }}
          >
            The Brooks &amp; Bonds World
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '15px' }}>
            A visual journey through our copper brewing kettles, open-air garden rooftop, and lively Koramangala night atmosphere.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Asymmetric Editorial Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel interactive-card"
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => setActiveImage(item.src)}
            >
              <div
                style={{
                  height: '280px',
                  backgroundImage: `url('${item.src}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    background: 'rgba(17, 17, 17, 0.85)',
                    backdropFilter: 'blur(8px)',
                    fontSize: '10.5px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--gold)',
                    border: '1px solid var(--hairline)'
                  }}
                >
                  {item.tag}
                </span>
              </div>

              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '17px', color: 'var(--warm-cream)', marginBottom: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActiveImage(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(25, 23, 25, 0.8)',
              border: '1px solid var(--hairline)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>
          <img
            src={activeImage}
            alt="Enlarged gallery capture"
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
              border: '1px solid var(--hairline-strong)'
            }}
          />
        </div>
      )}
    </div>
  );
};
