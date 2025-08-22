import { Language, LanguageOption, Message, Role } from './types';

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'rw', name: 'Kinyarwanda' },
];

export const INITIAL_MESSAGES: Record<Language, Message> = {
  en: {
    role: Role.BOSS,
    text: "Hello! I'm your interview coach. Let's practice some questions. I'll start. Here is your first question:",
  },
  fr: {
    role: Role.BOSS,
    text: "Bonjour ! Je suis votre coach d'entretien. Pratiquons quelques questions. Je vais commencer. Voici votre première question :",
  },
  rw: {
    role: Role.BOSS,
    text: "Muraho! Ndi umutoza wawe mu kizamini cy'akazi. Reka twitoze ibibazo bimwe na bimwe. Ndabanza. Iki nicyo kibazo cyawe cya mbere:",
  },
};

export const LANGUAGE_NAMES: Record<Language, string> = {
    en: "English",
    fr: "French",
    rw: "Kinyarwanda"
};