
import React, { useState, useContext, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GoogleGenAI, Chat } from "@google/genai";
import { AppContext } from '../App';
import { i18n, MOCK_QUESTIONS, MOCK_TIPS, JOB_CATEGORIES, EXPERIENCE_LEVELS, LANGUAGES, MOCK_EXAM_QUESTIONS } from '../constants';
import { JobCategory, ExperienceLevel, Language, RecorderStatus, UserProfile, ChatMessage } from '../types';
import { Button, Card, Icon, ToggleSwitch } from './common';
import { useRecorder } from '../hooks/useRecorder';
import { reviewCV } from '../services/geminiService';

// Onboarding Screen
export const OnboardingScreen: React.FC = () => {
    const { login, setScreen, language } = useContext(AppContext);
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        login({
            name: 'User',
            jobCategory: JobCategory.IT,
            experienceLevel: ExperienceLevel.BEGINNER,
            language: language
        });
        setScreen('profileSetup');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-light dark:bg-gray-900">
            <h1 className="text-4xl font-bold text-primary mb-2">Interview Coach</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{i18n[language]['welcome']}</p>
            <Card className="w-full max-w-sm">
                <div className="flex mb-4 border-b dark:border-gray-700">
                    <button onClick={() => setIsLogin(true)} className={`flex-1 p-2 font-semibold ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400'}`}>Login</button>
                    <button onClick={() => setIsLogin(false)} className={`flex-1 p-2 font-semibold ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400'}`}>Sign Up</button>
                </div>
                <form onSubmit={handleAuth} className="space-y-4">
                    <input type="email" placeholder="Email or Phone" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    {!isLogin && <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />}
                    <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
                </form>
            </Card>
        </div>
    );
};


// Profile Setup Screen
export const ProfileSetupScreen: React.FC = () => {
    const { user, setUser, setScreen } = useContext(AppContext);
    const [profile, setProfile] = useState(user!);

    const handleSave = () => {
        setUser(profile);
        setScreen('dashboard');
    };

    const commonInputClasses = "w-full p-3 border rounded-lg mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white";
    const commonLabelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold dark:text-white">Setup Your Profile</h2>
            <div className="space-y-4">
                <div>
                    <label className={commonLabelClasses}>Name</label>
                    <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className={commonInputClasses} />
                </div>
                <div>
                    <label className={commonLabelClasses}>Job Category</label>
                    <select value={profile.jobCategory} onChange={e => setProfile({...profile, jobCategory: e.target.value as JobCategory})} className={commonInputClasses}>
                        {JOB_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label className={commonLabelClasses}>Experience Level</label>
                    <select value={profile.experienceLevel} onChange={e => setProfile({...profile, experienceLevel: e.target.value as ExperienceLevel})} className={commonInputClasses}>
                        {EXPERIENCE_LEVELS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                    </select>
                </div>
                <div>
                    <label className={commonLabelClasses}>Preferred Language</label>
                    <select value={profile.language} onChange={e => setProfile({...profile, language: e.target.value as Language})} className={commonInputClasses}>
                        {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                    </select>
                </div>
            </div>
            <Button onClick={handleSave}>Save & Continue</Button>
        </div>
    );
};

// Dashboard Screen
export const DashboardScreen: React.FC = () => {
    const { setScreen, language } = useContext(AppContext);

    const menuItems = [
        { title: i18n[language]['questionBank'], icon: 'book', screen: 'questionBank' },
        { title: i18n[language]['mockInterview'], icon: 'mic', screen: 'mockInterview' },
        { title: i18n[language]['practiceExam'], icon: 'clipboard', screen: 'practiceExam' },
        { title: i18n[language]['tipsGuidance'], icon: 'lightbulb', screen: 'tips' },
        { title: i18n[language]['progressTracker'], icon: 'chart', screen: 'progress' },
        { title: i18n[language]['cvReview'], icon: 'file', screen: 'cvReview' },
        { title: i18n[language]['chat'], icon: 'chat', screen: 'chat' },
        { title: i18n[language]['settings'], icon: 'settings', screen: 'settings' },
    ] as const;

    return (
        <div className="p-4 grid grid-cols-2 gap-4">
            {menuItems.map(item => (
                <Card key={item.title} onClick={() => setScreen(item.screen)} className="flex flex-col items-center justify-center text-center h-36">
                    <Icon name={item.icon} className="h-10 w-10 text-primary mb-2" />
                    <h3 className="font-semibold text-dark dark:text-light">{item.title}</h3>
                </Card>
            ))}
        </div>
    );
};

// Question Bank Screen
export const QuestionBankScreen: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(null);

    return (
        <div className="p-4 space-y-4">
            {MOCK_QUESTIONS.map(q => (
                <Card key={q.id} className="w-full">
                    <button onClick={() => setOpenId(openId === q.id ? null : q.id)} className="w-full text-left font-semibold dark:text-light">
                        {q.question}
                    </button>
                    {openId === q.id && (
                        <p className="mt-2 text-gray-600 dark:text-gray-300 pt-2 border-t dark:border-gray-700">{q.answer}</p>
                    )}
                </Card>
            ))}
        </div>
    );
};


// Mock Interview Screen
export const MockInterviewScreen: React.FC = () => {
    const { language } = useContext(AppContext);
    const { status, audioURL, startRecording, stopRecording, resetRecording } = useRecorder();
    const [interviewStarted, setInterviewStarted] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);

    const currentQuestion = MOCK_QUESTIONS[questionIndex];

    useEffect(() => {
        if (interviewStarted && status === RecorderStatus.IDLE) {
            const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
            speechSynthesis.speak(utterance);
        }
    }, [interviewStarted, currentQuestion, status]);

    const handleNextQuestion = () => {
        resetRecording();
        setQuestionIndex((prev) => (prev + 1) % MOCK_QUESTIONS.length);
    };

    return (
        <div className="p-4 text-center space-y-6">
            {!interviewStarted ? (
                <div className="flex flex-col items-center justify-center h-96">
                    <Icon name="mic" className="h-20 w-20 text-secondary mb-4" />
                    <h2 className="text-2xl font-bold mb-4 dark:text-light">Ready for your Mock Interview?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">The app will ask you questions out loud. Record your answers to practice.</p>
                    <Button onClick={() => setInterviewStarted(true)}>{i18n[language]['startInterview']}</Button>
                </div>
            ) : (
                <Card className="space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Question {questionIndex + 1}/{MOCK_QUESTIONS.length}</p>
                    <h3 className="text-xl font-semibold dark:text-light">{currentQuestion.question}</h3>
                    
                    {status === RecorderStatus.IDLE && (
                        <Button onClick={startRecording} className="flex items-center justify-center gap-2">
                           <Icon name="mic" className="h-5 w-5" /> {i18n[language]['startRecording']}
                        </Button>
                    )}
                    
                    {status === RecorderStatus.RECORDING && (
                        <Button onClick={stopRecording} variant="danger" className="flex items-center justify-center gap-2">
                            <Icon name="stop" className="h-5 w-5" /> {i18n[language]['stopRecording']}
                        </Button>
                    )}

                    {status === RecorderStatus.STOPPED && audioURL && (
                        <div className="space-y-4">
                            <p className="font-semibold dark:text-light">{i18n[language]['yourAnswer']}</p>
                            <audio src={audioURL} controls className="w-full" />
                            <Button onClick={handleNextQuestion} variant="secondary">{i18n[language]['nextQuestion']}</Button>
                        </div>
                    )}

                    {status === RecorderStatus.ERROR && (
                        <div className="text-red-700 bg-red-50 p-4 rounded-lg text-left space-y-2 border border-red-200">
                            <h4 className="font-bold text-lg flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Microphone Access Problem
                            </h4>
                            <p className="text-sm">
                                To record your answers, the app needs access to your microphone. This error usually occurs when permission has been denied.
                            </p>
                            <p className="text-sm font-semibold">How to fix it:</p>
                            <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                                <li>Click the lock icon (🔒) in your browser's address bar.</li>
                                <li>Find the "Microphone" permission and change it to "Allow".</li>
                                <li>You may need to refresh the page for the changes to take effect.</li>
                            </ul>
                            <div className="pt-2">
                                <Button onClick={resetRecording} variant="secondary">Try Again</Button>
                            </div>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};

// Tips Screen
export const TipsScreen: React.FC = () => {
    return (
        <div className="p-4 space-y-4">
            {MOCK_TIPS.map(tip => (
                <Card key={tip.id}>
                    <h3 className="font-bold text-lg text-primary">{tip.title}</h3>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{tip.content}</p>
                </Card>
            ))}
        </div>
    );
};

// Progress Screen
export const ProgressScreen: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => document.documentElement.classList.contains('dark');
        setIsDarkMode(checkDarkMode());

        const observer = new MutationObserver(() => setIsDarkMode(checkDarkMode()));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const data = [
        { name: 'Week 1', practiced: 4, score: 6 },
        { name: 'Week 2', practiced: 8, score: 7 },
        { name: 'Week 3', practiced: 12, score: 7.5 },
        { name: 'Week 4', practiced: 15, score: 8.5 },
    ];
    
    const tickColor = isDarkMode ? '#9CA3AF' : '#6B7280';
    const tooltipStyle = isDarkMode ? { backgroundColor: '#374151', border: '1px solid #4B5563' } : {};


    return (
        <div className="p-4 space-y-4">
            <Card>
                <h3 className="font-bold text-lg mb-4 dark:text-light">Your Practice Progress</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4B5563' : '#E5E7EB'}/>
                            <XAxis dataKey="name" tick={{ fill: tickColor }} />
                            <YAxis tick={{ fill: tickColor }}/>
                            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}}/>
                            <Legend wrapperStyle={{ color: tickColor }} />
                            <Bar dataKey="practiced" fill="#3B82F6" />
                            <Bar dataKey="score" fill="#10B981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};


// CV Review Screen
export const CVReviewScreen: React.FC = () => {
  const { user, language } = useContext(AppContext);
  const [cvText, setCvText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReview = async () => {
    if (!cvText.trim()) {
      setFeedback("Please paste your CV text first.");
      return;
    }
    setIsLoading(true);
    setFeedback('');
    try {
      const result = await reviewCV(cvText, user!);
      setFeedback(result);
    } catch (e) {
      setFeedback('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCvText(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <h3 className="font-bold text-lg dark:text-light">CV Upload & Review</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-4">Paste your CV text below or upload a .txt file to get AI-powered feedback.</p>
        <textarea
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
          placeholder="Paste your CV content here..."
          className="w-full h-48 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <div className="flex gap-2 mt-2">
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".txt" className="hidden" />
            <Button onClick={() => fileInputRef.current?.click()} variant="secondary" className="flex-1">Upload .txt File</Button>
            <Button onClick={handleReview} disabled={isLoading} className="flex-1">
            {isLoading ? 'Analyzing...' : i18n[language]['getFeedback']}
            </Button>
        </div>
      </Card>
      
      {feedback && (
        <Card>
            <h3 className="font-bold text-lg mb-2 dark:text-light">Feedback</h3>
            <div className="prose prose-sm max-w-none text-gray-800 dark:text-gray-200 dark:prose-invert whitespace-pre-wrap">{feedback}</div>
        </Card>
      )}
    </div>
  );
};


// Settings Screen
export const SettingsScreen: React.FC = () => {
    const { user, setUser, logout, setLanguage } = useContext(AppContext);
    const [profile, setProfile] = useState<UserProfile>(user!);
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

    const handleThemeToggle = (checked: boolean) => {
        setIsDarkMode(checked);
        if (checked) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };
    
    const handleProfileSave = () => {
        setUser(profile);
        alert('Profile saved!');
    };
    
    useEffect(() => {
       setLanguage(profile.language);
    }, [profile.language, setLanguage]);

    const commonInputClasses = "w-full p-3 border rounded-lg mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white";
    const commonLabelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";

    return (
        <div className="p-4 space-y-6">
            <Card>
                <h3 className="text-lg font-bold mb-4 dark:text-light">Profile Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className={commonLabelClasses}>Name</label>
                        <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className={commonInputClasses} />
                    </div>
                    <div>
                        <label className={commonLabelClasses}>Job Category</label>
                        <select value={profile.jobCategory} onChange={e => setProfile({...profile, jobCategory: e.target.value as JobCategory})} className={commonInputClasses}>
                            {JOB_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={commonLabelClasses}>Experience Level</label>
                        <select value={profile.experienceLevel} onChange={e => setProfile({...profile, experienceLevel: e.target.value as ExperienceLevel})} className={commonInputClasses}>
                            {EXPERIENCE_LEVELS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                        </select>
                    </div>
                    <Button onClick={handleProfileSave}>Save Profile</Button>
                </div>
            </Card>

            <Card>
                <h3 className="text-lg font-bold mb-2 dark:text-light">Appearance & Language</h3>
                <div className="divide-y dark:divide-gray-700">
                    <ToggleSwitch label="Dark Mode" checked={isDarkMode} onChange={handleThemeToggle} />
                    <div className="p-2">
                        <label className={`${commonLabelClasses} mb-2`}>Language</label>
                        <select value={profile.language} onChange={e => setProfile({...profile, language: e.target.value as Language})} className={commonInputClasses}>
                            {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                        </select>
                    </div>
                </div>
            </Card>
            
            <Card>
                 <h3 className="text-lg font-bold mb-4 dark:text-light">Account</h3>
                <Button onClick={logout} variant="danger">Logout</Button>
            </Card>
        </div>
    );
};

// Practice Exam Screen
export const PracticeExamScreen: React.FC = () => {
    const { language } = useContext(AppContext);
    const [examStarted, setExamStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [score, setScore] = useState(0);
    const [examFinished, setExamFinished] = useState(false);
    const [showFeedback, setShowFeedback] = useState<boolean>(false);

    const currentQuestion = MOCK_EXAM_QUESTIONS[currentQuestionIndex];

    const handleAnswerSelect = (optionIndex: number) => {
        if (showFeedback) return;
        setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
        setShowFeedback(true);
    };

    const handleNext = () => {
        const isCorrect = selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswerIndex;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setShowFeedback(false);

        if (currentQuestionIndex < MOCK_EXAM_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setExamFinished(true);
        }
    };

    const handleRestart = () => {
        setExamStarted(true);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setScore(0);
        setExamFinished(false);
        setShowFeedback(false);
    };

    if (!examStarted) {
        return (
            <div className="p-4 text-center space-y-6">
                <div className="flex flex-col items-center justify-center h-96">
                    <Icon name="clipboard" className="h-20 w-20 text-secondary mb-4" />
                    <h2 className="text-2xl font-bold mb-4 dark:text-light">Ready for your Practice Exam?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">Test your knowledge with multiple-choice questions and get your score instantly.</p>
                    <Button onClick={() => setExamStarted(true)}>{i18n[language]['startExam']}</Button>
                </div>
            </div>
        );
    }
    
    if (examFinished) {
        const finalScore = selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswerIndex ? score + 1 : score;
        return (
            <div className="p-4 text-center space-y-6">
                <Card>
                    <h2 className="text-2xl font-bold mb-4 dark:text-light">Exam Completed!</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{i18n[language]['yourScore']}:</p>
                    <p className="text-5xl font-bold text-primary mb-6">{finalScore} / {MOCK_EXAM_QUESTIONS.length}</p>
                    <Button onClick={handleRestart} variant="secondary">{i18n[language]['tryAgain']}</Button>
                </Card>
            </div>
        );
    }

    const selectedOption = selectedAnswers[currentQuestion.id];
    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;

    return (
        <div className="p-4 space-y-4">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Question {currentQuestionIndex + 1}/{MOCK_EXAM_QUESTIONS.length}</p>
                    <p className="text-sm font-bold text-primary">Score: {score}</p>
                </div>
                <h3 className="text-lg font-semibold mb-4 dark:text-light">{currentQuestion.question}</h3>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        let buttonClass = 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700';
                        if (showFeedback) {
                            if (index === currentQuestion.correctAnswerIndex) {
                                buttonClass = 'border-primary bg-emerald-50 dark:bg-emerald-900 text-primary font-bold';
                            } else if (index === selectedOption) {
                                buttonClass = 'border-red-500 bg-red-50 dark:bg-red-900 text-red-600 font-bold';
                            }
                        } else if (index === selectedOption) {
                            buttonClass = 'border-secondary bg-blue-50 dark:bg-blue-900';
                        }
                        
                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={showFeedback}
                                className={`w-full text-left p-3 border-2 rounded-lg transition-colors disabled:cursor-not-allowed ${buttonClass}`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {showFeedback && (
                    <div className="mt-4 p-3 rounded-lg text-center">
                        <p className={`font-bold text-xl mb-2 ${isCorrect ? 'text-primary' : 'text-red-600'}`}>
                            {isCorrect ? i18n[language]['correct'] : i18n[language]['incorrect']}!
                        </p>
                        <Button onClick={handleNext} className="mt-2">
                            {currentQuestionIndex < MOCK_EXAM_QUESTIONS.length - 1 ? i18n[language]['nextQuestion'] : i18n[language]['finishExam']}
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
};

// Chat Screen
export const ChatScreen: React.FC = () => {
    const { user } = useContext(AppContext);
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const API_KEY = typeof process === 'object' && process.env ? process.env.API_KEY : undefined;

    useEffect(() => {
        if (API_KEY) {
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "You are Mackson, a friendly and professional AI career coach. Your goal is to help users prepare for their job interviews by answering their questions, providing tips, and conducting mini role-plays. Keep your responses concise, encouraging, and actionable.",
                },
            });
            setHistory([{ role: 'model', text: `Hello ${user?.name}! I'm Mackson, your AI career coach. How can I help you prepare for your interview today?` }]);
        }
    }, [API_KEY, user?.name]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setHistory(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chatRef.current.sendMessage({ message: input });
            const modelMessage: ChatMessage = { role: 'model', text: response.text };
            setHistory(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!API_KEY) {
        return (
            <div className="p-4 text-center">
                <Card>
                    <h3 className="font-bold text-lg text-red-600">Service Unavailable</h3>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">The Chat feature is currently unavailable because the API key is not configured.</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-5rem)] flex flex-col bg-light dark:bg-gray-900">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {history.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl break-words ${
                            msg.role === 'user' 
                                ? 'bg-primary text-white rounded-br-none' 
                                : 'bg-gray-200 dark:bg-dark text-gray-800 dark:text-gray-200 rounded-bl-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex justify-start">
                        <div className="px-4 py-2 rounded-2xl bg-gray-200 dark:bg-dark rounded-bl-none">
                           <div className="flex items-center space-x-1 h-6">
                              <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                              <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                              <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-dark border-t dark:border-gray-700 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Mackson a question..."
                    className="flex-1 p-3 border rounded-full dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="p-3 rounded-full bg-primary text-white disabled:bg-gray-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </form>
        </div>
    );
};