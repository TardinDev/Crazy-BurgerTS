export const theme = {
  colors: {
    primary: '#eb8317',
    primaryDark: '#d4741a',
    primaryLight: '#f59e0b',
    secondary: '#2c3e50',

    // Status colors
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',

    // Neutral colors
    gray: {
      50: '#fafbfc',
      100: '#f6f8fa',
      200: '#eaecef',
      300: '#d6d9dc',
      400: '#a8b2bc',
      500: '#7a8490',
      600: '#5a6470',
      700: '#434950',
      800: '#2c3238',
      900: '#1a1e22',
    },

    // Text colors
    text: {
      primary: '#2d3748',
      secondary: '#718096',
      muted: '#a0aec0',
      white: '#ffffff',
    },

    // Background colors
    background: {
      primary: '#ffffff',
      secondary: '#fafbfc',
      muted: '#f6f8fa',
      dark: '#0f172a',
    },

    // Border colors
    border: {
      light: '#edf2f7',
      medium: '#e2e8f0',
      dark: '#718096',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '48px',
    '4xl': '64px',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  borderRadius: {
    none: '0',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },

  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} as const;

export type Theme = typeof theme;