export type AlertTone = 'advice' | 'watch' | 'emergency';

/**
 * "Leave now" can already be too late for someone who needs 45-60 minutes to prepare.
 * When extra time is needed, escalate the message a step earlier rather than showing
 * more information.
 */
export function getExtraTimeNote(tone: AlertTone): string {
  if (tone === 'emergency') {
    return 'This is already urgent for you. Leave now — extra delay could put you at risk.';
  }
  return "Because you may need extra time to leave, begin preparing now — don't wait for a more urgent warning.";
}

/** Collapses full instructions down to 2-3 steps for people who get overwhelmed by choice under stress. */
export function getSimplifiedSteps(tone: AlertTone): string[] {
  switch (tone) {
    case 'emergency':
      return ['Get everyone ready', 'Take essential items', 'Leave now'];
    case 'watch':
      return ['Prepare now', 'Gather essentials', 'Be ready to leave'];
    default:
      return ['Stay alert', 'Check for updates'];
  }
}

export function getSimplifiedPrimaryAction(tone: AlertTone): {
  label: string;
  variant: 'primary' | 'watch' | 'danger';
  icon: 'checkmark-circle-outline' | 'exit-outline';
} {
  if (tone === 'emergency') return { label: 'Leave now', variant: 'danger', icon: 'exit-outline' };
  if (tone === 'watch') return { label: 'Prepare now', variant: 'watch', icon: 'checkmark-circle-outline' };
  return { label: 'Prepare now', variant: 'primary', icon: 'checkmark-circle-outline' };
}
