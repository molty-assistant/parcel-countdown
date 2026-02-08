# Handoff — Parcel Countdown

Everything needed to build and submit to both app stores.

---

## Prerequisites

- **Expo account** — logged in via `npx expo login`
- **Apple Developer account** — enrolled in the Apple Developer Programme
- **Google Play Console account** — with a developer account set up
- **EAS CLI** — `npm install -g eas-cli`
- **Node.js** — 18+ (see `.nvmrc`)

---

## First-Time Setup

```bash
git clone https://github.com/molty-assistant/parcel-countdown.git
cd parcel-countdown
npm install
```

If you haven't linked the project to EAS yet:

```bash
eas init
```

This will create the project in your Expo account and set the `projectId` in `app.json`.

---

## Build

### Both platforms

```bash
eas build --platform all --profile production
```

### iOS only

```bash
eas build --platform ios --profile production
```

### Android only

```bash
eas build --platform android --profile production
```

---

## Submit

### iOS

```bash
eas submit --platform ios
```

You'll be prompted to select a build and enter your Apple credentials. The binary is uploaded to App Store Connect where you can then:
1. Add screenshots
2. Fill in the store listing (copy from `STORE-LISTING.md`)
3. Set the privacy policy URL (content in `PRIVACY-POLICY.md` — host it somewhere)
4. Submit for review

### Android

```bash
eas submit --platform android
```

You'll need a Google Play service account key (JSON). Follow Expo's guide:
https://docs.expo.dev/submit/android/

Then in Google Play Console:
1. Add screenshots
2. Fill in the store listing (copy from `STORE-LISTING.md`)
3. Set the privacy policy URL
4. Complete the content rating questionnaire
5. Publish

---

## Store Assets Tom Needs to Provide

| Asset | Spec | Notes |
|-------|------|-------|
| iOS screenshots | 6.7" + 5.5" (iPhone) | Required: at least one set |
| iPad screenshots | 12.9" (if supporting tablet) | Optional but recommended |
| Android phone screenshots | Min 2, max 8 | 16:9 or 9:16 |
| Android feature graphic | 1024 × 500 px | Required for Play Store |
| App icon | Already in `assets/icon.png` | Replace with final design if needed |

**Tip:** Run the app in Simulator/Emulator, add a few test parcels, and take screenshots there.

---

## Privacy Policy

Content is in `PRIVACY-POLICY.md`. Both stores require a URL — host the content somewhere (GitHub Pages, a simple web page, or Notion).

---

## Bundle Identifiers

| Platform | Identifier |
|----------|-----------|
| iOS | `com.tommurton.parcelcountdown` |
| Android | `com.tommurton.parcelcountdown` |

These are set in `app.json` and should not be changed after the first build.

---

## Development (optional)

```bash
# Development build (on-device with dev tools)
eas build --platform ios --profile development
npx expo start --dev-client

# Preview build (production-like, internal distribution)
eas build --platform all --profile preview
```
