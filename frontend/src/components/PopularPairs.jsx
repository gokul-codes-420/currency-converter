import React from 'react';
import { ArrowRight } from 'lucide-react';
import { formatCurrencyValue } from '../utils/formatters';

const POPULAR_PAIR_DEFINITIONS = [
  { from: 'USD', to: 'EUR', label: 'USD to EUR', flagFrom: '🇺🇸', flagTo: '🇪🇺' },
  { from: 'USD', to: 'INR', label: 'USD to INR', flagFrom: '🇺🇸', flagTo: '🇮🇳' },
  { from: 'EUR', to: 'USD', label: 'EUR to USD', flagFrom: '🇪🇺', flagTo: '🇺🇸' },
  { from: 'GBP', to: 'USD', label: 'GBP to USD', flagFrom: '🇬🇧', flagTo: '🇺🇸' },
  { from: 'USD', to: 'JPY', label: 'USD to JPY', flagFrom: '🇺🇸', flagTo: '🇯🇵' },
  { from: 'USD', to: 'CAD', label: 'USD to CAD', flagFrom: '🇺🇸', flagTo: '🇨🇦' },
  { from: 'AUD', to: 'USD', label: 'AUD to USD', flagFrom: '🇦🇺', flagTo: '🇺🇸' },
  { from: 'USD', to: 'AED', label: 'USD to AED', flagFrom: '🇺🇸', flagTo: '🇦🇪' }
];

export default function PopularPairs({ onSelectPair, ratesMap = {} }) {
  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Popular Currency Conversions</h2>
        <p className="section-subtitle">Real-time benchmark conversion rates for frequently traded world currencies.</p>
      </div>

      <div className="pairs-grid">
        {POPULAR_PAIR_DEFINITIONS.map(p => {
          // Calculate rate from ratesMap (relative to USD or cross-rate)
          let currentRate = null;
          if (ratesMap && Object.keys(ratesMap).length > 0) {
            if (p.from === 'USD') {
              currentRate = ratesMap[p.to];
            } else if (p.to === 'USD') {
              currentRate = ratesMap[p.from] ? 1 / ratesMap[p.from] : null;
            } else if (ratesMap[p.from] && ratesMap[p.to]) {
              currentRate = ratesMap[p.to] / ratesMap[p.from];
            }
          }

          return (
            <button
              key={`${p.from}-${p.to}`}
              type="button"
              className="pair-card"
              onClick={() => onSelectPair(p.from, p.to)}
              title={`Convert ${p.from} to ${p.to}`}
            >
              <div className="pair-header">
                <span className="pair-title">
                  <span>{p.flagFrom}</span>
                  <span>{p.from}</span>
                  <ArrowRight size={14} style={{ color: 'var(--text-dim)' }} />
                  <span>{p.flagTo}</span>
                  <span>{p.to}</span>
                </span>
                <span className="badge">Live</span>
              </div>

              <div className="pair-rate">
                {currentRate ? (
                  `1 ${p.from} = ${formatCurrencyValue(currentRate, 4)} ${p.to}`
                ) : (
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>1 {p.from} to {p.to}</span>
                )}
              </div>

              <div className="pair-sub">Click to calculate with custom amount</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
