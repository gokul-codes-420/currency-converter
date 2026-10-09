import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Check, Globe } from 'lucide-react';
import { POPULAR_COUNTRIES } from '../utils/currencyMetadata';

export default function CurrencySelectorModal({
  isOpen,
  onClose,
  currencies = [],
  selectedCode,
  onSelect,
  title = 'Select Currency'
}) {
  const [search, setSearch] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'popular'
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
    }
  }, [isOpen]);

  // Keyboard navigation: Escape closes, Enter selects first match
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        // If there are search results and search is not empty
        const q = search.trim().toLowerCase();
        if (q && filteredCurrencies.length > 0) {
          e.preventDefault();
          onSelect(filteredCurrencies[0].code);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, search, onClose, onSelect]);

  const filteredCurrencies = useMemo(() => {
    const q = search.trim().toLowerCase();
    return currencies.filter(item => {
      // If user typed a search query, search across ALL currencies
      if (!q && filterTab === 'popular' && !item.popular) {
        return false;
      }
      if (!q) return true;
      return (
        item.code.toLowerCase().includes(q) ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.country && item.country.toLowerCase().includes(q)) ||
        (item.aliases && item.aliases.toLowerCase().includes(q)) ||
        (item.symbol && item.symbol.toLowerCase().includes(q))
      );
    });
  }, [currencies, search, filterTab]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Mobile Drag Indicator */}
        <div className="mobile-sheet-handle" />

        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{title}</h2>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Search by Country name (e.g. India, Dubai, USA) or Currency
            </p>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Box */}
        <div className="search-box-wrap">
          <Search size={18} className="search-icon-pos" />
          <input
            ref={searchInputRef}
            type="text"
            inputMode="search"
            className="search-input"
            placeholder="Type Country name (e.g. India, Dubai, USA, Saudi)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Quick Country Pills */}
        <div style={{ padding: '0.5rem 1.25rem 0.25rem', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Popular Countries:
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.4rem', scrollbarWidth: 'none' }}>
            {POPULAR_COUNTRIES.map(p => (
              <button
                key={p.code}
                type="button"
                className={`chip-btn ${selectedCode === p.code ? 'active' : ''}`}
                style={{
                  fontSize: '0.78rem',
                  padding: '0.3rem 0.65rem',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  ...(selectedCode === p.code ? { backgroundColor: 'var(--text-main)', color: 'var(--bg-surface)' } : {})
                }}
                onClick={() => {
                  onSelect(p.code);
                  onClose();
                }}
              >
                <span>{p.flag}</span>
                <span>{p.country}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1.25rem', borderBottom: '1px solid var(--border-light)' }}>
          <button
            type="button"
            className={`chip-btn ${filterTab === 'all' && !search ? 'active' : ''}`}
            onClick={() => setFilterTab('all')}
            style={filterTab === 'all' && !search ? { backgroundColor: 'var(--text-main)', color: 'var(--bg-surface)' } : {}}
          >
            All Currencies ({currencies.length})
          </button>
          <button
            type="button"
            className={`chip-btn ${filterTab === 'popular' && !search ? 'active' : ''}`}
            onClick={() => setFilterTab('popular')}
            style={filterTab === 'popular' && !search ? { backgroundColor: 'var(--text-main)', color: 'var(--bg-surface)' } : {}}
          >
            Popular Currencies
          </button>
        </div>

        {/* Currency List */}
        <ul className="currency-list">
          {filteredCurrencies.length === 0 ? (
            <li style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🔍</div>
              No currency found for country or query "<strong>{search}</strong>"
              <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                Try searching "India", "Dubai", "USA", "Saudi", "UK", "Singapore", or ISO code like "INR", "AED"
              </div>
            </li>
          ) : (
            filteredCurrencies.map(c => {
              const isSelected = c.code === selectedCode;
              return (
                <li key={c.code}>
                  <button
                    type="button"
                    className={`currency-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      onSelect(c.code);
                      onClose();
                    }}
                  >
                    <div className="item-left">
                      <span className="item-flag" role="img" aria-label={c.name}>
                        {c.flag || '🌐'}
                      </span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                          <span className="item-country-name" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                            {c.country || c.name}
                          </span>
                          <span className="item-code" style={{ fontSize: '0.82rem', padding: '0.1rem 0.4rem', background: 'var(--bg-subtle)', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                            {c.code}
                          </span>
                          {c.symbol && <span className="item-symbol" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>({c.symbol})</span>}
                        </div>
                        <div className="item-name" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          {c.name}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check size={18} style={{ color: 'var(--text-main)' }} />
                    )}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
