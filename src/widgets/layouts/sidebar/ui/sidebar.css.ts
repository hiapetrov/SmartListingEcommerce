import { style, createVar, keyframes } from '@vanilla-extract/css';
import { vars } from '../../../../shared/ui/theme/theme.css';

// Custom variable for transform state
export const translateXVar = createVar();

// Sidebar container - desktop version
export const desktopSidebar = style({
  display: 'none',
  backgroundColor: vars.colors.background.primary,
  borderRight: `1px solid ${vars.colors.border.light}`,
  width: '16rem', // w-64 in Tailwind
  flexShrink: 0,
  height: '100%',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'block',
    },
  },
});

// Mobile sidebar overlay
export const mobileSidebarOverlay = style({
  position: 'fixed',
  inset: 0, // top, right, bottom, left = 0
  zIndex: 40,
  transform: translateXVar,
  transition: 'transform 300ms ease-in-out',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'none',
    },
  },
});

// Dark overlay behind mobile sidebar
export const mobileSidebarBackdrop = style({
  position: 'absolute',
  inset: 0,
  backgroundColor: `${vars.colors.gray[900]}80`, // bg-opacity-50
});

// Mobile sidebar container
export const mobileSidebarContainer = style({
  position: 'relative',
  backgroundColor: vars.colors.background.primary,
  borderRight: `1px solid ${vars.colors.border.light}`,
  width: '16rem', // w-64 in Tailwind
  height: '100%',
  overflowY: 'auto',
});

// Sidebar header section
export const sidebarHeader = style({
  padding: vars.space[4],
});

// Sidebar brand/logo container
export const sidebarBrand = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: vars.space[6],
});

// Logo icon container
export const logoContainer = style({
  backgroundColor: vars.colors.primary,
  height: '1.5rem',
  width: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.borderRadius.DEFAULT,
  marginRight: vars.space[2],
});

// Logo text
export const logoText = style({
  fontSize: vars.fontSizes.xl,
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.text.primary,
});

// Navigation container
export const navContainer = style({
  padding: `0 ${vars.space[2]}`,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[1],
});

// Base nav item
export const navItemBase = style({
  display: 'flex',
  alignItems: 'center',
  padding: `${vars.space[3]} ${vars.space[4]}`,
  borderRadius: vars.borderRadius.md,
  color: vars.colors.text.secondary,
  transition: vars.transitions.default,
  ':hover': {
    backgroundColor: vars.colors.background.secondary,
    color: vars.colors.text.primary,
  },
});

// Active nav item
export const navItemActive = style({
  backgroundColor: vars.colors.background.secondary,
  color: vars.colors.text.primary,
  fontWeight: vars.fontWeights.medium,
});