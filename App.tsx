import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Language, Message, Role } from './types';
import { INITIAL_MESSAGES } from './constants';
import { getInterviewQuestion, evaluateAnswerAndProvideNextQuestion } from './services/geminiService';
import LanguageSelector from './components/LanguageSelector';
import ChatInterface from './components/ChatInterface';
import UserInput from './components/UserInput';
import { BotIcon } from './components/Icons';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGES.en]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchInitialQuestion = useCallback(async (lang: Language) => {
    if (!isMounted.current) return;
    setIsLoading(true);
    setError(null);
    setMessages([INITIAL_MESSAGES[lang]]);
    try {
      const question = await getInterviewQuestion(lang);
      if (isMounted.current) {
        setMessages(prev => [...prev, { role: Role.BOSS, text: question }]);
      }
    } catch (err) {
      if (isMounted.current) {
        setError('Failed to fetch the first question. Please check your API key and try again.');
        console.error(err);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchInitialQuestion(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessages: Message[] = [...messages, { role: Role.USER, text }];
    setMessages(newMessages);
    setIsLoading(true);
    setError(null);

    const lastQuestion = messages.filter(m => m.role === Role.BOSS).pop()?.text;
    if (!lastQuestion) {
        setError("Could not find the last question to evaluate.");
        setIsLoading(false);
        return;
    }

    try {
      const result = await evaluateAnswerAndProvideNextQuestion(lastQuestion, text, language);
      if (isMounted.current) {
        const feedbackMessage: Message = { role: Role.BOSS, text: `*Feedback:*\n${result.feedback}` };
        const nextQuestionMessage: Message = { role: Role.BOSS, text: result.nextQuestion };
        setMessages(prev => [...prev, feedbackMessage, nextQuestionMessage]);
      }
    } catch (err) {
      if (isMounted.current) {
        setError('Sorry, I had trouble processing your answer. Please try again.');
        console.error(err);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-900/50 backdrop-blur-sm shadow-lg p-4 flex justify-between items-center border-b border-gray-700 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <BotIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">Interview Coach AI</h1>
        </div>
        <LanguageSelector selectedLanguage={language} onSelectLanguage={handleLanguageChange} />
      </header>
      
      <main className="flex-1 overflow-hidden flex flex-col">
        <ChatInterface messages={messages} isLoading={isLoading} />
        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 text-center text-sm">
            {error}
          </div>
        )}
        <UserInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default App;