import { VOWELS, CONSONANTS } from './utils';

class AudioService {
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private voices: SpeechSynthesisVoice[] = [];
  private inFlightRequests: Map<string, Promise<any>> = new Map();
  private quotaCooldown: number = 0;
  private COOLDOWN_DURATION = 300000; // 5 minute cooldown if quota hit
  private CACHE_PREFIX = 'articulate_audio_';

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

  private getCachedAudio(key: string): string | null {
    try {
      return localStorage.getItem(this.CACHE_PREFIX + key);
    } catch {
      return null;
    }
  }

  private setCachedAudio(key: string, base64: string) {
    try {
      localStorage.setItem(this.CACHE_PREFIX + key, base64);
    } catch (e) {
      console.warn('Audio cache full, skipping storage');
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
    
    // Check persistent cache
    const cached = this.getCachedAudio(cacheKey);
    if (cached) {
      return this.playBase64Audio(cached, rate);
    }

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
          this.setCachedAudio(cacheKey, data.audio);
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

  private async playBase64Audio(base64: string, rate: number = 1.0): Promise<void> {
    try {
      // Gemini TTS returns raw 24kHz 16-bit mono PCM data
      // We need to wrap it in a WAV header to play it with the Audio element
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const sampleRate = 24000;
      const wavBlob = this.createWavBlob(bytes, sampleRate);
      const url = URL.createObjectURL(wavBlob);

      return new Promise((resolve, reject) => {
        const audio = new Audio(url);
        audio.playbackRate = rate;
        
        audio.onended = () => {
          URL.revokeObjectURL(url);
          audio.remove();
          resolve();
        };
        
        audio.onerror = (e) => {
          console.error('Audio playback error:', e);
          URL.revokeObjectURL(url);
          audio.remove();
          reject(e);
        };

        audio.play().catch(reject);
      });
    } catch (err) {
      console.error('Failed to process base64 audio:', err);
      throw err;
    }
  }

  private createWavBlob(pcmData: Uint8Array, sampleRate: number): Blob {
    const header = new ArrayBuffer(44);
    const view = new DataView(header);
    
    const writeString = (v: DataView, offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        v.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + pcmData.length, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); // byteRate: sampleRate * numChannels * bitsPerSample/8
    view.setUint16(32, 2, true); // blockAlign: numChannels * bitsPerSample/8
    view.setUint16(34, 16, true); // bitsPerSample
    writeString(view, 36, 'data');
    view.setUint32(40, pcmData.length, true);
    
    return new Blob([header, pcmData], { type: 'audio/wav' });
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
    
    // Check persistent cache
    const cached = this.getCachedAudio(cacheKey);
    if (cached) {
      return this.playBase64Audio(cached, 1.0);
    }

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
          this.setCachedAudio(cacheKey, data.audio);
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
