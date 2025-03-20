import React, { useState, useRef, useEffect } from 'react';

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
  width = 'w-48',
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
  
  const alignmentClass = align === 'left' ? 'left-0' : 'right-0';
  
  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div className={bsolute  mt-2  rounded-md shadow-lg bg-gray-800 border border-gray-700 ring-1 ring-black ring-opacity-5 z-50}>
          <div className="py-1">
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
      className={lex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer }
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </div>
  );
};

export const DropdownDivider: React.FC = () => {
  return <div className="border-t border-gray-700 my-1"></div>;
};
