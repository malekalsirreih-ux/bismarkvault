export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const apiKey = process.env.OPENAI_API_KEY;
  const { fileContent, fileName } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Du bist BismarkVault AI. Analysiere Dokumente professionell auf Deutsch und Arabisch." },
          { role: "user", content: `Analysiere: ${fileName}\n\n${fileContent}` }
        ]
      })
    });
    const data = await response.json();
    res.status(200).json({ analysis: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
