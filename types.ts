export type Language = 'en' | 'fr' | 'rw';

export interface LanguageOption {
  code: Language;
  name: string;
}

export enum Role {
  USER = 'user',
  BOSS = 'boss',
}

export interface Message {
  role: Role;
  text: string;
}