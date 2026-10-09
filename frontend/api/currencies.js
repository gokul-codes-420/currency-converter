const CURRENCY_METADATA = {
  USD: { code: 'USD', name: 'United States Dollar', symbol: '$', flag: '🇺🇸', popular: true },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', popular: true },
  GBP: { code: 'GBP', name: 'British Pound Sterling', symbol: '£', flag: '🇬🇧', popular: true },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', popular: true },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', popular: true },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', popular: true },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', popular: true },
  CHF: { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', popular: true },
  CNY: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', popular: true },
  SGD: { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', popular: true },
  AED: { code: 'AED', name: 'United Arab Emirates Dirham', symbol: 'د.إ', flag: '🇦🇪', popular: true },
  SAR: { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦', popular: true },
  NZD: { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', popular: true },
  HKD: { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', popular: true },
  KRW: { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', popular: true },
  THB: { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', popular: true },
  MYR: { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', popular: true },
  IDR: { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', popular: true },
  LKR: { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', flag: '🇱🇰', popular: true },
  NPR: { code: 'NPR', name: 'Nepalese Rupee', symbol: 'रू', flag: '🇳🇵', popular: true },
  BDT: { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: 'bd', flag: '🇧🇩', popular: true },
  PKR: { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰', popular: true },
  ZAR: { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', popular: true },
  BRL: { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', popular: true },
  MXN: { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', popular: true },
  PHP: { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', popular: true },
  SEK: { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', popular: false },
  NOK: { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', popular: false },
  DKK: { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', popular: false },
  PLN: { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱', popular: false },
  TRY: { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', popular: false },
  ILS: { code: 'ILS', name: 'Israeli New Shekel', symbol: '₪', flag: '🇮🇱', popular: false },
  CZK: { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', popular: false },
  HUF: { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', popular: false },
  RON: { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴', popular: false },
  BGN: { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬', popular: false },
  EGP: { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬', popular: false },
  VND: { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', popular: false },
  KWD: { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KD', flag: '🇰🇼', popular: false },
  QAR: { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR', flag: '🇶🇦', popular: false },
  OMR: { code: 'OMR', name: 'Omani Rial', symbol: 'OMR', flag: '🇴🇲', popular: false },
  BHD: { code: 'BHD', name: 'Bahraini Dinar', symbol: 'BD', flag: '🇧🇭', popular: false },
  NGN: { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬', popular: false },
  KES: { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪', popular: false },
  GHS: { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', flag: '🇬🇭', popular: false }
};

export default async function handler(req, res) {
  try {
    const apiRes = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await apiRes.json();
    const codes = new Set(Object.keys(CURRENCY_METADATA));
    if (data.rates) {
      Object.keys(data.rates).forEach(c => codes.add(c));
    }

    const list = Array.from(codes).map(code => {
      if (CURRENCY_METADATA[code]) return CURRENCY_METADATA[code];
      return { code, name: code, symbol: code, flag: '🌐', popular: false };
    });

    list.sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.code.localeCompare(b.code);
    });

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    const fallbackList = Object.values(CURRENCY_METADATA);
    return res.status(200).json({ success: true, count: fallbackList.length, data: fallbackList });
  }
}
