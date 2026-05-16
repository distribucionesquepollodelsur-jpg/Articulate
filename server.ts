import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// AI Provider Interface
interface AIProvider {
  name: string;
  generateText(prompt: string, config?: any): Promise<string>;
  generateSpeech(text: string, voice?: string): Promise<string>;
  analyzeSpeech(audioBase64: string, prompt: string): Promise<any>;
}

// Gemini Implementation
class GeminiProvider implements AIProvider {
  name = "gemini";
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY as string,
    });
  }

  async generateText(prompt: string, config?: any): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: config?.model || "gemini-3-flash-preview",
      contents: prompt
    });
    return response.text || "";
  }

  async generateSpeech(text: string, voice: string = "Kore"): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
  }

  async analyzeSpeech(audioBase64: string, prompt: string): Promise<any> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { parts: [{ text: prompt }] },
        {
          parts: [{
            inlineData: {
              mimeType: "audio/webm",
              data: audioBase64
            }
          }]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || "{}");
  }
}

// Orchestrator
class AIOrchestrator {
  private providers: Record<string, AIProvider> = {};
  private activeProviderName: string = "gemini";

  constructor() {
    this.providers["gemini"] = new GeminiProvider();
    // Easily add OpenAIProvider, ClaudeProvider here in production
  }

  get activeProvider(): AIProvider {
    return this.providers[this.activeProviderName];
  }

  async runTask<T>(task: (provider: AIProvider) => Promise<T>): Promise<T> {
    try {
      return await task(this.activeProvider);
    } catch (error: any) {
      console.error(`AI Task failed with ${this.activeProviderName}:`, error);
      // Implement fallback logic here:
      // if (this.activeProviderName === "gemini") { this.activeProviderName = "openai"; ... }
      throw error;
    }
  }
}

const orchestrator = new AIOrchestrator();

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

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", aiProvider: orchestrator.activeProvider.name });
  });

  app.post("/api/tts", async (req, res) => {
    try {
      const { text, symbol } = req.body;
      const cacheKey = symbol ? `symbol_${symbol}` : `text_${text}`;

      if (AUDIO_CACHE[cacheKey]) {
        return res.json({ audio: AUDIO_CACHE[cacheKey], cached: true });
      }
      
      const promptText = symbol 
        ? `Say the British English phoneme: ${SOUND_TTS_HINTS[symbol] || symbol}.` 
        : `Say clearly in a British accent: ${text}`;

      const base64Audio = await orchestrator.runTask(p => p.generateSpeech(promptText));

      if (base64Audio) {
        AUDIO_CACHE[cacheKey] = base64Audio;
        res.json({ audio: base64Audio });
      } else {
        res.status(500).json({ error: 'Failed to generate audio' });
      }
    } catch (error: any) {
      console.error('TTS Error:', error);
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

      const feedback = await orchestrator.runTask(p => p.analyzeSpeech(audio, prompt));
      res.json(feedback);
    } catch (error: any) {
      console.error("AI Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Adaptive Learning Endpoint
  app.post("/api/adaptive/next", async (req, res) => {
    try {
      const { userProgress, recentActivity } = req.body;
      
      const prompt = `
        Based on these user stats: ${JSON.stringify(userProgress)}
        And recent activity: ${JSON.stringify(recentActivity)}
        
        Recommend the NEXT best activity for this British English accent student.
        Choose from:
        - "lab": Practice a specific sound
        - "lesson": Watch a video tutorial
        - "game": Play a reinforcement game
        - "explore": Browse the IPA chart
        
        Provide the response in JSON format:
        {
          "type": "lab" | "lesson" | "game" | "explore",
          "activityId": "string",
          "recommendation": "string",
          "targetSound": "string" (optional)
        }
      `;

      const recommendation = await orchestrator.runTask(p => p.generateText(prompt, { model: "gemini-3-flash-preview" }));
      res.json(JSON.parse(recommendation));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Dynamic IPA Lookup
  app.post("/api/lookup", async (req, res) => {
    try {
      const { word } = req.body;
      const prompt = `Convert the British English word "${word}" to IPA. Provide ONLY the IPA characters between slashes, e.g., /heə/. Do not include any other text.`;
      const ipa = await orchestrator.runTask(p => p.generateText(prompt, { model: "gemini-3-flash-preview" }));
      res.json({ word, ipa: ipa.trim() });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Culture & Monarchy Endpoint
  app.get("/api/culture/monarchy-state", (req, res) => {
    // In a real prod environment, this would hit an official news API or a curated CMS
    res.json({ 
      state: "normal", 
      monarch: {
        name: "Charles III",
        accession: "2022-09-08"
      }
    });
  });

  // AI Semantic Media Matching & Validation
  app.post("/api/media/validate", (req, res) => {
    const { lessonTopic, mediaTags } = req.body;
    
    // Simulate AI semantic analysis
    const isRelevant = mediaTags.some((tag: string) => 
      lessonTopic.toLowerCase().includes(tag.toLowerCase())
    );

    const relevanceScore = isRelevant ? 0.85 + Math.random() * 0.15 : Math.random() * 0.3;

    res.json({
      validated: relevanceScore > 0.7,
      relevanceScore,
      analysis: isRelevant 
        ? "Semantic alignment detected between lesson phonetics and media metadata." 
        : "Media content appears unrelated to the target pronunciation objective."
    });
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
