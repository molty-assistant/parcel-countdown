import React from "react";
import { View, Text, Pressable, Appearance } from "react-native";
import {
  lightColors,
  darkColors,
  spacing,
  typography,
  borderRadius,
} from "@/constants/theme";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const scheme = Appearance.getColorScheme();
      const colors = scheme === "dark" ? darkColors : lightColors;

      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
            padding: spacing.xl,
          }}
        >
          <Text style={{ fontSize: 48, marginBottom: spacing.md }}>⚠️</Text>
          <Text
            style={{
              ...typography.h2,
              color: colors.text,
              marginBottom: spacing.sm,
              textAlign: "center",
            }}
          >
            Something went wrong
          </Text>
          <Text
            style={{
              ...typography.body,
              color: colors.textSecondary,
              textAlign: "center",
              marginBottom: spacing.xl,
            }}
          >
            An unexpected error occurred. Please try again.
          </Text>
          <Pressable
            onPress={() => this.setState({ hasError: false })}
            style={{
              backgroundColor: colors.primary,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.lg,
              borderRadius: borderRadius.md,
            }}
          >
            <Text
              style={{
                color: colors.textInverted,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Try Again
            </Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}
