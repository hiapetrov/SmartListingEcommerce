import React, { ReactNode, CSSProperties } from 'react';
import { clsx } from 'clsx';
import { 
  cardBase, 
  cardShadow, 
  cardBorder, 
  cardGradient, 
  cardInteractive,
  gradientFrom,
  gradientTo
} from './card.css';

export interface CardProps {
  children: ReactNode;
  className?: string;
  hasShadow?: boolean;
  hasBorder?: boolean;
  gradient?: {
    from: string;
    to: string;
  };
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hasShadow = true,
  hasBorder = false,
  gradient,
  onClick
}) => {
  const cardClass = clsx(
    cardBase,
    hasShadow && cardShadow,
    hasBorder && cardBorder,
    gradient && cardGradient,
    onClick && cardInteractive,
    className
  );
  
  // Add gradient CSS variables if provided
  const style: CSSProperties = {};
  if (gradient) {
    // Use type assertion to work with CSS variables
    style[gradientFrom as any] = gradient.from;
    style[gradientTo as any] = gradient.to;
  }
  
  return (
    <div 
      className={cardClass}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};