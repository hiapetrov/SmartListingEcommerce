import React, { useState } from 'react';
import { Modal } from '../../../shared/ui/modal';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { useAuth } from '../../../app/providers/AuthProvider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialView = 'login'
}) => {
  const [view, setView] = useState<'login' | 'signup'>(initialView);
  const { login, signup, authState } = useAuth();
  
  const handleLogin = async (credentials: any) => {
    await login(credentials);
    
    // If login was successful, close the modal
    if (!authState.error) {
      onClose();
    }
  };
  
  const handleSignup = async (credentials: any) => {
    await signup(credentials);
    
    // If signup was successful, close the modal
    if (!authState.error) {
      onClose();
    }
  };
  
  const toggleView = () => {
    setView(view === 'login' ? 'signup' : 'login');
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={view === 'login' ? 'Sign in to your account' : 'Create a new account'}
      size="md"
    >
      {view === 'login' ? (
        <LoginForm
          onSubmit={handleLogin}
          error={authState.error}
          isLoading={authState.isLoading}
          onSwitchToSignup={toggleView}
        />
      ) : (
        <SignupForm
          onSubmit={handleSignup}
          error={authState.error}
          isLoading={authState.isLoading}
          onSwitchToLogin={toggleView}
        />
      )}
    </Modal>
  );
};
