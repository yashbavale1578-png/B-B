import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sparkles, 
  ChefHat, 
  ShieldAlert, 
  Compass, 
  Database, 
  Play,
  RotateCcw
} from 'lucide-react';

interface DemoCentrePageProps {
  onNavigate?: (route: string) => void;
}

export const DemoCentrePage: React.FC<DemoCentrePageProps> = ({ onNavigate }) => {
  const { navigate, oneClickLogin, orders, taps, resetDemoData, addToast } = useStore();

  const handleNav = (route: string) => {
    if (onNavigate) onNavigate(route);
    else navigate(route);
  };

  const paidOrdersCount = orders.filter(o => o.payment_status === 'PAID').length;

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Header */}
      <section style={{ padding: '36px 0 24px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(184, 150, 90, 0.12)', border: '1px solid var(--hairline-strong)', marginBottom: '16px' }}>
            <Compass size={14} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', letterSpacing: '0.18em', color: 'var(--gold)', textTransform: 'uppercase' }}>
              Evaluation Showcase &amp; Architecture
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--warm-cream)', marginBottom: '16px', lineHeight: 1.15 }}>
            Demonstration Centre
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '16.5px', maxWidth: '720px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Welcome to the interactive Brooks &amp; Bonds demonstration. Experience seamless cross-portal synchronization between patron dining, kitchen operations, and systems diagnostics.
          </p>

          {/* Quick Stats Bar */}
          <div
            className="glass-panel"
            style={{
              maxWidth: '820px',
              margin: '0 auto 40px',
              padding: '18px 28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Active Taproom Taps
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--gold)', marginTop: '4px' }}>
                {taps.length} Craft Taps
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Live Orders Synced
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--champagne)', marginTop: '4px' }}>
                {orders.length} ({paidOrdersCount} Paid)
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Demo UPI Apps
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#38BDF8', marginTop: '4px' }}>
                PhonePe · GPay · Paytm
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Interactive Role Launchers */}
      <section className="container" style={{ maxWidth: '1200px', marginBottom: '64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
            Choose Your Operational Viewpoint
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14.5px' }}>
            Launch directly into any of the 3 portals with one click or view login forms with documented credentials.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {/* 1. Enter as Customer */}
          <div
            className="glass-panel-elevated"
            style={{
              padding: '36px 30px',
              borderTop: '4px solid var(--burgundy-bright)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--burgundy) 0%, rgba(139, 29, 63, 0.4) 100%)',
                    border: '1.5px solid var(--hairline-strong)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Sparkles size={24} color="var(--gold)" />
                </div>
                <span className="badge badge-burgundy" style={{ fontSize: '11px' }}>Role 1 · Patron</span>
              </div>

              <h3 style={{ fontSize: '22px', color: 'var(--warm-cream)', marginBottom: '10px' }}>
                Patron Dining Experience
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                Experience the customer interface: browse the 6 craft taps, build an artisanal food order, complete simulated UPI checkout, and view branded receipts.
              </p>

              <div style={{ background: 'rgba(17, 16, 18, 0.8)', border: '1px solid var(--hairline)', borderRadius: '8px', padding: '14px', marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--gold)', marginBottom: '6px' }}>
                  DEMO PATRON:
                </div>
                <div style={{ fontSize: '13px', color: 'var(--warm-cream)' }}>
                  Name: <strong>Arun Kumar (VIP Patron)</strong>
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  Login: <code>arun.vip@koramangala.in</code> / <code>customer123</code>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                id="demo-enter-customer-btn"
                onClick={() => oneClickLogin('CUSTOMER')}
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
              >
                <Play size={16} />
                <span>Enter as Customer</span>
              </button>
              <button
                onClick={() => handleNav('login/customer')}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
              >
                Open Customer Sign In Form
              </button>
            </div>
          </div>

          {/* 2. Enter as Staff */}
          <div
            className="glass-panel-elevated"
            style={{
              padding: '36px 30px',
              borderTop: '4px solid #D97706',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.3) 0%, rgba(217, 119, 6, 0.1) 100%)',
                    border: '1.5px solid rgba(217, 119, 6, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ChefHat size={24} color="#F59E0B" />
                </div>
                <span className="badge" style={{ background: 'rgba(217, 119, 6, 0.18)', color: '#FCD34D', border: '1px solid rgba(217, 119, 6, 0.4)', fontSize: '11px' }}>
                  Role 2 · Operations
                </span>
              </div>

              <h3 style={{ fontSize: '22px', color: 'var(--warm-cream)', marginBottom: '10px' }}>
                Staff Kitchen &amp; Floor Operations
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                Experience the operational back-of-house: inspect incoming tickets, verify simulated payment states in real time, transition kitchen prep stages, and clear tables.
              </p>

              <div style={{ background: 'rgba(17, 16, 18, 0.8)', border: '1px solid var(--hairline)', borderRadius: '8px', padding: '14px', marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#F59E0B', marginBottom: '6px' }}>
                  DEMO STAFF LEAD:
                </div>
                <div style={{ fontSize: '13px', color: 'var(--warm-cream)' }}>
                  Name: <strong>Mathew V. (Floor Lead &amp; KDS)</strong>
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  Login: <code>EMP-402</code> / <code>staff123</code>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                id="demo-enter-staff-btn"
                onClick={() => oneClickLogin('STAFF')}
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
              >
                <Play size={16} />
                <span>Enter as Staff</span>
              </button>
              <button
                onClick={() => handleNav('login/staff')}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
              >
                Open Staff Sign In Form
              </button>
            </div>
          </div>

          {/* 3. Enter as Maintenance */}
          <div
            className="glass-panel-elevated"
            style={{
              padding: '36px 30px',
              borderTop: '4px solid #EF4444',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(239, 68, 68, 0.1) 100%)',
                    border: '1.5px solid rgba(239, 68, 68, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ShieldAlert size={24} color="#EF4444" />
                </div>
                <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#FCA5A5', border: '1px solid rgba(239, 68, 68, 0.4)', fontSize: '11px' }}>
                  Role 3 · Root Access
                </span>
              </div>

              <h3 style={{ fontSize: '22px', color: 'var(--warm-cream)', marginBottom: '10px' }}>
                Maintenance &amp; Diagnostics
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                Systems command console: inspect Cold-Room keg sensors, review audit logs of all user actions, toggle feature flags, and reset demo data to pristine initial state.
              </p>

              <div style={{ background: 'rgba(17, 16, 18, 0.8)', border: '1px solid var(--hairline)', borderRadius: '8px', padding: '14px', marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#EF4444', marginBottom: '6px' }}>
                  DEMO ADMINISTRATOR:
                </div>
                <div style={{ fontSize: '13px', color: 'var(--warm-cream)' }}>
                  Name: <strong>DevOps &amp; Systems Lead</strong>
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  Login: <code>SYS-ADMIN-01</code> / <code>maint123</code>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                id="demo-enter-maint-btn"
                onClick={() => oneClickLogin('MAINTENANCE')}
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
              >
                <Play size={16} />
                <span>Enter as Maintenance</span>
              </button>
              <button
                onClick={() => handleNav('login/maintenance')}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
              >
                Open Maintenance Sign In Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Guided Demonstration Walkthrough Roadmap */}
      <section className="container" style={{ maxWidth: '1080px', marginBottom: '60px' }}>
        <div className="glass-panel" style={{ padding: '40px 36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
              Recommended Evaluation Flow
            </span>
            <h2 style={{ fontSize: '26px', color: 'var(--warm-cream)', marginTop: '8px', marginBottom: '8px' }}>
              The Complete Connected Journey
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '620px', margin: '0 auto' }}>
              Test the end-to-end synchronization across roles in four easy steps:
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(25, 23, 27, 0.7)', padding: '20px', borderRadius: '10px', border: '1px solid var(--hairline)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--burgundy)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                1
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--warm-cream)', marginBottom: '4px' }}>
                  Customer Orders with Simulated UPI
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                  Log in as Customer (or click "One-Click Demo Entry"), navigate to <strong>Online Ordering (/#/order)</strong> or <strong>Table QR (/#/table-qr)</strong>, add items to cart, and choose <strong>PhonePe, Google Pay, or Paytm</strong>. Confirm payment through the simulated UPI sequence.
                </p>
              </div>
              <button
                onClick={() => {
                  oneClickLogin('CUSTOMER');
                  handleNav('order');
                }}
                className="btn btn-outline"
                style={{ fontSize: '12px', padding: '6px 14px', flexShrink: 0 }}
              >
                Start Step 1 →
              </button>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(25, 23, 27, 0.7)', padding: '20px', borderRadius: '10px', border: '1px solid var(--hairline)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--burgundy)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                2
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--warm-cream)', marginBottom: '4px' }}>
                  Receipt Verification &amp; Account History
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                  Upon successful payment, view the detailed UPI receipt modal with unique Transaction ID, timestamp, and order breakdown. Verify the order appears in <strong>Customer Account (/#/account)</strong>.
                </p>
              </div>
              <button
                onClick={() => {
                  oneClickLogin('CUSTOMER');
                  handleNav('account');
                }}
                className="btn btn-outline"
                style={{ fontSize: '12px', padding: '6px 14px', flexShrink: 0 }}
              >
                Inspect Account →
              </button>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(25, 23, 27, 0.7)', padding: '20px', borderRadius: '10px', border: '1px solid var(--hairline)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#D97706', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                3
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--warm-cream)', marginBottom: '4px' }}>
                  Staff KDS Receives the Exact Customer Order
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                  Sign in as Staff and navigate to <strong>Staff Operations (/#/staff-portal)</strong>. See that the customer's actual order and payment status are reflected in the live Kitchen Display. Move tickets through "PREPARING" and "READY".
                </p>
              </div>
              <button
                onClick={() => {
                  oneClickLogin('STAFF');
                  handleNav('staff-portal');
                }}
                className="btn btn-outline"
                style={{ fontSize: '12px', padding: '6px 14px', flexShrink: 0 }}
              >
                Open Staff KDS →
              </button>
            </div>

            {/* Step 4 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(25, 23, 27, 0.7)', padding: '20px', borderRadius: '10px', border: '1px solid var(--hairline)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EF4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                4
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--warm-cream)', marginBottom: '4px' }}>
                  Maintenance Command Audits Activity
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                  Sign in as Maintenance and navigate to <strong>Maintenance Portal (/#/maint-portal)</strong>. Inspect the live audit trail of your login, ordering, and status change events. Toggle feature flags, test keg sensors, and reseed demo data.
                </p>
              </div>
              <button
                onClick={() => {
                  oneClickLogin('MAINTENANCE');
                  handleNav('maint-portal');
                }}
                className="btn btn-outline"
                style={{ fontSize: '12px', padding: '6px 14px', flexShrink: 0 }}
              >
                Open Maintenance →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Database State Controls & Reseed */}
      <section className="container" style={{ maxWidth: '1080px' }}>
        <div
          style={{
            background: 'rgba(17, 16, 18, 0.85)',
            border: '1px solid var(--hairline)',
            borderRadius: '12px',
            padding: '24px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontSize: '14px', fontWeight: 600 }}>
              <Database size={16} />
              <span>Demonstration Database State</span>
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
              All interactions persist cleanly in your browser's localStorage. Want to reset to the pristine initial state?
            </div>
          </div>

          <button
            onClick={() => {
              resetDemoData();
              addToast('Pristine Seed Restored', 'Demo database reloaded with fresh sample data.', 'success');
            }}
            className="btn btn-outline"
            style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RotateCcw size={14} />
            <span>Reset Demo Data to Initial State</span>
          </button>
        </div>
      </section>
    </div>
  );
};
