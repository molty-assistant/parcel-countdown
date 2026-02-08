import { useState, useEffect, useCallback, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Persistent state hook backed by AsyncStorage.
 * Drop-in replacement for useState that survives app restarts.
 */
export function useStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const hasSetBeforeLoad = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((raw) => {
        // Only apply stored value if setValue hasn't been called during load
        if (raw !== null && !hasSetBeforeLoad.current) {
          setStoredValue(JSON.parse(raw));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      hasSetBeforeLoad.current = true;
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        AsyncStorage.setItem(key, JSON.stringify(next)).catch(() => {});
        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue, loading];
}
