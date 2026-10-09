import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RatesPage from './pages/RatesPage';
import CurrenciesPage from './pages/CurrenciesPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import { getCurrencies, getRates } from './services/api';

export default function App() {
  const [activePage, setActivePage] = useState('converter');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [currencies, setCurrencies] = useState([]);
  const [ratesMap, setRatesMap] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function initData() {
      try {
        const [currList, usdRates] = await Promise.all([
          getCurrencies(),
          getRates('USD')
        ]);
        if (currList && currList.length > 0) {
          setCurrencies(currList);
        }
        if (usdRates && usdRates.rates) {
          setRatesMap(usdRates.rates);
        }
      } catch (err) {
        console.warn('Initialization fetch error:', err);
      } finally {
        setInitialLoading(false);
      }
    }
    initData();
  }, []);

  const handleSelectPairToConvert = (from, to) => {
    setFromCurrency(from);
    setToCurrency(to);
    setActivePage('converter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSingleCurrency = (code) => {
    setToCurrency(code);
    setActivePage('converter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar activePage={activePage} setActivePage={setActivePage} />

        <main className="main-content">
          <div className="container">
            {activePage === 'converter' && (
              <HomePage
                currencies={currencies}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                setFromCurrency={setFromCurrency}
                setToCurrency={setToCurrency}
                ratesMap={ratesMap}
                setActivePage={setActivePage}
              />
            )}

            {activePage === 'rates' && (
              <RatesPage
                currencies={currencies}
                onSelectPairToConvert={handleSelectPairToConvert}
                setActivePage={setActivePage}
              />
            )}

            {activePage === 'currencies' && (
              <CurrenciesPage
                currencies={currencies}
                onSelectCurrency={handleSelectSingleCurrency}
                setActivePage={setActivePage}
              />
            )}

            {activePage === 'history' && (
              <HistoryPage
                onSelectPairToConvert={handleSelectPairToConvert}
                setActivePage={setActivePage}
              />
            )}

            {activePage === 'about' && <AboutPage />}
            {activePage === 'privacy' && <PrivacyPage />}
            {activePage === 'terms' && <TermsPage />}
          </div>
        </main>

        <Footer setActivePage={setActivePage} />
      </div>
    </ThemeProvider>
  );
}
