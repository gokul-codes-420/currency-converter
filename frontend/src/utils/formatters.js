/**
 * Currency and Number Formatting Utilities
 */

const ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

function convertGroupUnderThousand(n) {
  let str = '';
  if (n >= 100) {
    str += ONES[Math.floor(n / 100)] + ' Hundred ';
    n %= 100;
  }
  if (n >= 20) {
    str += TENS[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + ONES[n % 10] : '') + ' ';
  } else if (n > 0) {
    str += ONES[n] + ' ';
  }
  return str.trim();
}

/**
 * Convert INR amount into Indian Words (Crores, Lakhs, Thousands, Rupees, Paise)
 */
export function inrToWords(amount) {
  const num = Math.abs(Number(amount));
  if (isNaN(num) || num === 0) return 'Zero Rupees';

  const parts = num.toFixed(2).split('.');
  let integerPart = parseInt(parts[0], 10);
  const decimalPart = parseInt(parts[1], 10);

  if (integerPart === 0 && decimalPart === 0) return 'Zero Rupees';

  let result = '';

  const crore = Math.floor(integerPart / 10000000);
  integerPart %= 10000000;

  const lakh = Math.floor(integerPart / 100000);
  integerPart %= 100000;

  const thousand = Math.floor(integerPart / 1000);
  integerPart %= 1000;

  const remainder = integerPart;

  if (crore > 0) {
    result += convertGroupUnderThousand(crore) + ' Crore ';
  }
  if (lakh > 0) {
    result += convertGroupUnderThousand(lakh) + ' Lakh ';
  }
  if (thousand > 0) {
    result += convertGroupUnderThousand(thousand) + ' Thousand ';
  }
  if (remainder > 0) {
    result += convertGroupUnderThousand(remainder) + ' ';
  }

  result = result.trim();
  if (!result) {
    result = 'Zero';
  }

  result += result === 'One' ? ' Rupee' : ' Rupees';

  if (decimalPart > 0) {
    result += ' and ' + convertGroupUnderThousand(decimalPart) + ' Paise';
  }

  return result;
}

/**
 * Convert International currencies into standard English Words
 */
export function internationalToWords(amount, currencyCode = 'USD', currencyName = '') {
  const num = Math.abs(Number(amount));
  if (isNaN(num) || num === 0) return `Zero ${currencyCode}`;

  const parts = num.toFixed(2).split('.');
  let integerPart = parseInt(parts[0], 10);
  const decimalPart = parseInt(parts[1], 10);

  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
  const chunks = [];

  while (integerPart > 0) {
    chunks.push(integerPart % 1000);
    integerPart = Math.floor(integerPart / 1000);
  }

  const words = [];
  for (let i = chunks.length - 1; i >= 0; i--) {
    if (chunks[i] > 0) {
      words.push(convertGroupUnderThousand(chunks[i]) + (scales[i] ? ' ' + scales[i] : ''));
    }
  }

  let result = words.join(' ').trim();
  if (!result) result = 'Zero';

  const units = {
    USD: { main: 'US Dollar', plural: 'US Dollars', sub: 'Cent', subPlural: 'Cents' },
    EUR: { main: 'Euro', plural: 'Euros', sub: 'Cent', subPlural: 'Cents' },
    GBP: { main: 'British Pound', plural: 'British Pounds', sub: 'Pence', subPlural: 'Pence' },
    CAD: { main: 'Canadian Dollar', plural: 'Canadian Dollars', sub: 'Cent', subPlural: 'Cents' },
    AUD: { main: 'Australian Dollar', plural: 'Australian Dollars', sub: 'Cent', subPlural: 'Cents' },
    AED: { main: 'UAE Dirham', plural: 'UAE Dirhams', sub: 'Fil', subPlural: 'Fils' },
    SAR: { main: 'Saudi Riyal', plural: 'Saudi Riyals', sub: 'Halala', subPlural: 'Halalas' },
    SGD: { main: 'Singapore Dollar', plural: 'Singapore Dollars', sub: 'Cent', subPlural: 'Cents' },
    JPY: { main: 'Japanese Yen', plural: 'Japanese Yen', sub: '', subPlural: '' }
  };

  const unit = units[currencyCode] || {
    main: currencyName || currencyCode,
    plural: (currencyName || currencyCode),
    sub: 'Cent',
    subPlural: 'Cents'
  };

  result += ' ' + (num === 1 ? unit.main : unit.plural);

  if (decimalPart > 0 && unit.sub) {
    result += ' and ' + convertGroupUnderThousand(decimalPart) + ' ' + (decimalPart === 1 ? unit.sub : unit.subPlural);
  }

  return result;
}

/**
 * Returns clean Amount in Words for any currency
 */
export function amountToWords(amount, currencyCode = 'INR', currencyName = '') {
  if (currencyCode === 'INR') {
    return inrToWords(amount);
  }
  return internationalToWords(amount, currencyCode, currencyName);
}

/**
 * Compact Indian Lakhs / Crores shorthand representation
 * e.g. 145228.61 -> "₹1.45 Lakhs"
 */
export function getIndianCompactNotation(amount) {
  const num = Number(amount);
  if (isNaN(num)) return null;

  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Crore`;
  }
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} Lakh`;
  }
  if (num >= 1000) {
    return `₹${(num / 1000).toFixed(2)} Thousand`;
  }
  return null;
}

/**
 * Format a number with standard commas or Indian grouping
 */
export function formatCurrencyValue(amount, maxDecimals = 4, isINR = false) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0.00';
  }

  const num = Number(amount);

  let decimals = 2;
  if (Math.abs(num) < 0.0001) {
    decimals = 6;
  } else if (Math.abs(num) < 1) {
    decimals = 4;
  } else if (Math.abs(num) < 100) {
    decimals = Math.min(maxDecimals, 4);
  } else {
    decimals = 2;
  }

  // Use Indian locale grouping (e.g. 1,45,228.61) if isINR is true
  const locale = isINR ? 'en-IN' : 'en-US';

  return num.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals
  });
}

/**
 * Format timestamp into readable localized string
 */
export function formatTimestamp(dateString) {
  if (!dateString) return 'Just now';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  } catch {
    return dateString;
  }
}
