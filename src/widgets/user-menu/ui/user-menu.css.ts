import { style } from '@vanilla-extract/css';
import { vars } from '../../../shared/ui/theme/theme.css';

// User menu trigger container
export const userMenuTrigger = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  cursor: 'pointer',
});

// Avatar container
export const avatarContainer = style({
  height: '2rem',
  width: '2rem',
  borderRadius: vars.borderRadius.full,
  background: `linear-gradient(to bottom right, ${vars.colors.primary}, ${vars.colors.primaryDark})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.colors.white,
  fontWeight: vars.fontWeights.bold,
  overflow: 'hidden',
});

// User name display
export const userName = style({
  fontSize: vars.fontSizes.sm,
  fontWeight: vars.fontWeights.medium,
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

// Dropdown header section
export const dropdownHeader = style({
  padding: `${vars.space[3]} ${vars.space[4]}`,
  borderBottom: `1px solid ${vars.colors.border.light}`,
});

// User full name
export const userFullName = style({
  fontSize: vars.fontSizes.sm,
  fontWeight: vars.fontWeights.medium,
  color: vars.colors.text.primary,
});

// User email
export const userEmail = style({
  fontSize: vars.fontSizes.xs,
  color: vars.colors.text.muted,
  marginTop: vars.space[1],
});

// Plan badge container
export const planBadgeContainer = style({
  marginTop: vars.space[2],
  display: 'flex',
  alignItems: 'center',
});

// Plan badge
export const planBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `${vars.space[0.5]} ${vars.space[2]}`,
  borderRadius: vars.borderRadius.DEFAULT,
  fontSize: vars.fontSizes.xs,
  fontWeight: vars.fontWeights.medium,
  backgroundColor: vars.colors.blue[800],
  color: vars.colors.blue[200],
});