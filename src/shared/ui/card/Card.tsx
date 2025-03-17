import React, { ReactNode } from 'react';

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
  const shadowClass = hasShadow ? 'shadow-sm hover:shadow-md' : '';
  const borderClass = hasBorder ? 'border border-gray-200' : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`bg-white rounded-lg p-6 ${shadowClass} ${borderClass} ${cursorClass} transition-shadow ${className}`}
      onClick={onClick}
    >
      {gradient && (
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient.from} ${gradient.to} rounded-t-lg`}></div>
      )}
      {children}
    </div>
  );
};
