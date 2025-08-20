
import React from 'react';
import { User } from '../types';
import { LogoutIcon } from './icons';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">Centralized Intelligence</h1>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold text-white">{user.name}</p>
          <p className="text-xs text-orange-400">{user.role}</p>
        </div>
        <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-slate-500" />
        <button onClick={onLogout} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors" aria-label="Logout">
          <LogoutIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
