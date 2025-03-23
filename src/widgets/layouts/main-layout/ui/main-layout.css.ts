import { style } from '@vanilla-extract/css';
import { vars } from '../../../../shared/ui/theme/theme.css';

export const layoutContainer = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.background.primary,
});

export const layoutContent = style({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
});

export const layoutMain = style({
  flex: 1,
  overflow: 'auto',
});

export const layoutInner = style({
  maxWidth: '80rem', // max-w-7xl in Tailwind
  margin: '0 auto',
  padding: `${vars.space[8]} ${vars.space[4]}`,
  '@media': {
    'screen and (min-width: 640px)': {
      padding: `${vars.space[8]} ${vars.space[6]}`,
    },
    'screen and (min-width: 1024px)': {
      padding: `${vars.space[8]} ${vars.space[8]}`,
    },
  },
});