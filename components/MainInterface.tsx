
import React, { useState, useCallback, useRef } from 'react';
import { User, ChatMessage, AIModel } from '../types';
import Header from './Header';
import QuickCommands from './QuickCommands';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { runQueryStream } from '../services/geminiService';

interface MainInterfaceProps {
  user: User;
  onLogout: () => void;
}

const MainInterface: React.FC<MainInterfaceProps> = ({ user, onLogout }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState<AIModel>(AIModel.GEMINI);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSendMessage = useCallback(async (text: string) => {
    if (isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '' }]);

    abortControllerRef.current = new AbortController();
    
    try {
        let fullResponse = '';
        const stream = runQueryStream(text);
        for await (const chunk of stream) {
            if (abortControllerRef.current.signal.aborted) {
                console.log("Stream aborted");
                break;
            }
            fullResponse += chunk;
            setMessages(prev => prev.map(msg => 
                msg.id === modelMessageId ? { ...msg, text: fullResponse } : msg
            ));
        }
    } catch (error) {
        console.error("Error during streaming:", error);
        setMessages(prev => prev.map(msg =>
            msg.id === modelMessageId ? { ...msg, text: 'Sorry, I encountered an error.' } : msg
        ));
    } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
    }
  }, [isLoading]);

  const handleQuickCommand = useCallback((prompt: string) => {
    handleSendMessage(prompt);
  }, [handleSendMessage]);
  
  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-900 flex flex-col">
      <Header user={user} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden max-w-4xl w-full mx-auto p-4">
        <QuickCommands userRole={user.role} onCommand={handleQuickCommand} />
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
          currentModel={currentModel}
          onModelChange={setCurrentModel}
          onStop={handleStop}
        />
      </div>
    </div>
  );
};

export default MainInterface;
