import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CORPORATE_PACKAGES } from '../data/seedData';
import { FileDown, CheckCircle2 } from 'lucide-react';

interface EventsPageProps {
  onNavigate?: (tab: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate: _onNavigate }) => {
  const { submitCorporateEnquiry } = useStore();
  const [guests, setGuests] = useState(35);
  const [selectedTier, setSelectedTier] = useState<'bronze' | 'silver' | 'gold_vip'>('silver');
  const [companyName, setCompanyName] = useState('Infosys Engineering Labs');
  const [contactPerson, setContactPerson] = useState('Rahul Verma');
  const [email, setEmail] = useState('rahul.verma@infosys.com');
  const [phone, setPhone] = useState('+91 98450 77112');
  const [eventDate, setEventDate] = useState('2026-10-24');
  const [proposalReady, setProposalReady] = useState(false);
  const [lastEnquiryId, setLastEnquiryId] = useState('');

  const currentPkg = CORPORATE_PACKAGES.find((p) => p.tier_id === selectedTier) || CORPORATE_PACKAGES[1];
  const subtotal = guests * currentPkg.price_per_head;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + tax;

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const enquiry = submitCorporateEnquiry({
      company_name: companyName,
      contact_person: contactPerson,
      email,
      phone,
      guest_count: guests,
      package_tier: selectedTier,
      date: eventDate,
      estimated_subtotal: subtotal,
      estimated_tax: tax,
      estimated_grand_total: grandTotal
    });
    setLastEnquiryId(enquiry.id);
    setProposalReady(true);
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
            B2B Tech Outings &amp; Private Celebrations
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 54px)',
              marginTop: '8px',
              marginBottom: '12px',
              color: 'var(--warm-cream)'
            }}
          >
            Corporate Outing &amp; Event Estimator
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto', fontSize: '15px' }}>
            Direct enterprise quotations for Koramangala startups &amp; tech companies. Zero broker commissions, customizable craft beer packages, and dedicated floor sections.
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
          {/* Package Selection & Sliders */}
          <div>
            <div className="glass-panel-elevated" style={{ padding: '32px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--warm-cream)', marginBottom: '16px' }}>
                1. Select Guest Count &amp; Date
              </h2>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    TEAM ATTENDANCE
                  </label>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                    {guests} Attendees
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
                  <span>10 pax (Intimate team)</span>
                  <span>75 pax (Half floor)</span>
                  <span>150 pax (Full rooftop)</span>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  PROPOSED EVENT DATE
                </label>
                <input
                  type="date"
                  className="input-control"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
            </div>

            {/* Package Tiers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {CORPORATE_PACKAGES.map((pkg) => {
                const isSelected = selectedTier === pkg.tier_id;
                return (
                  <div
                    key={pkg.tier_id}
                    onClick={() => setSelectedTier(pkg.tier_id)}
                    className={`glass-panel interactive-card ${isSelected ? 'glass-panel-burgundy' : ''}`}
                    style={{
                      padding: '24px',
                      cursor: 'pointer',
                      border: isSelected ? '1.5px solid var(--gold)' : '1px solid var(--hairline)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <h3 style={{ fontSize: '18px', color: 'var(--warm-cream)' }}>
                          {pkg.name}
                        </h3>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                          {pkg.duration_hours} Hours Unlimited Flow
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                          ₹{pkg.price_per_head}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>per head + taxes</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '12.5px', color: 'var(--champagne)', lineHeight: 1.5, marginBottom: '12px' }}>
                      {pkg.food_courses}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {pkg.beverages_included.map((bev, idx) => (
                        <span key={idx} className="badge badge-gold" style={{ fontSize: '9.5px' }}>
                          {bev}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-Time Cost Estimator & Quote Form */}
          <div className="glass-panel-elevated" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '22px', color: 'var(--warm-cream)', marginBottom: '16px' }}>
              2. Real-Time Quotation
            </h2>

            {/* Live Financial Breakdown */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '10px',
                padding: '20px',
                border: '1px solid var(--hairline)',
                marginBottom: '24px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span>{guests} Guests × ₹{currentPkg.price_per_head}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₹{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span>GST (5%)</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₹{tax.toLocaleString()}</span>
              </div>
              <div
                style={{
                  borderTop: '1px solid var(--hairline)',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--warm-cream)' }}>
                  Total Estimated Investment
                </span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '6px' }}>
                *Includes dedicated banquet service staff, private sound zone, and priority tap lines.
              </div>
            </div>

            <form onSubmit={handleGenerateQuote} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  COMPANY / ENTERPRISE NAME
                </label>
                <input
                  className="input-control"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  CONTACT PERSON &amp; TITLE
                </label>
                <input
                  className="input-control"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    WORK EMAIL
                  </label>
                  <input
                    type="email"
                    className="input-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    PHONE NUMBER
                  </label>
                  <input
                    className="input-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-burgundy"
                style={{ width: '100%', padding: '14px', fontSize: '13.5px', marginTop: '8px' }}
              >
                <FileDown size={16} />
                <span>Generate Official Proposal PDF</span>
              </button>
            </form>

            {proposalReady && (
              <div
                style={{
                  marginTop: '24px',
                  padding: '20px',
                  borderRadius: '10px',
                  background: 'rgba(59, 178, 115, 0.15)',
                  border: '1px solid rgba(59, 178, 115, 0.4)',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={24} color="var(--success)" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--warm-cream)', marginBottom: '4px' }}>
                  Proposal #{lastEnquiryId} Generated!
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Simulated formal PDF proposal prepared for {companyName} ({guests} guests, ₹{grandTotal.toLocaleString()}).
                </div>
                <button
                  onClick={() => alert(`Simulated PDF Download: Brooks_Bonds_Corporate_Proposal_${lastEnquiryId}.pdf`)}
                  className="btn btn-gold"
                  style={{ fontSize: '11.5px', padding: '8px 18px' }}
                >
                  <FileDown size={14} />
                  <span>Download Formal PDF Quote</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
