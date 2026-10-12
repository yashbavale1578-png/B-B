import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ChefHat, 
  ArrowRight, 
  Lock, 
  BadgeCheck, 
  AlertCircle, 
  ArrowLeft,
  KeyRound,
  Layers
} from 'lucide-react';

interface StaffLoginPageProps {
  onNavigate?: (route: string) => void;
}

export const StaffLoginPage: React.FC<StaffLoginPageProps> = ({ onNavigate }) => {
  const { login, oneClickLogin, navigate } = useStore();
  const [identifier, setIdentifier] = useState('mathew.staff@brooksbonds.in');
  const [password, setPassword] = useState('staff123');
  const [station, setStation] = useState('kds');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNav = (route: string) => {
    if (onNavigate) onNavigate(route);
    else navigate(route);
  };

  const handleFillDemo = () => {
    setIdentifier('mathew.staff@brooksbonds.in');
    setPassword('staff123');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login('STAFF', identifier, password, true);
      if (!result.success) {
        setError(result.error || 'Invalid staff credentials.');
      }
    } catch {
      setError('Staff terminal authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px', minHeight: '100vh', paddingBottom: '96px' }}>
      <div className="container" style={{ maxWidth: '540px' }}>
        {/* Back Link */}
        <button
          onClick={() => handleNav('login')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13.5px',
            cursor: 'pointer',
            padding: 0,
            marginBottom: '24px',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={16} />
          <span>Back to Role Selector</span>
        </button>

        {/* Staff Card */}
        <div 
          className="glass-panel-elevated"
          style={{
            padding: '40px 36px',
            borderRadius: '16px',
            borderTop: '3px solid #D97706',
            position: 'relative'
          }}
        >
          {/* Card Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.3) 0%, rgba(217, 119, 6, 0.1) 100%)',
                border: '1.5px solid rgba(217, 119, 6, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}
            >
              <ChefHat size={26} color="#F59E0B" />
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: '#F59E0B', textTransform: 'uppercase', marginBottom: '6px' }}>
              Floor Lead &amp; Kitchen Dispatch
            </div>
            <h1 style={{ fontSize: '28px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
              Staff Terminal Login
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5 }}>
              Access live KDS tickets, floor table statuses, waitlist dispatch, and server call notifications.
            </p>
          </div>

          {/* Quick Demo Credentials Callout */}
          <div
            style={{
              background: 'rgba(23, 20, 24, 0.85)',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#F59E0B', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                Demo Staff Account
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--champagne)',
                  fontSize: '12px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Auto-Fill Credentials
              </button>
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--warm-cream)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Employee ID: <code style={{ fontFamily: 'var(--font-mono)', color: '#FCD34D' }}>EMP-402</code> (or <code style={{ fontFamily: 'var(--font-mono)' }}>mathew.staff@brooksbonds.in</code>)</div>
              <div>Password: <code style={{ fontFamily: 'var(--font-mono)', color: '#FCD34D' }}>staff123</code></div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '8px',
                padding: '12px 14px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#FCA5A5',
                fontSize: '13px'
              }}
              role="alert"
            >
              <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
              <div>{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label 
                htmlFor="staff-identifier"
                style={{ 
                  display: 'block', 
                  fontSize: '13px', 
                  color: 'var(--warm-cream)', 
                  marginBottom: '8px',
                  fontWeight: 500
                }}
              >
                Employee ID or Work Email
              </label>
              <div style={{ position: 'relative' }}>
                <BadgeCheck 
                  size={16} 
                  color="var(--text-dim)" 
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
                />
                <input
                  id="staff-identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. EMP-402 or mathew.staff@brooksbonds.in"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    background: 'rgba(12, 11, 14, 0.8)',
                    border: '1px solid var(--hairline)',
                    borderRadius: '8px',
                    color: 'var(--warm-cream)',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#D97706')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--hairline)')}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label 
                  htmlFor="staff-password"
                  style={{ 
                    fontSize: '13px', 
                    color: 'var(--warm-cream)', 
                    fontWeight: 500
                  }}
                >
                  Terminal Password / PIN
                </label>
                <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  Demo: staff123
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock 
                  size={16} 
                  color="var(--text-dim)" 
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
                />
                <input
                  id="staff-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    background: 'rgba(12, 11, 14, 0.8)',
                    border: '1px solid var(--hairline)',
                    borderRadius: '8px',
                    color: 'var(--warm-cream)',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#D97706')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--hairline)')}
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="staff-station"
                style={{ 
                  display: 'block', 
                  fontSize: '13px', 
                  color: 'var(--warm-cream)', 
                  marginBottom: '8px',
                  fontWeight: 500
                }}
              >
                Default Dispatch Station
              </label>
              <div style={{ position: 'relative' }}>
                <Layers 
                  size={16} 
                  color="var(--text-dim)" 
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
                />
                <select
                  id="staff-station"
                  value={station}
                  onChange={(e) => setStation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    background: 'rgba(12, 11, 14, 0.8)',
                    border: '1px solid var(--hairline)',
                    borderRadius: '8px',
                    color: 'var(--warm-cream)',
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="kds">Main Kitchen KDS Display</option>
                  <option value="floor-1">Level 1: Brewery Bar Dispatch</option>
                  <option value="floor-2">Level 2: Dance Floor Stations</option>
                  <option value="floor-3">Level 3: Open-Air Rooftop</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '14px',
                fontWeight: 600,
                justifyContent: 'center',
                marginTop: '4px'
              }}
            >
              {loading ? (
                <span>Validating Terminal Access...</span>
              ) : (
                <>
                  <span>Sign In as Staff Lead</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              margin: '24px 0', 
              color: 'var(--text-dim)', 
              fontSize: '12px' 
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'var(--hairline)' }} />
            <span style={{ padding: '0 12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              OR ONE-CLICK DEMO
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--hairline)' }} />
          </div>

          {/* One Click Button */}
          <button
            id="staff-one-click-btn"
            type="button"
            onClick={() => oneClickLogin('STAFF')}
            className="btn btn-outline"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '13.5px',
              justifyContent: 'center',
              background: 'rgba(217, 119, 6, 0.08)',
              borderColor: 'rgba(217, 119, 6, 0.4)'
            }}
          >
            <KeyRound size={15} color="#F59E0B" />
            <span>One-Click Demo Sign In (Mathew V.)</span>
          </button>

          {/* Footer role links */}
          <div 
            style={{ 
              marginTop: '28px', 
              paddingTop: '20px', 
              borderTop: '1px solid var(--hairline)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: '12px', 
              color: 'var(--text-muted)' 
            }}
          >
            <button
              type="button"
              onClick={() => handleNav('login/customer')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              ← Switch to Patron Login
            </button>
            <button
              type="button"
              onClick={() => handleNav('login/maintenance')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Maintenance Command →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
