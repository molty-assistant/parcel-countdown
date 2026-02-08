/**
 * Design tokens — single source of truth for the app's visual language.
 * Adjust these values per-app; all screens/components reference them.
 */
import { useColorScheme } from "react-native";

export interface ColorTokens {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textInverted: string;
  border: string;
  separator: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  overlay: string;
}

const lightColors: ColorTokens = {
  // Core
  primary: "#007AFF",
  primaryLight: "#4DA3FF",
  primaryDark: "#0055CC",

  // Backgrounds
  background: "#FFFFFF",
  surface: "#F2F2F7",
  card: "#FFFFFF",

  // Text
  text: "#000000",
  textSecondary: "#8E8E93",
  textInverted: "#FFFFFF",

  // Borders & dividers
  border: "#C6C6C8",
  separator: "#E5E5EA",

  // Semantic
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  info: "#5AC8FA",

  // Overlays
  overlay: "rgba(0, 0, 0, 0.4)",
};

const darkColors: ColorTokens = {
  // Core
  primary: "#0A84FF",
  primaryLight: "#4DA3FF",
  primaryDark: "#0055CC",

  // Backgrounds
  background: "#000000",
  surface: "#1C1C1E",
  card: "#1C1C1E",

  // Text
  text: "#FFFFFF",
  textSecondary: "#8E8E93",
  textInverted: "#000000",

  // Borders & dividers
  border: "#38383A",
  separator: "#38383A",

  // Semantic
  success: "#30D158",
  warning: "#FF9F0A",
  error: "#FF453A",
  info: "#64D2FF",

  // Overlays
  overlay: "rgba(0, 0, 0, 0.6)",
};

/**
 * Hook: returns the correct color set for the current system theme.
 * Use in components: `const colors = useThemeColors();`
 */
export function useThemeColors() {
  const scheme = useColorScheme();
  return scheme === "dark" ? darkColors : lightColors;
}

/** Default (light) export for static contexts (StyleSheet.create). */
export const colors = lightColors;

/** Direct access when needed. */
export { lightColors, darkColors };

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 34,
  },
  h2: {
    fontSize: 22,
    fontWeight: "700" as const,
    lineHeight: 28,
  },
  h3: {
    fontSize: 17,
    fontWeight: "600" as const,
    lineHeight: 22,
  },
  body: {
    fontSize: 17,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 15,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 13,
    fontWeight: "400" as const,
    lineHeight: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600" as const,
    lineHeight: 18,
    letterSpacing: 0.5,
    textTransform: "uppercase" as const,
  },
} as const;

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;
