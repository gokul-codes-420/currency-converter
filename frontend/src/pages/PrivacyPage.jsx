import React from 'react';

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Privacy Policy</h1>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1.75rem' }}>Last updated: October 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', lineHeight: 1.7 }}>
        <p>
          World Currency Converter values your privacy. We believe in building transparent, respectful web experiences.
        </p>

        <h3 style={{ marginTop: '0.5rem' }}>1. Information We Collect</h3>
        <p>
          We do not require user accounts, passwords, or personal identifying information. Calculations and conversions are performed freely. If you use history or favorites, these are stored in your device's browser localStorage or anonymous session tags.
        </p>

        <h3 style={{ marginTop: '0.5rem' }}>2. Data Stored Locally</h3>
        <p>
          Your theme preference (light/dark mode) and recent conversion history remain stored locally on your device unless you choose to clear your browser cache.
        </p>

        <h3 style={{ marginTop: '0.5rem' }}>3. Third-Party Services</h3>
        <p>
          Live foreign exchange market rates are retrieved securely via server-side proxies communicating with ExchangeRate-API. No personal identifiers or sensitive parameters are shared with external APIs.
        </p>
      </div>
    </div>
  );
}
