const fs = require('fs');

const frontendCode = fs.readFileSync('./frontend/src/utils/currencyMetadata.js', 'utf8');

// Find start of CURRENCY_COUNTRY_MAP
const startIdx = frontendCode.indexOf('export const CURRENCY_COUNTRY_MAP = ');
const endIdx = frontendCode.indexOf('};\n\n/**', startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found');
  process.exit(1);
}

const mapJson = frontendCode.substring(startIdx + 'export const CURRENCY_COUNTRY_MAP = '.length, endIdx + 1);

const backendContent = `/**
 * Currency metadata containing ISO codes, currency names, symbols, and country information
 * Complete 166 fiat currency dataset
 */
const CURRENCY_METADATA = ${mapJson};

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
console.log('Backend updated successfully!');
