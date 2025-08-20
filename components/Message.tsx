
import React from 'react';
import { ChatMessage } from '../types';

interface MessageProps {
  message: ChatMessage;
  isStreaming: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isStreaming }) => {
  const isUser = message.role === 'user';

  const formatText = (text: string) => {
    // Basic markdown for bold and code blocks
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-900 p-3 rounded-md my-2 text-sm custom-scrollbar overflow-x-auto"><code>$1</code></pre>');
    return { __html: formattedText };
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xl flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex-shrink-0 ${isUser ? 'bg-orange-500' : 'bg-sky-500'} flex items-center justify-center font-bold text-sm`}>
          {isUser ? 'U' : 'AI'}
        </div>
        <div className={`px-4 py-3 rounded-xl ${isUser ? 'bg-orange-500 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
          <div className="prose prose-invert prose-sm" dangerouslySetInnerHTML={formatText(message.text)} />
          {isStreaming && <span className="inline-block w-2 h-4 bg-slate-300 ml-1 animate-pulse" />}
        </div>
      </div>
    </div>
  );
};

export default Message;
