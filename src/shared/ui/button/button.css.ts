import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../theme/theme.css';

// Base button style shared across all variants
export const buttonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 500,
  borderRadius: vars.borderRadius.md,
  transition: vars.transitions.default,
  cursor: 'pointer',
  outline: 'none',
  border: 'none',
  
  ':focus': {
    boxShadow: `0 0 0 2px ${vars.colors.gray[900]}, 0 0 0 4px ${vars.colors.primary}`,
  },
  
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
});

// Button variants
export const buttonVariants = styleVariants({
  primary: [
    buttonBase,
    {
      background: `linear-gradient(to right, ${vars.colors.primary}, ${vars.colors.primaryDark})`,
      color: vars.colors.white,
      ':hover': {
        background: `linear-gradient(to right, ${vars.colors.primaryLight}, ${vars.colors.primary})`,
      },
    },
  ],
  
  secondary: [
    buttonBase,
    {
      background: `linear-gradient(to right, ${vars.colors.secondary}, ${vars.colors.secondaryDark})`,
      color: vars.colors.white,
      ':hover': {
        background: `linear-gradient(to right, ${vars.colors.secondaryLight}, ${vars.colors.secondary})`,
      },
    },
  ],
  
  outline: [
    buttonBase,
    {
      backgroundColor: 'transparent',
      border: `1px solid ${vars.colors.border.light}`,
      color: vars.colors.text.secondary,
      ':hover': {
        backgroundColor: vars.colors.gray[800],
        color: vars.colors.text.primary,
      },
    },
  ],
  
  ghost: [
    buttonBase,
    {
      backgroundColor: 'transparent',
      color: vars.colors.text.secondary,
      ':hover': {
        backgroundColor: vars.colors.gray[800],
        color: vars.colors.text.primary,
      },
    },
  ],
  
  danger: [
    buttonBase,
    {
      background: `linear-gradient(to right, ${vars.colors.danger}, ${vars.colors.dangerDark})`,
      color: vars.colors.white,
      ':hover': {
        background: `linear-gradient(to right, ${vars.colors.dangerLight}, ${vars.colors.danger})`,
      },
    },
  ],
});

// Button sizes
export const buttonSizes = styleVariants({
  sm: {
    fontSize: vars.fontSizes.sm,
    padding: `${vars.space[1]} ${vars.space[3]}`,
  },
  
  md: {
    fontSize: vars.fontSizes.base,
    padding: `${vars.space[2]} ${vars.space[4]}`,
  },
  
  lg: {
    fontSize: vars.fontSizes.lg,
    padding: `${vars.space[3]} ${vars.space[6]}`,
  },
});

// Full width button
export const buttonFullWidth = style({
  width: '100%',
});