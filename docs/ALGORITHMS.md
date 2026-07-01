# Encryption Algorithms

## AES-256-CBC (Advanced)

**The gold standard.** Used by governments and financial institutions worldwide.

| Property | Value |
|---|---|
| Algorithm | AES-256 in CBC mode |
| Key Derivation | PBKDF2 with SHA256 — 100,000 iterations |
| Salt | Random 16 bytes (generated per encryption) |
| IV | Random 16 bytes (generated per encryption) |
| Padding | PKCS7 |
| Output Format | Hex — salt (32 hex chars) + IV (32 hex chars) + ciphertext |

The salt and IV are prepended to the ciphertext so that the decrypt function can extract them automatically. You only need the password.

### Key Derivation Process
```
Password + Random Salt → PBKDF2 (100k iterations, SHA256) → 256-bit key
Random IV → AES-256-CBC → Ciphertext
Output: hex(salt) + hex(IV) + hex(ciphertext)
```

### Usage
```javascript
const encrypted = aesEncrypt("Hello World", "my-password");
const decrypted = aesDecrypt(encrypted, "my-password");
```

---

## Vigenère Cipher

A polyalphabetic substitution cipher using a keyword.

| Property | Value |
|---|---|
| Type | Polyalphabetic substitution |
| Key | Any word (non-alpha chars are stripped, uppercase only) |
| Character Set | A–Z (case-preserving, non-alpha passed through) |
| Formula (Encrypt) | `(P + K) mod 26` |
| Formula (Decrypt) | `(P - K + 26) mod 26` |

### Educational Feature
The Vigenère functions return `steps` — an array of per-character calculations:
```javascript
{
  output: "encrypted text",
  steps: [
    { char: "H", keyChar: "K", p: 7, k: 10, result: "R" },
    { char: "e", keyChar: "E", p: 4, k: 4, result: "i" },
    ...
  ]
}
```

---

## Caesar Cipher

The classic shift cipher — rotates each letter by a fixed number of positions.

| Property | Value |
|---|---|
| Type | Monoalphabetic substitution |
| Key | Integer (0–25), wrapped modulo 26 |
| Character Set | A–Z, a–z (case-preserving, non-alpha passed through) |
| Formula (Encrypt) | `(P + shift) mod 26` |
| Formula (Decrypt) | `(P - shift + 26) mod 26` |

### Security Note
Caesar has only 26 possible keys. A computer can break it in milliseconds. Use AES-256 for real security.

---

## Base64

Not encryption — encoding. Transforms binary data into ASCII text for safe transmission.

| Property | Value |
|---|---|
| Type | Binary-to-text encoding |
| Key | Not required |
| UTF-8 | Safely handled via `encodeURIComponent` → `btoa` |

### Why UTF-8 Safe?
Standard `btoa` breaks on non-ASCII characters. AlexCipher first percent-encodes the string, then converts each byte:
```javascript
const safe = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
```

---

## Comparison

| Algorithm | Security | Speed | Key Required | Key Type |
|---|---|---|---|---|
| AES-256 | ★★★★★ | ★★★ | Yes | Password/passphrase |
| Vigenère | ★★☆☆☆ | ★★★★★ | Yes | Word |
| Caesar | ★☆☆☆☆ | ★★★★★ | Yes | Integer (0–25) |
| Base64 | ☆☆☆☆☆ | ★★★★★ | No | — |
