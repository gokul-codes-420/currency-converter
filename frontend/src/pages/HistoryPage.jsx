import React, { useState, useEffect } from 'react';
import { Trash2, Star, ArrowRight, History as HistoryIcon } from 'lucide-react';
import { getHistory, clearHistoryApi, getFavorites, removeFavoriteApi } from '../services/api';
import { formatCurrencyValue, formatTimestamp } from '../utils/formatters';

export default function HistoryPage({
  onSelectPairToConvert,
  setActivePage
}) {
  const [historyList, setHistoryList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [hist, favs] = await Promise.all([
        getHistory(),
        getFavorites()
      ]);
      setHistoryList(hist);
      setFavoritesList(favs);
    } catch (err) {
      console.error('Error loading history/favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear your conversion history?')) {
      await clearHistoryApi();
      setHistoryList([]);
    }
  };

  const handleRemoveFavorite = async (id, from, to) => {
    await removeFavoriteApi(id || `${from}_${to}`);
    setFavoritesList(prev => prev.filter(f => (f._id !== id && `${f.fromCurrency}_${f.toCurrency}` !== `${from}_${to}`)));
  };

  const handleLaunchPair = (from, to) => {
    if (onSelectPairToConvert) {
      onSelectPairToConvert(from, to);
    }
    setActivePage('converter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="hero-header" style={{ marginBottom: '1.75rem' }}>
        <h1 className="hero-title">Conversion History & Favorites</h1>
        <p className="hero-subtitle">
          Review your recent calculations and manage saved currency pairs.
        </p>
      </div>

      {/* Favorite Pairs Section */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={18} fill="currentColor" style={{ color: 'var(--text-main)' }} />
            <span>Saved Currency Pairs</span>
          </h2>
        </div>

        {favoritesList.length === 0 ? (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No favorite currency pairs saved yet. Click the "Favorite" button on the converter to save quick pairs.
          </div>
        ) : (
          <div className="pairs-grid">
            {favoritesList.map((fav, i) => (
              <div
                key={fav._id || i}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                    {fav.fromCurrency} → {fav.toCurrency}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    Favorite pair
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="chip-btn"
                    onClick={() => handleLaunchPair(fav.fromCurrency, fav.toCurrency)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <span>Convert</span>
                    <ArrowRight size={12} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleRemoveFavorite(fav._id, fav.fromCurrency, fav.toCurrency)}
                    title="Remove from favorites"
                    style={{ width: '32px', height: '32px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Conversion History Table */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HistoryIcon size={18} style={{ color: 'var(--text-main)' }} />
            <span>Recent Conversions</span>
          </h2>
          {historyList.length > 0 && (
            <button
              type="button"
              className="btn-outline"
              onClick={handleClearHistory}
              style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}
            >
              <Trash2 size={14} />
              <span>Clear History</span>
            </button>
          )}
        </div>

        <div className="table-card">
          {/* Desktop Table */}
          <div className="history-table-desktop">
            <table className="clean-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Source Amount</th>
                  <th>Converted Result</th>
                  <th style={{ textAlign: 'right' }}>Applied Rate</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem' }}>
                      <div className="spinner" style={{ margin: '0 auto' }} />
                    </td>
                  </tr>
                ) : historyList.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No conversion history recorded yet. Conversions made on the home page will appear here.
                    </td>
                  </tr>
                ) : (
                  historyList.map((item, idx) => (
                    <tr key={item._id || idx}>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                        {formatTimestamp(item.createdAt || item.rateTimestamp)}
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        {formatCurrencyValue(item.amount)} <span style={{ color: 'var(--text-muted)' }}>{item.fromCurrency}</span>
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        {formatCurrencyValue(item.convertedAmount)} <span style={{ color: 'var(--text-muted)' }}>{item.toCurrency}</span>
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '0.88rem' }}>
                        1 {item.fromCurrency} = {formatCurrencyValue(item.rate, 6)} {item.toCurrency}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="chip-btn"
                          onClick={() => handleLaunchPair(item.fromCurrency, item.toCurrency)}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <span>Re-calculate</span>
                          <ArrowRight size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile History Cards */}
          <div className="history-cards-mobile">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2.5rem' }}>
                <div className="spinner" style={{ margin: '0 auto' }} />
              </div>
            ) : historyList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                No conversion history recorded yet.
              </div>
            ) : (
              historyList.map((item, idx) => (
                <div key={item._id || idx} className="mobile-history-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {formatCurrencyValue(item.amount)} {item.fromCurrency} → {formatCurrencyValue(item.convertedAmount)} {item.toCurrency}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                        {formatTimestamp(item.createdAt || item.rateTimestamp)}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="chip-btn"
                      onClick={() => handleLaunchPair(item.fromCurrency, item.toCurrency)}
                      style={{ height: '34px', padding: '0 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <span>Re-calculate</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem' }}>
                    Rate applied: 1 {item.fromCurrency} = {formatCurrencyValue(item.rate, 6)} {item.toCurrency}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
