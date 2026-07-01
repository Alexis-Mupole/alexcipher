# Getting Started

## Pages Overview

| Page | URL Hash | Description |
|---|---|---|
| **Landing** | `#landing` (default) | Marketing hero with feature cards and "How It Works" modal |
| **Dashboard** | `#dashboard` | Encrypt/decrypt messages with your chosen algorithm |
| **Keys** | `#keys` | Manage saved keys, educational resources |
| **FAQ** | `#faq` | Frequently asked questions and expert security tips |
| **Privacy** | `#privacy` | Full privacy policy |
| **Terms** | `#terms` | Terms of use |
| **Developer** | `#developer` | Developer profile and contact info |

## Navigation

### Desktop (≥768px)
- **Header**: Dashboard, Keys, FAQ links + install button + theme/language toggles
- **Footer**: Full 4-column layout with branding, navigation, contact, legal links

### Mobile (<768px)
- **Bottom Tab Bar**: Dashboard, Keys, FAQ, More (opens bottom sheet)
- **Bottom Sheet**: Install, theme toggle, language toggle, Developer page, Privacy/Terms

## Basic Usage

### Encrypt a Message

1. Navigate to **Dashboard** (`#dashboard`)
2. Select **Encrypt** tab
3. Type or paste your message in the source text area
4. Choose an algorithm (AES-256, Vigenère, Caesar, or Base64)
5. Enter a secret key (not required for Base64)
6. Click **Generate Secret Message**
7. Copy or share the encrypted result

### Decrypt a Message

1. Navigate to **Dashboard** (`#dashboard`)
2. Select **Decrypt** tab
3. Paste the encrypted text in the source area
4. Choose the same algorithm used during encryption
5. Enter the same secret key used during encryption
6. Click **Reveal Message**

### Share via Web Share Target

1. In any app (WhatsApp, Telegram, Notes, etc.), select text
2. Tap **Share** → pick **AlexCipher**
3. AlexCipher opens with the text pre-filled in the Dashboard
4. Choose encrypt or decrypt, enter a key, and process

## First Launch

On first visit, a **Responsible Engagement** modal appears:
1. Read the agreement
2. Check both boxes (accept terms + commit to responsible use)
3. Click **Accept and Continue**
4. This is stored in `localStorage` — you won't see it again
