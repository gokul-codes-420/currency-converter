import React from 'react';
import ConverterCard from '../components/ConverterCard';
import PopularPairs from '../components/PopularPairs';
import FaqSection from '../components/FaqSection';
import { ShieldCheck, Zap, Globe, ArrowRight } from 'lucide-react';

export default function HomePage({
  currencies,
  fromCurrency,
  toCurrency,
  setFromCurrency,
  setToCurrency,
  ratesMap,
  setActivePage
}) {
  const handleSelectPair = (from, to) => {
    setFromCurrency(from);
    setToCurrency(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Header */}
      <div className="hero-header">
        <h1 className="hero-title">World Currency Converter</h1>
        <p className="hero-subtitle">
          Accurate, real-time exchange rates for 160+ world currencies with direct bank benchmark data.
        </p>
      </div>

      {/* Main Converter Card */}
      <ConverterCard
        currencies={currencies}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        setFromCurrency={setFromCurrency}
        setToCurrency={setToCurrency}
      />

      {/* Trust & Features Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '2.5rem' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', fontWeight: 600 }}>
            <Zap size={18} style={{ color: 'var(--text-main)' }} />
            <span>Real-Time Updates</span>
          </div>
          <p style={{ fontSize: '0.85rem' }}>Rates synchronized from global financial market feeds and central banks.</p>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', fontWeight: 600 }}>
            <Globe size={18} style={{ color: 'var(--text-main)' }} />
            <span>160+ World Currencies</span>
          </div>
          <p style={{ fontSize: '0.85rem' }}>Complete coverage of major, minor, and exotic global currencies.</p>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', fontWeight: 600 }}>
            <ShieldCheck size={18} style={{ color: 'var(--text-main)' }} />
            <span>Zero Account Required</span>
          </div>
          <p style={{ fontSize: '0.85rem' }}>Full functionality available instantly without registration or fees.</p>
        </div>
      </div>

      {/* Popular Currency Pairs */}
      <PopularPairs
        onSelectPair={handleSelectPair}
        ratesMap={ratesMap}
      />

      {/* Exchange Rates Quick Banner */}
      <section className="section">
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>Explore Full Exchange Rates Table</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Inspect live exchange rates against any base currency across the entire global currency directory.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={() => { setActivePage('rates'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span>View All Rates</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FaqSection />
    </div>
  );
}
