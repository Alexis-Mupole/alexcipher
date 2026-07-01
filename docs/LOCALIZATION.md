# Localization

AlexCipher supports **French** (default) and **English**, with the translation system designed for easy expansion.

## Translation Structure

All strings are in `translations.ts`, organized by component/page:

```typescript
export const translations = {
  fr: { /* French strings */ },
  en: { /* English strings */ },
  // Next language: add a new key here
};
```

### Section Map

| Section | Used By | Keys |
|---|---|---|
| `common` | All components | `back`, `backHome`, `install`, `iosInstall` |
| `installHub` | InstallHub | 8 keys for the install wizard |
| `nav` | Layout | Dashboard, Keys, FAQ, Privacy, Terms, Developer, footer, contact |
| `agreement` | AgreementModal | 5 keys for the legal consent modal |
| `legal.privacy` | LegalPage (privacy) | Title, desc, 8 sections |
| `legal.terms` | LegalPage (terms) | Title, desc, 9 sections |
| `developer` | Developer | 18 keys for the profile page |
| `hero` | Hero | Badge, titles, CTA, 3 features, 4 how-it-works steps |
| `dashboard` | Dashboard + KeyManager | Encrypt/decrypt labels, placeholders, buttons, strength levels, key manager tabs, 5 themed passphrases |
| `keys` | KeyVault | CRUD labels, educational cards, eco-conception |
| `faq` | FAQSection | Title, tagline, 3 features, 5 Q&A items, 4 tips |
| `toasts` | Dashboard + KeyVault | 8 notification messages |

## Using Translations

```typescript
import { translations } from '../translations';

const t = translations[language].dashboard;
const label = t.labelSource; // "Message Source" (en) or "Message Source" (fr)
```

## Adding a New Language

1. Add the language code to the `Language` type in `types.ts`:
```typescript
export type Language = 'fr' | 'en' | 'de'; // 'de' for German
```

2. Add a complete translation object to `translations.ts`:
```typescript
export const translations = {
  fr: { /* ... */ },
  en: { /* ... */ },
  de: { /* ... */ },  // New language
};
```

3. Add the language toggle button in `Layout.tsx`.

## Language Persistence

- Selected language is saved to `localStorage` under key `alxcipher_lang`
- Default: `'fr'`
- No language detection — always defaults to French

## UI Language Controls

### Desktop
Pill toggle in the header with FR/EN buttons. Active state: accent background + white text.

### Mobile
FR/EN buttons in the bottom sheet, styled as rounded pills.

## String Patterns

- Dynamic values use template literals within the component (not in translations)
- All user-facing UI strings are translated (status messages, errors, labels, placeholders, accessibility text)
- Technical terms (AES-256, PBKDF2, Base64) are kept as-is
- Themed passphrases (Skyrim, Cyberpunk, etc.) are identical in both languages
