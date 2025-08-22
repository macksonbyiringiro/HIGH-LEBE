
import React from 'react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onRestart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack, onRestart }) => (
  <header className="bg-white dark:bg-dark dark:border-b dark:border-gray-700 shadow-md p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10 max-w-lg mx-auto">
    <div className="flex items-center">
      {onBack && (
        <button onClick={onBack} className="mr-4 text-gray-600 hover:text-dark dark:text-gray-300 dark:hover:text-white" aria-label="Go back">
          <Icon name="arrowLeft" />
        </button>
      )}
      <h1 className="text-xl font-bold text-dark dark:text-light">{title}</h1>
    </div>
    {onRestart && (
      <button onClick={onRestart} className="text-gray-600 hover:text-dark dark:text-gray-300 dark:hover:text-white" aria-label="Restart Session">
        <Icon name="refresh" />
      </button>
    )}
  </header>
);

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, onClick, className = '' }) => (
  <div
    onClick={onClick}
    className={`bg-white dark:bg-dark rounded-xl shadow-lg p-4 transition-transform transform hover:scale-105 ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', disabled = false, variant = 'primary', type = 'button' }) => {
  const baseClasses = 'w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
      primary: 'bg-primary hover:bg-emerald-600 focus:ring-primary',
      secondary: 'bg-secondary hover:bg-blue-600 focus:ring-secondary',
      danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  }[variant];
  const disabledClasses = 'disabled:bg-gray-400 disabled:cursor-not-allowed';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};


interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label }) => {
  return (
    <label htmlFor="toggle-switch" className="flex items-center justify-between cursor-pointer p-2">
      <span className="font-medium text-gray-800 dark:text-gray-200">{label}</span>
      <div className="relative">
        <input id="toggle-switch" type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className={`block w-14 h-8 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${checked ? 'transform translate-x-6' : ''}`}></div>
      </div>
    </label>
  );
};


type IconName = 'book' | 'mic' | 'lightbulb' | 'chart' | 'users' | 'file' | 'arrowLeft' | 'play' | 'stop' | 'pause' | 'refresh' | 'settings' | 'clipboard' | 'chat';

interface IconProps {
  name: IconName;
  className?: string;
}

const ICONS: Record<IconName, React.ReactNode> = {
  book: <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>,
  mic: <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>,
  lightbulb: <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path>,
  chart: <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>,
  users: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>,
  file: <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline>,
  arrowLeft: <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>,
  play: <polygon points="5 3 19 12 5 21 5 3"></polygon>,
  stop: <rect x="6" y="6" width="12" height="12"></rect>,
  pause: <line x1="6" y1="4" x2="6" y2="20"></line><line x1="14" y1="4" x2="14" y2="20"></line>,
  refresh: <><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></>,
  settings: <><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></>,
  clipboard: <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></>,
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>,
};

export const Icon: React.FC<IconProps> = ({ name, className = "h-6 w-6" }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
        {ICONS[name]}
    </svg>
);