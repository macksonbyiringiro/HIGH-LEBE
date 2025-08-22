import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import LoadingSpinner from './LoadingSpinner';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex-shrink-0 flex items-center justify-center text-blue-400">
                    <LoadingSpinner />
                </div>
                <div className="bg-gray-700 rounded-lg p-3 max-w-lg animate-pulse-fast">
                    <div className="h-4 bg-gray-600 rounded w-24"></div>
                </div>
            </div>
        </div>
      )}
      <div />
    </div>
  );
};

export default ChatInterface;