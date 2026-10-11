import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 9999,
        maxWidth: '380px',
        width: 'calc(100vw - 48px)'
      }}
      role="region"
      aria-label="System Notifications"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isAlert = toast.type === 'alert';

        return (
          <div
            key={toast.id}
            className="glass-panel-elevated"
            style={{
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              borderLeft: `4px solid ${
                isSuccess ? 'var(--success)' : isAlert ? 'var(--danger)' : 'var(--gold)'
              }`,
              boxShadow: '0 12px 36px rgba(0,0,0,0.7)',
              animation: 'fadeIn 0.25s ease-out'
            }}
          >
            <div style={{ marginTop: '2px', flexShrink: 0 }}>
              {isSuccess && <CheckCircle2 size={18} color="var(--success)" />}
              {isAlert && <AlertTriangle size={18} color="var(--danger)" />}
              {!isSuccess && !isAlert && <Info size={18} color="var(--gold)" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--warm-cream)', marginBottom: '2px' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
