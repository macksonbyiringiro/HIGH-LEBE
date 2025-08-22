import React, { useState, useRef, useEffect } from 'react';
import { Language, LanguageOption } from '../types';
import { LANGUAGES } from '../constants';
import { GlobeIcon, CheckIcon } from './Icons';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelectLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (lang: Language) => {
    onSelectLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLanguageName = LANGUAGES.find(l => l.code === selectedLanguage)?.name;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        <GlobeIcon className="w-5 h-5" />
        <span className="hidden sm:inline">{selectedLanguageName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20 animate-fade-in">
          <ul className="py-1">
            {LANGUAGES.map((lang: LanguageOption) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleSelect(lang.code)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 hover:text-white flex justify-between items-center transition-colors duration-150"
                >
                  <span>{lang.name}</span>
                  {selectedLanguage === lang.code && <CheckIcon className="w-5 h-5 text-blue-400" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;