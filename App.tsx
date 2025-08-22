
import React, { useState, createContext, useMemo, useCallback, useEffect } from 'react';
import { Screen, UserProfile, Language } from './types';
import { i18n } from './constants';
import { Header } from './components/common';
import { 
    OnboardingScreen, 
    ProfileSetupScreen,
    DashboardScreen, 
    QuestionBankScreen, 
    MockInterviewScreen,
    TipsScreen,
    ProgressScreen,
    CVReviewScreen,
    SettingsScreen,
    PracticeExamScreen,
    ChatScreen,
} from './components/Screens';

// App Context for global state
interface AppContextType {
    isAuthenticated: boolean;
    user: UserProfile | null;
    language: Language;
    screen: Screen;
    login: (user: UserProfile) => void;
    logout: () => void;
    setUser: (user: UserProfile) => void;
    setLanguage: (lang: Language) => void;
    setScreen: (screen: Screen) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUserState] = useState<UserProfile | null>(null);
    const [language, setLanguageState] = useState<Language>(Language.EN);
    const [screen, setScreenState] = useState<Screen>('onboarding');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (savedTheme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const login = useCallback((userData: UserProfile) => {
        setIsAuthenticated(true);
        setUserState(userData);
        setLanguageState(userData.language);
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        setUserState(null);
        setScreenState('onboarding');
    }, []);
    
    const setUser = useCallback((userData: UserProfile) => {
        setUserState(userData);
        setLanguageState(userData.language);
    }, []);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        if(user) {
            setUserState({...user, language: lang});
        }
    }, [user]);

    const setScreen = useCallback((newScreen: Screen) => {
        setScreenState(newScreen);
    }, []);

    const contextValue = useMemo(() => ({
        isAuthenticated,
        user,
        language,
        screen,
        login,
        logout,
        setUser,
        setLanguage,
        setScreen,
    }), [isAuthenticated, user, language, screen, login, logout, setUser, setLanguage, setScreen]);
    
    const screenTitles: Record<Screen, string> = {
        'dashboard': i18n[language]['dashboard'],
        'questionBank': i18n[language]['questionBank'],
        'mockInterview': i18n[language]['mockInterview'],
        'practiceExam': i18n[language]['practiceExam'],
        'tips': i18n[language]['tipsGuidance'],
        'progress': i18n[language]['progressTracker'],
        'cvReview': i18n[language]['cvReview'],
        'settings': i18n[language]['settings'],
        'chat': i18n[language]['chat'],
        'onboarding': 'Welcome',
        'profileSetup': 'Create Profile',
    };
    
    const renderScreen = () => {
        if (!isAuthenticated) {
            return <OnboardingScreen />;
        }
        switch (screen) {
            case 'profileSetup': return <ProfileSetupScreen />;
            case 'dashboard': return <DashboardScreen />;
            case 'questionBank': return <QuestionBankScreen />;
            case 'mockInterview': return <MockInterviewScreen />;
            case 'practiceExam': return <PracticeExamScreen />;
            case 'tips': return <TipsScreen />;
            case 'progress': return <ProgressScreen />;
            case 'cvReview': return <CVReviewScreen />;
            case 'settings': return <SettingsScreen />;
            case 'chat': return <ChatScreen />;
            default: return <DashboardScreen />;
        }
    };
    
    const showHeader = isAuthenticated && screen !== 'onboarding';
    const showBackButton = showHeader && screen !== 'dashboard' && screen !== 'profileSetup';

    return (
        <AppContext.Provider value={contextValue}>
            <div className="max-w-lg mx-auto bg-light dark:bg-gray-900 min-h-screen relative pb-16">
                {showHeader && (
                    <Header 
                        title={screenTitles[screen]} 
                        onBack={showBackButton ? () => setScreen('dashboard') : undefined}
                        onRestart={logout}
                    />
                )}
                <main className={showHeader ? 'pt-20' : ''}>
                    {renderScreen()}
                </main>
            </div>
        </AppContext.Provider>
    );
}

export default App;