import { style } from '@vanilla-extract/css';
import { vars } from '../../../shared/ui/theme/theme.css';

// Bell icon container with badge
export const bellContainer = style({
  position: 'relative',
});

// Bell icon styling
export const bellIcon = style({
  height: '1.5rem',
  width: '1.5rem',
  color: vars.colors.text.secondary,
  cursor: 'pointer',
  transition: vars.transitions.default,
  ':hover': {
    color: vars.colors.primary,
  },
});

// Notification badge position
export const notificationBadgePosition = style({
  position: 'absolute',
  top: '-0.25rem',
  right: '-0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Dropdown header
export const dropdownHeader = style({
  padding: `${vars.space[3]} ${vars.space[4]}`,
  borderBottom: `1px solid ${vars.colors.border.light}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

// Notification header title
export const headerTitle = style({
  fontSize: vars.fontSizes.sm,
  fontWeight: vars.fontWeights.medium,
  color: vars.colors.text.primary,
});

// Mark all as read button
export const markAllButton = style({
  fontSize: vars.fontSizes.xs,
  color: vars.colors.primary,
  ':hover': {
    color: vars.colors.primaryLight,
  },
});

// Notifications scrollable container
export const notificationsContainer = style({
  maxHeight: '16rem',
  overflowY: 'auto',
});

// Empty notifications message
export const emptyNotificationsMessage = style({
  padding: `${vars.space[4]} ${vars.space[4]} ${vars.space[6]}`,
  textAlign: 'center',
  color: vars.colors.text.muted,
  fontSize: vars.fontSizes.sm,
});

// Notification item styling
export const notificationItem = style({
  padding: vars.space[3],
  display: 'flex',
});

// Read notification styling (reduced opacity)
export const readNotification = style({
  opacity: 0.6,
});

// Notification type icon container
export const notificationIcon = style({
  marginRight: vars.space[3],
  display: 'flex',
  alignItems: 'flex-start',
});

// Subscription notification icon
export const subscriptionIcon = style({
  height: '2rem',
  width: '2rem',
  borderRadius: vars.borderRadius.full,
  background: `linear-gradient(to right, ${vars.colors.purple[500]}, ${vars.colors.primary})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.colors.white,
  fontSize: vars.fontSizes.xs,
});

// Product notification icon
export const productIcon = style({
  height: '2rem',
  width: '2rem',
  borderRadius: vars.borderRadius.full,
  background: `linear-gradient(to right, ${vars.colors.green[500]}, ${vars.colors.teal[500]})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.colors.white,
  fontSize: vars.fontSizes.xs,
});

// System notification icon
export const systemIcon = style({
  height: '2rem',
  width: '2rem',
  borderRadius: vars.borderRadius.full,
  background: `linear-gradient(to right, ${vars.colors.orange[500]}, ${vars.colors.red[500]})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.colors.white,
  fontSize: vars.fontSizes.xs,
});

// Notification content container
export const notificationContent = style({
  flex: 1,
});

// Notification message
export const notificationMessage = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.text.secondary,
});

// Notification timestamp
export const notificationTimestamp = style({
  fontSize: vars.fontSizes.xs,
  color: vars.colors.text.muted,
  marginTop: vars.space[1],
});

// Unread indicator dot
export const unreadIndicator = style({
  marginLeft: vars.space[2],
  marginTop: vars.space[1],
  height: '0.5rem',
  width: '0.5rem',
  borderRadius: vars.borderRadius.full,
  backgroundColor: vars.colors.primary,
});

// View all link container
export const viewAllContainer = style({
  borderTop: `1px solid ${vars.colors.border.light}`,
  padding: `${vars.space[2]} ${vars.space[4]}`,
  textAlign: 'center',
});

// View all link
export const viewAllLink = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.primary,
  ':hover': {
    color: vars.colors.primaryLight,
  },
});