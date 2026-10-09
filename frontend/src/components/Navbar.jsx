import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowLeftRight } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'converter', label: 'Converter' },
    { id: 'rates', label: 'Exchange Rates' },
    { id: 'currencies', label: 'Currencies' },
    { id: 'history', label: 'History' },
    { id: 'about', label: 'About' }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a 
          href="#home" 
          className="brand-link" 
          onClick={(e) => { e.preventDefault(); handleNavClick('converter'); }}
        >
          <div className="brand-icon">
            <ArrowLeftRight size={16} />
          </div>
          <span>World Currency Converter</span>
        </a>

        {/* Desktop Nav */}
        <nav>
          <ul className="nav-links desktop-only">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions (Theme toggle + Mobile hamburger) */}
        <div className="nav-actions">
          <button 
            type="button" 
            className="icon-btn" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button 
            type="button" 
            className="icon-btn mobile-nav-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

        {/* Mobile Menu Dropdown & Backdrop */}
        {mobileMenuOpen && (
          <>
            <div 
              className="mobile-menu-backdrop" 
              onClick={() => setMobileMenuOpen(false)} 
              aria-hidden="true" 
            />
            <div className="mobile-menu" role="menu">
              {navItems.map(item => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  className={`mobile-nav-item ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </header>
  );
}
