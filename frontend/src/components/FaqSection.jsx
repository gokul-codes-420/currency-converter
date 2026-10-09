import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How frequently are currency exchange rates updated?',
    answer: 'Exchange rates are updated daily directly from reputable global central banks and market feeds via ExchangeRate-API. The exact timestamp of the latest rate retrieval is transparently displayed on the converter card.'
  },
  {
    question: 'How are conversions calculated between two non-USD currencies?',
    answer: 'Conversions use exact triangular cross-rate arbitrage equations relative to base currency benchmarks. For currencies A and B, the cross-rate is precisely calculated as Rate(USD → B) / Rate(USD → A), preserving multi-decimal financial accuracy.'
  },
  {
    question: 'Can I use this currency converter on my mobile phone or tablet?',
    answer: 'Yes. The application is built with a responsive design philosophy that adapts seamlessly to desktop monitors, laptops, iPad/tablets, iPhones, and Android devices.'
  },
  {
    question: 'Are historical conversions saved on the server or locally?',
    answer: 'By default, your recent conversion history is saved locally in your browser storage so you do not need to register or sign in. If a persistent MongoDB database is configured, records can also synchronize seamlessly.'
  },
  {
    question: 'Are there any hidden fees or API limits for general use?',
    answer: 'No. This website is open for public currency conversions without any account creation or payment required.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Common questions regarding exchange rates, accuracy, and data sources.</p>
      </div>

      <div className="faq-list">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="faq-item">
              <button
                type="button"
                className="faq-question"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {isOpen && (
                <div className="faq-answer">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
