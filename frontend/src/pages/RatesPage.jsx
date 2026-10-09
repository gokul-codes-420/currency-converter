import React, { useState, useEffect, useMemo } from 'react';
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getRates } from '../services/api';
import { formatCurrencyValue, formatTimestamp } from '../utils/formatters';
import CurrencySelectorModal from '../components/CurrencySelectorModal';

import { CURRENCY_COUNTRY_MAP } from '../utils/currencyMetadata';

export default function RatesPage({
  currencies = [],
  onSelectPairToConvert,
  setActivePage
}) {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [ratesData, setRatesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('code'); // 'code', 'name', 'rate'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const pageSize = 20;

  // Fetch rates whenever base currency changes
  useEffect(() => {
    let isMounted = true;
    async function loadRates() {
      setLoading(true);
      try {
        const res = await getRates(baseCurrency);
        if (isMounted) {
          setRatesData(res);
        }
      } catch (err) {
        console.error('Failed to load rates for base', baseCurrency, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadRates();
    return () => { isMounted = false; };
  }, [baseCurrency]);

  const baseCountryInfo = CURRENCY_COUNTRY_MAP[baseCurrency] || {};
  const baseMeta = {
    code: baseCurrency,
    name: baseCountryInfo.name || baseCurrency,
    country: baseCountryInfo.country || '',
    flag: baseCountryInfo.flag || '🌐',
    symbol: baseCountryInfo.symbol || '$',
    ...(currencies.find(c => c.code === baseCurrency) || {})
  };

  // Filtered and sorted table rows
  const tableRows = useMemo(() => {
    if (!ratesData || !ratesData.rates) return [];

    const rows = Object.entries(ratesData.rates).map(([code, rate]) => {
      const countryMeta = CURRENCY_COUNTRY_MAP[code] || {};
      const meta = currencies.find(c => c.code === code) || {};
      return {
        code,
        name: countryMeta.name || meta.name || code,
        country: countryMeta.country || meta.country || '',
        aliases: countryMeta.aliases || meta.aliases || '',
        flag: countryMeta.flag || meta.flag || '🌐',
        symbol: countryMeta.symbol || meta.symbol || code,
        rate: Number(rate),
        inverseRate: rate ? 1 / Number(rate) : 0
      };
    });

    // Filter by search (code, name, country, or aliases)
    const q = search.trim().toLowerCase();
    const filtered = q
      ? rows.filter(r =>
          r.code.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          (r.country && r.country.toLowerCase().includes(q)) ||
          (r.aliases && r.aliases.toLowerCase().includes(q))
        )
      : rows;

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'code') {
        comparison = a.code.localeCompare(b.code);
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'rate') {
        comparison = a.rate - b.rate;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [ratesData, currencies, search, sortBy, sortOrder]);

  const totalPages = Math.ceil(tableRows.length / pageSize) || 1;
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tableRows.slice(start, start + pageSize);
  }, [tableRows, currentPage]);

  const toggleSort = (col) => {
    if (sortBy === col) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(col);
      setSortOrder('asc');
    }
  };

  const handleConvertRow = (targetCode) => {
    if (onSelectPairToConvert) {
      onSelectPairToConvert(baseCurrency, targetCode);
    }
    setActivePage('converter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="hero-header" style={{ marginBottom: '1.75rem' }}>
        <h1 className="hero-title">Live Exchange Rates Table</h1>
        <p className="hero-subtitle">
          Real-time benchmark exchange rates for all world currencies against your chosen base currency.
        </p>
      </div>

      <div className="table-card">
        {/* Toolbar */}
        <div className="table-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              Base Currency:
            </span>
            <button
              type="button"
              className="currency-selector-btn"
              style={{ width: 'auto', minWidth: '180px', height: '40px' }}
              onClick={() => setModalOpen(true)}
            >
              <div className="currency-chip">
                <span className="currency-flag">{baseMeta.flag}</span>
                <span className="currency-code-strong">{baseMeta.code}</span>
                <span className="currency-name-truncate">{baseMeta.name}</span>
              </div>
            </button>
          </div>

          <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
            <Search size={16} className="search-icon-pos" style={{ left: '0.85rem' }} />
            <input
              type="text"
              className="search-input"
              style={{ height: '40px', paddingLeft: '2.4rem' }}
              placeholder="Search country or currency..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        {/* Data Meta Header */}
        <div style={{
          padding: '0.75rem 1.25rem',
          borderBottom: '1px solid var(--border-light)',
          background: 'var(--bg-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div>
            Showing {tableRows.length} currencies relative to <strong>1 {baseCurrency}</strong>
          </div>
          <div>
            Provider: ExchangeRate-API • Updated: {ratesData ? formatTimestamp(ratesData.lastUpdate) : 'Loading...'}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="rates-table-desktop">
          <table className="clean-table">
            <thead>
              <tr>
                <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('code')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>Currency</span>
                    <ArrowUpDown size={13} />
                  </div>
                </th>
                <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('name')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>Name</span>
                    <ArrowUpDown size={13} />
                  </div>
                </th>
                <th style={{ cursor: 'pointer', textAlign: 'right' }} onClick={() => toggleSort('rate')}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.3rem' }}>
                    <span>1 {baseCurrency} =</span>
                    <ArrowUpDown size={13} />
                  </div>
                </th>
                <th style={{ textAlign: 'right' }}>Inverse (1 X = {baseCurrency})</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="spinner" />
                      <span>Fetching live exchange rates...</span>
                    </div>
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No currencies matching "{search}"
                  </td>
                </tr>
              ) : (
                currentRows.map(row => (
                  <tr key={row.code}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>{row.flag}</span>
                        <strong style={{ fontWeight: 600 }}>{row.code}</strong>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>
                      {row.name}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>
                      {formatCurrencyValue(row.rate, 4)} {row.symbol && <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>({row.symbol})</span>}
                    </td>
                    <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>
                      {formatCurrencyValue(row.inverseRate, 6)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        className="chip-btn"
                        onClick={() => handleConvertRow(row.code)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <span>Convert</span>
                        <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="rates-cards-mobile">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div className="spinner" style={{ margin: '0 auto 0.5rem auto' }} />
              <span style={{ color: 'var(--text-muted)' }}>Fetching live rates...</span>
            </div>
          ) : currentRows.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
              No currencies matching "{search}"
            </div>
          ) : (
            currentRows.map(row => (
              <div key={row.code} className="mobile-rate-card">
                <div className="mobile-rate-card-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.45rem' }}>{row.flag}</span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <strong style={{ fontSize: '1rem', fontWeight: 600 }}>{row.code}</strong>
                        {row.symbol && <span className="badge">{row.symbol}</span>}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.name}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="chip-btn"
                    onClick={() => handleConvertRow(row.code)}
                    style={{ height: '36px', padding: '0 0.85rem' }}
                  >
                    <span>Convert</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
                <div className="mobile-rate-card-bottom">
                  <div className="mobile-rate-col">
                    <span className="mobile-rate-label">1 {baseCurrency} =</span>
                    <span className="mobile-rate-val">{formatCurrencyValue(row.rate, 4)} {row.code}</span>
                  </div>
                  <div className="mobile-rate-col" style={{ textAlign: 'right' }}>
                    <span className="mobile-rate-label">1 {row.code} =</span>
                    <span className="mobile-rate-val">{formatCurrencyValue(row.inverseRate, 6)} {baseCurrency}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer */}
        {!loading && totalPages > 1 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderTop: '1px solid var(--border-light)'
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Page {currentPage} of {totalPages} ({tableRows.length} total)
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className="icon-btn"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="icon-btn"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Base Currency Picker Modal */}
      <CurrencySelectorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currencies={currencies}
        selectedCode={baseCurrency}
        onSelect={(code) => setBaseCurrency(code)}
        title="Change Base Currency"
      />
    </div>
  );
}
