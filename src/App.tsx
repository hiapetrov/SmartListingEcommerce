import React from 'react';
import { AuthProvider } from './app/providers/AuthProvider';
import { AppRouter } from './app/router';
import { ThemeProvider } from './shared/ui/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;