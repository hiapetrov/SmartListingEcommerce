import { style } from '@vanilla-extract/css';
import { vars } from '../../../shared/ui/theme/theme.css';

// Header container
export const headerContainer = style({
  background: `linear-gradient(to right, ${vars.colors.gray[900]}, ${vars.colors.indigo[900]})`,
  color: vars.colors.text.primary,
  boxShadow: vars.shadows.lg,
  borderBottom: `1px solid ${vars.colors.border.light}`,
});

// Header inner layout
export const headerInner = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${vars.space[4]} ${vars.space[6]}`,
});

// Left section with logo and hamburger
export const headerLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
});

// Mobile menu button
export const hamburgerButton = style({
  marginRight: vars.space[2],
  color: vars.colors.text.secondary,
  ':hover': {
    color: vars.colors.text.primary,
  },
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'none',
    },
  },
});

// Logo and brand container
export const brandContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
});

// Brand icon
export const brandIcon = style({
  height: '2rem',
  width: '2rem',
  color: vars.colors.primary,
});

// Brand text
export const brandText = style({
  fontSize: vars.fontSizes.xl,
  fontWeight: vars.fontWeights.bold,
});

// Search bar container
export const searchContainer = style({
  flex: '1 1 auto',
  maxWidth: '36rem', // max-w-xl
  margin: `0 ${vars.space[4]}`,
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

// Right section with notifications and user menu
export const headerRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[4],
});

// Auth buttons container
export const authButtonsContainer = style({
  display: 'flex',
  gap: vars.space[2],
});