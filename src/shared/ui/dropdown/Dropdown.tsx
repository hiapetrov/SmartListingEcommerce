import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import { clsx } from 'clsx';
import {
  dropdownContainer,
  dropdownTrigger,
  dropdownMenu,
  dropdownContent,
  dropdownItemBase,
  dropdownItemIcon,
  dropdownDivider,
  dropdownAlignmentVar,
  dropdownWidthVar
} from './dropdown.css';

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  width?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = 'left',
  width = '12rem', // w-48 in Tailwind
  isOpen: controlledIsOpen,
  onToggle
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  
  const toggleDropdown = () => {
    if (isControlled) {
      if (onToggle) onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isControlled) {
          if (isOpen && onToggle) onToggle();
        } else {
          setInternalIsOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isControlled, isOpen, onToggle]);
  
  // Convert Tailwind width class to CSS value
  const getCSSWidth = (widthClass: string): string => {
    // Handle direct CSS values
    if (widthClass.includes('rem') || widthClass.includes('px') || widthClass.includes('%')) {
      return widthClass;
    }
    
    // Handle Tailwind width classes
    if (widthClass.startsWith('w-')) {
      const value = widthClass.replace('w-', '');
      switch (value) {
        case '48': return '12rem';
        case '56': return '14rem';
        case '64': return '16rem';
        case '72': return '18rem';
        case '80': return '20rem';
        case 'full': return '100%';
        default: return '12rem';
      }
    }
    
    return '12rem'; // Default
  };
  
  // Create CSS vars for positioning
  const menuStyle: CSSProperties = {
    [dropdownAlignmentVar as string]: align,
    [dropdownWidthVar as string]: getCSSWidth(width)
  };
  
  return (
    <div className={dropdownContainer} ref={dropdownRef}>
      <div onClick={toggleDropdown} className={dropdownTrigger}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={dropdownMenu} style={menuStyle}>
          <div className={dropdownContent}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  icon,
  className = ''
}) => {
  return (
    <div
      className={clsx(dropdownItemBase, className)}
      onClick={onClick}
    >
      {icon && <span className={dropdownItemIcon}>{icon}</span>}
      {children}
    </div>
  );
};

export const DropdownDivider: React.FC = () => {
  return <div className={dropdownDivider}></div>;
};