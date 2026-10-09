import React, { useState, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';

export default function CurrenciesPage({
  currencies = [],
  onSelectCurrency,
  setActivePage
}) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'popular'

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return currencies.filter(item => {
      if (!q && filterType === 'popular' && !item.popular) return false;
      if (!q) return true;
      return (
        item.code.toLowerCase().includes(q) ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.country && item.country.toLowerCase().includes(q)) ||
        (item.aliases && item.aliases.toLowerCase().includes(q)) ||
        (item.symbol && item.symbol.toLowerCase().includes(q))
      );
    });
  }, [currencies, search, filterType]);

  const handleUse = (code) => {
    if (onSelectCurrency) {
      onSelectCurrency(code);
    }
    setActivePage('converter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="hero-header" style={{ marginBottom: '1.75rem' }}>
        <h1 className="hero-title">World Currencies Directory</h1>
        <p className="hero-subtitle">
          Comprehensive catalog of all 160+ fiat currencies with Country mapping and live exchange calculation.
        </p>
      </div>

      <div className="table-card">
        {/* Toolbar */}
        <div className="table-toolbar">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className={`chip-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
              style={filterType === 'all' ? { backgroundColor: 'var(--text-main)', color: 'var(--bg-surface)' } : {}}
            >
              All Currencies ({currencies.length})
            </button>
            <button
              type="button"
              className={`chip-btn ${filterType === 'popular' ? 'active' : ''}`}
              onClick={() => setFilterType('popular')}
              style={filterType === 'popular' ? { backgroundColor: 'var(--text-main)', color: 'var(--bg-surface)' } : {}}
            >
              Popular Only
            </button>
          </div>

          <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
            <Search size={16} className="search-icon-pos" style={{ left: '0.85rem' }} />
            <input
              type="text"
              className="search-input"
              style={{ height: '40px', paddingLeft: '2.4rem' }}
              placeholder="Search country (India, Dubai, USA) or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="currencies-grid-container">
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No currencies match "{search}"
            </div>
          ) : (
            filtered.map(c => (
              <div
                key={c.code}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.4rem' }}>{c.flag || '🌐'}</span>
                      <strong style={{ fontSize: '1.05rem', fontWeight: 600 }}>{c.code}</strong>
                    </div>
                    {c.symbol && (
                      <span className="badge">{c.symbol}</span>
                    )}
                  </div>
                  {c.country && (
                    <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                      Country: {c.country}
                    </div>
                  )}
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {c.name}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {c.popular ? 'High Liquidity' : 'Standard Fiat'}
                  </span>
                  <button
                    type="button"
                    className="chip-btn"
                    onClick={() => handleUse(c.code)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <span>Use in Converter</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
