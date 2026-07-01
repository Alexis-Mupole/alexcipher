# API — Service Layer

AlexCipher has no backend API. All processing happens in the browser. This document describes the client-side service layer.

---

## Crypto Service (`services/cryptoService.ts`)

### `aesEncrypt(text: string, password: string): string`

Encrypts text using AES-256-CBC with PBKDF2 key derivation.

```javascript
import { aesEncrypt } from '../services/cryptoService';

const encrypted = aesEncrypt("Hello World", "my-password");
// Returns: hex string (salt + IV + ciphertext)
```

**Algorithm**:
1. Generate random 16-byte salt
2. Derive key: `PBKDF2(password, salt, 100000 iterations, SHA256, 256 bits)`
3. Generate random 16-byte IV
4. Encrypt: `AES-256-CBC(plaintext, derivedKey, IV, PKCS7 padding)`
5. Output: `hex(salt) + hex(IV) + hex(ciphertext)`

### `aesDecrypt(transitValue: string, password: string): string`

Decrypts an AES-256-CBC encrypted string.

```javascript
import { aesDecrypt } from '../services/cryptoService';

const decrypted = aesDecrypt(encryptedString, "my-password");
```

**Algorithm**:
1. Parse first 32 hex chars → salt (16 bytes)
2. Parse next 32 hex chars → IV (16 bytes)
3. Derive key: `PBKDF2(password, salt, 100000 iterations, SHA256, 256 bits)`
4. Decrypt: `AES-256-CBC(ciphertext, derivedKey, IV, PKCS7 padding)`

### `vigenereEncrypt(text: string, key: string): { output: string; steps: VigenereStep[] }`

Encrypts using the Vigenère cipher.

```javascript
const result = vigenereEncrypt("Hello", "KEY");
// result.output → "Rijvs"
// result.steps  → [...step objects]
```

**Algorithm**:
1. Clean key: remove non-alpha chars, uppercase
2. For each character in text:
   - If non-alpha: pass through
   - If alpha: `result = (charCode - 65/97 + keyCharCode - 65) mod 26`

**Step object**:
```typescript
interface VigenereStep {
  char: string;   // Original character
  keyChar: string; // Key character used
  p: number;       // Position of char (0-25)
  k: number;       // Position of keyChar (0-25)
  result: string;  // Result character
}
```

### `vigenereDecrypt(text: string, key: string): { output: string; steps: VigenereStep[] }`

Decrypts using the Vigenère cipher.

**Algorithm**: `result = (charCode - keyCharCode + 26) mod 26`

---

## Inline Algorithms (in `Dashboard.tsx`)

### Caesar Cipher
```javascript
// Encrypt: shift = parseInt(secretKey) || 3
const shift = ((parseInt(secretKey) || 3) % 26 + 26) % 26;
output = text.replace(/[a-z]/gi, (c) => 
  String.fromCharCode(((c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + shift) % 26) + (c <= 'Z' ? 65 : 97))
);

// Decrypt: shift = 26 - encryptShift
const shift = (26 - ((parseInt(secretKey) || 3) % 26 + 26) % 26) % 26;
```

### Base64 (UTF-8 Safe)
```javascript
// Encode
const encode = (str) => 
  btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => 
    String.fromCharCode(parseInt(p1, 16))
  ));

// Decode
const decode = (str) => 
  decodeURIComponent(atob(str).split('').map(c => 
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));
```

---

## Type Definitions (`types.ts`)

```typescript
type Theme = 'light' | 'dark';
type Language = 'fr' | 'en';
type Page = 'landing' | 'dashboard' | 'keys' | 'faq' | 'privacy' | 'terms' | 'developer';

enum CipherMethod {
  CAESAR = 'César',
  VIGENERE = 'Vigenère',
  AES = 'AES-256 (Avancé)',
  BASE64 = 'Base64 (Encodage)'
}

interface EncryptionKey {
  id: string;
  name: string;
  value: string;
  createdAt: number;
}

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error';
}

interface VigenereStep {
  char: string;
  keyChar: string;
  p: number;
  k: number;
  result: string;
}
```

---

## State Management (in `App.tsx`)

All state is managed via React hooks:

| State | Hook | Persistence |
|---|---|---|
| `currentPage` | `useState` | `localStorage` → restore on refresh |
| `theme` | `useState` | `localStorage` + `prefers-color-scheme` |
| `language` | `useState` | `localStorage` |
| `hasAcceptedTerms` | `useState` | `localStorage` |
| `toasts` | `useState` + auto-dismiss (4s) | In-memory |
| `sharedText` | `useState` | Cache API (share target) |

---

## Key Generation (in `KeyManager.tsx` & `KeyVault.tsx`)

```javascript
// 48 hex characters = 24 random bytes = 192 bits of entropy
const generateKey = () => {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
};
```

---

## Data Flow Diagram

```
User types message → Dashboard state (sourceText)
  → User clicks "Encrypt"
    → cryptoService.aesEncrypt(text, key)
      → returns encrypted string
    → Dashboard state (result)
  → User clicks "Copy" or "Share"
    → navigator.clipboard.writeText()
    → or navigator.share({ text })
```

```
External app → "Share" → PWA Share Target
  → Service Worker (stores in cache)
  → App.tsx (reads from cache)
  → Dashboard.tsx (sharedText prop)
  → sourceText state pre-filled
```
