import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../theme/theme.css';

// Base badge style
export const badgeBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 500,
  borderRadius: vars.borderRadius.full,
  transition: vars.transitions.default,
});

// Badge variants
export const badgeVariants = styleVariants({
  primary: [
    badgeBase,
    {
      backgroundColor: vars.colors.primary,
      color: vars.colors.white,
    }
  ],
  
  secondary: [
    badgeBase,
    {
      backgroundColor: vars.colors.secondary,
      color: vars.colors.white,
    }
  ],
  
  success: [
    badgeBase,
    {
      backgroundColor: vars.colors.success,
      color: vars.colors.white,
    }
  ],
  
  danger: [
    badgeBase,
    {
      backgroundColor: vars.colors.danger,
      color: vars.colors.white,
    }
  ],
  
  warning: [
    badgeBase,
    {
      backgroundColor: vars.colors.warning,
      color: vars.colors.gray[900], // Dark text for better contrast on yellow
    }
  ],
  
  info: [
    badgeBase,
    {
      backgroundColor: vars.colors.info,
      color: vars.colors.white,
    }
  ],
});

// Badge sizes
export const badgeSizes = styleVariants({
  sm: {
    fontSize: vars.fontSizes.xs,
    padding: `${vars.space[0.5]} ${vars.space[1.5]}`,
  },
  
  md: {
    fontSize: vars.fontSizes.sm,
    padding: `${vars.space[1]} ${vars.space[2]}`,
  },
});