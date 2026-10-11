import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  TrendingUp, 
  DollarSign, 
  Beer, 
  ShoppingBag, 
  Users, 
  Calendar, 
  Edit3, 
  Check, 
  AlertCircle, 
  Percent, 
  Activity,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import type { MenuItem } from '../types';

export const ManagementPortalPage: React.FC = () => {
  const { 
    menuItems, 
    updateMenuItemPrice, 
    toggleMenuItemAvailability,
    taps, 
    orders, 
    reservations, 
    events, 
    loyaltyAccount,
    addToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'kpis' | 'kegs' | 'menu' | 'crm' | 'events'>('kpis');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  // Financial Telemetry
  const totalGrossRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 148500; // base shift revenue + active orders
  const totalOrdersCount = orders.length + 84;
  const avgTicket = Math.round(totalGrossRevenue / totalOrdersCount);
  
  // 18% Aggregator Commission Saved (Direct ordering vs Swiggy/Zomato 18-24% rake)
  const commissionSaved = Math.round(totalGrossRevenue * 0.18);

  const handleStartEdit = (item: MenuItem) => {
    setEditingItemId(item.id);
    setEditPrice(item.price);
  };

  const handleSavePrice = (id: string) => {
    if (editPrice > 0) {
      updateMenuItemPrice(id, editPrice);
      setEditingItemId(null);
      addToast('Price updated across public menu & checkout', 'success');
    }
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        {/* Header telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span className="badge badge-burgundy" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} />
                EXECUTIVE SUITE
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                General Manager • Brooks & Bonds Koramangala
              </span>
            </div>
            <h1 className="font-heading" style={{ fontSize: '2.4rem', color: 'var(--cream)' }}>
              Operational Analytics & Control
            </h1>
          </div>

          {/* Quick value prop badge */}
          <div className="card" style={{ padding: '12px 20px', borderLeft: '4px solid var(--gold)', background: 'rgba(185, 154, 98, 0.08)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              1st-Party Direct Channel Savings
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: 'var(--cream)', fontWeight: 700, marginTop: '2px' }}>
              ₹{commissionSaved.toLocaleString()} Saved
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Vs. 18% third-party aggregator rake
            </div>
          </div>
        </div>

        {/* Executive Nav Tabs */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--charcoal-3)', paddingBottom: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('kpis')}
            className={`btn ${activeTab === 'kpis' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <TrendingUp size={18} />
            Revenue & KPIs
          </button>

          <button 
            onClick={() => setActiveTab('kegs')}
            className={`btn ${activeTab === 'kegs' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Beer size={18} />
            6-Tap Brewhouse Telemetry
          </button>

          <button 
            onClick={() => setActiveTab('menu')}
            className={`btn ${activeTab === 'menu' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Edit3 size={18} />
            Menu Pricing Manager
          </button>

          <button 
            onClick={() => setActiveTab('crm')}
            className={`btn ${activeTab === 'crm' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Users size={18} />
            Guest CRM & Loyalty
          </button>

          <button 
            onClick={() => setActiveTab('events')}
            className={`btn ${activeTab === 'events' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Calendar size={18} />
            Corporate Outings Pipeline ({events.length})
          </button>
        </div>

        {/* TAB 1: REVENUE & KPIS */}
        {activeTab === 'kpis' && (
          <div>
            {/* Metric Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginBottom: '36px' }}>
              <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--gold)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Gross Sales (Shift)
                  </span>
                  <DollarSign size={20} color="var(--gold)" />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--cream)', fontWeight: 700 }}>
                  ₹{totalGrossRevenue.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                  <ArrowUpRight size={14} /> +14.2% vs last Saturday
                </div>
              </div>

              <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--burgundy-glow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Average Spend / Cover
                  </span>
                  <Activity size={20} color="var(--burgundy-glow)" />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--cream)', fontWeight: 700 }}>
                  ₹{avgTicket}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Across {totalOrdersCount} covers
                </div>
              </div>

              <div className="card" style={{ padding: '24px', borderLeft: '4px solid #10B981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Commission Retained
                  </span>
                  <Percent size={20} color="#10B981" />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: '#10B981', fontWeight: 700 }}>
                  ₹{commissionSaved.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Saved directly to bottom line
                </div>
              </div>

              <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--champagne)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Active Covers & Reservations
                  </span>
                  <Users size={20} color="var(--champagne)" />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--cream)', fontWeight: 700 }}>
                  {reservations.length * 4 + 48} Guests
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Floor capacity at 82%
                </div>
              </div>
            </div>

            {/* Performance Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
              <div className="card" style={{ padding: '28px' }}>
                <h3 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '16px' }}>
                  Top Selling Craft Beers
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {taps.slice(0, 4).map((tap, i) => (
                    <div key={tap.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)', fontWeight: 700 }}>#{i+1}</span>
                        <div>
                          <div style={{ color: 'var(--cream)', fontWeight: 600, fontSize: '0.9rem' }}>{tap.beerName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tap.style} • {tap.abv}% ABV</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--cream)', fontSize: '0.9rem' }}>{120 - i*22} Pints Sold</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>₹{(120 - i*22) * 325}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: '28px' }}>
                <h3 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '16px' }}>
                  Revenue Channel Split
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--cream)' }}>Dine-in Floor & Table QR (Direct)</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>68% (₹{Math.round(totalGrossRevenue * 0.68).toLocaleString()})</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--charcoal-3)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '68%', height: '100%', background: 'var(--gold)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--cream)' }}>Corporate Outings & Events</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--burgundy-glow)' }}>22% (₹{Math.round(totalGrossRevenue * 0.22).toLocaleString()})</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--charcoal-3)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '22%', height: '100%', background: 'var(--burgundy-glow)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--cream)' }}>Direct Takeaway & Online Pre-orders</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#10B981' }}>10% (₹{Math.round(totalGrossRevenue * 0.10).toLocaleString()})</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--charcoal-3)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '10%', height: '100%', background: '#10B981' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 6-TAP BREWHOUSE TELEMETRY */}
        {activeTab === 'kegs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--cream)' }}>
                  Cold-Room Keg Level Sensors
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  Real-time PSI pressure, liquid temperature, and remaining keg volume telemetry for the Koramangala tap lines.
                </p>
              </div>
              <div className="badge badge-gold">
                All 6 Lines Pressurized
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {taps.map(tap => {
                const isLow = tap.currentLevelPct < 25;
                return (
                  <div 
                    key={tap.id} 
                    className="card" 
                    style={{ 
                      padding: '24px', 
                      borderLeft: `4px solid ${isLow ? '#EF4444' : 'var(--gold)'}`,
                      background: isLow ? 'rgba(239, 68, 68, 0.05)' : 'var(--charcoal-2)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gold)' }}>
                            TAP {tap.tapNumber}
                          </span>
                          {isLow && (
                            <span className="badge badge-burgundy" style={{ fontSize: '0.65rem' }}>
                              LOW KEG
                            </span>
                          )}
                        </div>
                        <h4 style={{ color: 'var(--cream)', margin: '4px 0', fontSize: '1.15rem' }}>
                          {tap.beerName}
                        </h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {tap.style}
                        </span>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: isLow ? '#EF4444' : 'var(--cream)' }}>
                          {tap.currentLevelPct}%
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Volume Left</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: '8px', background: 'var(--charcoal-3)', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
                      <div 
                        style={{ 
                          width: `${tap.currentLevelPct}%`, 
                          height: '100%', 
                          background: isLow ? '#EF4444' : 'linear-gradient(90deg, var(--burgundy), var(--gold))' 
                        }}
                      ></div>
                    </div>

                    {/* Telemetry gauges */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem', borderTop: '1px solid var(--charcoal-3)', paddingTop: '12px' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Temperature:</span>
                        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--cream)', fontWeight: 600 }}>{tap.temperature}°C</div>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Pressure:</span>
                        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--cream)', fontWeight: 600 }}>{tap.pressurePsi} PSI</div>
                      </div>
                    </div>

                    {isLow && (
                      <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed rgba(239, 68, 68, 0.4)' }}>
                        <button 
                          onClick={() => addToast(`Restock request sent to Brewhouse team for ${tap.beerName}`, 'info')}
                          className="btn btn-outline"
                          style={{ width: '100%', padding: '6px', fontSize: '0.75rem', borderColor: '#EF4444', color: '#EF4444' }}
                        >
                          Alert Head Brewer to Swap Keg
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: MENU PRICING MANAGER */}
        {activeTab === 'menu' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--cream)' }}>
                  Live Menu Catalog & Pricing
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  Changes made here update instantaneously across the Public Menu, Table QR ordering, and Takeaway cart.
                </p>
              </div>

              <div className="badge badge-gold">
                {menuItems.length} Active Items
              </div>
            </div>

            <div className="card" style={{ overflowX: 'auto', padding: '0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--charcoal-3)', background: 'var(--charcoal-1)' }}>
                    <th style={{ padding: '14px 20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>Item Details</th>
                    <th style={{ padding: '14px 20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>Category</th>
                    <th style={{ padding: '14px 20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>Dietary</th>
                    <th style={{ padding: '14px 20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>Price (INR)</th>
                    <th style={{ padding: '14px 20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>Stock Status</th>
                    <th style={{ padding: '14px 20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--charcoal-3)' }}>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--cream)' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '280px' }}>{item.description}</div>
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--gold)', textTransform: 'capitalize' }}>
                        {item.category}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span className={`badge ${item.isVeg ? 'badge-gold' : 'badge-burgundy'}`} style={{ fontSize: '0.7rem' }}>
                          {item.isVeg ? 'VEG' : 'NON-VEG'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        {editingItemId === item.id ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: 'var(--gold)' }}>₹</span>
                            <input 
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(Number(e.target.value))}
                              style={{ 
                                width: '80px', 
                                padding: '4px 8px', 
                                background: 'var(--charcoal-1)', 
                                border: '1px solid var(--gold)', 
                                color: 'var(--cream)',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-mono)'
                              }}
                            />
                            <button 
                              onClick={() => handleSavePrice(item.id)}
                              className="btn btn-primary"
                              style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                            >
                              <Check size={14} />
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cream)', fontWeight: 600 }}>
                            ₹{item.price}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <button 
                          onClick={() => {
                            toggleMenuItemAvailability(item.id);
                            addToast(`${item.name} availability toggled`, 'info');
                          }}
                          style={{
                            background: item.isAvailable ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: item.isAvailable ? '#10B981' : '#EF4444',
                            border: `1px solid ${item.isAvailable ? '#10B981' : '#EF4444'}`,
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          {item.isAvailable ? 'In Stock' : '86’d (Out)'}
                        </button>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <button 
                          onClick={() => handleStartEdit(item)}
                          className="btn btn-outline"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          Edit Price
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: GUEST CRM & LOYALTY */}
        {activeTab === 'crm' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--cream)' }}>
                  Guest Relationship Management (The Mango Club)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  High-value patrons, corporate liaisons, and VIP tier progression.
                </p>
              </div>

              <div className="badge badge-gold">
                Active VIP Profile: {loyaltyAccount.name}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--gold)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h4 style={{ color: 'var(--cream)', fontSize: '1.2rem', margin: 0 }}>
                      {loyaltyAccount.name}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      📞 {loyaltyAccount.phone}
                    </span>
                  </div>
                  <span className="badge badge-gold">{loyaltyAccount.tier} VIP</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Reward Points:</span>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)', fontWeight: 700, fontSize: '1.1rem' }}>
                      {loyaltyAccount.points} pts
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Pints Poured:</span>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--cream)', fontWeight: 700, fontSize: '1.1rem' }}>
                      {loyaltyAccount.pintsPoured} / 8
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--charcoal-3)', paddingTop: '12px' }}>
                  Member Since: {loyaltyAccount.memberSince} • Total Outings: 14 visits
                </div>
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h4 style={{ color: 'var(--cream)', fontSize: '1.2rem', margin: 0 }}>
                      Ananya Sen
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      📞 +91 98451 22390
                    </span>
                  </div>
                  <span className="badge badge-gold">GOLD VIP</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Reward Points:</span>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)', fontWeight: 700, fontSize: '1.1rem' }}>
                      1,840 pts
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Total Spend:</span>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--cream)', fontWeight: 700, fontSize: '1.1rem' }}>
                      ₹38,200
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--charcoal-3)', paddingTop: '12px' }}>
                  Preference: Level 3 Rooftop table, loves Mango Cider & Andhra Chilli Chicken.
                </div>
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h4 style={{ color: 'var(--cream)', fontSize: '1.2rem', margin: 0 }}>
                      Karthik Rajan
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      📞 +91 97410 88921
                    </span>
                  </div>
                  <span className="badge badge-burgundy">SILVER</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Reward Points:</span>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)', fontWeight: 700, fontSize: '1.1rem' }}>
                      620 pts
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Total Spend:</span>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--cream)', fontWeight: 700, fontSize: '1.1rem' }}>
                      ₹12,400
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--charcoal-3)', paddingTop: '12px' }}>
                  Corporate Host for Flipkart Koramangala Friday mixers.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CORPORATE EVENTS PIPELINE */}
        {activeTab === 'events' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--cream)' }}>
                  Corporate Outings & Functions Pipeline
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  Incoming inquiries from the `/events` estimator page with guest counts, food packages, and estimated values.
                </p>
              </div>

              <div className="badge badge-gold">
                Pipeline Value: ₹{events.reduce((s, e) => s + e.estimatedBudget, 0).toLocaleString()}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {events.map(event => (
                <div 
                  key={event.id} 
                  className="card"
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '24px', 
                    flexWrap: 'wrap', 
                    gap: '20px' 
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)', fontWeight: 700 }}>#{event.id}</span>
                      <span className="badge badge-gold">{event.eventType}</span>
                      <span style={{ 
                        background: event.status === 'CONFIRMED' ? 'rgba(16,185,129,0.2)' : 'rgba(217, 119, 6, 0.2)',
                        color: event.status === 'CONFIRMED' ? '#10B981' : '#D97706',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {event.status}
                      </span>
                    </div>

                    <h4 style={{ color: 'var(--cream)', fontSize: '1.2rem', margin: '4px 0' }}>
                      {event.companyName ? `${event.companyName} (${event.contactName})` : event.contactName}
                    </h4>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Date: <strong style={{ color: 'var(--cream)' }}>{event.date}</strong> • Guests: <strong style={{ color: 'var(--gold)' }}>{event.guestCount} Pax</strong> • Package: <strong style={{ color: 'var(--cream)' }}>{event.packageType}</strong>
                    </div>

                    {event.notes && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--champagne)', marginTop: '6px', fontStyle: 'italic' }}>
                        Notes: "{event.notes}"
                      </div>
                    )}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Value</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', color: 'var(--gold)', fontWeight: 700 }}>
                      ₹{event.estimatedBudget.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Contact: {event.email} • {event.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
