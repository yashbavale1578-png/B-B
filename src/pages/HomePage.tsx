import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Beer, 
  Calendar, 
  ArrowRight, 
  Flame, 
  Award, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Layers, 
  ChevronRight,
  ShoppingBag,
  PartyPopper
} from 'lucide-react';

interface HomePageProps {
  onNavigate?: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { taps, menu, setCurrentRoute } = useStore();
  const handleNav = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    else setCurrentRoute(tab);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* 1. Cinematic Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 80px',
          overflow: 'hidden'
        }}
      >
        {/* Background Image with Dark Gradient Scrim */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/assets/venue-hero.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.38) contrast(1.1)',
            zIndex: 0
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(84, 26, 43, 0.28) 0%, rgba(17, 17, 17, 0.88) 75%, rgba(17, 17, 17, 1) 100%)',
            zIndex: 1
          }}
        />

        {/* Hero Narrative Stack - Gated to max 4 text elements per design-taste-frontend */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '920px',
            margin: '0 auto'
          }}
        >
          {/* 1. Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(25, 23, 25, 0.85)',
              border: '1px solid var(--gold-glow)',
              marginBottom: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: 'var(--gold)',
              textTransform: 'uppercase'
            }}
          >
            <Sparkles size={12} color="var(--gold)" />
            <span>Koramangala 5th Block · Bengaluru</span>
          </div>

          {/* 2. Headline */}
          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '0.04em',
              color: 'var(--warm-cream)',
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}
          >
            Crafted in Koramangala. <br />
            <span
              style={{
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--champagne) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Renowned for Mango Beer.
            </span>
          </h1>

          {/* 3. Subtext - concise < 20 words */}
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 19px)',
              color: 'var(--champagne)',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              maxWidth: '680px',
              margin: '0 auto 36px',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}
          >
            Three vertical levels of copper brew kettles, artisanal wood-fired fare, and breezy open-air rooftop dining.
          </p>

          {/* 4. CTAs (Primary + Secondary) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}
          >
            <a
              href="#/reservations"
              onClick={(e) => {
                e.preventDefault();
                handleNav('reservations');
              }}
              className="btn btn-burgundy"
              style={{ padding: '14px 34px', fontSize: '13px' }}
            >
              <Calendar size={16} />
              <span>Reserve a Table</span>
            </a>
            <a
              href="#/menu"
              onClick={(e) => {
                e.preventDefault();
                handleNav('menu');
              }}
              className="btn btn-gold"
              style={{ padding: '14px 32px', fontSize: '13px' }}
            >
              <Beer size={16} />
              <span>Explore 6 Craft Taps</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Verified Social Proof Bar */}
      <section
        style={{
          background: 'rgba(21, 19, 21, 0.95)',
          borderTop: '1px solid var(--hairline)',
          borderBottom: '1px solid var(--hairline)',
          padding: '24px 0'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Star size={20} color="var(--gold)" fill="var(--gold)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--warm-cream)' }}>
                4.1★ on Google Maps
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Over 12,023+ Verified Local Reviews
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={20} color="var(--gold)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--warm-cream)' }}>
                4.2★ on Zomato / District
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                22,851+ Diners Rated #1 Mango Cider
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flame size={20} color="var(--burgundy-bright)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--warm-cream)' }}>
                Happy Hours Midweek
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                40% Off Craft Beers Mon–Thu All Day
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive 6-Tap Brew Wall Preview */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--gold)',
                textTransform: 'uppercase'
              }}
            >
              Fresh From Our In-House Brewhouse
            </span>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                marginTop: '8px',
                marginBottom: '12px',
                color: 'var(--warm-cream)'
              }}
            >
              Live Brewery Taps &amp; Telemetry
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '620px', margin: '0 auto', fontSize: '14.5px' }}>
              Real-time temperature, carbonation, and keg level telemetry streamed directly from our ground-floor fermentation cellar.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}
          >
            {taps.map((tap) => {
              const isMango = tap.tap_id === 1;
              const isWarning = tap.status === 'WARNING';
              const isCritical = tap.status === 'CRITICAL_LOW';

              return (
                <div
                  key={tap.tap_id}
                  className={`glass-panel interactive-card ${isMango ? 'glass-panel-burgundy' : ''}`}
                  style={{
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* Tap Header & Status Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--gold)',
                          letterSpacing: '0.1em'
                        }}
                      >
                        TAP #{tap.tap_id} · {tap.style.toUpperCase()}
                      </span>
                      <span
                        className={`badge ${
                          isCritical
                            ? 'badge-critical'
                            : isWarning
                            ? 'badge-warning'
                            : 'badge-optimal'
                        }`}
                      >
                        {tap.level_pct}% KEG
                      </span>
                    </div>

                    <h3 style={{ fontSize: '20px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
                      {tap.name}
                    </h3>

                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                      {tap.tasting_notes}
                    </p>
                  </div>

                  <div>
                    {/* Live Gauge Progress Bar */}
                    <div style={{ marginBottom: '16px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-dim)',
                          marginBottom: '6px'
                        }}
                      >
                        <span>Keg Reservoir</span>
                        <span>{tap.level_pct}% Full ({tap.temp_c}°C)</span>
                      </div>
                      <div
                        style={{
                          height: '4px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${tap.level_pct}%`,
                            background: isCritical
                              ? 'var(--danger)'
                              : isWarning
                              ? 'var(--warning)'
                              : 'linear-gradient(90deg, var(--gold), var(--burgundy-bright))',
                            borderRadius: '2px'
                          }}
                        />
                      </div>
                    </div>

                    {/* Specs & Food Pairing */}
                    <div
                      style={{
                        padding: '12px',
                        background: 'rgba(0, 0, 0, 0.35)',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '11.5px',
                        border: '1px solid var(--hairline)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                        <span style={{ color: 'var(--champagne)' }}>ABV: <strong>{tap.abv}</strong></span>
                        <span style={{ color: 'var(--champagne)' }}>IBU: <strong>{tap.ibu}</strong></span>
                        <span style={{ color: 'var(--champagne)' }}>Batch: <strong>{tap.batch_number}</strong></span>
                      </div>
                      <div style={{ color: 'var(--gold)', fontSize: '11px' }}>
                        Pairing: {tap.food_pairing}
                      </div>
                    </div>

                    {/* Multi-page Navigation Actions */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <a
                        href="#/menu"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav('menu');
                        }}
                        className="btn btn-outline"
                        style={{ fontSize: '11px', padding: '8px 10px' }}
                      >
                        <span>View on Menu</span>
                      </a>
                      <a
                        href="#/order"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav('order');
                        }}
                        className="btn btn-burgundy"
                        style={{ fontSize: '11px', padding: '8px 10px' }}
                      >
                        <ShoppingBag size={12} />
                        <span>Order Pint</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href="#/menu"
              onClick={(e) => {
                e.preventDefault();
                handleNav('menu');
              }}
              className="btn btn-gold"
              style={{ padding: '12px 32px' }}
            >
              <Beer size={16} />
              <span>Browse Full Craft Tap List on Menu</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* 4. 3-Floor Venue Navigator (Asymmetric Layout) */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--charcoal) 0%, var(--noir) 100%)',
          padding: '96px 0',
          borderTop: '1px solid var(--hairline)'
        }}
      >
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase'
                }}
              >
                Three Vertical Experiences
              </span>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  marginTop: '8px',
                  marginBottom: '16px',
                  color: 'var(--warm-cream)'
                }}
              >
                The Architecture of Brooks &amp; Bonds
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
                Housed across three vertical stories on 100 Feet Road, Koramangala. Industrial brickwork, gleaming brass brew vessels, and an expansive open-air rooftop under the Bengaluru sky.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  {
                    level: 'Level 3: The Open-Air Rooftop',
                    desc: 'Alfresco dining, lush vertical plant walls, and evening breeze. Ideal for dates and group toasts.',
                    route: 'reservations'
                  },
                  {
                    level: 'Level 2: Mid-Tier Lounge & Dance Floor',
                    desc: 'High-energy weekend nightlife, live DJ console, and projector screens for live cricket & football.',
                    route: 'reservations'
                  },
                  {
                    level: 'Level 1: Ground Floor Craft Brewhouse',
                    desc: 'Conversational bar lounge wrapped around working copper brew tanks, tap towers, and cozy leather booths.',
                    route: 'reservations'
                  }
                ].map((floor, idx) => (
                  <a
                    key={idx}
                    href="#/reservations"
                    style={{
                      padding: '18px 20px',
                      borderRadius: '10px',
                      background: 'rgba(25, 23, 25, 0.7)',
                      border: '1px solid var(--hairline)',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      display: 'block'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(floor.route);
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--gold)' }}>
                        {floor.level}
                      </span>
                      <ChevronRight size={16} color="var(--gold)" />
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {floor.desc}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Asymmetric Imagery Stack */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div
                style={{
                  height: '320px',
                  borderRadius: '12px',
                  backgroundImage: `url('/assets/rooftop-terrace.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid var(--hairline-strong)',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              />
              <div
                style={{
                  height: '320px',
                  marginTop: '40px',
                  borderRadius: '12px',
                  backgroundImage: `url('/assets/brewery-tanks.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid var(--hairline-strong)',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Signature Gastropub Fare Preview */}
      <section className="section-padding">
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px',
              marginBottom: '48px'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase'
                }}
              >
                Culinary Craft
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginTop: '8px', color: 'var(--warm-cream)' }}>
                Signature Gastropub Creations
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="#/menu"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav('menu');
                }}
                className="btn btn-gold"
                style={{ fontSize: '12px' }}
              >
                <span>View Full 28-Item Menu</span>
                <ArrowRight size={14} />
              </a>
              <a
                href="#/order"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav('order');
                }}
                className="btn btn-outline"
                style={{ fontSize: '12px' }}
              >
                <ShoppingBag size={14} />
                <span>Start Online Order</span>
              </a>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {menu.filter((m) => m.isBestseller).slice(0, 4).map((dish) => (
              <div
                key={dish.id}
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
                        background: dish.dietary === 'veg' ? 'rgba(59, 178, 115, 0.2)' : 'rgba(217, 4, 41, 0.2)',
                        color: dish.dietary === 'veg' ? '#6ee7b7' : '#fca5a5',
                        border: `1px solid ${dish.dietary === 'veg' ? 'rgba(59, 178, 115, 0.4)' : 'rgba(217, 4, 41, 0.4)'}`
                      }}
                    >
                      {dish.dietary.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                      ₹{dish.price}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
                    {dish.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {dish.description}
                  </p>
                </div>

                <div>
                  {dish.beerPairing && (
                    <div style={{ fontSize: '11px', color: 'var(--gold)', marginBottom: '14px', fontFamily: 'var(--font-mono)' }}>
                      🍺 Suggested: {dish.beerPairing}
                    </div>
                  )}
                  <a
                    href="#/menu"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('menu');
                    }}
                    className="btn btn-outline"
                    style={{ width: '100%', fontSize: '11.5px', padding: '9px' }}
                  >
                    <span>View on Menu</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Corporate Outings & Private Events Teaser */}
      <section
        style={{
          background: 'rgba(21, 19, 21, 0.85)',
          borderTop: '1px solid var(--hairline)',
          borderBottom: '1px solid var(--hairline)',
          padding: '80px 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}
          >
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '14px' }}>
                Corporate &amp; Private Hire
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--warm-cream)', marginBottom: '16px' }}>
                Host Your Next Function at Brooks &amp; Bonds
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                From 20-person startup Friday mixers to 300-guest corporate milestones. Custom craft beer packages, dedicated bartender stations, and flexible floor plans across all three levels.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a
                  href="#/events"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('events');
                  }}
                  className="btn btn-gold"
                  style={{ padding: '12px 28px' }}
                >
                  <PartyPopper size={16} />
                  <span>Calculate Event Quotation</span>
                </a>
                <a
                  href="#/reservations"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('reservations');
                  }}
                  className="btn btn-outline"
                  style={{ padding: '12px 24px' }}
                >
                  Book Private Tables
                </a>
              </div>
            </div>

            <div
              style={{
                height: '320px',
                borderRadius: '16px',
                backgroundImage: `url('/assets/culinary-spread.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid var(--hairline-strong)',
                boxShadow: 'var(--shadow-subtle)'
              }}
            />
          </div>
        </div>
      </section>

      {/* 7. The Mango Club VIP Teaser Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, rgba(84, 26, 43, 0.6) 0%, rgba(25, 23, 25, 0.95) 100%)',
          borderBottom: '1px solid var(--burgundy-border)',
          padding: '80px 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}
          >
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '14px' }}>
                Exclusive Loyalty Ecosystem
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--warm-cream)', marginBottom: '16px' }}>
                Join "The Mango Club" VIP Society
              </h2>
              <p style={{ color: 'var(--champagne)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                Unlock digital punch cards, complimentary tasters on every visit, priority rooftop table concierge, and custom engraved ceramic mugs stored on-premise in the brewhouse.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a
                  href="#/loyalty"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('loyalty');
                  }}
                  className="btn btn-gold"
                  style={{ padding: '12px 28px' }}
                >
                  <span>Explore VIP Benefits</span>
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#/account"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('account');
                  }}
                  className="btn btn-outline"
                  style={{ padding: '12px 24px' }}
                >
                  View Digital Card
                </a>
              </div>
            </div>

            <div
              style={{
                height: '340px',
                borderRadius: '16px',
                backgroundImage: `url('/assets/mango-club-vip.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid var(--gold-glow)',
                boxShadow: 'var(--shadow-gold)'
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
