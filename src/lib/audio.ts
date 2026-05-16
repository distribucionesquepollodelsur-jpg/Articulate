import { VOWELS, CONSONANTS } from './utils';

class AudioService {
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private voices: SpeechSynthesisVoice[] = [];
  private inFlightRequests: Map<string, Promise<any>> = new Map();
  private quotaCooldown: number = 0;
  private COOLDOWN_DURATION = 60000; // 1 minute cooldown if quota hit

  constructor() {
    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
  }

  private getBritishVoice(): SpeechSynthesisVoice | null {
    return (
      this.voices.find(v => v.lang === 'en-GB' && v.name.includes('Google')) ||
      this.voices.find(v => v.lang === 'en-GB') ||
      this.voices.find(v => v.lang.startsWith('en')) ||
      null
    );
  }

  public async speak(text: string, rate: number = 0.8) {
    if (Date.now() < this.quotaCooldown) {
      console.warn('TTS Quota cool-down active. Using native fallback.');
      return this.fallbackSpeak(text);
    }

    const cacheKey = `text_${text}`;
    if (this.inFlightRequests.has(cacheKey)) {
      return this.inFlightRequests.get(cacheKey);
    }

    const requestPromise = (async () => {
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });

        if (response.status === 429) {
          this.quotaCooldown = Date.now() + this.COOLDOWN_DURATION;
          throw new Error('Quota exceeded');
        }

        const data = await response.json();
        if (data.audio) {
          await this.playBase64Audio(data.audio, rate);
        } else {
          this.fallbackSpeak(text);
        }
      } catch (err) {
        console.error('AI TTS failed, falling back:', err);
        this.fallbackSpeak(text);
      } finally {
        this.inFlightRequests.delete(cacheKey);
      }
    })();

    this.inFlightRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  private playBase64Audio(base64: string, rate: number = 1.0): Promise<void> {
    return new Promise((resolve, reject) => {
      // Try multiple mime types if one fails, or use a more generic one
      // Gemini usually returns mp3 for TTS
      const audio = new Audio(`data:audio/mpeg;base64,${base64}`);
      audio.playbackRate = rate;
      
      audio.onended = () => {
        audio.remove();
        resolve();
      };
      
      audio.onerror = (e) => {
        console.error('Audio playback error:', e);
        // Try fallback with different mime type if failed
        const altAudio = new Audio(`data:audio/wav;base64,${base64}`);
        altAudio.playbackRate = rate;
        altAudio.onended = () => { altAudio.remove(); resolve(); };
        altAudio.onerror = () => { altAudio.remove(); reject(e); };
        altAudio.play().catch(reject);
      };

      audio.play().catch(reject);
    });
  }

  private fallbackSpeak(text: string) {
    if (!this.synth) return;
    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.getBritishVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.8;
    this.synth.speak(utterance);
  }

  public async speakIPASound(symbol: string, _examples: string[]) {
    if (Date.now() < this.quotaCooldown) {
      if (_examples && _examples.length > 0) return this.speak(_examples[0]);
      return;
    }

    const cacheKey = `symbol_${symbol}`;
    if (this.inFlightRequests.has(cacheKey)) {
      return this.inFlightRequests.get(cacheKey);
    }

    const requestPromise = (async () => {
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symbol })
        });

        if (response.status === 429) {
          this.quotaCooldown = Date.now() + this.COOLDOWN_DURATION;
          throw new Error('Quota exceeded');
        }

        const data = await response.json();
        if (data.audio) {
          await this.playBase64Audio(data.audio, 1.0);
        } else {
          if (_examples && _examples.length > 0) this.speak(_examples[0]);
        }
      } catch (err) {
        console.error('AI TTS failed for symbol, falling back:', err);
        if (_examples && _examples.length > 0) this.speak(_examples[0]);
      } finally {
        this.inFlightRequests.delete(cacheKey);
      }
    })();

    this.inFlightRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }
}

export const audioService = new AudioService();
