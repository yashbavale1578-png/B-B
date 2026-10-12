import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  AlertCircle, 
  ArrowLeft,
  KeyRound
} from 'lucide-react';

interface CustomerLoginPageProps {
  onNavigate?: (route: string) => void;
}

export const CustomerLoginPage: React.FC<CustomerLoginPageProps> = ({ onNavigate }) => {
  const { login, oneClickLogin, navigate } = useStore();
  const [identifier, setIdentifier] = useState('arun.vip@koramangala.in');
  const [password, setPassword] = useState('customer123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNav = (route: string) => {
    if (onNavigate) onNavigate(route);
    else navigate(route);
  };

  const handleFillDemo = () => {
    setIdentifier('arun.vip@koramangala.in');
    setPassword('customer123');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login('CUSTOMER', identifier, password, rememberMe);
      if (!result.success) {
        setError(result.error || 'Authentication failed. Please check your credentials.');
      }
    } catch {
      setError('An unexpected error occurred during demo sign in.');
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

        {/* Login Card */}
        <div 
          className="glass-panel-elevated"
          style={{
            padding: '40px 36px',
            borderRadius: '16px',
            borderTop: '3px solid var(--burgundy-bright)',
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
                background: 'linear-gradient(135deg, var(--burgundy) 0%, rgba(139, 29, 63, 0.4) 100%)',
                border: '1.5px solid var(--hairline-strong)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}
            >
              <Sparkles size={26} color="var(--gold)" />
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Patron Portal Sign In
            </div>
            <h1 style={{ fontSize: '28px', color: 'var(--warm-cream)', marginBottom: '8px' }}>
              Demo Patron Sign In
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5 }}>
              Access your reservations, live kitchen order tickets, and The Mango Club VIP rewards.
            </p>
          </div>

          {/* Quick Demo Credentials Callout */}
          <div
            style={{
              background: 'rgba(23, 20, 24, 0.85)',
              border: '1px solid var(--hairline)',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                Demo Patron Account
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
              <div>Email: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>arun.vip@koramangala.in</code></div>
              <div>Password: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>customer123</code></div>
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

          {/* Main Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label 
                htmlFor="customer-identifier"
                style={{ 
                  display: 'block', 
                  fontSize: '13px', 
                  color: 'var(--warm-cream)', 
                  marginBottom: '8px',
                  fontWeight: 500
                }}
              >
                Email or Mobile Number
              </label>
              <div style={{ position: 'relative' }}>
                <Mail 
                  size={16} 
                  color="var(--text-dim)" 
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
                />
                <input
                  id="customer-identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. arun.vip@koramangala.in"
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
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--hairline)')}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label 
                  htmlFor="customer-password"
                  style={{ 
                    fontSize: '13px', 
                    color: 'var(--warm-cream)', 
                    fontWeight: 500
                  }}
                >
                  Password
                </label>
                <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  Demo: customer123
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock 
                  size={16} 
                  color="var(--text-dim)" 
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
                />
                <input
                  id="customer-password"
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
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--hairline)')}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--burgundy-bright)', cursor: 'pointer' }}
              />
              <label htmlFor="remember-me" style={{ cursor: 'pointer' }}>
                Remember demo session on this device
              </label>
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
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as Patron</span>
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
              OR INSTANT EVALUATION
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--hairline)' }} />
          </div>

          {/* One Click Button */}
          <button
            id="customer-one-click-btn"
            type="button"
            onClick={() => oneClickLogin('CUSTOMER')}
            className="btn btn-outline"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '13.5px',
              justifyContent: 'center',
              background: 'rgba(184, 150, 90, 0.06)'
            }}
          >
            <KeyRound size={15} color="var(--gold)" />
            <span>One-Click Demo Sign In (Arun Kumar)</span>
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
              onClick={() => handleNav('login/staff')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Switch to Staff Login →
            </button>
            <button
              type="button"
              onClick={() => handleNav('demo')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Open Demo Centre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
