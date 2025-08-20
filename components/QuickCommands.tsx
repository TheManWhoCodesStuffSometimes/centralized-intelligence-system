
import React from 'react';
import { Role } from '../types';
import { QUICK_COMMANDS } from '../constants';
import { SparklesIcon } from './icons';

interface QuickCommandsProps {
  userRole: Role;
  onCommand: (prompt: string) => void;
}

const QuickCommands: React.FC<QuickCommandsProps> = ({ userRole, onCommand }) => {
  const availableCommands = QUICK_COMMANDS.filter(cmd => cmd.roles.includes(userRole));

  if (availableCommands.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="flex overflow-x-auto space-x-2 p-1">
        {availableCommands.map((command, index) => (
          <button
            key={index}
            onClick={() => onCommand(command.prompt)}
            className="flex-shrink-0 px-4 py-2 bg-slate-700 text-slate-200 rounded-full text-sm font-medium hover:bg-slate-600 transition-colors flex items-center space-x-2"
          >
            <SparklesIcon className="w-4 h-4 text-orange-400" />
            <span>{command.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickCommands;
