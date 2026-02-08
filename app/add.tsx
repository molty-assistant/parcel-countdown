import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
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
  generateId,
  isValidDate,
} from "@/constants/parcel";
import { Button } from "@/components";
import { useStorage } from "@/hooks";

export default function AddParcelScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const [parcels, setParcels] = useStorage<Parcel[]>(STORAGE_KEY, []);

  const [name, setName] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [notes, setNotes] = useState("");

  const canSave = name.trim().length > 0 && isValidDate(expectedDate);

  const handleSave = () => {
    if (!canSave) {
      Alert.alert("Missing fields", "Please enter a name and a valid date (YYYY-MM-DD).");
      return;
    }

    const newParcel: Parcel = {
      id: generateId(),
      name: name.trim(),
      trackingUrl: trackingUrl.trim() || undefined,
      expectedDate,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setParcels((prev) => [...prev, newParcel]);
    router.back();
  };

  const inputStyle = [
    styles.input,
    {
      backgroundColor: colors.surface,
      color: colors.text,
      borderColor: colors.border,
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: "Add Parcel" }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          PARCEL NAME *
        </Text>
        <TextInput
          style={inputStyle}
          value={name}
          onChangeText={setName}
          placeholder="e.g. New headphones"
          placeholderTextColor={colors.textSecondary}
          autoFocus
          returnKeyType="next"
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>
          TRACKING URL
        </Text>
        <TextInput
          style={inputStyle}
          value={trackingUrl}
          onChangeText={setTrackingUrl}
          placeholder="https://track.example.com/..."
          placeholderTextColor={colors.textSecondary}
          keyboardType="url"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>
          EXPECTED DELIVERY DATE *
        </Text>
        <TextInput
          style={inputStyle}
          value={expectedDate}
          onChangeText={setExpectedDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numbers-and-punctuation"
          maxLength={10}
          returnKeyType="next"
        />
        {expectedDate.length > 0 && !isValidDate(expectedDate) && (
          <Text style={[styles.hint, { color: colors.error }]}>
            Enter a valid date: YYYY-MM-DD
          </Text>
        )}

        <Text style={[styles.label, { color: colors.textSecondary }]}>
          NOTES
        </Text>
        <TextInput
          style={[...inputStyle, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Any extra details..."
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          returnKeyType="done"
        />

        <View style={styles.buttonRow}>
          <Button
            title="Save Parcel"
            onPress={handleSave}
            disabled={!canSave}
            size="lg"
            style={styles.saveButton}
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
  content: {
    padding: spacing.lg,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  notesInput: {
    minHeight: 80,
  },
  hint: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  buttonRow: {
    marginTop: spacing.xl,
  },
  saveButton: {
    width: "100%",
  },
});
