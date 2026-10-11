import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { VenueLevel, VenueTable, Reservation } from '../types';
import { InteractiveFloorPlan } from '../components/InteractiveFloorPlan';
import { Calendar, CheckCircle2, MessageSquare } from 'lucide-react';

interface ReservationsPageProps {
  onNavigate?: (tab: string) => void;
}

export const ReservationsPage: React.FC<ReservationsPageProps> = ({ onNavigate }) => {
  const { createReservation, joinWaitlist, tables, setCurrentRoute } = useStore();
  const handleNav = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    else setCurrentRoute(tab);
  };

  const [date, setDate] = useState('2026-10-11');
  const [time, setTime] = useState('20:00');
  const [partySize, setPartySize] = useState(4);
  const [selectedLevel, setSelectedLevel] = useState<VenueLevel>('Level 3: Rooftop');
  const [selectedTable, setSelectedTable] = useState<VenueTable | null>(null);
  const [name, setName] = useState('Pooja Hegde');
  const [phone, setPhone] = useState('+91 98450 44332');
  const [email] = useState('pooja.hegde@example.com');
  const [occasion, setOccasion] = useState('Dinner with Friends');
  const [notes, setNotes] = useState('');

  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [joinQueueMode, setJoinQueueMode] = useState(false);

  // Check table conflicts on selected date & level
  const tablesOnLevel = tables.filter((t) => t.level === selectedLevel);
  const availableCount = tablesOnLevel.filter((t) => t.status === 'AVAILABLE').length;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (joinQueueMode) {
      joinWaitlist(name, phone, partySize, selectedLevel);
      handleNav('home');
      return;
    }

    const res = createReservation({
      customer_name: name,
      phone,
      email,
      date,
      time,
      party_size: partySize,
      level: selectedLevel,
      table_id: selectedTable?.table_id,
      occasion,
      notes
    });

    setConfirmedReservation(res);
    setShowWhatsAppModal(true);
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
            Direct Reservation Engine
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              marginTop: '8px',
              marginBottom: '12px',
              color: 'var(--warm-cream)'
            }}
          >
            Reserve Your Table Direct
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '15px' }}>
            Lock your table directly on our interactive floor plan. Avoid 20% aggregator broker fees and eliminate walk-out wait times.
          </p>
        </div>
      </section>

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px',
            alignItems: 'start'
          }}
        >
          {/* Reservation Booking Form */}
          <div className="glass-panel-elevated" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '20px', color: 'var(--warm-cream)' }}>
              1. Party &amp; Seating Details
            </h2>

            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    DATE
                  </label>
                  <input
                    type="date"
                    className="input-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    TIME SLOT
                  </label>
                  <select
                    className="input-control"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    {['12:30', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map((slot) => (
                      <option key={slot} value={slot} style={{ background: '#191719', color: '#fff' }}>
                        {slot} {parseInt(slot) >= 12 ? 'PM' : 'AM'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guests Count */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    PARTY SIZE
                  </label>
                  <span style={{ fontSize: '12px', color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                    {partySize} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={partySize}
                  onChange={(e) => setPartySize(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold)' }}
                />
              </div>

              {/* Floor Zone Selection */}
              <div>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  PREFERRED FLOOR ZONE
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  {[
                    { id: 'Level 3: Rooftop', name: 'Level 3: Open-Air Rooftop', note: 'Outdoor breeze, date nights & scenic views' },
                    { id: 'Level 2: Dance Floor', name: 'Level 2: Lounge & Dance Floor', note: 'High energy, DJ console & live matches' },
                    { id: 'Level 1: Brewery Bar', name: 'Level 1: Ground Floor Brewhouse', note: 'Craft tanks, casual pints & easy conversation' }
                  ].map((lvl) => {
                    const isSelected = selectedLevel === lvl.id;
                    return (
                      <div
                        key={lvl.id}
                        onClick={() => {
                          setSelectedLevel(lvl.id as VenueLevel);
                          setSelectedTable(null);
                        }}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          background: isSelected ? 'rgba(84, 26, 43, 0.45)' : 'rgba(25, 23, 25, 0.6)',
                          border: isSelected ? '1px solid var(--burgundy-bright)' : '1px solid var(--hairline)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: isSelected ? 'var(--warm-cream)' : 'var(--champagne)' }}>
                            {lvl.name}
                          </span>
                          {isSelected && <span className="badge badge-gold" style={{ fontSize: '9px' }}>Selected</span>}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>
                          {lvl.note}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    YOUR FULL NAME
                  </label>
                  <input
                    className="input-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

              <div>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  SPECIAL OCCASION / CELEBRATION
                </label>
                <select
                  className="input-control"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                >
                  <option value="Casual Dining" style={{ background: '#191719' }}>Casual Dining</option>
                  <option value="Birthday Celebration" style={{ background: '#191719' }}>Birthday Celebration</option>
                  <option value="Corporate Team Outing" style={{ background: '#191719' }}>Corporate Team Outing</option>
                  <option value="Anniversary / Date Night" style={{ background: '#191719' }}>Anniversary / Date Night</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  SPECIAL REQUESTS / SEATING NOTES
                </label>
                <input
                  className="input-control"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Near vertical garden wall, high chair needed"
                />
              </div>

              {/* Live Floor Availability Indicator */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: availableCount > 0 ? 'rgba(59, 178, 115, 0.1)' : 'rgba(217, 4, 41, 0.1)',
                  border: `1px solid ${availableCount > 0 ? 'rgba(59, 178, 115, 0.3)' : 'rgba(217, 4, 41, 0.3)'}`,
                  fontSize: '12px'
                }}
              >
                {availableCount > 0 ? (
                  <div style={{ color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} />
                    <span>{availableCount} tables currently open on {selectedLevel}. Select your table on the floor map!</span>
                  </div>
                ) : (
                  <div style={{ color: '#fca5a5' }}>
                    <div style={{ fontWeight: 600, marginBottom: '2px' }}>Peak Capacity Alert for {selectedLevel}</div>
                    <div>Join our live queue tracker for priority seating!</div>
                  </div>
                )}
              </div>

              {availableCount === 0 && (
                <button
                  type="button"
                  onClick={() => setJoinQueueMode(true)}
                  className="btn btn-gold"
                  style={{ width: '100%' }}
                >
                  Join Live Priority Waitlist (Est. 15 mins)
                </button>
              )}

              {availableCount > 0 && (
                <button
                  type="submit"
                  className="btn btn-burgundy"
                  style={{ width: '100%', padding: '14px', fontSize: '13.5px' }}
                >
                  <Calendar size={16} />
                  <span>Lock Reservation {selectedTable ? `(Table ${selectedTable.table_id})` : ''}</span>
                </button>
              )}
            </form>
          </div>

          {/* 2. Interactive Floor Plan Map */}
          <div>
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--warm-cream)', marginBottom: '4px' }}>
                2. Live Interactive Floor Plan
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Click an available table to handpick your exact seating spot.
              </p>
            </div>

            <InteractiveFloorPlan
              filterLevel={selectedLevel}
              selectedTableId={selectedTable?.table_id}
              onSelectTable={(table) => setSelectedTable(table)}
              interactive={true}
            />

            {selectedTable && (
              <div
                className="glass-panel"
                style={{
                  marginTop: '16px',
                  padding: '16px',
                  border: '1px solid var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>
                    CURRENT SELECTION
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--warm-cream)' }}>
                    Table {selectedTable.table_id} · {selectedTable.seats} Seats ({selectedTable.level})
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTable(null)}
                  className="btn btn-ghost"
                  style={{ fontSize: '11px', padding: '6px 10px' }}
                >
                  Clear Selection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp Simulation Modal */}
      {showWhatsAppModal && confirmedReservation && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="glass-panel-elevated"
            style={{
              maxWidth: '460px',
              width: '100%',
              padding: '32px',
              border: '1px solid rgba(59, 178, 115, 0.4)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(59, 178, 115, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                color: 'var(--success)'
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <h3 style={{ fontSize: '22px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
              Table Booking Locked!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: '20px' }}>
              Booking <strong>#{confirmedReservation.id}</strong> has been logged into Brooks &amp; Bonds Operations.
            </p>

            {/* WhatsApp Card Simulation */}
            <div
              style={{
                background: '#12261f',
                border: '1px solid #1e4638',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'left',
                fontSize: '12.5px',
                color: '#d1fae5',
                lineHeight: 1.5,
                marginBottom: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6ee7b7', fontWeight: 700, marginBottom: '8px' }}>
                <MessageSquare size={16} />
                <span>Simulated WhatsApp Notification</span>
              </div>
              <div>
                "Hello {confirmedReservation.customer_name}! Your table at <strong>Brooks &amp; Bonds Brewery ({confirmedReservation.level})</strong> is locked for {confirmedReservation.time} on {confirmedReservation.date} ({confirmedReservation.party_size} guests). Table: {confirmedReservation.table_id || 'Assigned on arrival'}. Reply <strong>'RUNNING LATE'</strong> to automatically hold your reservation for an additional 20 minutes."
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setShowWhatsAppModal(false);
                  handleNav('account');
                }}
                className="btn btn-gold"
                style={{ flex: 1, padding: '12px' }}
              >
                View in Customer Portal
              </button>
              <button
                onClick={() => {
                  setShowWhatsAppModal(false);
                  handleNav('staff-portal');
                }}
                className="btn btn-outline"
                style={{ flex: 1, padding: '12px' }}
              >
                Inspect in Staff Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
