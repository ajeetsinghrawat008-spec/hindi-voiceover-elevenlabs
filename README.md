# Hindi AI Voiceover Generator (ElevenLabs)

Ek ready-to-use Hindi voiceover app jo ElevenLabs ki premium male voices use karta hai
(Adam, Antoni, Arnold, Josh, Sam) — 5 alag tones ke saath: Deep Attractive Male,
Dark Psychology, Storytelling, Motivational, Documentary Narrator.

## Kaise use kare (GitHub + Vercel se live karna)

1. Is poore folder ka content ek naye GitHub repository me push karo.
2. https://vercel.com par GitHub se login karo aur "Add New Project" se yahi repo import karo.
3. Import screen par **Environment Variables** section me ek variable add karo:
   - Key: `ELEVENLABS_API_KEY`
   - Value: apni ElevenLabs API key (elevenlabs.io se banayi hui — dashboard me
     Profile -> API Keys se milti hai)
4. **Deploy** dabao. 1-2 minute me live link mil jayega.

## Local test karne ke liye (optional)

```
npm install -g vercel
vercel dev
```

Phir `http://localhost:3000` par khol ke test kar sakte ho (isके liye bhi
`ELEVENLABS_API_KEY` environment variable set honi chahiye, `.env` file me
ya terminal me export karke).

## Voice IDs badalna ho to

`index.html` ke andar `VOICES` array me har voice ka `id` field hai — agar
ElevenLabs par apni khud ki custom voice clone banayi ho, uska Voice ID
wahan paste kar do.

## Note

- Ye app 100% frontend + ek chhoti serverless function hai — koi extra
  backend server chalane ki zarurat nahi.
- API key hamesha server-side (`api/generate-voice.js`) me hi use hoti hai,
  browser me kabhi expose nahi hoti.
- ElevenLabs free tier me limited monthly credits milte hain; zyada use
  karne par paid plan lena padega.
