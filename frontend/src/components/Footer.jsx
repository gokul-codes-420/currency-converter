import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="brand-icon">
              <ArrowLeftRight size={14} />
            </div>
            <span style={{ fontWeight: 600, fontSize: '0.98rem' }}>World Currency Converter</span>
          </div>

          <ul className="footer-nav">
            <li>
              <button 
                type="button"
                className="footer-link" 
                onClick={() => handleNav('converter')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Converter
              </button>
            </li>
            <li>
              <button 
                type="button"
                className="footer-link" 
                onClick={() => handleNav('rates')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Exchange Rates
              </button>
            </li>
            <li>
              <button 
                type="button"
                className="footer-link" 
                onClick={() => handleNav('currencies')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Currencies
              </button>
            </li>
            <li>
              <button 
                type="button"
                className="footer-link" 
                onClick={() => handleNav('history')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                History
              </button>
            </li>
            <li>
              <button 
                type="button"
                className="footer-link" 
                onClick={() => handleNav('about')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                About
              </button>
            </li>
            <li>
              <button 
                type="button"
                className="footer-link" 
                onClick={() => handleNav('privacy')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Privacy
              </button>
            </li>
            <li>
              <button 
                type="button"
                className="footer-link" 
                onClick={() => handleNav('terms')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Terms
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} World Currency Converter. Data powered by ExchangeRate-API.
          </div>
          <div>
            Rates are provided for informational and calculated reference only.
          </div>
        </div>
      </div>
    </footer>
  );
}
