import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Modal, StyleSheet, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RText } from './RText';

interface AlertFlashOverlayProps {
  visible: boolean;
  message?: string;
  onDone: () => void;
}

/**
 * Angus: removes his hearing aids overnight, so a sound-only warning may not wake him.
 * This simulates what a real push alert would trigger — strong repeated vibration plus a
 * full-screen flash — so the effect can be seen and felt, not just read about in Settings.
 */
export function AlertFlashOverlay({ visible, message = 'Emergency alert', onDone }: AlertFlashOverlayProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    Vibration.vibrate([0, 400, 200, 400, 200, 400, 200, 400]);

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]),
      { iterations: 5 },
    );
    loop.start(() => onDone());

    return () => {
      loop.stop();
      Vibration.cancel();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onDone}>
      <Animated.View style={[StyleSheet.absoluteFill, styles.flash, { opacity }]} pointerEvents="none">
        <SafeAreaView style={styles.content}>
          <Ionicons name="warning" size={48} color="#FFFFFF" />
          <RText variant="title" color="#FFFFFF" style={styles.text}>
            {message}
          </RText>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flash: {
    backgroundColor: '#DC2626',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 32,
  },
  text: {
    textAlign: 'center',
  },
});
