import { style } from '@vanilla-extract/css';
import { vars } from '../../../../shared/ui/theme/theme.css';

export const guestLayoutContainer = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.background.primary,
  color: vars.colors.text.primary,
});

export const guestLayoutContent = style({
  flex: '1',
  overflow: 'auto',
});

export const guestLayoutInner = style({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: `${vars.space[8]} ${vars.space[4]}`,
});