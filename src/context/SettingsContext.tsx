import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface SettingsContextValue {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  /** John: needs extra time to physically prepare and leave. Shows earlier, personalised
   * prep-time nudges and a normalised "Request help" action alongside "I'm Safe". */
  extraTimeNeeded: boolean;
  setExtraTimeNeeded: (value: boolean) => void;
  /** Angus: hearing loss, removes hearing aids overnight. Alerts add strong vibration and
   * a full-screen flash instead of relying on sound alone. */
  visualVibrationAlerts: boolean;
  setVisualVibrationAlerts: (value: boolean) => void;
  /** Both: gets overwhelmed by too many choices under stress. Collapses instructions into
   * 2-3 clear steps and a single primary action. */
  simplifiedActions: boolean;
  setSimplifiedActions: (value: boolean) => void;
  /** John: unreliable rural mobile/NBN coverage. Marks information as saved/cached rather
   * than implying it is always live. */
  lowConnectivityMode: boolean;
  setLowConnectivityMode: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [extraTimeNeeded, setExtraTimeNeeded] = useState(false);
  const [visualVibrationAlerts, setVisualVibrationAlerts] = useState(false);
  const [simplifiedActions, setSimplifiedActions] = useState(false);
  const [lowConnectivityMode, setLowConnectivityMode] = useState(false);

  const value = useMemo(
    () => ({
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
    }),
    [darkMode, extraTimeNeeded, visualVibrationAlerts, simplifiedActions, lowConnectivityMode],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
