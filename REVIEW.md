# Parcel Countdown — Code & UX Review

## What Was Built
A 3-screen React Native / Expo micro-app for tracking parcel deliveries with satisfying countdown timers.

| Screen | File | Purpose |
|--------|------|---------|
| Home | `app/index.tsx` | Sorted parcel list with live countdowns, empty state, FAB |
| Add Parcel | `app/add.tsx` | Form with validation for name, URL, date, notes |
| Detail | `app/parcel/[id].tsx` | Big countdown numbers, tracking link, notes, delete |

Data model in `src/constants/parcel.ts` with pure utility functions for countdown math, formatting, validation, and sorting.

## Code Assessment

**Strengths:**
- Clean separation: data model & utilities are pure functions, easily testable
- Template patterns followed faithfully (useStorage, theme tokens, Button/Card components)
- TypeScript compiles clean (`tsc --noEmit` passes with zero errors)
- Countdown logic handles edge cases: delivered state, sub-hour display, singular/plural
- Sorting puts delivered parcels at the bottom — good UX default
- Haptic feedback on all key interactions (add, delete, link open)
- Live countdown updates (30s on list, 10s on detail)

**Weaknesses / Known Trade-offs:**
- Date input is a plain text field (`YYYY-MM-DD`) — functional but not ideal UX. A proper date picker (e.g. `@react-native-community/datetimepicker`) would be better but was explicitly avoided to keep deps minimal
- No edit/update flow — you can only add and delete parcels, not modify them
- No push notifications when delivery day arrives
- Countdown uses local time end-of-day (23:59:59) which is a pragmatic assumption but not timezone-aware

## UX Assessment

**Good:**
- Empty state with emoji (📭) is friendly and instructive
- FAB button is standard mobile pattern, instantly recognisable
- Delivered parcels show a green checkmark — satisfying visual closure
- Big numbers on detail screen are satisfying to look at
- Cards are pressable with visual feedback
- Dark mode only — clean, focused choice for this kind of utility app

**Could Improve:**
- Swipe-to-delete on the list would be more natural than detail → delete
- Pull-to-refresh animation (even just visual, since data is local)
- Animated countdown transitions (number flip / spring)
- Colour coding: amber when < 24hrs, red when overdue instead of "delivered"
- Distinguishing "delivered" (countdown ended) from "actually arrived" (user confirmed)

## Files Changed From Template
- `app.json` — name, slug, scheme, bundle IDs, dark mode
- `app/_layout.tsx` — dark status bar, shared header styling
- `app/index.tsx` — complete rewrite (parcel list)
- `app/add.tsx` — new screen
- `app/parcel/[id].tsx` — new screen
- `app/settings.tsx` — removed (not needed)
- `src/constants/parcel.ts` — new (data model + utilities)
- `src/constants/index.ts` — added parcel exports

## Verdict
Solid v1. Clean code, follows template conventions, compiles clean. The main gap is the text-based date input — that's the first thing to upgrade. Overall: **ship it** ✅
