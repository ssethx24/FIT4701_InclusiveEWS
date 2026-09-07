import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { RText } from './RText';

interface ConnectivityBannerProps {
  lastUpdatedMinAgo?: number;
}

/** John: rural mobile/NBN coverage can drop during storms or bushfires — this makes clear
 * that what's on screen may be a saved snapshot, not a live feed. */
export function ConnectivityBanner({ lastUpdatedMinAgo }: ConnectivityBannerProps) {
  const { severity, radius } = useTheme();

  const message =
    lastUpdatedMinAgo != null
      ? `Limited connectivity — showing info saved ${lastUpdatedMinAgo} min ago`
      : 'Limited connectivity — showing the last saved update';

  return (
    <View
      style={[styles.banner, { backgroundColor: severity.watch.bg, borderColor: severity.watch.border, borderRadius: radius.lg }]}
      accessibilityRole="alert"
      accessibilityLabel={message}
    >
      <Ionicons name="cloud-offline-outline" size={18} color={severity.watch.fg} />
      <RText variant="secondary" color={severity.watch.fg} style={styles.text}>
        {message}
      </RText>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  text: {
    flex: 1,
  },
});
