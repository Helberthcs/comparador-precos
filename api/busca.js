export const maxDuration = 60;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch('https://helberth.app.n8n.cloud/webhook/busca-produto-v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    // Get raw text first
    const text = await response.text();
    
    // Try to parse as JSON, otherwise return as text
    let data;
    try {
      data = JSON.parse(text);
    } catch(e) {
      // It's plain text - wrap it
      data = { finalResponse: text.replace(/^=+/, '').trim() };
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
