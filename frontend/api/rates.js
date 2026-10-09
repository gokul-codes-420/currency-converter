export default async function handler(req, res) {
  const base = String(req.query.base || 'USD').toUpperCase().trim();
  try {
    const apiRes = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    const data = await apiRes.json();

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate');
    return res.status(200).json({
      success: true,
      base: data.base_code || base,
      rates: data.rates,
      lastUpdate: data.time_last_update_utc,
      nextUpdate: data.time_next_update_utc,
      provider: 'ExchangeRate-API'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch rates: ' + error.message
    });
  }
}
