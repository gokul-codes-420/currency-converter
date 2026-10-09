export default async function handler(req, res) {
  const base = String(req.query.base || 'USD').toUpperCase().trim();
  try {
    const apiRes = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    const data = await apiRes.json();
    const targets = ['EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SGD', 'AED', 'SAR'];
    const pairs = [];

    for (const target of targets) {
      if (target === base) continue;
      const rate = data.rates ? data.rates[target] : null;
      if (rate) {
        pairs.push({
          from: base,
          to: target,
          rate: Number(rate.toFixed(4)),
          inverseRate: Number((1 / rate).toFixed(4)),
          lastUpdate: data.time_last_update_utc
        });
      }
    }

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate');
    return res.status(200).json({ success: true, base, lastUpdate: data.time_last_update_utc, data: pairs });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
