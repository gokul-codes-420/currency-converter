export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    platform: 'Vercel Serverless',
    database: 'client-backed localStorage & serverless caching',
    environment: 'production'
  });
}
