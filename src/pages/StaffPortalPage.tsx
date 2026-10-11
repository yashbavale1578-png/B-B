import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Users, 
  Clock, 
  ChefHat, 
  Bell, 
  CheckCircle, 
  Layers, 
  RefreshCw, 
  Check, 
  AlertTriangle
} from 'lucide-react';
import { OrderStatus, TableStatus } from '../types';

export const StaffPortalPage: React.FC = () => {
  const { 
    tables, 
    waitlist, 
    orders, 
    serverCalls, 
    updateOrderStatus, 
    updateTableStatus, 
    seatWaitlistGuest, 
    resolveServerCall,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'kds' | 'floor' | 'waitlist' | 'alerts'>('kds');
  const [selectedFloor, setSelectedFloor] = useState<number>(1);

  // KDS filter
  const activeOrders = orders.filter(o => o.status !== OrderStatus.SERVED && o.status !== OrderStatus.CANCELLED);
  const servedOrders = orders.filter(o => o.status === OrderStatus.SERVED).slice(0, 5);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.RECEIVED: return 'var(--burgundy-glow)';
      case OrderStatus.PREPARING: return '#D97706';
      case OrderStatus.READY: return '#059669';
      case OrderStatus.SERVED: return 'var(--charcoal-3)';
      default: return 'var(--text-muted)';
    }
  };

  const nextStatus = (current: OrderStatus): OrderStatus | null => {
    switch (current) {
      case OrderStatus.RECEIVED: return OrderStatus.PREPARING;
      case OrderStatus.PREPARING: return OrderStatus.READY;
      case OrderStatus.READY: return OrderStatus.SERVED;
      default: return null;
    }
  };

  const handleNextStatus = (orderId: string, current: OrderStatus) => {
    const next = nextStatus(current);
    if (next) {
      updateOrderStatus(orderId, next);
      addToast(`Order ${orderId} marked as ${next}`, 'info');
    }
  };

  const handleSeatTable = (tableId?: string) => {
    if (!tableId) return;
    updateTableStatus(tableId, TableStatus.OCCUPIED);
    addToast(`Table ${tableId} is now marked OCCUPIED`, 'success');
  };

  const handleClearTable = (tableId?: string) => {
    if (!tableId) return;
    updateTableStatus(tableId, TableStatus.AVAILABLE);
    addToast(`Table ${tableId} cleared and set to AVAILABLE`, 'info');
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        {/* Header telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                STAFF OPERATIONS DESK
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Koramangala 5th Block • Live Shift
              </span>
            </div>
            <h1 className="font-heading" style={{ fontSize: '2.4rem', color: 'var(--cream)' }}>
              Floor & Kitchen Command
            </h1>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div className="card" style={{ padding: '12px 20px', minWidth: '130px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: 'var(--gold)', fontWeight: 700 }}>
                {activeOrders.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Active Tickets
              </div>
            </div>

            <div className="card" style={{ padding: '12px 20px', minWidth: '130px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: '#10B981', fontWeight: 700 }}>
                {tables.filter(t => t.status === TableStatus.AVAILABLE).length} / {tables.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Tables Open
              </div>
            </div>

            <div className="card" style={{ padding: '12px 20px', minWidth: '130px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: '#EF4444', fontWeight: 700 }}>
                {serverCalls.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Server Alerts
              </div>
            </div>

            <div className="card" style={{ padding: '12px 20px', minWidth: '130px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: 'var(--champagne)', fontWeight: 700 }}>
                {waitlist.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                In Waitlist
              </div>
            </div>
          </div>
        </div>

        {/* Operational Nav Tabs */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--charcoal-3)', paddingBottom: '16px', marginBottom: '32px' }}>
          <button 
            onClick={() => setActiveTab('kds')}
            className={`btn ${activeTab === 'kds' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <ChefHat size={18} />
            Kitchen Display (KDS)
            <span style={{ 
              background: activeTab === 'kds' ? 'rgba(255,255,255,0.2)' : 'var(--charcoal-3)', 
              padding: '2px 8px', 
              borderRadius: '12px', 
              fontSize: '0.75rem' 
            }}>
              {activeOrders.length}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('floor')}
            className={`btn ${activeTab === 'floor' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Layers size={18} />
            Floor Management
          </button>

          <button 
            onClick={() => setActiveTab('waitlist')}
            className={`btn ${activeTab === 'waitlist' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Users size={18} />
            Waitlist & Walk-ins
            {waitlist.length > 0 && (
              <span style={{ background: 'var(--gold)', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                {waitlist.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => setActiveTab('alerts')}
            className={`btn ${activeTab === 'alerts' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Bell size={18} />
            Server Calls
            {serverCalls.length > 0 && (
              <span style={{ background: '#EF4444', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                {serverCalls.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: KITCHEN DISPLAY SYSTEM (KDS) */}
        {activeTab === 'kds' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Showing tickets ordered from QR code, takeaway, and staff terminal. Real-time status changes sync to Customer Tracking screen.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                <RefreshCw size={14} className="spin-slow" /> Auto-synced with store
              </div>
            </div>

            {activeOrders.length === 0 ? (
              <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <ChefHat size={48} color="var(--gold)" style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
                <h3 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--cream)', marginBottom: '8px' }}>
                  Kitchen Queue All Clear
                </h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto' }}>
                  No active orders right now. Try placing an order via Table QR or Online Order to see it pop into this KDS board in real-time!
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {activeOrders.map(order => {
                  const statusBg = getStatusColor(order.status);
                  return (
                    <div 
                      key={order.id} 
                      className="card" 
                      style={{ 
                        borderTop: `4px solid ${statusBg}`, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        boxShadow: order.status === OrderStatus.RECEIVED ? '0 0 20px rgba(121, 45, 67, 0.25)' : 'none'
                      }}
                    >
                      <div>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', borderBottom: '1px solid var(--charcoal-3)', paddingBottom: '10px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--cream)' }}>
                                #{order.id}
                              </span>
                              <span className="badge badge-burgundy" style={{ fontSize: '0.7rem' }}>
                                {order.type}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--gold)', marginTop: '2px' }}>
                              {order.tableNumber ? `Table ${order.tableNumber} (Dine-in)` : `Customer: ${order.customerName}`}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                              <span style={{ 
                                padding: '1px 6px', 
                                borderRadius: '4px', 
                                background: order.payment_status === 'PAID' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                                color: order.payment_status === 'PAID' ? '#10B981' : '#F59E0B',
                                fontWeight: 600,
                                fontSize: '0.72rem',
                                border: `1px solid ${order.payment_status === 'PAID' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                              }}>
                                {order.payment_status === 'PAID' ? `PAID via Demo UPI (${order.payment_app || 'PhonePe'})` : 'PAYMENT PENDING'}
                              </span>
                              {order.payment_transaction_id && (
                                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontSize: '0.68rem' }}>
                                  {order.payment_transaction_id}
                                </span>
                              )}
                            </div>
                          </div>

                          <span style={{ 
                            fontFamily: 'var(--font-mono)', 
                            fontSize: '0.75rem', 
                            padding: '4px 8px', 
                            borderRadius: '4px',
                            background: `${statusBg}33`,
                            color: statusBg,
                            fontWeight: 700,
                            border: `1px solid ${statusBg}`
                          }}>
                            {order.status}
                          </span>
                        </div>

                        {/* Order Items */}
                        <div style={{ marginBottom: '16px' }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem' }}>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gold)' }}>
                                  {item.quantity}x
                                </span>
                                <div>
                                  <span style={{ color: 'var(--cream)' }}>{item.menuItem.name}</span>
                                  {item.customizations && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                      Note: {item.customizations}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                                ₹{item.menuItem.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Timestamp */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                          <Clock size={12} /> Ordered at {order.createdAt || order.created_at || 'Just now'}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ borderTop: '1px solid var(--charcoal-3)', paddingTop: '12px' }}>
                        {order.status === OrderStatus.RECEIVED && (
                          <button 
                            onClick={() => handleNextStatus(order.id, order.status)}
                            className="btn btn-primary"
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '10px' }}
                          >
                            <ChefHat size={16} /> Mark In Preparation
                          </button>
                        )}

                        {order.status === OrderStatus.PREPARING && (
                          <button 
                            onClick={() => handleNextStatus(order.id, order.status)}
                            className="btn"
                            style={{ 
                              width: '100%', 
                              display: 'flex', 
                              justifyContent: 'center', 
                              alignItems: 'center', 
                              gap: '8px', 
                              padding: '10px',
                              background: '#059669',
                              color: '#fff',
                              border: 'none',
                              fontWeight: 600,
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            <CheckCircle size={16} /> Mark Dish Ready for Runner
                          </button>
                        )}

                        {order.status === OrderStatus.READY && (
                          <button 
                            onClick={() => handleNextStatus(order.id, order.status)}
                            className="btn"
                            style={{ 
                              width: '100%', 
                              display: 'flex', 
                              justifyContent: 'center', 
                              alignItems: 'center', 
                              gap: '8px', 
                              padding: '10px',
                              background: 'var(--charcoal-3)',
                              color: 'var(--champagne)',
                              border: '1px solid var(--gold)',
                              fontWeight: 600,
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            <Check size={16} /> Mark Served to Table
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Recently served archive */}
            {servedOrders.length > 0 && (
              <div style={{ marginTop: '40px', borderTop: '1px solid var(--charcoal-3)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Recently Completed Tickets (Last 5)
                </h4>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {servedOrders.map(o => (
                    <div key={o.id} className="card" style={{ padding: '8px 16px', fontSize: '0.8rem', background: 'var(--charcoal-1)' }}>
                      <span style={{ color: '#10B981', fontWeight: 700 }}>✓ #{o.id}</span>
                      <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>
                        {o.tableNumber ? `Table ${o.tableNumber}` : o.customerName}
                      </span>
                      <span style={{ color: 'var(--gold)', marginLeft: '8px', fontFamily: 'var(--font-mono)' }}>
                        ₹{o.total}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FLOOR MANAGEMENT */}
        {activeTab === 'floor' && (
          <div>
            {/* Floor selector */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setSelectedFloor(1)} 
                  className={`btn ${selectedFloor === 1 ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                >
                  Level 1: Ground Brewhouse
                </button>
                <button 
                  onClick={() => setSelectedFloor(2)} 
                  className={`btn ${selectedFloor === 2 ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                >
                  Level 2: Mezzanine Lounge
                </button>
                <button 
                  onClick={() => setSelectedFloor(3)} 
                  className={`btn ${selectedFloor === 3 ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                >
                  Level 3: Rooftop Terrace
                </button>
              </div>

              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></span> Available
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }}></span> Occupied
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--gold)' }}></span> Reserved
                </span>
              </div>
            </div>

            {/* Tables Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {tables.filter(t => t.floor === selectedFloor).map(table => {
                const isAvailable = table.status === TableStatus.AVAILABLE;
                const isOccupied = table.status === TableStatus.OCCUPIED;
                const isReserved = table.status === TableStatus.RESERVED;

                return (
                  <div 
                    key={table.id} 
                    className="card"
                    style={{
                      borderLeft: `4px solid ${isAvailable ? '#10B981' : isOccupied ? '#EF4444' : 'var(--gold)'}`,
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <h4 style={{ fontSize: '1.2rem', color: 'var(--cream)', margin: 0, fontFamily: 'var(--font-mono)' }}>
                            Table #{table.number}
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {table.section}
                          </span>
                        </div>

                        <span className={`badge ${isAvailable ? 'badge-gold' : isOccupied ? 'badge-burgundy' : 'badge-gold'}`} style={{ fontSize: '0.7rem' }}>
                          {table.status}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                        <div>Capacity: <strong style={{ color: 'var(--cream)' }}>{table.capacity} Pax</strong></div>
                        {table.currentReservationId && (
                          <div style={{ marginTop: '4px', color: 'var(--gold)', fontSize: '0.75rem' }}>
                            Res #{table.currentReservationId} Assigned
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Operational Actions */}
                    <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--charcoal-3)', paddingTop: '12px' }}>
                      {isAvailable && (
                        <button 
                          onClick={() => handleSeatTable(table.id || table.table_id)}
                          className="btn btn-outline"
                          style={{ flex: 1, padding: '8px', fontSize: '0.8rem', borderColor: '#10B981', color: '#10B981' }}
                        >
                          Seat Walk-in
                        </button>
                      )}

                      {isOccupied && (
                        <button 
                          onClick={() => handleClearTable(table.id || table.table_id)}
                          className="btn btn-outline"
                          style={{ flex: 1, padding: '8px', fontSize: '0.8rem', borderColor: 'var(--gold)', color: 'var(--gold)' }}
                        >
                          Clear & Reset
                        </button>
                      )}

                      {isReserved && (
                        <button 
                          onClick={() => handleSeatTable(table.id || table.table_id)}
                          className="btn btn-primary"
                          style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
                        >
                          Check In Guests
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: WAITLIST CONTROLLER */}
        {activeTab === 'waitlist' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--cream)' }}>
                  Active Walk-in Waitlist
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  Manage weekend rush queue and seat waiting parties to open tables.
                </p>
              </div>

              <div className="badge badge-gold">
                Avg Wait: ~18 mins
              </div>
            </div>

            {waitlist.length === 0 ? (
              <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <Users size={40} color="var(--gold)" style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
                <h4 style={{ color: 'var(--cream)', marginBottom: '8px' }}>No Walk-ins Currently Waiting</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Tables are seating smoothly with immediate availability.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {waitlist.map((guest, idx) => (
                  <div 
                    key={guest.id} 
                    className="card" 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '16px 24px', 
                      flexWrap: 'wrap', 
                      gap: '16px' 
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '50%', 
                        background: 'var(--charcoal-3)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: 'var(--gold)'
                      }}>
                        #{idx + 1}
                      </div>

                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '1.05rem' }}>
                          {guest.customerName}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          📞 {guest.phone} • Party of <strong style={{ color: 'var(--gold)' }}>{guest.partySize} Guests</strong>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Wait</div>
                        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)', fontWeight: 700 }}>
                          ~{guest.estimatedWaitMins} mins
                        </div>
                      </div>

                      <button 
                        onClick={() => seatWaitlistGuest(guest.id)}
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <CheckCircle size={16} /> Seat Guest
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SERVER ASSISTANCE ALERTS */}
        {activeTab === 'alerts' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--cream)' }}>
                Active Table Assistance Calls
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Guests tapping "Call Server" or "Request Bill" from their Table QR interface trigger instant alerts here.
              </p>
            </div>

            {serverCalls.length === 0 ? (
              <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <CheckCircle size={40} color="#10B981" style={{ margin: '0 auto 16px auto', opacity: 0.7 }} />
                <h4 style={{ color: 'var(--cream)', marginBottom: '8px' }}>All Tables Serviced</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No pending server calls or bill requests on the floor.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {serverCalls.map(alert => (
                  <div 
                    key={alert.id} 
                    className="card" 
                    style={{ 
                      borderLeft: '4px solid #EF4444', 
                      padding: '20px',
                      background: 'rgba(239, 68, 68, 0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={18} color="#EF4444" />
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--cream)', fontSize: '1.1rem' }}>
                          Table #{alert.tableNumber}
                        </span>
                      </div>
                      <span className="badge badge-burgundy" style={{ fontSize: '0.7rem' }}>
                        {alert.type}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      <div>Type: <strong style={{ color: 'var(--cream)' }}>{alert.type}</strong></div>
                      <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                        Requested: {new Date(alert.createdAt || alert.timestamp || Date.now()).toLocaleTimeString()}
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        resolveServerCall(alert.id);
                        addToast(`Table #${alert.tableNumber} request resolved`, 'success');
                      }}
                      className="btn"
                      style={{ 
                        width: '100%', 
                        padding: '10px', 
                        background: '#10B981', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Check size={16} /> Mark Attended & Cleared
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
