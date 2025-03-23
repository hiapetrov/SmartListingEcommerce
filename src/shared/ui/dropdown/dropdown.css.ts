import { style, styleVariants, createVar } from '@vanilla-extract/css';
import { vars } from '../theme/theme.css';

// Create custom properties for dynamic positioning
export const dropdownAlignmentVar = createVar();
export const dropdownWidthVar = createVar();

// Base dropdown container
export const dropdownContainer = style({
  position: 'relative',
});

// Dropdown trigger
export const dropdownTrigger = style({
  cursor: 'pointer',
});

// Dropdown menu container
export const dropdownMenu = style({
  position: 'absolute',
  top: `calc(100% + ${vars.space[2]})`, // mt-2 in Tailwind
  [dropdownAlignmentVar]: '0', // Dynamic left or right alignment
  width: dropdownWidthVar, // Dynamic width
  borderRadius: vars.borderRadius.md,
  backgroundColor: vars.colors.background.card,
  border: `1px solid ${vars.colors.border.light}`,
  boxShadow: vars.shadows.lg,
  zIndex: 50,
  overflow: 'hidden',
});

// Dropdown content area
export const dropdownContent = style({
  padding: `${vars.space[1]} 0`, // py-1 in Tailwind
});

// Dropdown item
export const dropdownItemBase = style({
  display: 'flex',
  alignItems: 'center',
  padding: `${vars.space[2]} ${vars.space[4]}`, // px-4 py-2 in Tailwind
  fontSize: vars.fontSizes.sm,
  color: vars.colors.text.secondary,
  cursor: 'pointer',
  transition: vars.transitions.default,
  ':hover': {
    backgroundColor: vars.colors.background.secondary,
    color: vars.colors.text.primary,
  },
});

// Dropdown item icon container
export const dropdownItemIcon = style({
  marginRight: vars.space[2], // mr-2 in Tailwind
});

// Dropdown divider
export const dropdownDivider = style({
  borderTop: `1px solid ${vars.colors.border.light}`,
  margin: `${vars.space[1]} 0`, // my-1 in Tailwind
});