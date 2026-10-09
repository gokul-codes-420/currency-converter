const fs = require('fs');
const frontendMeta = fs.readFileSync('./frontend/src/utils/currencyMetadata.js', 'utf8');

// Extract CURRENCY_COUNTRY_MAP JSON
const match = frontendMeta.match(/export const CURRENCY_COUNTRY_MAP = ([\s\S]*?);\n\nexport function/);
if (!match) {
  console.error('Could not extract CURRENCY_COUNTRY_MAP');
  process.exit(1);
}

const map = JSON.parse(match[1]);

const backendContent = `/**
 * Currency metadata containing ISO codes, currency names, symbols, and country information
 * Complete 166 fiat currency dataset
 */
const CURRENCY_METADATA = ${JSON.stringify(map, null, 2)};

/**
 * Returns metadata for a currency code, falling back cleanly to generic info
 */
function getCurrencyInfo(code) {
  const upper = String(code || '').toUpperCase().trim();
  if (CURRENCY_METADATA[upper]) {
    const item = CURRENCY_METADATA[upper];
    return {
      code: item.code,
      name: item.name,
      country: item.country,
      symbol: item.symbol,
      flag: item.flag,
      popular: !!item.popular
    };
  }
  return {
    code: upper,
    name: upper,
    country: upper,
    symbol: upper,
    flag: '🌐',
    popular: false
  };
}

module.exports = {
  CURRENCY_METADATA,
  getCurrencyInfo
};
`;

fs.writeFileSync('./backend/src/services/currencyData.js', backendContent);
console.log('Updated backend/src/services/currencyData.js successfully!');
