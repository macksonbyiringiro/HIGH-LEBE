import { GoogleGenAI, Type } from "@google/genai";
import { Language } from '../types';
import { LANGUAGE_NAMES } from "../constants";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const feedbackSchema = {
    type: Type.OBJECT,
    properties: {
        feedback: {
            type: Type.STRING,
            description: "Constructive, supportive, and actionable feedback on the user's interview answer. Keep it concise (2-4 sentences)."
        },
        nextQuestion: {
            type: Type.STRING,
            description: "A new, different interview question about a general professional skill (like teamwork, leadership, problem-solving, etc.)."
        },
    },
    required: ["feedback", "nextQuestion"],
};

export const getInterviewQuestion = async (language: Language): Promise<string> => {
    const languageName = LANGUAGE_NAMES[language];
    try {
        const response = await ai.models.generateContent({
            model,
            contents: `You are a hiring manager conducting a job interview. Provide one common interview question about a general skill like teamwork, communication, problem-solving, leadership, or adaptability. The question must be in ${languageName}. Do not add any preamble, explanation, or quotation marks. Just the question itself.`,
            config: {
                temperature: 1.1,
                topP: 0.95,
            },
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error fetching interview question:", error);
        throw new Error("Failed to generate an interview question from the API.");
    }
};

export const evaluateAnswerAndProvideNextQuestion = async (
    question: string,
    answer: string,
    language: Language
): Promise<{ feedback: string; nextQuestion: string }> => {
    const languageName = LANGUAGE_NAMES[language];

    try {
        const response = await ai.models.generateContent({
            model,
            contents: `The interview question was: "${question}". The candidate's answer is: "${answer}". Please provide feedback and the next question.`,
            config: {
                systemInstruction: `You are an expert hiring manager providing feedback on interview answers. Your feedback should be constructive, supportive, and actionable. Analyze the user's answer for clarity, structure, and relevance. Keep the feedback concise (2-4 sentences). After the feedback, provide a new, different interview question about another general skill. Both the feedback and the new question must be in ${languageName}.`,
                responseMimeType: "application/json",
                responseSchema: feedbackSchema,
                temperature: 0.8
            }
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        if (result.feedback && result.nextQuestion) {
            return result;
        } else {
            throw new Error("Invalid JSON response structure from API.");
        }
    } catch (error) {
        console.error("Error evaluating answer:", error);
        throw new Error("Failed to evaluate the answer using the API.");
    }
};