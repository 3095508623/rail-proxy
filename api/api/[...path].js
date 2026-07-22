export default async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);

  let path = url.pathname.replace(/^\/api/, '');
  const targetUrl = 'https://api.rail.re' + path + url.search;

  try {
    const proxyResponse = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    const data = await proxyResponse.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'application/json');
    res.status(proxyResponse.status).json(data);
  } catch (err) {
    res.status(502).json({ error: '代理请求失败', detail: err.message });
  }
}
