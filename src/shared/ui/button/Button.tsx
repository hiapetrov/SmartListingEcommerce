import React from 'react';
import { buttonVariants, buttonSizes, buttonFullWidth } from './button.css';
import { clsx } from 'clsx';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  // Combine class names using clsx
  const buttonClass = clsx(
    buttonVariants[variant],
    buttonSizes[size],
    fullWidth && buttonFullWidth,
    className
  );
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};