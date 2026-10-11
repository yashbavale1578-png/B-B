import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { MenuItem } from '../types';
import { ShoppingBag, Plus, Minus, Tag, ArrowRight, Check } from 'lucide-react';

interface OrderPageProps {
  onOpenCart?: () => void;
  onNavigate?: (tab: string) => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({ onOpenCart, onNavigate }) => {
  const { menu, addToCart, cart, appliedCoupon, applyCoupon, removeCoupon, setIsCartOpen } = useStore();
  const handleOpenCart = onOpenCart || (() => setIsCartOpen(true));
  const [selectedCat, setSelectedCat] = useState('craft_beer');
  const [couponCode, setCouponCode] = useState('');

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);

  const categories = [
    { id: 'craft_beer', label: 'Craft Brews' },
    { id: 'starters', label: 'Spicy Starters' },
    { id: 'wood_fired_pizza', label: 'Wood-Fired Pizzas' },
    { id: 'pastas_mains', label: 'Mains & Biryanis' },
    { id: 'desserts', label: 'Desserts' }
  ];

  const currentItems = menu.filter((m) => m.category === selectedCat);

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
            Direct Online Ordering
          </span>
          <h1
            style={{
              fontSize: 'clamp(30px, 4.5vw, 50px)',
              marginTop: '8px',
              marginBottom: '10px',
              color: 'var(--warm-cream)'
            }}
          >
            Order Fresh Pints &amp; Gastropub Fare
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '14.5px' }}>
            Fast dispatch from Koramangala 5th Block. Available for pickup takeaway or direct delivery across Bengaluru.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Category Pills & Cart Sticky Summary */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  background: selectedCat === c.id ? 'var(--burgundy)' : 'rgba(25, 23, 25, 0.7)',
                  color: selectedCat === c.id ? 'var(--warm-cream)' : 'var(--champagne)',
                  border: selectedCat === c.id ? '1px solid var(--burgundy-bright)' : '1px solid var(--hairline)'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleOpenCart}
            className="btn btn-gold"
            style={{ padding: '10px 20px', fontSize: '12px' }}
          >
            <ShoppingBag size={16} />
            <span>Review Cart ({cartCount} Items · ₹{cartSubtotal})</span>
          </button>
        </div>

        {/* Menu Items List */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}
        >
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel interactive-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      background: item.dietary === 'veg' ? 'rgba(59, 178, 115, 0.2)' : 'rgba(217, 4, 41, 0.2)',
                      color: item.dietary === 'veg' ? '#6ee7b7' : '#fca5a5'
                    }}
                  >
                    {item.dietary.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                    ₹{item.price}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                  {item.description}
                </p>
              </div>

              <div>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="btn btn-burgundy"
                  style={{ width: '100%', fontSize: '12px', padding: '10px' }}
                >
                  <Plus size={14} />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
