import React from 'react';
import { badgeVariants, badgeSizes } from './badge.css';
import { clsx } from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: keyof typeof badgeVariants;
  size?: keyof typeof badgeSizes;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const badgeClass = clsx(
    badgeVariants[variant],
    badgeSizes[size],
    className
  );
  
  return (
    <span className={badgeClass}>
      {children}
    </span>
  );
};