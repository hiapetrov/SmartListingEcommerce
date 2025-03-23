import { style } from '@vanilla-extract/css';
import { vars } from '../../../shared/ui/theme/theme.css';

// Product image container
export const imageContainer = style({
  position: 'relative',
  height: '12rem', // h-48 in Tailwind
  borderTopLeftRadius: vars.borderRadius.lg,
  borderTopRightRadius: vars.borderRadius.lg,
  overflow: 'hidden',
  backgroundColor: vars.colors.gray[700],
});

// Product image
export const productImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

// No image placeholder
export const noImagePlaceholder = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.colors.gray[500],
});

// Product content container
export const contentContainer = style({
  padding: vars.space[4],
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

// Product title
export const productTitle = style({
  fontSize: vars.fontSizes.lg,
  fontWeight: vars.fontWeights.medium,
  color: vars.colors.gray[800],
  marginBottom: vars.space[1],
});

// Product price
export const productPrice = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.gray[600],
  marginBottom: vars.space[2],
});

// Product description
export const productDescription = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.gray[600],
  marginBottom: vars.space[4],
  flex: 1,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

// Tags container
export const tagsContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[1],
  marginBottom: vars.space[4],
});

// Product tag
export const productTag = style({
  display: 'inline-block',
  padding: `${vars.space[1]} ${vars.space[2]}`,
  fontSize: vars.fontSizes.xs,
  backgroundColor: vars.colors.blue[100],
  color: vars.colors.blue[800],
  borderRadius: vars.borderRadius.DEFAULT,
});

// More tags indicator
export const moreTagsIndicator = style({
  display: 'inline-block',
  padding: `${vars.space[1]} ${vars.space[2]}`,
  fontSize: vars.fontSizes.xs,
  backgroundColor: vars.colors.gray[100],
  color: vars.colors.gray[800],
  borderRadius: vars.borderRadius.DEFAULT,
});

// Action button container
export const actionButtonContainer = style({
  marginTop: 'auto',
});