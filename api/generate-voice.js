module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  try {
    const { text, voiceId, stability, similarityBoost, style } = req.body || {};

    if (!text || !text.trim()) {
      res.status(400).json({ success: false, error: 'Script text is required.' });
      return;
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        success: false,
        error: "Server is missing ELEVENLABS_API_KEY. Add it in your hosting provider's Environment Variables settings.",
      });
      return;
    }

    const finalVoiceId = voiceId || 'pNInz6obpgDQGcFmaJgB';

    const elevenLabsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${finalVoiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: typeof stability === 'number' ? stability : 0.45,
            similarity_boost: typeof similarityBoost === 'number' ? similarityBoost : 0.8,
            style: typeof style === 'number' ? style : 0.35,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!elevenLabsResponse.ok) {
      let errorDetail = '';
      try {
        const errJson = await elevenLabsResponse.json();
        errorDetail = errJson?.detail?.message || JSON.stringify(errJson);
      } catch {
        errorDetail = await elevenLabsResponse.text();
      }
      res.status(elevenLabsResponse.status).json({
        success: false,
        error: `ElevenLabs API error (${elevenLabsResponse.status}): ${errorDetail}`,
      });
      return;
    }

    const arrayBuffer = await elevenLabsResponse.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioBuffer.length);
    res.status(200).send(audioBuffer);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message || 'Unknown server error.' });
  }
};
