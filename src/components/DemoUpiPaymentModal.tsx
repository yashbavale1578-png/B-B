import React, { useState } from 'react';
import type { UpiApp } from '../types';
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Smartphone, 
  RotateCcw,
  Info,
  Lock
} from 'lucide-react';

export interface DemoPaymentResult {
  transactionId: string;
  paymentApp: UpiApp;
  payerVpa: string;
  payeeVpa: string;
  timestamp: string;
  amount: number;
}

interface DemoUpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId?: string;
  customerName?: string;
  onPaymentSuccess: (result: DemoPaymentResult) => void;
}

export const DemoUpiPaymentModal: React.FC<DemoUpiPaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  orderId,
  customerName,
  onPaymentSuccess
}) => {
  const [selectedApp, setSelectedApp] = useState<UpiApp>('PhonePe');
  const [payerVpa, setPayerVpa] = useState<string>(() => {
    const slug = (customerName || 'patron').toLowerCase().replace(/[^a-z0-9]/g, '.');
    return `${slug}@okhdfcbank`;
  });
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);
  const [paymentState, setPaymentState] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'FAILED'>('IDLE');
  const [processingStep, setProcessingStep] = useState<string>('Connecting to NPCI Demo UPI Switch...');
  const [generatedTxnId, setGeneratedTxnId] = useState<string>('');

  if (!isOpen) return null;

  const upiAppsConfig: Array<{
    id: UpiApp;
    name: string;
    tagline: string;
    brandColor: string;
    accentColor: string;
    badgeText: string;
  }> = [
    {
      id: 'PhonePe',
      name: 'PhonePe',
      tagline: 'Instant UPI & QR Payments',
      brandColor: '#5f259f',
      accentColor: '#7b3dbd',
      badgeText: 'पे PhonePe'
    },
    {
      id: 'Google Pay',
      name: 'Google Pay',
      tagline: 'Tez UPI & Direct Bank Transfer',
      brandColor: '#1a73e8',
      accentColor: '#4285f4',
      badgeText: 'GPay'
    },
    {
      id: 'Paytm',
      name: 'Paytm',
      tagline: 'Paytm UPI & Wallet Gateway',
      brandColor: '#002970',
      accentColor: '#00b9f5',
      badgeText: 'Paytm'
    }
  ];

  const handleStartPayment = () => {
    setPaymentState('PROCESSING');
    setProcessingStep(`Dispatching simulated intent to ${selectedApp}...`);

    // Step 1
    const t1 = setTimeout(() => {
      setProcessingStep('Connecting to NPCI Demo UPI Switch...');
    }, 500);

    // Step 2
    const t2 = setTimeout(() => {
      setProcessingStep(`Authorizing ₹${amount} via ${selectedApp} sandbox...`);
    }, 1100);

    // Step 3 (Outcome)
    const t3 = setTimeout(() => {
      if (simulateFailure) {
        setPaymentState('FAILED');
      } else {
        const now = new Date();
        const formattedTimestamp = now.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }) + ', ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const txnId = `UPI-BB-${Date.now().toString().slice(-8)}`;
        setGeneratedTxnId(txnId);
        setPaymentState('SUCCESS');

        const result: DemoPaymentResult = {
          transactionId: txnId,
          paymentApp: selectedApp,
          payerVpa: payerVpa.trim() || 'patron@okhdfcbank',
          payeeVpa: 'brooksnbonns@icici',
          timestamp: formattedTimestamp,
          amount
        };

        onPaymentSuccess(result);
      }
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const handleRetry = () => {
    setSimulateFailure(false);
    setPaymentState('IDLE');
  };

  const currentAppConfig = upiAppsConfig.find(a => a.id === selectedApp) || upiAppsConfig[0];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3500,
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Demo UPI Payment Gateway"
    >
      <div
        className="glass-panel-elevated"
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(21, 19, 21, 0.98)',
          border: '1px solid var(--hairline-strong)',
          borderRadius: '16px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9)',
          overflow: 'hidden'
        }}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid var(--hairline)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0,0,0,0.25)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: currentAppConfig.brandColor,
                color: '#fff',
                fontSize: '11px',
                fontWeight: 800
              }}
            >
              UPI
            </span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--warm-cream)' }}>
                Demo UPI Payment
              </div>
              <div style={{ fontSize: '11px', color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                SANDBOX SIMULATION{orderId ? ` · ${orderId}` : ''}
              </div>
            </div>
          </div>

          {paymentState !== 'PROCESSING' && (
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Close UPI Payment modal"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {/* STAGE 1: IDLE / SELECT APPLICATION */}
          {paymentState === 'IDLE' && (
            <div>
              {/* Order Amount Banner */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '10px',
                  background: 'rgba(185, 154, 98, 0.1)',
                  border: '1px solid var(--gold-glow)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Total Payable Amount
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                    ₹{amount}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Merchant</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--warm-cream)' }}>
                    Brooks &amp; Bonds
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    brooksnbonns@icici
                  </div>
                </div>
              </div>

              {/* UPI App Selection */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '10px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Select UPI Application
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {upiAppsConfig.map((app) => {
                    const isSelected = selectedApp === app.id;
                    return (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApp(app.id)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '10px',
                          background: isSelected ? 'rgba(84, 26, 43, 0.35)' : 'rgba(25, 23, 25, 0.7)',
                          border: isSelected ? '1.5px solid var(--gold)' : '1px solid var(--hairline)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              background: app.brandColor,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontWeight: 800,
                              fontSize: '11px',
                              border: `1px solid ${app.accentColor}`
                            }}
                          >
                            {app.badgeText}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: isSelected ? 'var(--gold)' : 'var(--warm-cream)' }}>
                              {app.name}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                              {app.tagline}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: `2px solid ${isSelected ? 'var(--gold)' : 'var(--text-dim)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {isSelected && (
                            <div
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: 'var(--gold)'
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payer UPI ID Input */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '11.5px', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                  Simulated Customer UPI VPA
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="input-control"
                    value={payerVpa}
                    onChange={(e) => setPayerVpa(e.target.value)}
                    placeholder="yourname@bank"
                    style={{ fontSize: '13px', paddingLeft: '34px' }}
                  />
                  <Smartphone
                    size={15}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-dim)'
                    }}
                  />
                </div>
              </div>

              {/* Demo Notice Disclaimer */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px dashed var(--hairline)',
                  marginBottom: '18px',
                  fontSize: '11.5px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start'
                }}
              >
                <Info size={15} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--gold)' }}>DEMO SIMULATION:</strong> No actual bank login, PIN entry, or real funds are required. Seamlessly tests the full restaurant payment and kitchen ticketing pipeline.
                </div>
              </div>

              {/* Simulation Failure Switch (Testing Mode) */}
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: simulateFailure ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${simulateFailure ? '#EF4444' : 'var(--hairline)'}`,
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: simulateFailure ? '#fca5a5' : 'var(--warm-cream)' }}>
                    Simulate Payment Failure
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-dim)' }}>
                    Test gateway timeout &amp; retry recovery flow
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={simulateFailure}
                    onChange={(e) => setSimulateFailure(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: '#EF4444',
                      cursor: 'pointer'
                    }}
                  />
                </label>
              </div>

              {/* Confirm Payment Button */}
              <button
                onClick={handleStartPayment}
                className="btn btn-burgundy"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Lock size={15} />
                <span>Authorize &amp; Pay ₹{amount} via {selectedApp}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STAGE 2: PROCESSING (SIMULATED UPI INTENT & GATEWAY) */}
          {paymentState === 'PROCESSING' && (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: currentAppConfig.brandColor,
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 30px ${currentAppConfig.accentColor}88`,
                  position: 'relative'
                }}
              >
                <RefreshCw size={32} color="#fff" className="spin-slow" />
              </div>

              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--warm-cream)', marginBottom: '8px' }}>
                Processing UPI Payment
              </div>

              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>
                ₹{amount}
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--hairline)',
                  fontSize: '12px',
                  color: 'var(--champagne)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
                <span>{processingStep}</span>
              </div>

              <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '20px' }}>
                Simulating secure handshake with NPCI switch. Please do not refresh.
              </p>
            </div>
          )}

          {/* STAGE 3: FAILED (SIMULATED FAILURE & RETRY) */}
          {paymentState === 'FAILED' && (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '2px solid #EF4444',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AlertCircle size={32} color="#EF4444" />
              </div>

              <div style={{ fontSize: '18px', fontWeight: 700, color: '#fca5a5', marginBottom: '6px' }}>
                Payment Declined (Simulated)
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', maxWidth: '380px', margin: '0 auto 18px', lineHeight: 1.5 }}>
                Simulated Error: <strong>ERR_UPI_PSP_TIMEOUT_U30</strong>.<br />
                The demo gateway simulated a bank switch timeout or user decline. Your cart remains intact and no funds were debited.
              </p>

              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--hairline)',
                  marginBottom: '22px',
                  fontSize: '11.5px',
                  color: 'var(--text-dim)'
                }}
              >
                Amount attempted: <strong style={{ color: 'var(--warm-cream)' }}>₹{amount}</strong> via <strong>{selectedApp}</strong>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={onClose}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '12px', fontSize: '12px' }}
                >
                  Cancel
                </button>

                <button
                  onClick={handleRetry}
                  className="btn btn-burgundy"
                  style={{ flex: 1.5, padding: '12px', fontSize: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
                >
                  <RotateCcw size={14} />
                  <span>Retry Payment</span>
                </button>
              </div>
            </div>
          )}

          {/* STAGE 4: SUCCESS */}
          {paymentState === 'SUCCESS' && (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10B981',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CheckCircle2 size={36} color="#10B981" />
              </div>

              <div style={{ fontSize: '19px', fontWeight: 700, color: 'var(--warm-cream)', marginBottom: '4px' }}>
                Payment Successful!
              </div>

              <div style={{ fontSize: '13px', color: '#10B981', fontWeight: 600, marginBottom: '16px' }}>
                ₹{amount} Paid via {selectedApp}
              </div>

              <div
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--hairline)',
                  marginBottom: '20px',
                  textAlign: 'left',
                  fontSize: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-dim)' }}>Demo Txn ID:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)', fontWeight: 700 }}>
                    {generatedTxnId}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-dim)' }}>Payer VPA:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--champagne)' }}>
                    {payerVpa}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-dim)' }}>Order Status:</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>
                    TRANSMITTED TO KDS
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Your order is now live on the Staff KDS and patron order tracking.
              </p>

              <button
                onClick={onClose}
                className="btn btn-burgundy"
                style={{ width: '100%', padding: '12px', fontSize: '13px', fontWeight: 600 }}
              >
                View Official Receipt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
