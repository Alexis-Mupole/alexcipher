
import { VigenereStep } from '../types';

/**
 * Nettoie la clé pour ne garder que les lettres et la mettre en majuscule
 */
const prepareKey = (key: string): string => {
  return key.replace(/[^a-zA-Z]/g, '').toUpperCase();
};

/**
 * Chiffrement de Vigenère
 */
export const vigenereEncrypt = (text: string, key: string): { output: string; steps: VigenereStep[] } => {
  const cleanKey = prepareKey(key);
  if (!cleanKey) return { output: text, steps: [] };

  let output = "";
  const steps: VigenereStep[] = [];
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[a-zA-Z]/.test(char)) {
      const isUpper = char === char.toUpperCase();
      const p = char.toUpperCase().charCodeAt(0) - 65;
      const k = cleanKey[keyIndex % cleanKey.length].charCodeAt(0) - 65;
      
      const resultVal = (p + k) % 26;
      const resultChar = String.fromCharCode(resultVal + 65);
      const finalChar = isUpper ? resultChar : resultChar.toLowerCase();

      output += finalChar;
      steps.push({ char, keyChar: cleanKey[keyIndex % cleanKey.length], p, k, result: finalChar });
      keyIndex++;
    } else {
      output += char;
    }
  }

  return { output, steps };
};

/**
 * Déchiffrement de Vigenère
 */
export const vigenereDecrypt = (text: string, key: string): { output: string; steps: VigenereStep[] } => {
  const cleanKey = prepareKey(key);
  if (!cleanKey) return { output: text, steps: [] };

  let output = "";
  const steps: VigenereStep[] = [];
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[a-zA-Z]/.test(char)) {
      const isUpper = char === char.toUpperCase();
      const p = char.toUpperCase().charCodeAt(0) - 65;
      const k = cleanKey[keyIndex % cleanKey.length].charCodeAt(0) - 65;
      
      const resultVal = (p - k + 26) % 26;
      const resultChar = String.fromCharCode(resultVal + 65);
      const finalChar = isUpper ? resultChar : resultChar.toLowerCase();

      output += finalChar;
      steps.push({ char, keyChar: cleanKey[keyIndex % cleanKey.length], p, k, result: finalChar });
      keyIndex++;
    } else {
      output += char;
    }
  }

  return { output, steps };
};
