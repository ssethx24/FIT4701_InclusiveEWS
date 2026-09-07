import { useCallback, useEffect, useRef, useState } from 'react';
import { Vibration } from 'react-native';

/**
 * Shared "tap to confirm" pattern (used by I'm Safe / Request help): vibrates once,
 * flips a flag for `durationMs` so the button can show a confirmation state, then resets.
 */
export function useConfirmAction(durationMs = 4000): [boolean, () => void] {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = useCallback(() => {
    Vibration.vibrate(200);
    setActive(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActive(false), durationMs);
  }, [durationMs]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return [active, trigger];
}
