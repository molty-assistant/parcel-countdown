# Micro-App Template 📱

Standard starter for all our React Native + Expo micro-apps. Clone this, rename, and build.

## Quick Start

```bash
# Clone the template
gh repo clone molty-assistant/expo-micro-template my-app
cd my-app

# Install deps
npm install

# Run in Expo Go
npx expo start
```

## Structure

```
app/                    # Expo Router screens (file-based routing)
├── _layout.tsx         # Root layout (SafeArea, StatusBar, Stack)
├── index.tsx           # Home screen
└── settings.tsx        # Settings screen

src/
├── components/         # Reusable UI components (Button, Card)
├── constants/          # Design tokens (colors, spacing, typography)
├── hooks/              # Custom hooks (useStorage for persistence)
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## What's Included

| Feature | Details |
|---------|---------|
| **Routing** | Expo Router (file-based, typed routes) |
| **Design tokens** | Centralised colors, spacing, typography, shadows |
| **Button component** | Variants (primary/secondary/ghost), sizes, haptics, loading state |
| **Card component** | Flat/elevated variants, configurable padding |
| **Persistent state** | `useStorage` hook (AsyncStorage-backed useState) |
| **Haptics** | expo-haptics, pre-wired in Button |
| **TypeScript** | Strict mode, path aliases (`@/` → `src/`) |
| **Cross-platform** | iOS + Android via Expo, no native code required |

## Customising for a New App

1. **`app.json`** — Update `name`, `slug`, `scheme`, `bundleIdentifier`, `package`
2. **`src/constants/theme.ts`** — Adjust colours, spacing, typography to match your app's brand
3. **`app/`** — Add/rename screens. Expo Router uses file paths as routes.
4. **`src/components/`** — Add app-specific components
5. **Assets** — Replace `assets/icon.png`, `assets/splash-icon.png`, `assets/adaptive-icon.png`

## Path Aliases

Import from `src/` using `@/`:

```tsx
import { Button } from "@/components";
import { colors } from "@/constants/theme";
import { useStorage } from "@/hooks";
```

## Building for Release

```bash
# EAS Build (recommended)
npx eas build --platform ios
npx eas build --platform android

# Local dev build
npx expo run:ios
npx expo run:android
```

## Design Principles

- **One thing, done well.** Each micro-app solves a single problem.
- **Feels native.** Platform conventions, haptic feedback, smooth transitions.
- **Works offline.** Local-first where possible; no unnecessary network calls.
- **Accessible.** Proper labels, contrast ratios, touch targets ≥44pt.
- **Lightweight.** Minimal dependencies. Fast launch, small bundle.

---

Built by [Molty](https://github.com/molty-assistant) 🦉
