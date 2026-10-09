export default async function handler(req, res) {
  const { from = 'USD', to = 'INR', amount = 1 } = req.query;
  const numAmount = parseFloat(amount);

  if (isNaN(numAmount) || numAmount < 0) {
    return res.status(400).json({ success: false, error: 'Amount must be non-negative number' });
  }

  const fromCode = String(from).toUpperCase().trim();
  const toCode = String(to).toUpperCase().trim();

  try {
    const apiRes = await fetch(`https://open.er-api.com/v6/latest/${fromCode}`);
    const data = await apiRes.json();
    const rate = data.rates ? data.rates[toCode] : null;

    if (!rate && rate !== 0) {
      return res.status(404).json({ success: false, error: `Rate for ${fromCode}/${toCode} unavailable` });
    }

    const convertedAmount = Number((numAmount * rate).toFixed(6));
    const inverseRate = rate !== 0 ? Number((1 / rate).toFixed(6)) : 0;

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return res.status(200).json({
      success: true,
      data: {
        from: fromCode,
        to: toCode,
        amount: numAmount,
        rate: Number(rate.toFixed(6)),
        inverseRate,
        convertedAmount,
        fromInfo: { code: fromCode, name: fromCode, symbol: fromCode },
        toInfo: { code: toCode, name: toCode, symbol: toCode },
        lastUpdate: data.time_last_update_utc || new Date().toUTCString(),
        provider: 'ExchangeRate-API'
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Conversion failed: ' + error.message });
  }
}
