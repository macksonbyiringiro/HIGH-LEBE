import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "../types";

// Safely access the API key to prevent crashes in environments where process.env is not defined.
const API_KEY = typeof process === 'object' && process.env ? process.env.API_KEY : undefined;

// Conditionally initialize the GoogleGenAI client.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

if (!ai) {
  console.error("API_KEY environment variable not set. CV Review feature will be disabled.");
}

export async function reviewCV(cvText: string, userProfile: UserProfile): Promise<string> {
  // Check if the AI client was successfully initialized.
  if (!ai) {
    return "Error: The AI service is not initialized. Please ensure the API_KEY is set correctly.";
  }

  const prompt = `
    As an expert career coach, please review the following CV for a candidate with these details:
    - Job Category: ${userProfile.jobCategory}
    - Experience Level: ${userProfile.experienceLevel}

    CV Text:
    ---
    ${cvText}
    ---

    Provide constructive feedback in markdown format. Focus on:
    1.  Clarity and Conciseness
    2.  Impact of achievement statements (suggest improvements using action verbs).
    3.  Relevance to the candidate's job category.
    4.  Formatting and overall presentation.
    
    Keep the feedback professional, encouraging, and actionable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return `An error occurred while analyzing the CV. Details: ${error instanceof Error ? error.message : String(error)}`;
  }
}
