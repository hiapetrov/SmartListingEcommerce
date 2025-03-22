import { createTheme } from '@vanilla-extract/css';

// Create theme variables based on existing Tailwind usage
export const [themeClass, vars] = createTheme({
  colors: {
    // Core colors
    primary: '#3B82F6', // blue-500
    primaryLight: '#60A5FA', // blue-400
    primaryDark: '#2563EB', // blue-600
    secondary: '#8B5CF6', // purple-500
    secondaryLight: '#A78BFA', // purple-400
    secondaryDark: '#7C3AED', // purple-600
    
    // Feedback colors
    success: '#10B981', // green-500
    successLight: '#34D399', // green-400
    successDark: '#059669', // green-600
    
    danger: '#EF4444', // red-500
    dangerLight: '#F87171', // red-400
    dangerDark: '#DC2626', // red-600
    
    warning: '#F59E0B', // amber-500
    warningLight: '#FBBF24', // amber-400
    warningDark: '#D97706', // amber-600
    
    info: '#0EA5E9', // sky-500
    infoLight: '#38BDF8', // sky-400
    infoDark: '#0284C7', // sky-600
    
    // Grayscale
    white: '#FFFFFF',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    
    // Semantic colors
    background: {
      primary: '#111827', // gray-900 (dark mode default)
      secondary: '#1F2937', // gray-800
      card: '#1F2937', // gray-800
      popup: '#374151', // gray-700
    },
    
    text: {
      primary: '#FFFFFF', // white
      secondary: '#E5E7EB', // gray-200
      muted: '#9CA3AF', // gray-400
      disabled: '#6B7280', // gray-500
    },
    
    border: {
      light: '#4B5563', // gray-600
      medium: '#374151', // gray-700
      dark: '#1F2937', // gray-800
    },
  },
  
  // Typography
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  
  // Spacing
  space: {
    0: '0',
    '0.5': '0.125rem',
    1: '0.25rem',
    '1.5': '0.375rem',
    2: '0.5rem',
    '2.5': '0.625rem',
    3: '0.75rem',
    '3.5': '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  
  // Borders
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  // Z-index
  zIndices: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
  },
  
  // Transitions
  transitions: {
    default: 'all 0.2s ease-in-out',
    fast: 'all 0.1s ease-in-out',
    slow: 'all 0.3s ease-in-out',
  },
});