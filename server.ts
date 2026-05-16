import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Dictionary of sounds and their better phonetic descriptions for TTS
const SOUND_TTS_HINTS: Record<string, string> = {
  'iː': 'vowel sound ee as in see',
  'ɪ': 'vowel sound ih as in sit',
  'ʊ': 'vowel sound uu as in put',
  'uː': 'vowel sound oo as in blue',
  'e': 'vowel sound eh as in bed',
  'ə': 'vowel sound uh as in about',
  'ɜː': 'vowel sound er as in bird',
  'ɔː': 'vowel sound aw as in door',
  'æ': 'vowel sound a as in cat',
  'ʌ': 'vowel sound u as in cup',
  'ɑː': 'vowel sound aa as in father',
  'ɒ': 'vowel sound o as in hot',
};

const AUDIO_CACHE: Record<string, string> = {};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Gemini SDK setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/tts", async (req, res) => {
    try {
      const { text, symbol } = req.body;
      const cacheKey = symbol ? `symbol_${symbol}` : `text_${text}`;

      if (AUDIO_CACHE[cacheKey]) {
        return res.json({ audio: AUDIO_CACHE[cacheKey], cached: true });
      }
      
      const prompt = symbol 
        ? `Say the British English phoneme: ${SOUND_TTS_HINTS[symbol] || symbol}.` 
        : `Say clearly in a British accent: ${text}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        AUDIO_CACHE[cacheKey] = base64Audio;
        res.json({ audio: base64Audio });
      } else {
        res.status(500).json({ error: 'Failed to generate audio' });
      }
    } catch (error: any) {
      console.error('TTS Error:', error);
      // If it's a quota error, we send a specific status
      const status = error.message?.includes('429') || error.message?.includes('quota') ? 429 : 500;
      res.status(status).json({ error: error.message });
    }
  });

  app.post("/api/pronunciation-feedback", async (req, res) => {
    try {
      const { audio, soundSymbol, contextWord } = req.body;
      
      const prompt = `
        You are a British English Pronunciation Expert.
        The user is practicing the IPA sound: /${soundSymbol}/.
        Context word: "${contextWord}".
        Analyze the provided audio and provide detailed feedback on articulation.
        Focus on:
        1. Mouth position (lips, jaw)
        2. Tongue placement
        3. Voicing and airflow
        4. Comparison to Received Pronunciation (RP)
        
        Provide the response in JSON format:
        {
          "score": (0-100),
          "generalFeedback": "string",
          "articulationTips": "string",
          "corrections": ["string"],
          "isCorrect": boolean
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "audio/webm", // Usually webm from browser MediaRecorder
              data: audio // base64
            }
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      res.json(JSON.parse(response.text || "{}"));
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
