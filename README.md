# 🛡️ AlexCipher — Secure Exchange Suite

**AlexCipher** is a modern, zero-knowledge encryption PWA that runs entirely in your browser. Encrypt messages with AES-256, Vigenère, Caesar, or Base64 — no server, no account, no trace.

<p align="center">
  <a href="https://alexcipher.vercel.app" target="_blank"><strong>Launch the App →</strong></a>
  <br>
  <img src="https://img.shields.io/badge/AES--256-CBC-06b6d4?style=flat-square" alt="AES-256">
  <img src="https://img.shields.io/badge/PWA-Ready-8b5cf6?style=flat-square" alt="PWA">
  <img src="https://img.shields.io/badge/Local-100%25-10b981?style=flat-square" alt="100% Local">
  <img src="https://img.shields.io/badge/License-MIT-f59e0b?style=flat-square" alt="MIT">
</p>

---

## ✨ Features

### 🔐 Encryption
| Algorithm | Type | Description |
|---|---|---|
| **AES-256-CBC** | Symmetric | PBKDF2 key derivation (100k iterations), random salt + IV, SHA256 |
| **Vigenère** | Polyalphabetic | Per-character step visualization for education |
| **Caesar** | Shift cipher | Configurable shift (0–25) |
| **Base64** | Encoding | UTF-8-safe encoding/decoding |

### 🔑 Key Management
- Manual password entry with strength meter (length + uppercase + numbers + symbols)
- Auto-generation via `crypto.getRandomValues()` (48 hex chars)
- 5 themed passphrases (Skyrim, Cyberpunk, Zelda, Elden Ring, Halo)
- Persistent key vault with export/import as JSON

### 📲 PWA
- **Installable** on Android, iOS, Windows, macOS
- **Works offline** — cached shell with stale-while-revalidate strategy
- **Web Share Target** — share text from any app → AlexCipher auto-fills the field
- **App shortcuts** — Encrypt Message, Access Keys
- **Theme-aware** — dynamic `theme-color` meta tag

### 🌐 Localization
- French (native), English

### 📚 Educational
- FAQ with 5 Q&A + 4 expert security tips
- Responsible Tech cards (entropy, data sovereignty, zero sharing, ethics)
- Eco-conception awareness (90% less energy than cloud)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Install & Run
```bash
npm install
npm run dev        # → http://localhost:3000
```

### Build for Production
```bash
npm run build      # → dist/
npm run preview    # → preview production build
```

---

## 🏗️ Architecture

```
App.tsx (state & routing)
  ├── Layout.tsx (header, tab bar, footer, bottom sheet)
  ├── Hero.tsx (landing page)
  ├── Dashboard.tsx (encrypt/decrypt)
  │     └── KeyManager.tsx (key input with 3 tabs)
  ├── KeyVault.tsx (key management)
  ├── FAQSection.tsx (help)
  ├── LegalPage.tsx (privacy / terms)
  ├── Developer.tsx (profile)
  ├── AgreementModal.tsx (first-launch consent)
  ├── InstallHub.tsx (PWA install wizard)
  └── Toast.tsx (notifications)
```

### Data Flow
- **All crypto** happens client-side via `cryptoService.ts` (AES with CryptoJS, Vigenère inline, Caesar inline, Base64 inline)
- **Persistence**: `localStorage` for theme, language, page, keys, terms acceptance
- **Share Target**: Cache API (`alexcipher-shared-v1`)
- **Zero data** leaves the browser

### Tech Stack
| Layer | Technology |
|---|---|
| UI | React 19, TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS (CDN) + CSS custom properties |
| Icons | Lucide React |
| Crypto | CryptoJS (AES, PBKDF2) + Web Crypto API |
| PWA | Service Worker v17 + Web App Manifest |
| Deployment | Vercel (SPA rewrites) |

---

## 📖 Documentation

Full documentation is available at [docs/](./docs/README.md), covering:

- [Getting Started](./docs/GETTING_STARTED.md)
- [Encryption Algorithms](./docs/ALGORITHMS.md)
- [Key Management](./docs/KEYS.md)
- [PWA & Installation](./docs/PWA.md)
- [Navigation & Layout](./docs/NAVIGATION.md)
- [API (Service Layer)](./docs/API.md)
- [Localization](./docs/LOCALIZATION.md)
- [FAQ & Troubleshooting](./docs/FAQ.md)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.

---

## 👤 Author

**Alexis Mupole Uwizeye** — Digital Engineering Consultant
- Email: [regusopus@gmail.com](mailto:regusopus@gmail.com)
- WhatsApp: [+243 997 306 308](https://wa.me/243997306308)
- Portfolio: [alexismupole.me](https://alexismupole.me)

<p align="center"><em>La sécurité est un droit humain fondamental.</em></p>
