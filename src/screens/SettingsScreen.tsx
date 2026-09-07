import { Ionicons } from '@expo/vector-icons';
import { ReactNode, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertFlashOverlay } from '../components/AlertFlashOverlay';
import { RButton } from '../components/RButton';
import { RCard } from '../components/RCard';
import { RTabBar, TabKey } from '../components/RTabBar';
import { RText } from '../components/RText';
import { RToggle } from '../components/RToggle';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../theme/useTheme';

interface SettingsScreenProps {
  onNavigate: (tab: TabKey) => void;
}

interface ToggleRowProps {
  icon: ReactNode;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  isLast?: boolean;
}

function ToggleRow({ icon, title, description, value, onValueChange, isLast }: ToggleRowProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.row, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.hairline }]}>
      <View style={[styles.iconBox, { backgroundColor: colors.surface2 }]}>{icon}</View>
      <View style={styles.rowText}>
        <RText variant="bodyEmphasis" color={colors.ink}>
          {title}
        </RText>
        <RText variant="secondary" color={colors.ink3}>
          {description}
        </RText>
      </View>
      <RToggle value={value} onValueChange={onValueChange} accessibilityLabel={title} />
    </View>
  );
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const { colors, severity } = useTheme();
  const {
    darkMode,
    setDarkMode,
    extraTimeNeeded,
    setExtraTimeNeeded,
    visualVibrationAlerts,
    setVisualVibrationAlerts,
    simplifiedActions,
    setSimplifiedActions,
    lowConnectivityMode,
    setLowConnectivityMode,
  } = useSettings();
  const [previewVisible, setPreviewVisible] = useState(false);

  // Visual-only for now — no behavior wired up yet, unlike Dark mode.
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [colourBlindPalette, setColourBlindPalette] = useState(false);
  const [textOnly, setTextOnly] = useState(false);

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <SafeAreaView edges={['top']} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => onNavigate('Home')}
              accessibilityRole="button"
              accessibilityLabel="Back to Home"
              style={[styles.backButton, { backgroundColor: colors.surface, borderColor: colors.hairline }]}
            >
              <Ionicons name="chevron-back" size={18} color={colors.ink} />
            </Pressable>
            <RText variant="eyebrowLabel" color={colors.ink3}>
              SETTINGS
            </RText>
          </View>

          <View style={styles.titleBlock}>
            <RText variant="largeTitle" color={colors.ink} accessibilityRole="header">
              Make it yours
            </RText>
            <RText variant="body" color={colors.ink2}>
              Adjust how alerts look, sound, and feel. Changes apply instantly.
            </RText>
          </View>

          <RText variant="eyebrowLabel" color={colors.ink3}>
            VISUAL
          </RText>

          <RCard padded={false}>
            <ToggleRow
              icon={<Ionicons name="eye-outline" size={20} color={colors.ink} />}
              title="Dark mode"
              description="Easier on the eyes at night"
              value={darkMode}
              onValueChange={setDarkMode}
            />
            <ToggleRow
              icon={<Ionicons name="contrast-outline" size={20} color={colors.ink} />}
              title="High contrast"
              description="Maximum text-to-background contrast (WCAG AAA)"
              value={highContrast}
              onValueChange={setHighContrast}
            />
            <ToggleRow
              icon={
                <RText variant="bodyEmphasis" color={colors.ink}>
                  Aa
                </RText>
              }
              title="Large text"
              description="Increases body text for easier reading"
              value={largeText}
              onValueChange={setLargeText}
            />
            <ToggleRow
              icon={
                <View style={styles.swatchPair}>
                  <View style={[styles.swatch, { backgroundColor: '#D97706' }]} />
                  <View style={[styles.swatch, { backgroundColor: '#2B3A4E' }]} />
                </View>
              }
              title="Colour-blind palette"
              description="Uses blue/amber instead of red/green; icons change shape"
              value={colourBlindPalette}
              onValueChange={setColourBlindPalette}
            />
            <ToggleRow
              icon={
                <RText variant="caption" color={colors.ink}>
                  ABC
                </RText>
              }
              title="Text-only mode"
              description="Hides decorative graphics. Keeps all critical information."
              value={textOnly}
              onValueChange={setTextOnly}
              isLast
            />
          </RCard>

          <RText variant="eyebrowLabel" color={colors.ink3}>
            PERSONAL NEEDS
          </RText>

          <RCard padded={false}>
            <ToggleRow
              icon={<Ionicons name="hourglass-outline" size={20} color={colors.ink} />}
              title="Extra evacuation time"
              description="Warns you earlier and adds a one-tap way to request help if leaving takes you longer"
              value={extraTimeNeeded}
              onValueChange={setExtraTimeNeeded}
            />
            <ToggleRow
              icon={<Ionicons name="phone-portrait-outline" size={20} color={colors.ink} />}
              title="Vibration & visual alerts"
              description="Strong vibration and a full-screen flash for emergencies, so alerts don't rely on sound"
              value={visualVibrationAlerts}
              onValueChange={setVisualVibrationAlerts}
            />
            <ToggleRow
              icon={<Ionicons name="list-outline" size={20} color={colors.ink} />}
              title="Simplified actions"
              description="Collapses instructions into 2-3 clear steps and one main action during a warning"
              value={simplifiedActions}
              onValueChange={setSimplifiedActions}
            />
            <ToggleRow
              icon={<Ionicons name="cloud-offline-outline" size={20} color={colors.ink} />}
              title="Low connectivity mode"
              description="Clearly marks information as saved when your connection may be unreliable"
              value={lowConnectivityMode}
              onValueChange={setLowConnectivityMode}
              isLast
            />
          </RCard>

          {visualVibrationAlerts && (
            <View style={styles.previewBlock}>
              <RText variant="secondary" color={colors.ink3}>
                See and feel what an emergency alert looks like with this on.
              </RText>
              <RButton
                label="Preview alert"
                variant="secondary"
                size="m"
                icon="flash-outline"
                iconPosition="leading"
                onPress={() => setPreviewVisible(true)}
                accessibilityHint="Plays a sample vibration and screen flash"
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <RTabBar active="Settings" onSelect={onNavigate} />
      <AlertFlashOverlay
        visible={previewVisible}
        message="Sample emergency alert"
        onDone={() => setPreviewVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  swatchPair: {
    flexDirection: 'row',
    gap: 3,
  },
  swatch: {
    width: 8,
    height: 20,
    borderRadius: 3,
  },
});
