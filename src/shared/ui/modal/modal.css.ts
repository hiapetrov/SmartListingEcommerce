import { style, styleVariants, createVar } from '@vanilla-extract/css';
import { vars } from '../theme/theme.css';

// Create custom property for modal size
export const modalWidthVar = createVar();

// Modal overlay
export const modalOverlay = style({
  position: 'fixed',
  inset: 0, // top, right, bottom, left = 0
  zIndex: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space[4],
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // bg-black bg-opacity-50
});

// Modal container
export const modalContainer = style({
  width: '100%',
  maxWidth: modalWidthVar,
  backgroundColor: vars.colors.background.card,
  borderRadius: vars.borderRadius.lg,
  border: `1px solid ${vars.colors.border.light}`,
  boxShadow: vars.shadows.xl,
  overflow: 'hidden',
});

// Modal header
export const modalHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: vars.space[4],
  borderBottom: `1px solid ${vars.colors.border.light}`,
});

// Modal title
export const modalTitle = style({
  fontSize: vars.fontSizes.lg,
  fontWeight: vars.fontWeights.medium,
  color: vars.colors.text.primary,
});

// Close button
export const modalCloseButton = style({
  color: vars.colors.text.secondary,
  cursor: 'pointer',
  transition: vars.transitions.default,
  ':hover': {
    color: vars.colors.text.primary,
  },
});

// Modal content
export const modalContent = style({
  padding: vars.space[6],
});

// Modal size variants
export const modalSizeVariants = {
  sm: { maxWidth: '28rem' }, // max-w-md
  md: { maxWidth: '32rem' }, // max-w-lg
  lg: { maxWidth: '42rem' }, // max-w-2xl
  xl: { maxWidth: '56rem' }, // max-w-4xl
};