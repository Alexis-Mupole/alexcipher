# PWA & Installation

AlexCipher is a fully-featured Progressive Web App (PWA) that can be installed on any platform.

## Installation

### Android (Chrome)
1. Open [AlexCipher](https://alexcipher.vercel.app) in Chrome
2. Tap the install banner or the **Install** button in the app
3. Select **App List (WebAPK)** for native installation
4. AlexCipher appears in your app drawer

### iOS (Safari)
1. Open [AlexCipher](https://alexcipher.vercel.app) in Safari
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **Add to Home Screen**
4. Name it and tap **Add**

### Desktop (Chrome/Edge)
1. Click the install icon in the address bar
2. Or click the **Install** button inside the app
3. The app opens in its own window without browser chrome

---

## Web Share Target

AlexCipher can **receive shared text** from any app. This is the most seamless way to encrypt messages from WhatsApp, Telegram, Notes, etc.

### How it works

| Step | Description |
|---|---|
| 1 | In any app, select text → tap **Share** → pick **AlexCipher** |
| 2 | Android sends the text to AlexCipher's service worker |
| 3 | The SW stores the text in cache and opens the app |
| 4 | The Dashboard auto-fills with the shared text |
| 5 | Choose encrypt/decrypt, enter a key, and process |

### Technical Flow

```
App share → POST /share (multipart/form-data)
  → Service Worker intercepts
  → Extracts "text" field from FormData
  → Stores in cache (alexcipher-shared-v1 → "shared-text")
  → Redirects to ./?shared=1
  → App reads cache, deletes it, navigates to Dashboard
  → Dashboard pre-fills sourceText
```

### Registration (manifest.json)
```json
{
  "share_target": {
    "action": "./share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "name",
      "text": "text",
      "url": "url"
    }
  }
}
```

### Supported
- **Android Chrome**: Full support
- **Desktop Chrome**: Full support
- **iOS Safari**: Not supported (Apple limitation)

---

## Service Worker

**Version**: v17 (`alexcipher-core-v17`, `alxcipher-data-v17`)

### Caching Strategy: Stale-While-Revalidate

```
Request → Check cache → Serve cached (instant)
                     ↓
                Fetch network → Update cache (background)
                                  ↓
              If offline → Serve cached (if available)
                                  ↓
              If not cached and offline → Serve index.html (for navigation)
```

### Pre-cached Assets (on install)
- `./`, `./index.html`, `./manifest.json`
- Source files: `index.tsx`, `App.tsx`, `types.ts`, `translations.ts`
- CDN resources: Tailwind CSS, Flaticon icon, Google Fonts

### Cache Updates
- Old caches are deleted on activation
- Updates are detected via the `updatefound` event
- Users see a toast: "A new update is ready. Restarting soon..."
- The page auto-refreshes on `controllerchange`

### Share Target Handler
```javascript
// Core logic from sw.js
if (event.request.method === 'POST' && url.pathname.includes('/share')) {
  const formData = await event.request.formData();
  const sharedText = formData.get('text') || '';
  const cache = await caches.open('alexcipher-shared-v1');
  await cache.put('shared-text', new Response(sharedText));
  return Response.redirect('./?shared=1', 303);
}
```

---

## Manifest

| Field | Value |
|---|---|
| ID | `com.alexcipher.secure.suite.v1` |
| Name | `AlexCipher - Suite de Sécurité` |
| Display | `standalone` + `window-controls-overlay` |
| Orientation | `portrait-primary` |
| Categories | `security`, `utilities`, `productivity` |

### App Shortcuts
- **Encrypt Message** → `./?page=dashboard`
- **Access Keys** → `./?page=keys`

---

## Offline Support

Once loaded, AlexCipher works **fully offline** for previously visited pages. The service worker serves cached assets when the network is unavailable.

**Limitations**: The first visit requires network access to download the app shell and CDN resources.
