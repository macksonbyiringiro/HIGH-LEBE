
export enum JobCategory {
  IT = "IT",
  BUSINESS = "Business",
  TEACHING = "Teaching",
  HEALTH = "Health",
  OTHER = "Other"
}

export enum ExperienceLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  PROFESSIONAL = "Professional"
}

export enum Language {
  EN = "English",
  FR = "French",
  RW = "Kinyarwanda"
}

export interface UserProfile {
  name: string;
  jobCategory: JobCategory;
  experienceLevel: ExperienceLevel;
  language: Language;
}

export interface Question {
  id: number;
  category: JobCategory;
  question: string;
  answer: string;
}

export interface ExamQuestion {
  id: number;
  category: JobCategory;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Tip {
  id: number;
  title: string;
  content: string;
}

export type Screen = 
  | 'onboarding' 
  | 'profileSetup' 
  | 'dashboard' 
  | 'questionBank' 
  | 'mockInterview' 
  | 'tips' 
  | 'progress'
  | 'cvReview'
  | 'settings'
  | 'practiceExam'
  | 'chat';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum RecorderStatus {
    IDLE = 'idle',
    RECORDING = 'recording',
    PAUSED = 'paused',
    STOPPED = 'stopped',
    ERROR = 'error'
}