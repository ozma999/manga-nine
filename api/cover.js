export default async function handler(req, res) {
  const { url } = req.query;

  if (!/^https:\/\/s4\.anilist\.co\//.test(url || '')) {
    return res.status(400).send('허용되지 않은 주소입니다');
  }

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) return res.status(upstream.status).end();

    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(Buffer.from(await upstream.arrayBuffer()));
  } catch {
    res.status(502).send('표지를 가져오지 못했습니다');
  }
}
