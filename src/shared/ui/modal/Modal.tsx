import React, { useEffect, useRef, CSSProperties } from 'react';
import {
  modalOverlay,
  modalContainer,
  modalHeader,
  modalTitle,
  modalCloseButton,
  modalContent,
  modalSizeVariants,
  modalWidthVar
} from './modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: keyof typeof modalSizeVariants;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto'; // Restore scrolling when modal closes
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Create style with correct width variable
  const containerStyle: CSSProperties = {
    [modalWidthVar as string]: modalSizeVariants[size].maxWidth
  };
  
  return (
    <div className={modalOverlay}>
      <div
        ref={modalRef} 
        className={modalContainer}
        style={containerStyle}
      >
        <div className={modalHeader}>
          <h3 className={modalTitle}>{title}</h3>
          {showCloseButton && (
            <button
              onClick={onClose}
              className={modalCloseButton}
              aria-label="Close modal"
            >
              &times;
            </button>
          )}
        </div>
        <div className={modalContent}>
          {children}
        </div>
      </div>
    </div>
  );
};