import { JobCategory, ExperienceLevel, Language, Question, Tip, ExamQuestion } from './types';

export const JOB_CATEGORIES = Object.values(JobCategory);
export const EXPERIENCE_LEVELS = Object.values(ExperienceLevel);
export const LANGUAGES = Object.values(Language);

export const MOCK_QUESTIONS: Question[] = [
  { id: 1, category: JobCategory.IT, question: "Tell me about yourself.", answer: "Focus on your professional journey. Start with your most recent experience and highlight key achievements relevant to the role you're applying for." },
  { id: 2, category: JobCategory.IT, question: "What are your strengths?", answer: "Choose 2-3 strengths that are relevant to the job. For an IT role, this could be problem-solving, attention to detail, and fast learning. Provide specific examples." },
  { id: 3, category: JobCategory.IT, question: "What is the difference between an API and a SDK?", answer: "An API (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other. An SDK (Software Development Kit) is a set of tools that can be used to develop software applications for a specific platform." },
  { id: 4, category: JobCategory.IT, question: "Explain the concept of 'Big O notation'.", answer: "Big O notation is used to describe the performance or complexity of an algorithm. It specifically describes the worst-case scenario, and can be used to describe the execution time required or the space used (e.g. in memory or on disk) by an algorithm." },
  { id: 5, category: JobCategory.BUSINESS, question: "Describe a challenging situation you faced at work and how you handled it.", answer: "Use the STAR method: Situation, Task, Action, Result. Describe the context, your responsibility, the steps you took, and the positive outcome." },
  { id: 6, category: JobCategory.BUSINESS, question: "Where do you see yourself in five years?", answer: "Show ambition and a desire for growth within the company. Align your personal goals with the company's long-term objectives. Mention learning new skills, taking on more responsibility, and contributing to the company's success." },
  { id: 7, category: JobCategory.BUSINESS, question: "How do you handle pressure?", answer: "Emphasize your ability to stay calm and focused. Mention strategies like prioritizing tasks, breaking down large projects into smaller steps, and practicing good time management. Give an example of a high-pressure situation you successfully navigated." },
  { id: 8, category: JobCategory.TEACHING, question: "How do you handle a difficult student?", answer: "Emphasize patience, understanding, and communication. Mention strategies like one-on-one conversations, involving parents, and creating a positive classroom environment." },
  { id: 9, category: JobCategory.TEACHING, question: "What is your teaching philosophy?", answer: "Describe your beliefs about teaching and learning. You might mention creating an inclusive environment, fostering critical thinking, using technology, or encouraging student collaboration. Connect it to the school's mission." },
  { id: 10, category: JobCategory.HEALTH, question: "Why do you want to work in the healthcare sector?", answer: "Express your passion for helping others and making a difference. Connect your personal values with the mission of the healthcare organization." },
  { id: 11, category: JobCategory.HEALTH, question: "How do you handle patient confidentiality?", answer: "Stress the importance of HIPAA and privacy. Mention that you only discuss patient information with authorized personnel and in secure settings. Show you understand the legal and ethical responsibilities." },
  { id: 12, category: JobCategory.HEALTH, question: "Describe a time you had to deal with a difficult patient or family member.", answer: "Show empathy and strong communication skills. Explain how you listened to their concerns, remained calm and professional, and worked to de-escalate the situation while providing the best possible care." },
];

export const MOCK_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1, category: JobCategory.IT, question: "Which of the following is NOT a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Laravel"],
    correctAnswerIndex: 3
  },
  {
    id: 2, category: JobCategory.IT, question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    correctAnswerIndex: 1
  },
  {
    id: 3, category: JobCategory.BUSINESS, question: "What does SWOT analysis stand for?",
    options: ["Strengths, Weaknesses, Opportunities, Threats", "Sales, Work, Opportunities, Time", "Strategy, Work, Operations, Tasks", "Success, Weaknesses, Operations, Threats"],
    correctAnswerIndex: 0
  },
  {
    id: 4, category: JobCategory.BUSINESS, question: "Which of these is a key component of a marketing mix?",
    options: ["Process", "People", "Product", "All of the above"],
    correctAnswerIndex: 3
  },
  {
    id: 5, category: JobCategory.TEACHING, question: "Bloom's Taxonomy is a hierarchical model used to classify educational learning objectives into levels of...",
    options: ["Complexity and Specificity", "Creativity and Fun", "Difficulty and Time", "Reading and Writing"],
    correctAnswerIndex: 0
  },
  {
    id: 6, category: JobCategory.TEACHING, question: "What is an IEP?",
    options: ["Internal Evaluation Process", "Individualized Education Program", "Instructional Excellence Plan", "Integrated E-learning Platform"],
    correctAnswerIndex: 1
  },
  {
    id: 7, category: JobCategory.HEALTH, question: "What does HIPAA stand for?",
    options: ["Health Information Protection and Accessibility Act", "Health Insurance Portability and Accountability Act", "Healthcare Information Privacy and Assurance Act", "Healthy Individual Patient Accountability Act"],
    correctAnswerIndex: 1
  },
  {
    id: 8, category: JobCategory.HEALTH, question: "Which of these is a common symptom of a heart attack?",
    options: ["Sudden rash", "Earache", "Chest pain or discomfort", "Hiccups"],
    correctAnswerIndex: 2
  },
];

export const MOCK_TIPS: Tip[] = [
  { id: 1, title: "Dress for Success", content: "Your attire should be professional and appropriate for the company culture. It's always better to be slightly overdressed than underdressed. A clean, neat appearance shows you take the opportunity seriously." },
  { id: 2, title: "Master the Handshake", content: "A firm, confident handshake can make a great first impression. Make eye contact, smile, and offer a firm but not crushing grip. It communicates professionalism and confidence." },
  { id: 3, title: "Research the Company", content: "Before your interview, thoroughly research the company's mission, values, products, and recent news. This knowledge will help you tailor your answers and show your genuine interest." },
  { id: 4, title: "Prepare Your Questions", content: "Interviews are a two-way street. Prepare thoughtful questions to ask the interviewer about the role, the team, and the company culture. This demonstrates your engagement and curiosity." },
  { id: 5, title: "Use the STAR Method", content: "For behavioral questions ('Tell me about a time when...'), use the STAR method: Situation (describe the context), Task (explain your role), Action (detail the steps you took), and Result (share the positive outcome). This structures your answer clearly and effectively." },
  { id: 6, title: "Mind Your Body Language", content: "Non-verbal cues are powerful. Sit up straight, maintain eye contact, nod to show you're listening, and avoid fidgeting. A confident posture can make you appear more competent and trustworthy." },
  { id: 7, title: "Follow Up Thoughtfully", content: "Send a thank-you email within 24 hours of your interview. Personalize it by mentioning something specific you discussed. This reinforces your interest in the role and shows professionalism." },
  { id: 8, title: "Prepare for Common Questions", content: "While you can't predict every question, you can prepare for common ones like 'Tell me about yourself,' 'What are your weaknesses?,' and 'Why do you want to work here?'. Practice your answers, but don't memorize them word-for-word." },
  { id: 9, title: "Handle Salary Questions Gracefully", content: "If asked about salary expectations, try to give a range based on your research for the role and your experience level. If possible, defer the conversation until you have a job offer, stating you're open to negotiation for the right opportunity." },
  { id: 10, title: "Know What to Bring", content: "Bring multiple copies of your resume, a notepad and pen for taking notes, a list of your prepared questions for the interviewer, and a portfolio if applicable. Being prepared shows you are organized and serious about the position." },
];

export const i18n: Record<Language, Record<string, string>> = {
  [Language.EN]: {
    'welcome': 'Prepare for your dream job interview.',
    'dashboard': 'Dashboard',
    'questionBank': 'Question Bank',
    'mockInterview': 'Mock Interview',
    'tipsGuidance': 'Tips & Guidance',
    'progressTracker': 'Progress Tracker',
    'cvReview': 'CV Review',
    'startInterview': 'Start Interview',
    'startRecording': 'Start Recording',
    'stopRecording': 'Stop Recording',
    'nextQuestion': 'Next Question',
    'yourAnswer': 'Your Answer',
    'getFeedback': 'Get AI Feedback',
    'settings': 'Settings',
    'practiceExam': 'Practice Exam',
    'startExam': 'Start Exam',
    'finishExam': 'Finish Exam',
    'yourScore': 'Your Score',
    'tryAgain': 'Try Again',
    'correct': 'Correct',
    'incorrect': 'Incorrect',
    'chat': 'Chat with Mackson',
  },
  [Language.FR]: {
    'welcome': 'Préparez-vous pour l\'entretien de vos rêves.',
    'dashboard': 'Tableau de bord',
    'questionBank': 'Banque de questions',
    'mockInterview': 'Entretien simulé',
    'tipsGuidance': 'Conseils et astuces',
    'progressTracker': 'Suivi des progrès',
    'cvReview': 'Analyse de CV',
    'startInterview': 'Commencer l\'entretien',
    'startRecording': 'Commencer l\'enregistrement',
    'stopRecording': 'Arrêter l\'enregistrement',
    'nextQuestion': 'Question suivante',
    'yourAnswer': 'Votre Réponse',
    'getFeedback': 'Obtenir des commentaires de l\'IA',
    'settings': 'Paramètres',
    'practiceExam': 'Examen Pratique',
    'startExam': 'Commencer l\'examen',
    'finishExam': 'Terminer l\'examen',
    'yourScore': 'Votre Score',
    'tryAgain': 'Réessayer',
    'correct': 'Correct',
    'incorrect': 'Incorrect',
    'chat': 'Discuter avec Mackson',
  },
  [Language.RW]: {
    'welcome': 'Itegure ikizamini cy\'akazi kejo hawe.',
    'dashboard': 'Imbonerahamwe',
    'questionBank': 'Ibibazo by\'abazwa',
    'mockInterview': 'Ikizamini cy\'igeragezwa',
    'tipsGuidance': 'Inama n\'Amabwiriza',
    'progressTracker': 'Gukurikirana Iterambere',
    'cvReview': 'Isuzuma rya CV',
    'startInterview': 'Tangira Ikizamini',
    'startRecording': 'Tangira gufata amajwi',
    'stopRecording': 'Hagarika gufata amajwi',
    'nextQuestion': 'Ikibazo gikurikira',
    'yourAnswer': 'Igisubizo Cyawe',
    'getFeedback': 'Bona inama za AI',
    'settings': 'Uburyoogène',
    'practiceExam': 'Ikizamini cyo Kwitoza',
    'startExam': 'Tangira Ikizamini',
    'finishExam': 'Soza Ikizamini',
    'yourScore': 'Amanota Yawe',
    'tryAgain': 'Gerageza nanone',
    'correct': 'Byiza',
    'incorrect': 'Ntabwo aribyo',
    'chat': 'Girana na Mackson',
  },
};