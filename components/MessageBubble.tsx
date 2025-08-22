import React from 'react';
import { Message, Role } from '../types';
import { BotIcon, UserIcon } from './Icons';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBoss = message.role === Role.BOSS;

  const wrapperClasses = isBoss ? 'justify-start' : 'justify-end';
  const bubbleClasses = isBoss
    ? 'bg-gray-700 text-gray-200'
    : 'bg-blue-600 text-white';
  const formattedText = message.text.split('\n').map((line, i) => {
    if (line.startsWith('*') && line.endsWith('*')) {
      return <strong key={i} className="font-bold text-blue-300">{line.slice(1, -1)}</strong>;
    }
    return <span key={i}>{line}<br/></span>;
  });

  const Avatar = () => (
    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${isBoss ? 'bg-gray-600 text-blue-400' : 'bg-blue-600 text-white'}`}>
        {isBoss ? <BotIcon className="w-6 h-6"/> : <UserIcon className="w-6 h-6"/>}
    </div>
  );

  return (
    <div className={`flex items-end gap-3 ${wrapperClasses} animate-fade-in`}>
      {isBoss && <Avatar />}
      <div
        className={`rounded-lg p-3 px-4 max-w-lg lg:max-w-xl shadow-md ${bubbleClasses}`}
      >
        <p className="text-base whitespace-pre-wrap">{formattedText}</p>
      </div>
      {!isBoss && <Avatar />}
    </div>
  );
};

export default MessageBubble;