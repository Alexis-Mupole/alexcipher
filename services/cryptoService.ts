
import CryptoJS from 'crypto-js';
import { VigenereStep } from '../types';

/**
 * AES-256 Ultra-Secure Encryption
 */
export const aesEncrypt = (text: string, password: string): string => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 100000,
    hasher: CryptoJS.algo.SHA256
  });
  const iv = CryptoJS.lib.WordArray.random(128 / 8);
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return salt.toString() + iv.toString() + encrypted.toString();
};

export const aesDecrypt = (transitValue: string, password: string): string => {
  try {
    if (transitValue.length < 64) throw new Error("Invalid format");
    const salt = CryptoJS.enc.Hex.parse(transitValue.substring(0, 32));
    const iv = CryptoJS.enc.Hex.parse(transitValue.substring(32, 64));
    const encryptedText = transitValue.substring(64);
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 100000,
      hasher: CryptoJS.algo.SHA256
    });
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    const output = decrypted.toString(CryptoJS.enc.Utf8);
    if (!output) throw new Error("Incorrect key");
    return output;
  } catch (e) {
    throw new Error("Decryption failed");
  }
};

/**
 * Fonction de chiffrement/déchiffrement de Vigenère optimisée
 * @param text Le texte source
 * @param key La clé de chiffrement
 * @param decrypt Mode (false pour chiffrer, true pour déchiffrer)
 */
export const vigenereCipher = (text: string, key: string, decrypt: boolean = false): { output: string; steps: VigenereStep[] } => {
  // Préparation de la clé : on ne garde que les lettres et on passe en majuscules
  const cleanKey = key.replace(/[^a-zA-Z]/g, '').toUpperCase() || "ALEXCIPHER";
  let output = "";
  const steps: VigenereStep[] = [];
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // On ne traite que les caractères alphabétiques
    if (/[a-zA-Z]/.test(char)) {
      const isUpper = char === char.toUpperCase();
      
      // P = Position du caractère dans l'alphabet (0-25)
      const p = char.toUpperCase().charCodeAt(0) - 65;
      
      // K = Position du caractère de la clé (0-25)
      const k = cleanKey[keyIndex % cleanKey.length].charCodeAt(0) - 65;
      
      // Arithmétique modulaire : (P + K) mod 26 ou (P - K + 26) mod 26
      const shift = decrypt ? (26 - k) : k;
      const resultVal = (p + shift) % 26;
      
      const resultChar = String.fromCharCode(resultVal + 65);
      const finalChar = isUpper ? resultChar : resultChar.toLowerCase();

      output += finalChar;
      
      // Enregistrement de l'étape pour visualisation technique
      steps.push({ 
        char, 
        keyChar: cleanKey[keyIndex % cleanKey.length], 
        p, 
        k: shift, 
        result: finalChar 
      });
      
      // On n'incrémente l'index de la clé que pour les lettres
      keyIndex++;
    } else {
      // Les espaces et caractères spéciaux restent inchangés
      output += char;
    }
  }
  
  return { output, steps };
};

export const vigenereEncrypt = (text: string, key: string) => vigenereCipher(text, key, false);
export const vigenereDecrypt = (text: string, key: string) => vigenereCipher(text, key, true);
