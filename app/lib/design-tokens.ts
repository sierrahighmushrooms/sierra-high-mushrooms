export const designTokens = {
  colors: {
    forestDeep: '#1E2A1B',
    forest: '#33452F',
    sage: '#6C7B57',
    amber: '#A9843F',
    bg: '#F1F2E9',
    panel: '#FFFFFF',
    ink: '#1E2318',
    muted: 'rgba(30, 35, 24, 0.6)',
    line: 'rgba(30, 42, 27, 0.12)',
    peak: '#4E7B3C',
    limited: '#B8862F',
    soon: '#8A8778',
  },

  fonts: {
    serif: "'Fraunces', serif",
    sans: "'Inter', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '56px',
    '4xl': '80px',
  },

  breakpoints: {
    desktop: '1180px',
    tablet: '900px',
    mobile: '560px',
  },

  transitions: {
    standard: 'all 0.2s ease',
    reveal: 'all 0.75s cubic-bezier(0.16, 0.8, 0.3, 1)',
  },

  borderRadius: {
    sm: '2px',
    md: '3px',
    lg: '6px',
  },
};

export type DesignToken = typeof designTokens;
