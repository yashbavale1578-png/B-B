import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sparkles, 
  ChefHat, 
  ShieldAlert, 
  ArrowRight, 
  Key, 
  Compass, 
  CheckCircle2, 
  Info
} from 'lucide-react';

interface LoginPageProps {
  onNavigate?: (route: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { navigate, oneClickLogin, isAuthenticated, currentUser, logout } = useStore();

  const handleNav = (route: string) => {
    if (onNavigate) onNavigate(route);
    else navigate(route);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Hero Header */}
      <section style={{ padding: '32px 0 24px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(184, 150, 90, 0.12)', border: '1px solid var(--hairline-strong)', marginBottom: '16px' }}>
            <Key size={14} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', letterSpacing: '0.18em', color: 'var(--gold)', textTransform: 'uppercase' }}>
              Authentication &amp; Role Gateway
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', color: 'var(--warm-cream)', marginBottom: '16px', lineHeight: 1.15 }}>
            Demo Authentication &amp; Portal Access
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '680px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Select your operational role below to enter the live demonstration platform. Each portal is connected to shared live state across ordering, kitchen dispatch, and systems command.
          </p>

          {/* Active Session Callout if logged in */}
          {isAuthenticated && (
            <div 
              className="glass-panel" 
              style={{ 
                maxWidth: '640px', 
                margin: '0 auto 32px', 
                padding: '16px 24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                borderLeft: '4px solid var(--gold)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                <CheckCircle2 size={18} color="var(--gold)" />
                <div>
                  <div style={{ fontSize: '13.5px', color: 'var(--warm-cream)', fontWeight: 600 }}>
                    Active Session: {currentUser.name} ({currentUser.role})
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    You are already authenticated in the browser.
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    if (currentUser.role === 'CUSTOMER') handleNav('account');
                    else if (currentUser.role === 'STAFF') handleNav('staff-portal');
                    else if (currentUser.role === 'MAINTENANCE') handleNav('maint-portal');
                    else handleNav('account');
                  }}
                  className="btn btn-gold"
                  style={{ fontSize: '12px', padding: '7px 16px' }}
                >
                  Enter Active Portal
                </button>
                <button
                  onClick={logout}
                  className="btn btn-outline"
                  style={{ fontSize: '12px', padding: '7px 14px' }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* Sandbox Security Notice */}
          <div 
            style={{ 
              maxWidth: '820px', 
              margin: '0 auto 40px', 
              background: 'rgba(25, 23, 27, 0.75)', 
              border: '1px solid var(--hairline)', 
              borderRadius: '10px', 
              padding: '14px 20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              textAlign: 'left',
              fontSize: '12.5px',
              color: 'var(--text-muted)'
            }}
          >
            <Info size={18} color="var(--gold)" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: 'var(--champagne)' }}>Commercial Demonstration Sandbox:</strong> This application demonstrates a multi-tier hospitality platform with simulated client-side authentication. For frictionless portfolio review, demo credentials and one-click demo login buttons are provided for all roles.
            </div>
          </div>
        </div>
      </section>

      {/* 3 Main Role Cards */}
      <section className="container" style={{ maxWidth: '1200px', marginBottom: '48px' }}>
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '28px' 
          }}
        >
          {/* Card 1: Customer */}
          <div 
            className="glass-panel-elevated"
            style={{ 
              padding: '36px 30px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              borderTop: '3px solid var(--burgundy-bright)',
              transition: 'transform 0.25s ease, border-color 0.25s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div 
                  style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '12px', 
                    background: 'linear-gradient(135deg, var(--burgundy) 0%, rgba(139, 29, 63, 0.3) 100%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid rgba(232, 220, 197, 0.2)'
                  }}
                >
                  <Sparkles size={24} color="var(--gold)" />
                </div>
                <span className="badge badge-burgundy" style={{ fontSize: '11px', padding: '4px 10px' }}>
                  Patron Portal
                </span>
              </div>

              <h2 style={{ fontSize: '24px', color: 'var(--warm-cream)', marginBottom: '10px' }}>
                Patron &amp; Dining Guest
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                Complete customer journey: browse craft brews, place dine-in/takeaway orders with simulated PhonePe/GPay/Paytm UPI, inspect downloadable receipts, and track Mango Club VIP rewards.
              </p>

              <div style={{ background: 'rgba(17, 16, 18, 0.8)', border: '1px solid var(--hairline)', borderRadius: '8px', padding: '14px', marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '6px' }}>
                  DEMO CREDENTIALS:
                </div>
                <div style={{ fontSize: '13px', color: 'var(--warm-cream)' }}>
                  Email: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--champagne)' }}>arun.vip@koramangala.in</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--warm-cream)' }}>
                  Password: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--champagne)' }}>customer123</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => handleNav('login/customer')}
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Patron Sign In Form</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => oneClickLogin('CUSTOMER')}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
              >
                One-Click Demo Entry
              </button>
            </div>
          </div>

          {/* Card 2: Staff */}
          <div 
            className="glass-panel-elevated"
            style={{ 
              padding: '36px 30px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              borderTop: '3px solid #D97706',
              transition: 'transform 0.25s ease, border-color 0.25s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div 
                  style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '12px', 
                    background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.25) 0%, rgba(217, 119, 6, 0.08) 100%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid rgba(217, 119, 6, 0.35)'
                  }}
                >
                  <ChefHat size={24} color="#F59E0B" />
                </div>
                <span className="badge" style={{ background: 'rgba(217, 119, 6, 0.18)', color: '#FCD34D', border: '1px solid rgba(217, 119, 6, 0.4)', fontSize: '11px', padding: '4px 10px' }}>
                  Floor Lead &amp; KDS
                </span>
              </div>

              <h2 style={{ fontSize: '24px', color: 'var(--warm-cream)', marginBottom: '10px' }}>
                Staff Operations &amp; KDS
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                Floor operations and Kitchen Display System: inspect incoming tickets, see simulated UPI payment confirmations live, advance cooking stages (RECEIVED → PREPARING → READY), and manage table occupancy.
              </p>

              <div style={{ background: 'rgba(17, 16, 18, 0.8)', border: '1px solid var(--hairline)', borderRadius: '8px', padding: '14px', marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#F59E0B', letterSpacing: '0.1em', marginBottom: '6px' }}>
                  DEMO CREDENTIALS:
                </div>
                <div style={{ fontSize: '13px', color: 'var(--warm-cream)' }}>
                  ID: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--champagne)' }}>EMP-402</span> (or <span style={{ fontFamily: 'var(--font-mono)' }}>mathew.staff@brooksbonds.in</span>)
                </div>
                <div style={{ fontSize: '13px', color: 'var(--warm-cream)' }}>
                  Password: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--champagne)' }}>staff123</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => handleNav('login/staff')}
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Staff Sign In Form</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => oneClickLogin('STAFF')}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
              >
                One-Click Demo Entry
              </button>
            </div>
          </div>

          {/* Card 3: Maintenance */}
          <div 
            className="glass-panel-elevated"
            style={{ 
              padding: '36px 30px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              borderTop: '3px solid #EF4444',
              transition: 'transform 0.25s ease, border-color 0.25s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div 
                  style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '12px', 
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(239, 68, 68, 0.08) 100%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid rgba(239, 68, 68, 0.35)'
                  }}
                >
                  <ShieldAlert size={24} color="#EF4444" />
                </div>
                <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#FCA5A5', border: '1px solid rgba(239, 68, 68, 0.4)', fontSize: '11px', padding: '4px 10px' }}>
                  Root Privilege / Level 4
                </span>
              </div>

              <h2 style={{ fontSize: '24px', color: 'var(--warm-cream)', marginBottom: '10px' }}>
                Maintenance &amp; Systems
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                Diagnostics &amp; Controller command: monitor 6-tap cold room keg levels, toggle operational feature flags, inspect system audit trail, and reseed demo database to pristine state.
              </p>

              <div style={{ background: 'rgba(17, 16, 18, 0.8)', border: '1px solid var(--hairline)', borderRadius: '8px', padding: '14px', marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#EF4444', letterSpacing: '0.1em', marginBottom: '6px' }}>
                  DEMO CREDENTIALS:
                </div>
                <div style={{ fontSize: '13px', color: 'var(--warm-cream)' }}>
                  ID: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--champagne)' }}>SYS-ADMIN-01</span> (or <span style={{ fontFamily: 'var(--font-mono)' }}>sysadmin@brooksbonds.in</span>)
                </div>
                <div style={{ fontSize: '13px', color: 'var(--warm-cream)' }}>
                  Password: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--champagne)' }}>maint123</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => handleNav('login/maintenance')}
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Maintenance Sign In Form</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => oneClickLogin('MAINTENANCE')}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
              >
                One-Click Demo Entry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Centre Presentation Banner */}
      <section className="container" style={{ maxWidth: '1200px' }}>
        <div 
          className="glass-panel-burgundy" 
          style={{ 
            padding: '36px 40px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '24px' 
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Compass size={15} />
              <span>Interactive Evaluation Tour</span>
            </div>
            <h3 style={{ fontSize: '24px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
              Looking for a Complete Demonstration Walkthrough?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>
              Visit the Demo Centre to understand the complete end-to-end user journey across all three roles, inspect live synchronizations, and access one-click role switching.
            </p>
          </div>
          <button
            onClick={() => handleNav('demo')}
            className="btn btn-gold"
            style={{ padding: '12px 28px', whiteSpace: 'nowrap' }}
          >
            <span>Open Demo Centre</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
