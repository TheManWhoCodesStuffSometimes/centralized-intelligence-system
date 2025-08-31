import React, { useState } from 'react';
import { User } from '../types';

interface LoginScreenProps {
  users: User[];
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ users, onLogin }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    setPassword('');
    setError(null);
  };

  const handleLoginAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedUser = users.find(u => u.id === selectedUserId);
    if (selectedUser && selectedUser.password.toLowerCase() === password.toLowerCase()) {
      onLogin(selectedUser);
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Centralized Intelligence
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          Welcome to IronForge Automations
        </p>
      </div>
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700">
          <h2 className="text-2xl font-semibold text-center text-slate-100 mb-6">
            Who is logging in?
          </h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className={`bg-slate-700 rounded-lg transition-all duration-300 ${selectedUserId === user.id ? 'ring-2 ring-orange-500' : 'hover:bg-slate-600'}`}>
                <button
                  onClick={() => handleUserSelect(user.id)}
                  className="w-full flex items-center p-4 text-left"
                  aria-expanded={selectedUserId === user.id}
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-slate-500"
                  />
                  <div className="text-left">
                    <p className="text-lg font-medium text-white">{user.name}</p>
                    <p className="text-sm text-slate-400">{user.role}</p>
                  </div>
                </button>
                {selectedUserId === user.id && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <form onSubmit={handleLoginAttempt} className="space-y-3">
                        <div>
                            <label htmlFor={`username-${user.id}`} className="sr-only">Username</label>
                            <input
                                id={`username-${user.id}`}
                                type="text"
                                value={user.username}
                                readOnly
                                className="w-full bg-slate-600 border border-slate-500 rounded-md px-3 py-2 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label htmlFor={`password-${user.id}`}  className="sr-only">Password</label>
                             <input
                                id={`password-${user.id}`}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password..."
                                autoFocus
                                className="w-full bg-slate-600 border border-slate-500 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                       
                        {error && <p className="text-sm text-red-400">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-orange-600 text-white font-semibold py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-700 focus:ring-orange-500 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
