import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { VenueLevel, VenueTable } from '../types';
import { Users, Clock, Check, Sparkles } from 'lucide-react';

interface InteractiveFloorPlanProps {
  selectedTableId?: string;
  onSelectTable?: (table: VenueTable) => void;
  filterLevel?: VenueLevel;
  interactive?: boolean;
}

export const InteractiveFloorPlan: React.FC<InteractiveFloorPlanProps> = ({
  selectedTableId,
  onSelectTable,
  filterLevel,
  interactive = true
}) => {
  const { tables } = useStore();
  const [activeLevel, setActiveLevel] = useState<VenueLevel>(
    filterLevel || 'Level 3: Rooftop'
  );
  const [viewMode, setViewMode] = useState<'visual' | 'accessible_list'>('visual');

  const currentLevel = filterLevel || activeLevel;
  const filteredTables = tables.filter((t) => t.level === currentLevel);

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      {/* Level Selector Tabs */}
      {!filterLevel && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            borderBottom: '1px solid var(--hairline)',
            paddingBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['Level 3: Rooftop', 'Level 2: Dance Floor', 'Level 1: Brewery Bar'] as VenueLevel[]).map((level) => {
              const isActive = activeLevel === level;
              return (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    background: isActive ? 'var(--burgundy)' : 'rgba(25, 23, 25, 0.7)',
                    color: isActive ? 'var(--warm-cream)' : 'var(--champagne)',
                    border: isActive ? '1px solid var(--burgundy-bright)' : '1px solid var(--hairline)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {level}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setViewMode(viewMode === 'visual' ? 'accessible_list' : 'visual')}
            className="btn btn-ghost"
            style={{ fontSize: '11px', padding: '6px 12px' }}
          >
            {viewMode === 'visual' ? 'Switch to Accessible Table List' : 'Switch to Visual Map'}
          </button>
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: '18px',
          flexWrap: 'wrap',
          marginBottom: '20px',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)' }} />
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--warning)' }} />
          <span>Reserved</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--danger)' }} />
          <span>Occupied</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--gold)' }} />
          <span>Selected</span>
        </div>
      </div>

      {/* Visual Architectural Grid */}
      {viewMode === 'visual' ? (
        <div
          style={{
            background: 'rgba(17, 17, 17, 0.95)',
            border: '1px solid var(--hairline)',
            borderRadius: '12px',
            padding: '24px',
            minHeight: '280px',
            position: 'relative'
          }}
        >
          {/* Floor Architecture Backdrop Labels */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-dim)',
              letterSpacing: '0.15em'
            }}
          >
            {currentLevel.toUpperCase()}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '16px'
            }}
          >
            {filteredTables.map((table) => {
              const isSelected = selectedTableId === table.table_id;
              const isAvailable = table.status === 'AVAILABLE';
              const isOccupied = table.status === 'OCCUPIED';
              const isReserved = table.status === 'RESERVED';

              let borderColor = 'var(--hairline)';
              let statusBg = 'rgba(25, 23, 25, 0.8)';

              if (isSelected) {
                borderColor = 'var(--gold)';
                statusBg = 'rgba(185, 154, 98, 0.15)';
              } else if (isAvailable) {
                borderColor = 'rgba(59, 178, 115, 0.4)';
              } else if (isReserved) {
                borderColor = 'rgba(224, 159, 62, 0.4)';
              } else if (isOccupied) {
                borderColor = 'rgba(217, 4, 41, 0.4)';
              }

              return (
                <button
                  key={table.table_id}
                  disabled={!interactive || (!isAvailable && !isSelected)}
                  onClick={() => onSelectTable && onSelectTable(table)}
                  style={{
                    background: statusBg,
                    border: `1.5px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '14px 12px',
                    textAlign: 'left',
                    cursor: interactive && isAvailable ? 'pointer' : 'default',
                    opacity: !isAvailable && !isSelected ? 0.65 : 1,
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 16px rgba(185, 154, 98, 0.3)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '105px'
                  }}
                  aria-label={`Table ${table.table_id}, ${table.seats} seats, status ${table.status}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: isSelected ? 'var(--gold)' : 'var(--warm-cream)'
                      }}
                    >
                      {table.table_id}
                    </span>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: isSelected
                          ? 'var(--gold)'
                          : isAvailable
                          ? 'var(--success)'
                          : isReserved
                          ? 'var(--warning)'
                          : 'var(--danger)'
                      }}
                    />
                  </div>

                  <div style={{ marginTop: '8px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={12} />
                      <span>{table.seats} Guests</span>
                    </div>
                    {isOccupied && table.order_time_elapsed !== '0m' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px', color: 'var(--text-dim)' }}>
                        <Clock size={11} />
                        <span>Seated {table.order_time_elapsed}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '6px' }}>
                    {isSelected ? (
                      <span className="badge badge-gold" style={{ fontSize: '9px', padding: '2px 6px' }}>
                        <Check size={9} /> Selected
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          color: isAvailable
                            ? 'var(--success)'
                            : isReserved
                            ? 'var(--warning)'
                            : 'var(--danger)'
                        }}
                      >
                        {table.status}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Accessible HTML table alternative */
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--hairline-strong)', color: 'var(--gold)' }}>
                <th style={{ padding: '10px' }}>Table</th>
                <th style={{ padding: '10px' }}>Capacity</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Occupant / Notes</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTables.map((t) => (
                <tr key={t.table_id} style={{ borderBottom: '1px solid var(--hairline)' }}>
                  <td style={{ padding: '10px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{t.table_id}</td>
                  <td style={{ padding: '10px' }}>{t.seats} Persons</td>
                  <td style={{ padding: '10px' }}>
                    <span
                      style={{
                        color:
                          t.status === 'AVAILABLE'
                            ? 'var(--success)'
                            : t.status === 'RESERVED'
                            ? 'var(--warning)'
                            : 'var(--danger)'
                      }}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px', color: 'var(--text-muted)' }}>
                    {t.current_guest || 'None'}
                  </td>
                  <td style={{ padding: '10px' }}>
                    {t.status === 'AVAILABLE' && interactive && (
                      <button
                        onClick={() => onSelectTable && onSelectTable(t)}
                        className="btn btn-outline"
                        style={{ padding: '4px 10px', fontSize: '11px', minHeight: '32px' }}
                      >
                        Select
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
