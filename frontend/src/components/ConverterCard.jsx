import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeftRight, Copy, Check, Star, RefreshCw, AlertCircle, Search, X, Globe, ArrowDown } from 'lucide-react';
import { formatCurrencyValue, formatTimestamp, amountToWords, getIndianCompactNotation } from '../utils/formatters';
import { CURRENCY_COUNTRY_MAP, POPULAR_COUNTRIES } from '../utils/currencyMetadata';
import { convertCurrency, addFavoriteApi, removeFavoriteApi, saveHistory } from '../services/api';
import CurrencySelectorModal from './CurrencySelectorModal';

export default function ConverterCard({
  currencies = [],
  fromCurrency,
  toCurrency,
  setFromCurrency,
  setToCurrency,
  initialAmount = 100,
  onConversionDone
}) {
  const [amount, setAmount] = useState(String(initialAmount));
  const [conversionData, setConversionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Quick country search on the card
  const [countryQuery, setCountryQuery] = useState('');
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const countrySearchWrapRef = useRef(null);

  // Modal selector states
  const [pickerModal, setPickerModal] = useState({ open: false, type: 'from' });

  const debounceTimeout = useRef(null);

  // Helper to find currency and country meta
  const fromCountryInfo = CURRENCY_COUNTRY_MAP[fromCurrency] || {};
  const toCountryInfo = CURRENCY_COUNTRY_MAP[toCurrency] || {};

  const fromMeta = {
    code: fromCurrency,
    name: fromCountryInfo.name || fromCurrency,
    country: fromCountryInfo.country || 'International',
    flag: fromCountryInfo.flag || '🌐',
    symbol: fromCountryInfo.symbol || '$',
    ...(currencies.find(c => c.code === fromCurrency) || {})
  };

  const toMeta = {
    code: toCurrency,
    name: toCountryInfo.name || toCurrency,
    country: toCountryInfo.country || 'India',
    flag: toCountryInfo.flag || '🇮🇳',
    symbol: toCountryInfo.symbol || '₹',
    ...(currencies.find(c => c.code === toCurrency) || {})
  };

  // Close country dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (countrySearchWrapRef.current && !countrySearchWrapRef.current.contains(e.target)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filtered list for inline country search
  const countrySearchResults = React.useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return [];
    return currencies.filter(item => {
      return (
        item.code.toLowerCase().includes(q) ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.country && item.country.toLowerCase().includes(q)) ||
        (item.aliases && item.aliases.toLowerCase().includes(q))
      );
    }).slice(0, 6); // Top 6 matches
  }, [countryQuery, currencies]);

  // Perform conversion
  const executeConversion = async (fromCode, toCode, amtVal) => {
    const num = parseFloat(amtVal);
    if (isNaN(num) || num < 0) {
      setConversionData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await convertCurrency({
        from: fromCode,
        to: toCode,
        amount: num
      });
      setConversionData(data);
      if (onConversionDone) onConversionDone(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch current exchange rate.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced conversion trigger on input changes
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      executeConversion(fromCurrency, toCurrency, amount);
    }, 250);

    return () => clearTimeout(debounceTimeout.current);
  }, [fromCurrency, toCurrency, amount]);

  // Swap currencies
  const handleSwap = () => {
    const prevFrom = fromCurrency;
    const prevTo = toCurrency;
    setFromCurrency(prevTo);
    setToCurrency(prevFrom);
  };

  // Handle Amount change
  const handleAmountChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAmount(val);
    }
  };

  // Quick country chip click handler
  const handleCountryChipClick = (code) => {
    if (fromCurrency === code) {
      // If already from, swap or keep
      return;
    }
    // If toCurrency is already INR, set from to this country
    if (toCurrency === code) {
      setFromCurrency(code);
    } else {
      setFromCurrency(code);
    }
  };

  // Copy result text
  const handleCopy = () => {
    if (!conversionData) return;
    const words = amountToWords(conversionData.convertedAmount, toMeta.code, toMeta.name);
    const formattedResult = `${formatCurrencyValue(conversionData.amount)} ${conversionData.from} (${fromMeta.country}) = ${formatCurrencyValue(conversionData.convertedAmount, 2, toMeta.code === 'INR')} ${conversionData.to} (${toMeta.country})\nIn Words: ${words}`;
    navigator.clipboard.writeText(formattedResult).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Toggle favorite
  const handleToggleFavorite = async () => {
    const pair = { fromCurrency, toCurrency };
    if (!isFavorite) {
      await addFavoriteApi(pair);
      setIsFavorite(true);
    } else {
      await removeFavoriteApi(`${fromCurrency}_${toCurrency}`);
      setIsFavorite(false);
    }
  };

  return (
    <div className="converter-card">
      {error && (
        <div className="alert-banner alert-error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {conversionData && conversionData.isStale && (
        <div className="alert-banner alert-warning">
          <AlertCircle size={16} />
          <span>{conversionData.warning || 'Displaying cached rates due to provider rate update.'}</span>
        </div>
      )}

      {/* QUICK COUNTRY FINDER (DIRECT LOOKUP) */}
      <div 
        ref={countrySearchWrapRef}
        style={{
          position: 'relative',
          marginBottom: '1.25rem',
          padding: '0.85rem 1rem',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
          <label 
            htmlFor="country-finder-input" 
            style={{ 
              fontSize: '0.82rem', 
              fontWeight: 600, 
              color: 'var(--text-main)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.35rem' 
            }}
          >
            <span>🌍</span>
            <span>Find Currency by Country Name:</span>
          </label>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            e.g. India, Dubai, USA, Saudi, Singapore, UK
          </span>
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            id="country-finder-input"
            type="text"
            className="input-control"
            style={{ 
              height: '40px', 
              paddingLeft: '2.25rem', 
              paddingRight: countryQuery ? '2rem' : '0.85rem',
              fontSize: '0.92rem',
              backgroundColor: 'var(--bg-surface)' 
            }}
            placeholder="Type country name (e.g. India, Dubai, USA, Saudi, Singapore, UK)..."
            value={countryQuery}
            onChange={(e) => {
              setCountryQuery(e.target.value);
              setCountryDropdownOpen(true);
            }}
            onFocus={() => {
              if (countryQuery.trim()) setCountryDropdownOpen(true);
            }}
          />
          {countryQuery && (
            <button
              type="button"
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
              onClick={() => {
                setCountryQuery('');
                setCountryDropdownOpen(false);
              }}
              aria-label="Clear country search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Instant Search Suggestions Dropdown */}
        {countryDropdownOpen && countryQuery.trim() && (
          <div 
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              right: 0,
              zIndex: 100,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              maxHeight: '320px',
              overflowY: 'auto'
            }}
          >
            {countrySearchResults.length === 0 ? (
              <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No country found matching "<strong>{countryQuery}</strong>". Try another name or ISO code.
              </div>
            ) : (
              countrySearchResults.map(item => (
                <div
                  key={item.code}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderBottom: '1px solid var(--border-light)',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.35rem' }}>{item.flag || '🌐'}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        {item.country || item.name} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>({item.code})</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {item.name} {item.symbol ? `• ${item.symbol}` : ''}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      type="button"
                      className="chip-btn"
                      style={{ 
                        fontSize: '0.75rem', 
                        padding: '0.3rem 0.6rem',
                        backgroundColor: fromCurrency === item.code ? 'var(--text-main)' : 'var(--bg-surface)',
                        color: fromCurrency === item.code ? 'var(--bg-surface)' : 'var(--text-main)',
                        border: '1px solid var(--border-light)'
                      }}
                      onClick={() => {
                        setFromCurrency(item.code);
                        setCountryQuery('');
                        setCountryDropdownOpen(false);
                      }}
                    >
                      Set as FROM
                    </button>
                    <button
                      type="button"
                      className="chip-btn"
                      style={{ 
                        fontSize: '0.75rem', 
                        padding: '0.3rem 0.6rem',
                        backgroundColor: toCurrency === item.code ? 'var(--text-main)' : 'var(--bg-surface)',
                        color: toCurrency === item.code ? 'var(--bg-surface)' : 'var(--text-main)',
                        border: '1px solid var(--border-light)'
                      }}
                      onClick={() => {
                        setToCurrency(item.code);
                        setCountryQuery('');
                        setCountryDropdownOpen(false);
                      }}
                    >
                      Set as TO
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Quick Country Pills on Card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.6rem', overflowX: 'auto', paddingBottom: '0.2rem', scrollbarWidth: 'none' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontWeight: 500 }}>
            Quick:
          </span>
          {POPULAR_COUNTRIES.slice(0, 8).map(p => {
            const isFrom = fromCurrency === p.code;
            const isTo = toCurrency === p.code;
            return (
              <button
                key={p.code}
                type="button"
                className={`chip-btn ${isFrom || isTo ? 'active' : ''}`}
                style={{
                  fontSize: '0.76rem',
                  padding: '0.25rem 0.55rem',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  ...(isFrom ? { borderColor: 'var(--text-main)', fontWeight: 600 } : {})
                }}
                onClick={() => handleCountryChipClick(p.code)}
                title={`Click to set ${p.country} (${p.code})`}
              >
                <span>{p.flag}</span>
                <span>{p.country}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="converter-form-layout">
        {/* Amount Input */}
        <div className="input-group amount-group">
          <label htmlFor="amount-input" className="input-label">Amount</label>
          <input
            id="amount-input"
            type="text"
            inputMode="decimal"
            className="input-control"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount..."
          />
          <div className="quick-amounts">
            {[10, 100, 1000, 5000].map(val => (
              <button
                key={val}
                type="button"
                className="chip-btn"
                onClick={() => setAmount(String(val))}
              >
                {val.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Currency Selectors Row with Swap in between */}
        <div className="currencies-pair-row">
          {/* From Currency */}
          <div className="input-group currency-select-group">
            <span className="input-label">From Country / Currency</span>
            <button
              type="button"
              className="currency-selector-btn"
              onClick={() => setPickerModal({ open: true, type: 'from' })}
              aria-label={`Selected from currency: ${fromMeta.code}`}
            >
              <div className="currency-chip">
                <span className="currency-flag">{fromMeta.flag || '🌐'}</span>
                <div className="currency-text-meta">
                  <div className="currency-code-strong">
                    {fromMeta.country || fromMeta.name}
                    <span className="currency-country-tag"> • {fromMeta.code}</span>
                  </div>
                  <div className="currency-name-truncate">{fromMeta.name}</div>
                </div>
              </div>
            </button>
          </div>

          {/* Swap Button */}
          <div className="swap-btn-container">
            <button
              type="button"
              className="swap-btn"
              onClick={handleSwap}
              title="Swap currencies"
              aria-label="Swap from and to currencies"
            >
              <ArrowLeftRight size={18} />
            </button>
          </div>

          {/* To Currency */}
          <div className="input-group currency-select-group">
            <span className="input-label">To Country / Currency</span>
            <button
              type="button"
              className="currency-selector-btn"
              onClick={() => setPickerModal({ open: true, type: 'to' })}
              aria-label={`Selected to currency: ${toMeta.code} (${toMeta.country})`}
            >
              <div className="currency-chip">
                <span className="currency-flag">{toMeta.flag || '🌐'}</span>
                <div className="currency-text-meta">
                  <div className="currency-code-strong">
                    {toMeta.country || toMeta.name}
                    <span className="currency-country-tag"> • {toMeta.code}</span>
                  </div>
                  <div className="currency-name-truncate">{toMeta.name}</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Conversion Output Panel */}
      <div className="result-box">
        <div className="result-from-calc">
          {formatCurrencyValue(amount || 0)} {fromMeta.name} ({fromMeta.country} • {fromMeta.code}) =
        </div>

        <div className="result-main-row">
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '44px' }}>
                <div className="spinner" />
                <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Updating rates...</span>
              </div>
            ) : (
              <>
                <span className="result-to-amount">
                  {conversionData ? formatCurrencyValue(conversionData.convertedAmount) : '—'}
                </span>
                <span className="result-currency-tag">{toMeta.code}</span>
              </>
            )}
          </div>

          <div className="result-actions">
            <button
              type="button"
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              disabled={!conversionData}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              className="copy-btn"
              onClick={handleToggleFavorite}
              title="Add to favorite pairs"
            >
              <Star size={14} fill={isFavorite ? 'currentColor' : 'none'} />
              <span>{isFavorite ? 'Saved' : 'Favorite'}</span>
            </button>
          </div>
        </div>

        {/* Amount in Words Representation */}
        {conversionData && (
          <div className="words-representation-box">
            <div className="words-top-row">
              <span className="words-label">In Words:</span>
              {toMeta.code === 'INR' && getIndianCompactNotation(conversionData.convertedAmount) && (
                <span className="compact-inr-badge">
                  {getIndianCompactNotation(conversionData.convertedAmount)}
                </span>
              )}
            </div>
            <div className="words-content-text">
              {amountToWords(conversionData.convertedAmount, toMeta.code, toMeta.name)}
            </div>
            {toMeta.code === 'INR' && (
              <div className="indian-format-footnote">
                Indian notation: <strong>₹{formatCurrencyValue(conversionData.convertedAmount, 2, true)}</strong>
              </div>
            )}
          </div>
        )}

        {/* Rate Equations and Provider Meta */}
        {conversionData && (
          <div className="meta-rates-bar">
            <div className="rate-details">
              <span className="rate-equation">
                1 {fromMeta.code} ({fromMeta.country}) = {formatCurrencyValue(conversionData.rate, 6)} {toMeta.code} ({toMeta.country})
              </span>
              <span className="rate-reverse">
                1 {toMeta.code} = {formatCurrencyValue(conversionData.inverseRate, 6)} {fromMeta.code}
              </span>
            </div>

            <div className="update-badge">
              <span className={`status-dot ${conversionData.isStale ? 'stale' : ''}`} />
              <span>
                Updated: {formatTimestamp(conversionData.lastUpdate)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Currency Modal Picker */}
      <CurrencySelectorModal
        isOpen={pickerModal.open}
        onClose={() => setPickerModal({ open: false, type: 'from' })}
        currencies={currencies}
        selectedCode={pickerModal.type === 'from' ? fromCurrency : toCurrency}
        onSelect={(code) => {
          if (pickerModal.type === 'from') {
            setFromCurrency(code);
          } else {
            setToCurrency(code);
          }
        }}
        title={`Select ${pickerModal.type === 'from' ? 'Source' : 'Target'} Country or Currency`}
      />
    </div>
  );
}
