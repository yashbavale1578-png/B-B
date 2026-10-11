import React from 'react';
import { useStore } from '../context/StoreContext';
import { QrCode, Gift, Sparkles, History } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoyaltyPageProps {
  onNavigate?: (tab: string) => void;
}

export const LoyaltyPage: React.FC<LoyaltyPageProps> = ({ onNavigate }) => {
  const { loyaltyProfiles, addToast, setCurrentRoute } = useStore();
  const profile = loyaltyProfiles[0]; // Active demo VIP member: Arun Kumar
  const pointsBalance = profile?.points_balance ?? 0;
  const lifetimeSpend = profile?.lifetime_spend ?? 0;
  const punchCardStamps = profile?.punch_card_stamps ?? 0;
  const transactions = profile?.transactions ?? [];

  const handleNav = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    else setCurrentRoute(tab);
  };

  const handleRedeemReward = (rewardName: string, pointsCost: number) => {
    if (pointsBalance < pointsCost) {
      addToast("Insufficient Points", `You need ${pointsCost} points to redeem this reward.`, 'alert');
      return;
    }
    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B99A62', '#541A2B', '#E8DCC5', '#792D43']
    });
    addToast("Reward Redeemed!", `Voucher for "${rewardName}" generated! Show QR to floor staff.`, 'success');
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
            The Mug Club &amp; Cult Membership
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              marginTop: '8px',
              marginBottom: '12px',
              color: 'var(--warm-cream)'
            }}
          >
            The Mango Club VIP Society
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '15px' }}>
            Bengaluru’s most exclusive craft beer loyalty fellowship. Earn Brew Points on every pour, punch your digital card for free pizzas, and claim your engraved ceramic mug.
          </p>
        </div>
      </section>

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px',
            alignItems: 'start',
            marginBottom: '48px'
          }}
        >
          {/* Digital VIP Membership Pass */}
          <div
            className="glass-panel-burgundy"
            style={{
              padding: '36px',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-gold)'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(185, 154, 98, 0.25) 0%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
              <div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', color: 'var(--gold)' }}>
                  MEMBERSHIP PASS
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: 'var(--warm-cream)' }}>
                  THE MANGO CLUB
                </div>
              </div>
              <span className="badge badge-gold" style={{ fontSize: '11px', padding: '4px 10px' }}>
                <Sparkles size={11} /> {profile.tier}
              </span>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                PATRON NAME
              </div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--warm-cream)' }}>
                {profile.name}
              </div>
              <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--champagne)' }}>
                ID: {profile.guest_id} · {profile.phone}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--hairline)',
                marginBottom: '24px'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  AVAILABLE BREW POINTS
                </div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  {pointsBalance}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  LIFETIME SPEND
                </div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--warm-cream)', fontFamily: 'var(--font-mono)' }}>
                  ₹{lifetimeSpend.toLocaleString()}
                </div>
              </div>
            </div>

            {/* QR Code Scan Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(25, 23, 25, 0.9)',
                borderRadius: '10px',
                border: '1px solid var(--hairline)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <QrCode size={24} color="var(--gold)" />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Scan at Brewery Bar to Earn</span>
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--champagne)' }}>
                ACTIVE PASS
              </span>
            </div>
          </div>

          {/* Interactive Punch Card & Milestones */}
          <div className="glass-panel-elevated" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '20px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
              Digital Craft Pint Punch Card
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Order 8 craft pints across visits to unlock a complimentary Wood-Fired Margherita or Pepperoni Pizza!
            </p>

            {/* 8-Slot Punch Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                marginBottom: '28px'
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((slot) => {
                const isStamped = slot <= punchCardStamps;
                const isFinal = slot === 8;

                return (
                  <div
                    key={slot}
                    style={{
                      height: '74px',
                      borderRadius: '10px',
                      background: isStamped ? 'rgba(84, 26, 43, 0.5)' : 'rgba(0,0,0,0.3)',
                      border: isStamped ? '1.5px solid var(--gold)' : '1px dashed var(--hairline)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isStamped ? (
                      <span style={{ fontSize: '24px' }}>🍺</span>
                    ) : isFinal ? (
                      <span style={{ fontSize: '20px' }}>🍕</span>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                        #{slot}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: '9px',
                        fontFamily: 'var(--font-mono)',
                        color: isStamped ? 'var(--gold)' : 'var(--text-dim)',
                        marginTop: '4px'
                      }}
                    >
                      {isStamped ? 'STAMPED' : isFinal ? 'FREE PIZZA' : 'POUR'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                padding: '16px',
                borderRadius: '10px',
                background: 'rgba(25, 23, 25, 0.8)',
                border: '1px solid var(--hairline)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--warm-cream)' }}>
                  {8 - punchCardStamps} More Pints to Reward
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Current streak: {punchCardStamps} / 8 completed
                </div>
              </div>
              <button
                onClick={() => handleNav('order')}
                className="btn btn-gold"
                style={{ fontSize: '11.5px', padding: '6px 14px' }}
              >
                Order Pint
              </button>
            </div>
          </div>
        </div>

        {/* Redeemable Rewards Catalogue */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--warm-cream)', marginBottom: '20px' }}>
            Redeemable VIP Rewards
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {[
              {
                id: 'RWD-1',
                title: 'Complimentary Craft Beer Flight',
                cost: 400,
                desc: 'Four 150ml taster glasses of any available craft taps including seasonal IPAs.'
              },
              {
                id: 'RWD-2',
                title: 'Wood-Fired Pizza of Choice',
                cost: 650,
                desc: 'Any 11-inch thin crust pizza from our wood-fired oven counter.'
              },
              {
                id: 'RWD-3',
                title: 'Engraved Ceramic Mug & Pitcher',
                cost: 1200,
                desc: 'Bespoke Mango Club ceramic mug permanently stored in brewhouse + 1.5L pitcher.'
              }
            ].map((reward) => (
              <div
                key={reward.id}
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
                    <Gift size={20} color="var(--gold)" />
                    <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                      {reward.cost} Pts
                    </span>
                  </div>
                  <h3 style={{ fontSize: '17px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
                    {reward.title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                    {reward.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleRedeemReward(reward.title, reward.cost)}
                  className="btn btn-burgundy"
                  style={{ width: '100%', fontSize: '12px', padding: '10px' }}
                >
                  Redeem Voucher
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty Transaction History */}
        <div className="glass-panel-elevated" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <History size={18} color="var(--gold)" />
            <h2 style={{ fontSize: '18px', color: 'var(--warm-cream)' }}>
              Recent Points Ledger
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {transactions.map((tx) => (
              <div
                key={tx.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: 'rgba(25, 23, 25, 0.6)',
                  border: '1px solid var(--hairline)'
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', color: 'var(--warm-cream)', fontWeight: 500 }}>
                    {tx.description}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {tx.date} · {tx.type}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: tx.points_delta > 0 ? 'var(--success)' : 'var(--danger)'
                  }}
                >
                  {tx.points_delta > 0 ? `+${tx.points_delta}` : tx.points_delta} Pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
