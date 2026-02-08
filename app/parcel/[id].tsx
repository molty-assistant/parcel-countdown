import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
  Pressable,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import {
  useThemeColors,
  spacing,
  typography,
  borderRadius,
} from "@/constants/theme";
import {
  type Parcel,
  STORAGE_KEY,
  getCountdown,
  formatCountdown,
  type CountdownResult,
} from "@/constants/parcel";
import { Button, Card } from "@/components";
import { useStorage } from "@/hooks";

export default function ParcelDetailScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [parcels, setParcels, loading] = useStorage<Parcel[]>(STORAGE_KEY, []);
  const [countdown, setCountdown] = useState<CountdownResult | null>(null);

  const parcel = parcels.find((p) => p.id === id);

  // Live countdown ticker
  useEffect(() => {
    if (!parcel) return;
    const update = () => setCountdown(getCountdown(parcel.expectedDate));
    update();
    const interval = setInterval(update, 10_000);
    return () => clearInterval(interval);
  }, [parcel?.expectedDate]);

  const handleDelete = () => {
    Alert.alert("Delete Parcel", `Remove "${parcel?.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          setParcels((prev) => prev.filter((p) => p.id !== id));
          router.back();
        },
      },
    ]);
  };

  const handleOpenLink = () => {
    if (!parcel?.trackingUrl) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(parcel.trackingUrl).catch(() => {
      Alert.alert("Error", "Could not open this URL.");
    });
  };

  if (loading) return null;

  if (!parcel) {
    return (
      <>
        <Stack.Screen options={{ title: "Parcel" }} />
        <View style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
          <Text style={[typography.h2, { color: colors.text }]}>
            Parcel not found
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: parcel.name }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
      >
        {/* Big Countdown */}
        <Card style={styles.countdownCard} padding="lg">
          {countdown?.delivered ? (
            <View style={styles.deliveredContainer}>
              <Text style={[styles.bigCheckmark, { color: colors.success }]}>
                ✓
              </Text>
              <Text style={[styles.deliveredTitle, { color: colors.success }]}>
                Delivered!
              </Text>
            </View>
          ) : countdown ? (
            <View style={styles.countdownContainer}>
              <View style={styles.countdownRow}>
                {countdown.days > 0 && (
                  <View style={styles.countdownUnit}>
                    <Text style={[styles.bigNumber, { color: colors.primary }]}>
                      {countdown.days}
                    </Text>
                    <Text style={[styles.unitLabel, { color: colors.textSecondary }]}>
                      {countdown.days === 1 ? "day" : "days"}
                    </Text>
                  </View>
                )}
                <View style={styles.countdownUnit}>
                  <Text style={[styles.bigNumber, { color: colors.primary }]}>
                    {countdown.hours}
                  </Text>
                  <Text style={[styles.unitLabel, { color: colors.textSecondary }]}>
                    {countdown.hours === 1 ? "hour" : "hours"}
                  </Text>
                </View>
                <View style={styles.countdownUnit}>
                  <Text style={[styles.bigNumber, { color: colors.primary }]}>
                    {countdown.minutes}
                  </Text>
                  <Text style={[styles.unitLabel, { color: colors.textSecondary }]}>
                    {countdown.minutes === 1 ? "min" : "mins"}
                  </Text>
                </View>
              </View>
              <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
                {formatCountdown(countdown)} to go
              </Text>
            </View>
          ) : null}
        </Card>

        {/* Details */}
        <Card style={styles.detailCard}>
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
            EXPECTED DELIVERY
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {parcel.expectedDate}
          </Text>

          {parcel.trackingUrl ? (
            <>
              <Text
                style={[
                  styles.detailLabel,
                  { color: colors.textSecondary, marginTop: spacing.md },
                ]}
              >
                TRACKING LINK
              </Text>
              <Pressable onPress={handleOpenLink}>
                <Text
                  style={[styles.link, { color: colors.primary }]}
                  numberOfLines={2}
                >
                  {parcel.trackingUrl}
                </Text>
              </Pressable>
            </>
          ) : null}

          {parcel.notes ? (
            <>
              <Text
                style={[
                  styles.detailLabel,
                  { color: colors.textSecondary, marginTop: spacing.md },
                ]}
              >
                NOTES
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {parcel.notes}
              </Text>
            </>
          ) : null}

          <Text
            style={[
              styles.detailLabel,
              { color: colors.textSecondary, marginTop: spacing.md },
            ]}
          >
            ADDED
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {new Date(parcel.createdAt).toLocaleDateString()}
          </Text>
        </Card>

        {/* Delete */}
        <View style={styles.deleteRow}>
          <Button
            title="Delete Parcel"
            onPress={handleDelete}
            variant="ghost"
            textStyle={{ color: colors.error }}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  countdownCard: {
    alignItems: "center",
  },
  countdownContainer: {
    alignItems: "center",
  },
  countdownRow: {
    flexDirection: "row",
    gap: spacing.xl,
    marginBottom: spacing.sm,
  },
  countdownUnit: {
    alignItems: "center",
  },
  bigNumber: {
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 56,
  },
  unitLabel: {
    ...typography.caption,
    marginTop: 2,
  },
  summaryText: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
  },
  deliveredContainer: {
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  bigCheckmark: {
    fontSize: 64,
    fontWeight: "700",
    lineHeight: 72,
  },
  deliveredTitle: {
    ...typography.h1,
    marginTop: spacing.sm,
  },
  detailCard: {},
  detailLabel: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  detailValue: {
    ...typography.body,
  },
  link: {
    ...typography.body,
    textDecorationLine: "underline",
  },
  deleteRow: {
    alignItems: "center",
    marginTop: spacing.md,
    marginBottom: spacing.xxl,
  },
});
