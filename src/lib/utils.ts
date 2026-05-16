import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// IPA Data Constants
export const VOWELS = [
  { 
    symbol: "iː", 
    name: "Long i", 
    category: "vowel-long", 
    place: "Front", 
    mouth: "Close", 
    lip: "Unrounded", 
    examples: ["see", "heat", "cheese", "believe"], 
    description: "The front of the tongue is high, near the roof of the mouth. The lips are stretched wide.",
    articulation: {
      tongue: "Front part raised high towards the hard palate.",
      lips: "Spread to a wide, smiling position.",
      jaw: "Closed or nearly closed.",
      instruction: "Position your tongue tip behind your lower teeth. Raise the middle of your tongue high up. Smile slightly to spread your lips."
    }
  },
  { 
    symbol: "ɪ", 
    name: "Short i", 
    category: "vowel-short", 
    place: "Front-central", 
    mouth: "Near-close", 
    lip: "Unrounded", 
    examples: ["sit", "hit", "fill", "busy"], 
    description: "Similar to /iː/ but more relaxed. The tongue is slightly lower and further back.",
    articulation: {
      tongue: "Raised towards the roof but more relaxed than /iː/.",
      lips: "Neutral and slightly spread.",
      jaw: "Slightly more open than /iː/.",
      instruction: "Relax your tongue. It should be lower than for the long 'ee' sound. The sound is short and crisp."
    }
  },
  { 
    symbol: "ʊ", 
    name: "Short oo", 
    category: "vowel-short", 
    place: "Back-central", 
    mouth: "Near-close", 
    lip: "Rounded", 
    examples: ["put", "foot", "good", "book"], 
    description: "Near-close back rounded vowel.",
    articulation: {
      tongue: "Back part raised towards the soft palate.",
      lips: "Rounded and relaxed.",
      jaw: "Nearly closed.",
      instruction: "Round your lips loosely. Raise the back of your tongue. Don't push too much air."
    }
  },
  { 
    symbol: "uː", 
    name: "Long oo", 
    category: "vowel-long", 
    place: "Back", 
    mouth: "Close", 
    lip: "Rounded", 
    examples: ["blue", "food", "shoe", "moon"], 
    description: "High back rounded vowel.",
    articulation: {
      tongue: "Back part raised high towards the soft palate.",
      lips: "Tensely rounded into a small circle.",
      jaw: "Closed.",
      instruction: "Pucker your lips as if to whistle. Lift the back of your tongue high."
    }
  },
  { 
    symbol: "e", 
    name: "Short e", 
    category: "vowel-short", 
    place: "Front", 
    mouth: "Open-mid", 
    lip: "Unrounded", 
    examples: ["bed", "set", "head", "many"], 
    description: "Mid-font vowel.",
    articulation: {
      tongue: "Front part raised to a mid-height.",
      lips: "Medium spread.",
      jaw: "Comfortably open.",
      instruction: "Drop your jaw slightly. Keep the front of your tongue raised to the middle of your mouth."
    }
  },
  { 
    symbol: "ə", 
    name: "Schwa", 
    category: "vowel-short", 
    place: "Central", 
    mouth: "Mid", 
    lip: "Unrounded", 
    examples: ["about", "teacher", "police", "sofa"], 
    description: "The most common and important sound in English. Completely relaxed.",
    articulation: {
      tongue: "Central and neutral, completely relaxed in the middle of the mouth.",
      lips: "Neutral and relaxed.",
      jaw: "Mid-position, relaxed.",
      instruction: "Relax everything—your tongue, your lips, your jaw. Say 'uh' very lightly and quickly."
    }
  },
  { 
    symbol: "ɜː", 
    name: "Long ur", 
    category: "vowel-long", 
    place: "Central", 
    mouth: "Open-mid", 
    lip: "Unrounded", 
    examples: ["bird", "work", "learn", "world"], 
    description: "Central mid vowel. Note: Non-rhotic in RP (the 'r' is silent).",
    articulation: {
      tongue: "Central part raised slightly higher than schwa.",
      lips: "Neutral.",
      jaw: "Mid-open.",
      instruction: "Hold a neutral tongue position and produce a long, steady sound. Don't curl your tongue back for the 'r' in RP."
    }
  },
  { 
    symbol: "ɔː", 
    name: "Long o", 
    category: "vowel-long", 
    place: "Back", 
    mouth: "Open-mid", 
    lip: "Rounded", 
    examples: ["door", "fork", "walk", "hall"], 
    description: "Mid-back rounded vowel.",
    articulation: {
      tongue: "Back part raised higher than /ɒ/.",
      lips: "Rounded and tense.",
      jaw: "Mid-open.",
      instruction: "Round your lips firmly. Pull your tongue back slightly."
    }
  },
  { 
    symbol: "æ", 
    name: "Short a", 
    category: "vowel-short", 
    place: "Front", 
    mouth: "Near-open", 
    lip: "Unrounded", 
    examples: ["cat", "hat", "apple", "bank"], 
    description: "The tongue is low and forward.",
    articulation: {
      tongue: "Front part low in the mouth.",
      lips: "Slightly spread.",
      jaw: "Wide open.",
      instruction: "Open your mouth wide. Press the sides of your tongue against your bottom teeth."
    }
  },
  { 
    symbol: "ʌ", 
    name: "Short u", 
    category: "vowel-short", 
    place: "Central", 
    mouth: "Open-mid", 
    lip: "Unrounded", 
    examples: ["cup", "luck", "money", "done"], 
    description: "A neutral central vowel, often called the 'cup' vowel.",
    articulation: {
      tongue: "Central-back part raised slightly.",
      lips: "Neutral.",
      jaw: "Open.",
      instruction: "Open your mouth comfortably. The sound is short and central."
    }
  },
  { 
    symbol: "ɑː", 
    name: "Long a", 
    category: "vowel-long", 
    place: "Back", 
    mouth: "Open", 
    lip: "Unrounded", 
    examples: ["car", "farm", "father", "glass"], 
    description: "A deep back vowel, tongue is flat.",
    articulation: {
      tongue: "Pulled back and held very low.",
      lips: "Neutral.",
      jaw: "Fully open.",
      instruction: "Open your mouth wide as if at the dentist. Pull your tongue back into the throat slightly."
    }
  },
  { 
    symbol: "ɒ", 
    name: "Short o", 
    category: "vowel-short", 
    place: "Back", 
    mouth: "Open", 
    lip: "Rounded", 
    examples: ["hot", "sock", "stop", "want"], 
    description: "Open back rounded vowel.",
    articulation: {
      tongue: "Low and back.",
      lips: "Rounded but relaxed.",
      jaw: "Wide open.",
      instruction: "Open your mouth wide and round your lips into an 'O' shape."
    }
  }
];

export const CONSONANTS = [
  { symbol: "p", name: "p", voicing: "voiceless", manner: "plosive", place: "bilabial", examples: ["pin", "cap", "paper"], description: "Produced by blocking and then releasing the airflow with both lips.", articulation: { lips: "Closed then popped open.", instruction: "Press your lips together, build up air pressure, then release it suddenly with a puff of air." } },
  { symbol: "b", name: "b", voicing: "voiced", manner: "plosive", place: "bilabial", examples: ["bin", "cab", "baby"], description: "Similar to /p/ but with vocal cord vibration.", articulation: { lips: "Closed then popped open.", instruction: "Simultaneously vibrate your vocal cords while releasing your lips." } },
  { symbol: "t", name: "t", voicing: "voiceless", manner: "plosive", place: "alveolar", examples: ["tin", "cat", "letter"], description: "Blocking airflow with the tongue tip against the ridge behind upper teeth.", articulation: { tongue: "Tip against alveolar ridge.", instruction: "Place the tip of your tongue on the bony ridge behind your upper teeth. Build up pressure and release." } },
  { symbol: "d", name: "d", voicing: "voiced", manner: "plosive", place: "alveolar", examples: ["din", "cad", "daddy"], description: "Similar to /t/ but with vocal cord vibration.", articulation: { tongue: "Tip against alveolar ridge.", instruction: "Vibrate your vocal cords as you release the tongue from the ridge." } },
  { symbol: "k", name: "k", voicing: "voiceless", manner: "plosive", place: "velar", examples: ["kin", "back", "kite"], description: "Blocking airflow with the back of the tongue against the soft palate.", articulation: { tongue: "Back against soft palate.", instruction: "Raise the back of your tongue against the soft palate (the roof of your mouth further back). Release with a puff." } },
  { symbol: "g", name: "g", voicing: "voiced", manner: "plosive", place: "velar", examples: ["gun", "bag", "google"], description: "Similar to /k/ but with vocal cord vibration.", articulation: { tongue: "Back against soft palate.", instruction: "Vibrate your vocal cords as you release the tongue." } },
  { symbol: "f", name: "f", voicing: "voiceless", manner: "fricative", place: "labiodental", examples: ["fan", "leaf", "photo"], description: "Airflow restricted between bottom lip and top teeth.", articulation: { lips: "Lower lip against upper teeth.", instruction: "Touch your bottom lip to your upper teeth and blow air through the gap." } },
  { symbol: "v", name: "v", voicing: "voiced", manner: "fricative", place: "labiodental", examples: ["van", "leave", "vest"], description: "Similar to /f/ but with vocal cord vibration.", articulation: { lips: "Lower lip against upper teeth.", instruction: "Vibrate your vocal cords while blowing air between teeth and lip." } },
  { symbol: "θ", name: "th (soft)", voicing: "voiceless", manner: "fricative", place: "dental", examples: ["thin", "bath", "think"], description: "Airflow between tongue tip and top teeth.", articulation: { tongue: "Tip between teeth.", instruction: "Place the tip of your tongue between your teeth and blow gently." } },
  { symbol: "ð", name: "th (hard)", voicing: "voiced", manner: "fricative", place: "dental", examples: ["then", "bathe", "the"], description: "Similar to /θ/ but with vocal cord vibration.", articulation: { tongue: "Tip between teeth.", instruction: "Vibrate your vocal cords while blowing air between teeth and tongue." } },
  { symbol: "s", name: "s", voicing: "voiceless", manner: "fricative", place: "alveolar", examples: ["sip", "bus", "science"], description: "Standard 's' sound.", articulation: { tongue: "Close to alveolar ridge.", instruction: "Place the sides of your tongue against your side teeth. Blow air through the narrow channel in the middle." } },
  { symbol: "z", name: "z", voicing: "voiced", manner: "fricative", place: "alveolar", examples: ["zip", "buzz", "result"], description: "Standard 'z' sound.", articulation: { tongue: "Close to alveolar ridge.", instruction: "Vibrate your vocal cords while making the 's' position." } },
  { symbol: "ʃ", name: "sh", voicing: "voiceless", manner: "fricative", place: "postalveolar", examples: ["ship", "bush", "sure"], description: "Airflow between tongue and the area just behind the alveolar ridge.", articulation: { lips: "Puckered/Rounded.", instruction: "Round your lips slightly and blow air across the top of your tongue held near the roof of your mouth." } },
  { symbol: "ʒ", name: "zh", voicing: "voiced", manner: "fricative", place: "postalveolar", examples: ["measure", "vision", "pleasure"], description: "Similar to /ʃ/ but with vocal cord vibration.", articulation: { lips: "Puckered/Rounded.", instruction: "Vibrate your vocal cords while in the 'sh' position." } },
  { symbol: "h", name: "h", voicing: "voiceless", manner: "fricative", place: "glottal", examples: ["hot", "behind", "whole"], description: "A simple puff of air from the throat.", articulation: { glottis: "Open.", instruction: "Open your mouth and breathe out quickly." } },
  { symbol: "tʃ", name: "ch", voicing: "voiceless", manner: "affricate", place: "postalveolar", examples: ["chip", "much", "nature"], description: "Combination of /t/ and /ʃ/.", articulation: { tongue: "Initial contact then release.", instruction: "Start by making a 't' sound but release it into a 'sh' sound." } },
  { symbol: "dʒ", name: "j", voicing: "voiced", manner: "affricate", place: "postalveolar", examples: ["join", "bridge", "giant"], description: "Combination of /d/ and /ʒ/.", articulation: { tongue: "Initial contact then release.", instruction: "Start by making a 'd' sound and release it into a 'zh' sound." } },
  { symbol: "m", name: "m", voicing: "voiced", manner: "nasal", place: "bilabial", examples: ["man", "ham", "mummy"], description: "Airflow escapes through the nose while lips are closed.", articulation: { lips: "Closed.", instruction: "Close your lips and hum through your nose." } },
  { symbol: "n", name: "n", voicing: "voiced", manner: "nasal", place: "alveolar", examples: ["no", "tin", "funny"], description: "Airflow through nose while tongue blocks mouth at alveolar ridge.", articulation: { tongue: "Tip against alveolar ridge.", instruction: "Press the tip of your tongue against the roof of your mouth and hum." } },
  { symbol: "ŋ", name: "ng", voicing: "voiced", manner: "nasal", place: "velar", examples: ["sing", "long", "think"], description: "Airflow through nose while back of tongue blocks mouth at soft palate.", articulation: { tongue: "Back against soft palate.", instruction: "Press the back of your tongue against the soft palate and hum." } },
  { symbol: "l", name: "l", voicing: "voiced", manner: "lateral-approximant", place: "alveolar", examples: ["light", "bell", "love"], description: "Airflow escapes around the sides of the tongue.", articulation: { tongue: "Tip against alveolar ridge.", instruction: "Press the center of your tongue against the roof while letting air flow out of the sides." } },
  { symbol: "r", name: "r", voicing: "voiced", manner: "approximant", place: "postalveolar", examples: ["red", "try", "very"], description: "Standard British RP 'r' (approximant, not rolled).", articulation: { tongue: "Tip near but not touching roof.", instruction: "Raise the sides of your tongue against your top teeth. The tip should point up but NOT touch the roof." } },
  { symbol: "j", name: "y", voicing: "voiced", manner: "approximant", place: "palatal", examples: ["yes", "yellow", "university"], description: "Standard 'y' sound.", articulation: { tongue: "Middle raised near palate.", instruction: "Raise the middle of your tongue near the hard palate, like for /iː/ but shorter." } },
  { symbol: "w", name: "w", voicing: "voiced", manner: "approximant", place: "labio-velar", examples: ["wet", "white", "queen"], description: "Standard 'w' sound.", articulation: { lips: "Rounded then relaxed.", instruction: "Pucker your lips tightly and move them into the next vowel sound." } },
];

