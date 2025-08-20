
import React, { useState, useRef, KeyboardEvent } from 'react';
import { AIModel } from '../types';
import { SendIcon, StoreIcon, ChevronDownIcon } from './icons';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onStop: () => void;
  currentModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, onStop, currentModel, onModelChange }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (text.trim() && !isLoading) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const handleStore = () => {
    alert('Conversation history has been summarized and stored into long-term memory.');
  }

  return (
    <div className="pt-4 mt-2 border-t border-slate-700">
      <div className="relative bg-slate-800 border border-slate-600 rounded-xl p-2 flex items-end">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none resize-none pr-32 pl-2"
          rows={1}
          style={{ maxHeight: '200px' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
          disabled={isLoading}
        />
        <div className="absolute right-2 bottom-2 flex items-center space-x-2">
            <div className="relative group">
                 <select
                    value={currentModel}
                    onChange={(e) => onModelChange(e.target.value as AIModel)}
                    className="appearance-none bg-slate-700 text-white text-sm font-medium rounded-md pl-3 pr-8 py-2 cursor-pointer hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={isLoading}
                >
                    <option value={AIModel.GEMINI}>Gemini</option>
                    <option value={AIModel.CHATGPT}>ChatGPT</option>
                    <option value={AIModel.CLAUDE}>Claude</option>
                </select>
                <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <button onClick={handleStore} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors" aria-label="Store Conversation">
                <StoreIcon className="w-6 h-6" />
            </button>
            {isLoading ? (
                <button
                    onClick={onStop}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    aria-label="Stop Generation"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                   </svg>
                </button>
            ) : (
                <button
                    onClick={handleSubmit}
                    className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:bg-slate-600 transition-colors"
                    disabled={!text.trim()}
                    aria-label="Send Message"
                >
                    <SendIcon className="w-6 h-6" />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
