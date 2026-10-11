import React from 'react';
import type { Order, PaymentReceipt } from '../types';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Calendar, Clock, Sparkles } from 'lucide-react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order | null;
  receipt?: PaymentReceipt | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, order, receipt }) => {
  if (!isOpen) return null;

  const currentReceipt: PaymentReceipt = receipt || (order?.receipt as PaymentReceipt) || {
    transactionId: order?.payment_transaction_id || `UPI-BB-${Date.now().toString().slice(-8)}`,
    orderId: order?.id || 'BB-DEMO',
    amount: order?.total || 0,
    paymentMethod: order?.payment_method || 'UPI',
    paymentApp: order?.payment_app || 'PhonePe',
    paymentStatus: order?.payment_status || 'PAID',
    timestamp: order?.payment_timestamp || new Date().toLocaleString(),
    payerVpa: (order?.customerName || 'patron').toLowerCase().replace(/\s+/g, '.') + '@okhdfcbank',
    payeeVpa: 'brooksnbonns@icici'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const textContent = `
=====================================================
            BROOKS & BONDS BREWERY
         4, 100 Feet Rd, Koramangala 5th Block
             Bengaluru, Karnataka 560095
             GSTIN: 29AABCB1234F1Z9
=====================================================
DEMO TRANSACTION RECEIPT - NO REAL CURRENCY CHARGED
=====================================================

Transaction ID : ${currentReceipt.transactionId}
Order Number   : #${currentReceipt.orderId}
Date & Time    : ${currentReceipt.timestamp}
Payment Method : Demo UPI (${currentReceipt.paymentApp || currentReceipt.paymentMethod})
Status         : ${currentReceipt.paymentStatus}
Payer VPA      : ${currentReceipt.payerVpa || 'patron@upi'}
Merchant VPA   : ${currentReceipt.payeeVpa || 'brooksnbonns@icici'}

-----------------------------------------------------
ITEMS ORDERED:
${(order?.items || []).map(it => `  ${it.quantity}x ${it.menuItem.name.padEnd(28)} ₹${it.menuItem.price * it.quantity}`).join('\n') || '  1x Gastropub Dining Experience     ₹' + currentReceipt.amount}

-----------------------------------------------------
Subtotal       : ₹${order?.subtotal || currentReceipt.amount}
${order?.discount ? `Discount       : -₹${order.discount}\n` : ''}Taxes (GST 5%) : ₹${order?.gst_vat || Math.round(currentReceipt.amount * 0.05)}
${order?.delivery_fee ? `Delivery Fee   : ₹${order.delivery_fee}\n` : ''}TOTAL AMOUNT   : ₹${currentReceipt.amount}
=====================================================
Thank you for brewing with us! Cheers & Brew Safe!
=====================================================
    `.trim();

    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `receipt-${currentReceipt.orderId}-${currentReceipt.transactionId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getAppBadgeColor = (app?: string) => {
    switch (app) {
      case 'PhonePe':
        return { bg: '#5f259f', text: '#ffffff', border: '#7b3dbd' };
      case 'Google Pay':
        return { bg: '#1a73e8', text: '#ffffff', border: '#4285f4' };
      case 'Paytm':
        return { bg: '#002970', text: '#00b9f5', border: '#00b9f5' };
      default:
        return { bg: 'var(--burgundy)', text: 'var(--gold)', border: 'var(--gold)' };
    }
  };

  const appColor = getAppBadgeColor(currentReceipt.paymentApp);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 4000,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Payment Receipt"
    >
      <div
        className="printable-receipt glass-panel-elevated"
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'rgba(21, 19, 21, 0.98)',
          border: '1px solid var(--hairline-strong)',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.85)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Top Close bar */}
        <div 
          className="no-print"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 20px',
            borderBottom: '1px solid var(--hairline)',
            background: 'rgba(0,0,0,0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="var(--success)" />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>
              OFFICIAL DEMO RECEIPT
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
            aria-label="Close receipt"
          >
            <X size={18} />
          </button>
        </div>

        {/* Receipt Content Body */}
        <div style={{ padding: '24px 28px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--warm-cream)', letterSpacing: '0.05em' }}>
              BROOKS &amp; BONDS BREWERY
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              4, 100 Feet Road, Koramangala 5th Block, Bengaluru - 560095
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              GSTIN: 29AABCB1234F1Z9 · FSSAI Lic: 11219333000412
            </div>

            {/* Demo Watermark Notice */}
            <div
              style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '4px 12px',
                borderRadius: '9999px',
                background: 'rgba(185, 154, 98, 0.15)',
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                fontSize: '11px',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)'
              }}
            >
              SIMULATED UPI TRANSACTION · DEMO ONLY
            </div>
          </div>

          {/* Success Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              marginBottom: '20px'
            }}
          >
            <CheckCircle2 size={20} color="#10B981" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#10B981' }}>
                Payment Received · Status: {currentReceipt.paymentStatus}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Paid via {currentReceipt.paymentApp || currentReceipt.paymentMethod}
              </div>
            </div>
          </div>

          {/* Key Metadata Table */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              padding: '14px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--hairline)',
              fontSize: '11.5px',
              marginBottom: '20px'
            }}
          >
            <div>
              <div style={{ color: 'var(--text-dim)' }}>Order ID</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--warm-cream)' }}>
                #{currentReceipt.orderId}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-dim)' }}>Demo Txn ID</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gold)', fontSize: '11px', wordBreak: 'break-all' }}>
                {currentReceipt.transactionId}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-dim)' }}>Date &amp; Time</div>
              <div style={{ color: 'var(--warm-cream)', fontSize: '11px' }}>
                {currentReceipt.timestamp}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-dim)' }}>UPI Application</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    background: appColor.bg,
                    color: appColor.text,
                    border: `1px solid ${appColor.border}`
                  }}
                >
                  {currentReceipt.paymentApp || currentReceipt.paymentMethod}
                </span>
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-dim)' }}>Payer UPI VPA</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '11px' }}>
                {currentReceipt.payerVpa || 'patron@okhdfcbank'}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-dim)' }}>Merchant UPI VPA</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '11px' }}>
                {currentReceipt.payeeVpa || 'brooksnbonns@icici'}
              </div>
            </div>
          </div>

          {/* Items Summary */}
          {order?.items && order.items.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                Itemized Summary
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {order.items.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: 'var(--champagne)' }}>
                    <span>{it.quantity}x {it.menuItem.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>₹{it.menuItem.price * it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financial Breakdown */}
          <div
            style={{
              borderTop: '1px solid var(--hairline)',
              paddingTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>₹{order?.subtotal || currentReceipt.amount}</span>
            </div>

            {order?.discount ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold)' }}>
                <span>Coupon Discount</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>-₹{order.discount}</span>
              </div>
            ) : null}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>GST &amp; Microbrewery VAT (5%)</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>₹{order?.gst_vat || Math.round(currentReceipt.amount * 0.05)}</span>
            </div>

            {order?.delivery_fee ? (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery Charge</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₹{order.delivery_fee}</span>
              </div>
            ) : null}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
                fontWeight: 800,
                color: 'var(--warm-cream)',
                borderTop: '1px solid var(--hairline-strong)',
                paddingTop: '8px',
                marginTop: '4px'
              }}
            >
              <span>Amount Paid</span>
              <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                ₹{currentReceipt.amount}
              </span>
            </div>
          </div>

          {/* Signoff */}
          <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed var(--hairline)' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-dim)', margin: 0 }}>
              Koramangala 5th Block, Bengaluru · Serving artisanal brews since 2017
            </p>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div
          className="no-print"
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--hairline)',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            gap: '10px'
          }}
        >
          <button
            onClick={handlePrint}
            className="btn btn-outline"
            style={{ flex: 1, padding: '10px', fontSize: '12px' }}
          >
            <Printer size={15} />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={handleDownload}
            className="btn btn-outline"
            style={{ flex: 1, padding: '10px', fontSize: '12px' }}
          >
            <Download size={15} />
            <span>Download Slip</span>
          </button>

          <button
            onClick={onClose}
            className="btn btn-burgundy"
            style={{ flex: 1, padding: '10px', fontSize: '12px' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
