import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { MenuItem, DietaryType } from '../types';
import { Search, Beer, Flame, Plus, Check, ArrowRight } from 'lucide-react';

interface MenuPageProps {
  onNavigate?: (tab: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate }) => {
  const { menu, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'craft_beer', label: 'Fresh Craft Taps' },
    { id: 'starters', label: 'Spicy Bar Bites' },
    { id: 'wood_fired_pizza', label: 'Wood-Fired Pizzas' },
    { id: 'pastas_mains', label: 'Mains & Biryanis' },
    { id: 'desserts', label: 'Artisanal Desserts' }
  ];

  const filteredItems = menu.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDietary =
      dietaryFilter === 'all' ||
      item.dietary === dietaryFilter ||
      (dietaryFilter === 'veg' && (item.dietary === 'veg' || item.dietary === 'vegan'));
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDietary && matchesSearch;
  });

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px', minHeight: '100vh' }}>
      {/* Header Banner */}
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
            The Koramangala Craft Cellar
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              marginTop: '10px',
              marginBottom: '14px',
              color: 'var(--warm-cream)'
            }}
          >
            Brews &amp; Gastropub Cuisine
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '15px' }}>
            Unfiltered house craft ciders, Bavarian ales, regional South Indian bar bites, and wood-fired pizzas fermented for 48 hours.
          </p>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section style={{ padding: '10px 0 40px' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search
                size={18}
                color="var(--gold)"
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                className="input-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, craft ciders, spicy wings, pizzas..."
                style={{ paddingLeft: '44px' }}
              />
            </div>

            {/* Horizontal Category Nav */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '4px'
              }}
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      background: isActive ? 'var(--burgundy)' : 'rgba(25, 23, 25, 0.7)',
                      color: isActive ? 'var(--warm-cream)' : 'var(--champagne)',
                      border: isActive ? '1px solid var(--burgundy-bright)' : '1px solid var(--hairline)',
                      boxShadow: isActive ? '0 4px 14px rgba(121, 45, 67, 0.4)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Dietary Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginRight: '6px' }}>
                DIET:
              </span>
              {[
                { id: 'all', label: 'All' },
                { id: 'veg', label: 'Vegetarian' },
                { id: 'non-veg', label: 'Non-Vegetarian' },
                { id: 'vegan', label: 'Vegan Friendly' }
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setDietaryFilter(diet.id)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    background: dietaryFilter === diet.id ? 'rgba(185, 154, 98, 0.25)' : 'transparent',
                    color: dietaryFilter === diet.id ? 'var(--gold)' : 'var(--text-muted)',
                    border: dietaryFilter === diet.id ? '1px solid var(--gold)' : '1px solid var(--hairline)'
                  }}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Cards Grid */}
      <section style={{ paddingBottom: '96px' }}>
        <div className="container">
          {filteredItems.length === 0 ? (
            <div
              className="glass-panel"
              style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-dim)' }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🍽️</div>
              <div style={{ fontSize: '18px', color: 'var(--warm-cream)', marginBottom: '6px' }}>No Dishes Found</div>
              <div>Try adjusting your search criteria or dietary filter.</div>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px'
              }}
            >
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel interactive-card"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* Top Badges & Pricing */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 700,
                            fontFamily: 'var(--font-mono)',
                            background: item.dietary === 'veg' ? 'rgba(59, 178, 115, 0.2)' : 'rgba(217, 4, 41, 0.2)',
                            color: item.dietary === 'veg' ? '#6ee7b7' : '#fca5a5',
                            border: `1px solid ${item.dietary === 'veg' ? 'rgba(59, 178, 115, 0.4)' : 'rgba(217, 4, 41, 0.4)'}`
                          }}
                        >
                          {item.dietary.toUpperCase()}
                        </span>
                        {item.isBestseller && (
                          <span className="badge badge-gold" style={{ fontSize: '10px', padding: '2px 7px' }}>
                            Bestseller
                          </span>
                        )}
                        {item.isChefSpecial && (
                          <span className="badge badge-burgundy" style={{ fontSize: '10px', padding: '2px 7px' }}>
                            Chef Special
                          </span>
                        )}
                      </div>

                      <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                        ₹{item.price}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '18px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
                      {item.name}
                    </h3>

                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Beer Pairing recommendation */}
                    {item.beerPairing && (
                      <div
                        style={{
                          fontSize: '11px',
                          color: 'var(--gold)',
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(0,0,0,0.3)',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          marginBottom: '14px',
                          border: '1px solid var(--hairline)'
                        }}
                      >
                        🍺 Recommended Pour: {item.beerPairing}
                      </div>
                    )}

                    <button
                      onClick={() => addToCart(item, 1)}
                      className="btn btn-burgundy"
                      style={{ width: '100%', fontSize: '12px', padding: '10px' }}
                    >
                      <Plus size={15} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
