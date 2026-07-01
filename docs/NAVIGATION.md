# Navigation & Layout

AlexCipher uses a hash-based single-page application (SPA) architecture with animated page transitions.

## Routing

All routes use `window.location.hash`:

| Route | Component | Depth | Description |
|---|---|---|---|
| (empty) / `#landing` | `Hero` | 0 | Landing page |
| `#dashboard` | `Dashboard` | 1 | Encrypt/decrypt tool |
| `#keys` | `KeyVault` | 1 | Key management |
| `#faq` | `FAQSection` | 1 | Help & FAQ |
| `#privacy` | `LegalPage` (type=privacy) | 2 | Privacy policy |
| `#terms` | `LegalPage` (type=terms) | 2 | Terms of use |
| `#developer` | `Developer` | 2 | Developer profile |

## Page Transitions

Page depth determines animation direction:

- **Forward**: Depth increases (landing → dashboard, dashboard → privacy, etc.)
- **Back**: Depth decreases (privacy → keys, terms → landing, etc.)

CSS classes applied:
- `.page-enter` — slide in from right
- `.page-enter-back` — slide in from left

Navigation lock prevents double-clicks during transitions (300ms timeout).

## Layout Components

### Header (sticky, blurred)
- Logo + "AlexCipher" brand (clickable → landing)
- Desktop nav: Dashboard, Keys, FAQ
- Desktop: Install button, Theme toggle, Language toggle (FR/EN)
- Responsive: height `h-16 md:h-20`

### Mobile Tab Bar (<768px)
Four tabs: Dashboard, Keys, FAQ, More
- Active tab has colored indicator dot
- Styled with `.tab-bar`, `.tab-btn`, `.tab-indicator` classes
- Safe-area-aware (`env(safe-area-inset-bottom)`)

### Bottom Sheet (mobile "More" tab)
Overlay with slide-up animation:
- Install button (gradient)
- Theme toggle (Light/Dark)
- Language toggle (FR/EN pills)
- Developer page link
- Privacy & Terms buttons

### Footer (desktop ≥768px)
4-column grid:
1. Branding + tagline + security badge
2. Navigation links
3. Contact (Email, WhatsApp)
4. Copyright + legal links

## Hash Change Listener

```javascript
window.addEventListener('hashchange', () => {
  const hash = location.hash.replace('#', '') || 'landing';
  if (validPages.includes(hash)) doNavigate(hash);
});
```

## Page Persistence

On refresh, the app restores the last page:
1. Check `window.location.hash` (URL takes priority)
2. Fall back to `localStorage` (`alxcipher_page`)
3. Default to `'landing'`

## Initial Page from Share Target

When the app receives shared text via Web Share Target (`?shared=1`):
1. Reads text from cache API
2. Navigates to Dashboard with the text pre-filled
3. Cleans up the URL parameter
