
import React, { useState, useCallback } from 'react';
import { User } from './types';
import LoginScreen from './components/LoginScreen';
import MainInterface from './components/MainInterface';
import { USERS } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  if (!currentUser) {
    return <LoginScreen users={USERS} onLogin={handleLogin} />;
  }

  return <MainInterface user={currentUser} onLogout={handleLogout} />;
};

export default App;
