import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
  sortParcels,
} from "@/constants/parcel";
import { Card } from "@/components";
import { useStorage } from "@/hooks";

export default function HomeScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const [parcels, , loading] = useStorage<Parcel[]>(STORAGE_KEY, []);
  const [, setTick] = useState(0);

  // Update countdowns every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(interval);
  }, []);

  const sorted = sortParcels(parcels);

  const renderParcel = ({ item }: { item: Parcel }) => {
    const countdown = getCountdown(item.expectedDate);
    return (
      <Pressable
        onPress={() =>
          router.push({ pathname: "/parcel/[id]", params: { id: item.id } })
        }
      >
        <Card style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardInfo}>
              <Text
                style={[styles.parcelName, { color: colors.text }]}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text style={[styles.date, { color: colors.textSecondary }]}>
                {item.expectedDate}
              </Text>
            </View>
            <View style={styles.countdownBadge}>
              {countdown.delivered ? (
                <View style={styles.deliveredRow}>
                  <Text style={[styles.checkmark, { color: colors.success }]}>
                    ✓
                  </Text>
                  <Text style={[styles.deliveredText, { color: colors.success }]}>
                    Delivered!
                  </Text>
                </View>
              ) : (
                <Text style={[styles.countdownText, { color: colors.primary }]}>
                  {formatCountdown(countdown)}
                </Text>
              )}
            </View>
          </View>
        </Card>
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "📦 Parcels" }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {loading ? null : sorted.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No parcels yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Tap the + button to track a delivery
            </Text>
          </View>
        ) : (
          <FlatList
            data={sorted}
            keyExtractor={(item) => item.id}
            renderItem={renderParcel}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* FAB */}
        <Pressable
          onPress={() => router.push("/add")}
          style={({ pressed }) => [
            styles.fab,
            { backgroundColor: colors.primary },
            pressed && styles.fabPressed,
          ]}
        >
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  card: {
    marginBottom: 0,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  parcelName: {
    ...typography.h3,
    marginBottom: 2,
  },
  date: {
    ...typography.caption,
  },
  countdownBadge: {
    alignItems: "flex-end",
  },
  countdownText: {
    ...typography.bodySmall,
    fontWeight: "600",
  },
  deliveredRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  checkmark: {
    fontSize: 18,
    fontWeight: "700",
  },
  deliveredText: {
    ...typography.bodySmall,
    fontWeight: "600",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    ...typography.body,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  fabText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "400",
    lineHeight: 30,
  },
});
