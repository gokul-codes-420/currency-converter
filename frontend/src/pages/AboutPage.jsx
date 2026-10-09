import React from 'react';
import { Database, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="hero-header" style={{ marginBottom: '2.5rem' }}>
        <h1 className="hero-title">About World Currency Converter</h1>
        <p className="hero-subtitle">
          Engineered for fast, reliable, transparent currency calculations and global foreign exchange tracking.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={20} style={{ color: 'var(--text-main)' }} />
            <span>Exchange Rate Data Source & Reliability</span>
          </h2>
          <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>
            World Currency Converter connects directly with <strong>ExchangeRate-API</strong>, aggregating reference exchange rates compiled from central banking authorities (such as the European Central Bank, US Federal Reserve benchmarks, and regional monetary institutions) and liquidity market providers.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Rates are updated periodically and cached efficiently to minimize latency. Whenever a conversion is performed, the application stamps the result with the official published timestamp of the source rate feed.
          </p>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={20} style={{ color: 'var(--text-main)' }} />
            <span>Mathematical Precision & Cross-Rate Arbitrage</span>
          </h2>
          <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>
            When converting between any two arbitrary world currencies (for example, Norwegian Krone to Indian Rupee), the engine applies standard international banking cross-rate equations:
          </p>
          <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', fontFamily: 'monospace', fontSize: '0.92rem', marginBottom: '1rem' }}>
            Rate(From → To) = Rate(Base → To) / Rate(Base → From)
            <br />
            Converted Amount = Input Amount × Rate(From → To)
          </div>
          <p style={{ lineHeight: 1.7 }}>
            Calculations preserve multi-decimal precision throughout intermediate steps, rounding only when formatting for localized user presentation.
          </p>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} style={{ color: 'var(--text-main)' }} />
            <span>Financial & Informational Disclaimer</span>
          </h2>
          <p style={{ lineHeight: 1.7 }}>
            This website provides exchange rate valuations for informational and analytical purposes only. Foreign exchange rates in commercial retail transactions (e.g. airport kiosks, bank wire fees, credit card spreads) typically incorporate broker margins or commissions that differ slightly from mid-market wholesale reference rates.
          </p>
        </div>
      </div>
    </div>
  );
}
