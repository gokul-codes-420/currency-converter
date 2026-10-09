import React from 'react';

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Terms of Service</h1>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1.75rem' }}>Last updated: October 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', lineHeight: 1.7 }}>
        <p>
          By accessing or using the World Currency Converter website, you agree to comply with and be bound by the following terms of use.
        </p>

        <h3 style={{ marginTop: '0.5rem' }}>1. Informational Purpose Only</h3>
        <p>
          The rates, computations, and tables provided are intended solely for general informational, educational, and calculation assistance. They do not constitute formal investment, tax, or legal advice.
        </p>

        <h3 style={{ marginTop: '0.5rem' }}>2. Limitation of Liability</h3>
        <p>
          While we strive to ensure rates reflect official market benchmark feeds, currency markets are dynamic. World Currency Converter cannot be held liable for discrepancies, financial loss, or transaction fee differentials resulting from relying upon these estimates.
        </p>

        <h3 style={{ marginTop: '0.5rem' }}>3. Attribution and Trademarks</h3>
        <p>
          All trademarks, currency symbols, and sovereign identifiers are the property of their respective issuers. Data attribution is accorded to ExchangeRate-API in adherence with fair use terms.
        </p>
      </div>
    </div>
  );
}
