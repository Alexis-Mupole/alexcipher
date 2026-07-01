# Key Management

AlexCipher provides three ways to create encryption keys, plus a persistent vault for saving them.

## Key Sources

### 1. Manual Entry (KeyManager — Manual tab)

Type any password/passphrase. A **strength meter** evaluates 4 criteria:

| Criterion | Bonus |
|---|---|
| Length > 10 characters | +1 |
| Contains uppercase letter | +1 |
| Contains number | +1 |
| Contains special character | +1 |

| Score | Label |
|---|---|
| 0 | Empty |
| 1 | Very weak |
| 2 | Weak |
| 3 | Medium |
| 4 | Strong |

### 2. Auto-Generation (KeyManager — Auto tab)

Uses `crypto.getRandomValues()` to generate a cryptographically secure random key:

- **Length**: 48 hex characters (192 bits of entropy)
- **Generator**: `crypto.getRandomValues(new Uint8Array(24))` → hex string
- Copy or use directly

### 3. Themed Passphrases (KeyManager — Themes tab)

Five pre-built, memorable passphrases inspired by gaming universes:

| Universe | Passphrase |
|---|---|
| 🐉 Skyrim | `Dovahkiin-FUS-RO-DAH-2025` |
| 🔥 Cyberpunk | `Choomba-NightCity-V-77` |
| 🗡️ Zelda | `It-is-Dangerous-To-Go-Alone` |
| ⚪ Elden Ring | `Tarnished-Maidenless-Grace-99` |
| 🔫 Halo | `MasterChief-FinishTheFight-117` |

---

## Key Vault (KeyVault page)

Persistently stores keys in `localStorage` under the key `alxcipher_keys`.

### Features
- **Create**: Name + auto-generate (48 hex chars, same `crypto.getRandomValues` source)
- **Export**: Download all keys as a JSON file
- **Import**: Upload a JSON file — merges with existing keys (deduplicates by ID)
- **Copy**: Copy individual key values to clipboard
- **Delete**: Remove keys from storage

### Data Format
```json
[
  {
    "id": "a1b2c3d4",
    "name": "Personal 2025",
    "value": "e3b0c44298fc1c149afbf4c8996fb924...",
    "createdAt": 1700000000000
  }
]
```

### Security Note
Keys are stored unencrypted in `localStorage`. This is intentional — AlexCipher has no server to encrypt them with. For production use, consider a dedicated password manager.

---

## Best Practices

1. **Use two channels**: Never send the encrypted message and the key on the same app. Send the message on WhatsApp, the key via SMS or email.
2. **Prefer auto-generation**: Human-generated passwords are predictable. Auto-generated keys are practically uncrackable.
3. **Avoid common words**: If using a manual key, avoid names, birthdates, or dictionary words. Use a long sentence (passphrase).
4. **Clear your clipboard**: After sending, copy something else to erase your secret from device memory.
