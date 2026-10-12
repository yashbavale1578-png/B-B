import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldAlert, 
  Terminal, 
  RotateCcw,
  Cpu, 
  Database, 
  Key, 
  ToggleLeft, 
  ToggleRight,
  AlertTriangle,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { UserRole } from '../types';

export const MaintenancePortalPage: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    systemAlerts, 
    resetDemoData, 
    addToast,
    currentSession,
    logout
  } = useStore();

  const [activeTab, setActiveTab] = useState<'diagnostics' | 'rbac' | 'audit' | 'flags'>('diagnostics');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const maintUser = currentSession?.user;
  const maintName = maintUser?.name || 'Vikramaditya Rao';
  const maintEmpId = maintUser?.employeeId || 'SYS-ADMIN-01';
  const maintTitle = maintUser?.title || 'Principal Infrastructure Engineer';

  // Demo feature flags
  const [flags, setFlags] = useState({
    ambientShader: true,
    upiSimulation: true,
    kdsAudioBeep: false,
    rushHourSurge: false,
    debugTelemetry: true
  });

  // Simulated Audit Log
  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-8801', timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(), actor: 'System', action: 'DB_HEALTHCHECK_PASS', details: 'All 6 Keg Sensors reporting 2.1-2.4 Bar' },
    { id: 'LOG-8802', timestamp: new Date(Date.now() - 2400000).toLocaleTimeString(), actor: 'Staff (Capt. Rajesh)', action: 'TABLE_SEAT', details: 'Table #104 status transition AVAILABLE -> OCCUPIED' },
    { id: 'LOG-8803', timestamp: new Date(Date.now() - 1800000).toLocaleTimeString(), actor: 'Customer (Rohan)', action: 'ORDER_SUBMIT', details: 'Order #ORD-7701 generated (UPI payment confirmed)' },
    { id: 'LOG-8804', timestamp: new Date(Date.now() - 900000).toLocaleTimeString(), actor: 'Management (GM)', action: 'PRICE_UPDATE', details: 'BB Craft Mango Cider updated to ₹345' },
    { id: 'LOG-8805', timestamp: new Date().toLocaleTimeString(), actor: 'Maintenance', action: 'PORTAL_ACCESS', details: 'System Diagnostic Suite invoked with Root Role' },
  ]);

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags(prev => {
      const next = { ...prev, [key]: !prev[key] };
      addToast(`Flag '${key}' set to ${next[key]}`, 'info');
      return next;
    });
  };

  const handleExecuteReset = () => {
    resetDemoData();
    setShowResetConfirm(false);
    addToast('Demo database successfully reseeded to pristine state', 'success');
    setAuditLogs(prev => [
      { id: `LOG-${Math.floor(1000 + Math.random()*9000)}`, timestamp: new Date().toLocaleTimeString(), actor: 'Maintenance', action: 'DATABASE_RESET', details: 'Pristine seed data restored to localStorage' },
      ...prev
    ]);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        {/* Header telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-burgundy" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EF4444', color: '#fff' }}>
                <ShieldAlert size={14} />
                ROOT PRIVILEGE / LEVEL 4
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                System Architecture & Demonstration Controller
              </span>
              <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem' }}>
                <ShieldCheck size={12} color="var(--gold)" />
                {maintName} ({maintEmpId}) · {maintTitle}
              </span>
            </div>
            <h1 className="font-heading" style={{ fontSize: '2.4rem', color: 'var(--cream)' }}>
              Maintenance & Diagnostics
            </h1>
          </div>

          {/* Actions: Reset & Sign Out */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setShowResetConfirm(true)}
              className="btn btn-outline"
              style={{ 
                borderColor: '#EF4444', 
                color: '#EF4444', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '10px 18px',
                fontSize: '0.85rem'
              }}
            >
              <RotateCcw size={16} /> Reset All Demo Data
            </button>

            <button
              id="maint-logout-btn"
              onClick={logout}
              className="btn btn-outline"
              style={{
                fontSize: '0.85rem',
                padding: '10px 18px',
                borderColor: 'rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Sign Out of Maintenance Console"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showResetConfirm && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '32px', border: '1px solid #EF4444' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#EF4444' }}>
                <AlertTriangle size={28} />
                <h3 className="font-heading" style={{ fontSize: '1.4rem', margin: 0, color: 'var(--cream)' }}>
                  Confirm State Reset
                </h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                This will wipe local storage edits and restore default tables, fresh orders, default prices, and seed reservations.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => setShowResetConfirm(false)}
                  className="btn btn-outline"
                  style={{ padding: '8px 16px' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleExecuteReset}
                  className="btn btn-primary"
                  style={{ background: '#EF4444', borderColor: '#EF4444', padding: '8px 16px' }}
                >
                  Confirm & Reseed
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Nav Tabs */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--charcoal-3)', paddingBottom: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('diagnostics')}
            className={`btn ${activeTab === 'diagnostics' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Cpu size={18} />
            Diagnostics & Health
          </button>

          <button 
            onClick={() => setActiveTab('rbac')}
            className={`btn ${activeTab === 'rbac' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Key size={18} />
            RBAC & Role Inspection
          </button>

          <button 
            onClick={() => setActiveTab('audit')}
            className={`btn ${activeTab === 'audit' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Terminal size={18} />
            System Audit Log
          </button>

          <button 
            onClick={() => setActiveTab('flags')}
            className={`btn ${activeTab === 'flags' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <ToggleRight size={18} />
            Demo Feature Flags
          </button>
        </div>

        {/* TAB 1: DIAGNOSTICS & HEALTH */}
        {activeTab === 'diagnostics' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div className="card" style={{ padding: '24px', borderLeft: '4px solid #10B981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Memory & DOM Load</span>
                  <Cpu size={20} color="#10B981" />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', color: 'var(--cream)', fontWeight: 700 }}>
                  24.2 MB / 60 FPS
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '6px' }}>
                  Hardware acceleration nominal
                </div>
              </div>

              <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--gold)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Storage Engine</span>
                  <Database size={20} color="var(--gold)" />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', color: 'var(--cream)', fontWeight: 700 }}>
                  localStorage Synced
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Prefix: bnb_state_v1 (reactive)
                </div>
              </div>

              <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--burgundy-glow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Simulated Latency</span>
                  <Terminal size={20} color="var(--burgundy-glow)" />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', color: 'var(--cream)', fontWeight: 700 }}>
                  18ms Local
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  0 dropouts detected
                </div>
              </div>
            </div>

            {/* System alerts */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '16px' }}>
                Active Telemetry Feeds
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {systemAlerts.map(alert => (
                  <div key={alert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--charcoal-1)', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: alert.severity === 'WARNING' ? '#D97706' : '#10B981' }}></span>
                      <span style={{ color: 'var(--cream)', fontSize: '0.9rem' }}>{alert.message}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {alert.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RBAC & ROLE INSPECTION */}
        {activeTab === 'rbac' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--cream)' }}>
                Demonstration Role Matrix & Permissions
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Brooks & Bonds multi-portal architecture enforces functional barriers between guests, floor staff, GMs, and systems engineers.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {/* Customer */}
              <div className="card" style={{ padding: '24px', borderTop: currentRole === UserRole.CUSTOMER ? '3px solid var(--gold)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ color: 'var(--cream)', margin: 0 }}>Customer</h4>
                  {currentRole === UserRole.CUSTOMER && <span className="badge badge-gold">ACTIVE</span>}
                </div>
                <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '18px', marginBottom: '20px' }}>
                  <li>Browse public menu & pairings</li>
                  <li>Table reservation with interactive map</li>
                  <li>In-venue QR dining & bill splitting</li>
                  <li>Mango Club loyalty tracking</li>
                </ul>
                <button 
                  onClick={() => setCurrentRole(UserRole.CUSTOMER)}
                  className={`btn ${currentRole === UserRole.CUSTOMER ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }}
                >
                  Switch to Customer
                </button>
              </div>

              {/* Staff */}
              <div className="card" style={{ padding: '24px', borderTop: currentRole === UserRole.STAFF ? '3px solid var(--burgundy-glow)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ color: 'var(--cream)', margin: 0 }}>Staff (Captains & Chefs)</h4>
                  {currentRole === UserRole.STAFF && <span className="badge badge-burgundy">ACTIVE</span>}
                </div>
                <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '18px', marginBottom: '20px' }}>
                  <li>Kitchen Display System (KDS) progression</li>
                  <li>Floor seating, walk-ins & table reset</li>
                  <li>Waitlist phone calling & seating</li>
                  <li>Resolve table server alerts</li>
                </ul>
                <button 
                  onClick={() => setCurrentRole(UserRole.STAFF)}
                  className={`btn ${currentRole === UserRole.STAFF ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }}
                >
                  Switch to Staff
                </button>
              </div>

              {/* Management */}
              <div className="card" style={{ padding: '24px', borderTop: currentRole === UserRole.MANAGEMENT ? '3px solid #10B981' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ color: 'var(--cream)', margin: 0 }}>Management (GM)</h4>
                  {currentRole === UserRole.MANAGEMENT && <span className="badge badge-gold">ACTIVE</span>}
                </div>
                <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '18px', marginBottom: '20px' }}>
                  <li>18% commission savings analytics</li>
                  <li>Live tap keg sensor monitoring</li>
                  <li>Instant menu catalog price editing</li>
                  <li>Corporate outing pipeline overview</li>
                </ul>
                <button 
                  onClick={() => setCurrentRole(UserRole.MANAGEMENT)}
                  className={`btn ${currentRole === UserRole.MANAGEMENT ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }}
                >
                  Switch to Management
                </button>
              </div>

              {/* Maintenance */}
              <div className="card" style={{ padding: '24px', borderTop: currentRole === UserRole.MAINTENANCE ? '3px solid #EF4444' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ color: 'var(--cream)', margin: 0 }}>Maintenance (Root)</h4>
                  {currentRole === UserRole.MAINTENANCE && <span className="badge badge-burgundy" style={{ background: '#EF4444', color: '#fff' }}>ACTIVE</span>}
                </div>
                <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '18px', marginBottom: '20px' }}>
                  <li>System audit log inspection</li>
                  <li>Full demo state wipe and reseed</li>
                  <li>Runtime feature flags toggle</li>
                  <li>Diagnostic health telemetry</li>
                </ul>
                <button 
                  onClick={() => setCurrentRole(UserRole.MAINTENANCE)}
                  className={`btn ${currentRole === UserRole.MAINTENANCE ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }}
                >
                  Switch to Maintenance
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM AUDIT LOG */}
        {activeTab === 'audit' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--cream)' }}>
                  Immutable Audit Ledger (Simulated)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  Tracks state transitions, table seatings, prices edits, and authentication events across all 4 portals.
                </p>
              </div>
              <div className="badge badge-gold">
                {auditLogs.length} Logged Entries
              </div>
            </div>

            <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'var(--charcoal-1)', borderBottom: '1px solid var(--charcoal-3)' }}>
                    <th style={{ padding: '12px 18px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>LOG ID</th>
                    <th style={{ padding: '12px 18px', color: 'var(--text-muted)' }}>TIMESTAMP</th>
                    <th style={{ padding: '12px 18px', color: 'var(--text-muted)' }}>ACTOR</th>
                    <th style={{ padding: '12px 18px', color: 'var(--text-muted)' }}>ACTION</th>
                    <th style={{ padding: '12px 18px', color: 'var(--text-muted)' }}>DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(log => (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--charcoal-3)' }}>
                      <td style={{ padding: '12px 18px', fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>{log.id}</td>
                      <td style={{ padding: '12px 18px', color: 'var(--text-muted)' }}>{log.timestamp}</td>
                      <td style={{ padding: '12px 18px', color: 'var(--cream)', fontWeight: 600 }}>{log.actor}</td>
                      <td style={{ padding: '12px 18px' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontSize: '0.75rem', 
                          background: 'var(--charcoal-3)', 
                          color: 'var(--champagne)', 
                          padding: '2px 8px', 
                          borderRadius: '4px' 
                        }}>
                          {log.action}
                        </span>
                      </td>
                      <td style={{ padding: '12px 18px', color: 'var(--text-muted)' }}>{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: DEMO FEATURE FLAGS */}
        {activeTab === 'flags' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--cream)' }}>
                Runtime Feature Flags
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Control client behaviors, simulated payment gateways, and animation shaders without redeploying code.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              <div className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ color: 'var(--cream)', margin: '0 0 4px 0' }}>ThreeUI Ambient Shader</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Renders amber & burgundy fluid caustics</div>
                </div>
                <button 
                  onClick={() => toggleFlag('ambientShader')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: flags.ambientShader ? '#10B981' : 'var(--text-muted)' }}
                >
                  {flags.ambientShader ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>

              <div className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ color: 'var(--cream)', margin: '0 0 4px 0' }}>Instant UPI Simulation</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Simulates Razorpay/GPay QR confirmation</div>
                </div>
                <button 
                  onClick={() => toggleFlag('upiSimulation')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: flags.upiSimulation ? '#10B981' : 'var(--text-muted)' }}
                >
                  {flags.upiSimulation ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>

              <div className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ color: 'var(--cream)', margin: '0 0 4px 0' }}>KDS Sound Effect</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Audible notification when new ticket arrives</div>
                </div>
                <button 
                  onClick={() => toggleFlag('kdsAudioBeep')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: flags.kdsAudioBeep ? '#10B981' : 'var(--text-muted)' }}
                >
                  {flags.kdsAudioBeep ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>

              <div className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ color: 'var(--cream)', margin: '0 0 4px 0' }}>Weekend Surge Capacity</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enforce waitlist gating on walk-ins</div>
                </div>
                <button 
                  onClick={() => toggleFlag('rushHourSurge')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: flags.rushHourSurge ? '#10B981' : 'var(--text-muted)' }}
                >
                  {flags.rushHourSurge ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
