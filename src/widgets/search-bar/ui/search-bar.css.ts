import { style } from '@vanilla-extract/css';
import { vars } from '../../../shared/ui/theme/theme.css';

export const searchBarContainer = style({
  position: 'relative',
});

export const searchInput = style({
  width: '100%',
  backgroundColor: `${vars.colors.gray[800]}80`, // bg-opacity-50
  backdropFilter: 'blur(4px)',
  color: vars.colors.text.primary,
  borderRadius: vars.borderRadius.lg,
  padding: `${vars.space[2]} ${vars.space[4]}`,
  paddingLeft: vars.space[10], // pl-10 in Tailwind
  border: `1px solid ${vars.colors.border.light}`,
  outline: 'none',
  transition: vars.transitions.default,
  '::placeholder': {
    color: vars.colors.text.muted,
  },
  ':focus': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: `${vars.colors.primary}80`, // ring-opacity-50
    borderColor: 'transparent',
  },
});

export const searchIconContainer = style({
  position: 'absolute',
  left: vars.space[3],
  top: '50%',
  transform: 'translateY(-50%)',
  color: vars.colors.text.muted,
  pointerEvents: 'none',
});