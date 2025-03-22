import { style, createVar, styleVariants } from '@vanilla-extract/css';
import { vars } from '../theme/theme.css';

// Create custom properties for gradient if needed
export const gradientFrom = createVar();
export const gradientTo = createVar();

// Base card style
export const cardBase = style({
  backgroundColor: vars.colors.background.card,
  borderRadius: vars.borderRadius.lg,
  padding: vars.space[6],
  position: 'relative',
  transition: vars.transitions.default,
});

// Card with shadow
export const cardShadow = style({
  boxShadow: vars.shadows.DEFAULT,
  ':hover': {
    boxShadow: vars.shadows.md,
  },
});

// Card with border
export const cardBorder = style({
  border: `1px solid ${vars.colors.border.light}`,
});

// Card with gradient strip at top
export const cardGradient = style({
  '::before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '1px',
    background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
    borderTopLeftRadius: vars.borderRadius.lg,
    borderTopRightRadius: vars.borderRadius.lg,
  }
});

// Card interaction states
export const cardInteractive = style({
  cursor: 'pointer',
});