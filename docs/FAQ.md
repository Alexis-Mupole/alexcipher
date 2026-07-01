# FAQ & Troubleshooting

## General

### What if I lose my key?
The encrypted message is **permanently unrecoverable**. AlexCipher has no backdoors, no password reset, and no server storing anything. This is the foundation of true security — keep your keys safe.

### Is it compatible with Discord or WhatsApp?
Yes! AlexCipher generates plain text output. You can copy-paste encrypted messages into any messaging app, email, or document without risk.

### Can I use AlexCipher offline?
Absolutely. Once the page is loaded, all calculations happen on your machine via JavaScript. You can disconnect from the internet and continue encrypting.

### Is my data truly secure?
Mathematically, yes — AES-256 has more possible keys than there are atoms in the universe. However, security also depends on your password strength and how you share your key. A strong algorithm with a weak password is still vulnerable.

---

## Encryption

### Why is AES-256 better than Caesar?
Caesar has only 26 possible keys — a computer cracks it in milliseconds. AES-256 has 2^256 possible keys, more than the estimated atoms in the observable universe.

### What algorithm should I use?
- **Everyday security**: AES-256
- **Learning/teaching**: Vigenère or Caesar
- **Data transmission only**: Base64 (not encryption, just encoding)

### What's the character limit?
100,000 characters per operation. A progress bar shows your usage.

---

## Key Management

### Where are my keys stored?
In your browser's `localStorage`. Keys never leave your device — no server, no cloud, no sync.

### How do I share my keys securely?
Never send the encrypted message and the key on the same channel. Use two different apps (e.g., encrypted text on WhatsApp, key via SMS or email).

### How are auto-generated keys created?
Using `crypto.getRandomValues()` — the browser's built-in cryptographically secure random number generator, the same one used for HTTPS certificates and WebAuthn.

---

## PWA / Installation

### I don't see the install button
- **Android**: Open in Chrome, wait for the banner or tap the install icon in the address bar
- **iOS**: Use Safari → Share → Add to Home Screen
- **Desktop**: Click the install icon in the address bar (Chrome/Edge)

### The app updated but I see old content
The service worker caches aggressively. Try:
1. Close all app windows
2. Reopen the app
3. Or go to `chrome://serviceworker-internals` and unregister, then reload

### Share Target doesn't work on iOS
Apple Safari doesn't support the Web Share Target API. This is an iOS limitation. On Android and desktop Chrome, it works seamlessly.

---

## Privacy & Security

### Does AlexCipher collect my data?
No. AlexCipher has no backend server, no database, no analytics, and no tracking. Everything runs locally in your browser.

### What data is stored in localStorage?
- Language preference (`alxcipher_lang`)
- Theme preference (`alxcipher_theme`)
- Last visited page (`alxcipher_page`)
- Saved keys (`alxcipher_keys`)
- Terms acceptance (`alxcipher_accepted`)

None of this data is sent anywhere.

### Can you recover my encrypted data?
Impossible by design. We don't have your password, your salt, your IV, or your ciphertext. Nothing leaves your browser.

---

## Developer

### Is AlexCipher open source?
Yes. The source code is available on [GitHub](https://github.com/Alexis-Mupole/alexcipher).

### I found a bug. Where do I report it?
Open an issue on the [GitHub repository](https://github.com/Alexis-Mupole/alexcipher/issues).

### Can I contribute?
Contributions are welcome! See the README for guidelines.
