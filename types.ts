export type Theme = 'light' | 'dark';

export enum CipherMethod {
  CAESAR = 'César',
  VIGENERE = 'Vigenère',
  AES = 'AES-256 (Avancé)',
  BASE64 = 'Base64 (Encodage)'
}

export type Language = 'fr' | 'en';

export interface EncryptionKey {
  id: string;
  name: string;
  value: string;
  createdAt: number;
}

export type Page = 'landing' | 'dashboard' | 'keys' | 'faq' | 'privacy' | 'terms' | 'developer';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error';
}

export interface VigenereStep {
  char: string;
  keyChar: string;
  p: number;
  k: number;
  result: string;
}
