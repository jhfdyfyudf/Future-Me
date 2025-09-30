import { GoogleGenAI, Type } from "@google/genai";
import type { CareerDetails, InteractiveGame } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateCareerDetails = async (careerName: string): Promise<CareerDetails | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate details for the profession '${careerName}' for a 12-year-old. Provide a short, exciting story intro, a simple description, 3-4 tools they use, 3-4 key skills, and 2-3 fun facts.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            storyIntro: { type: Type.STRING, description: "A short, engaging story to introduce the career." },
            description: { type: Type.STRING, description: "A simple, kid-friendly job description." },
            tools: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of tools used in the profession." },
            skills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of key skills for the job." },
            funFacts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of fun facts about the career." },
          },
          required: ["storyIntro", "description", "tools", "skills", "funFacts"]
        },
      },
    });
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as CareerDetails;
  } catch (error) {
    console.error("Error generating career details:", error);
    return null;
  }
};

export const generateInteractiveGame = async (careerName: string): Promise<InteractiveGame | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create an interactive, step-by-step, first-person POV mini-game for a 12-year-old about being a ${careerName}. The game should simulate a core task of the profession. Provide a title, a main scenario, and 3-4 steps. For each step, provide: a short description of the action to take, a list of 3 simple, one-word tool names (e.g., "stethoscope", "spatula", "wrench"), the name of the correct tool for the action, and a brief, encouraging explanation for the correct choice. The tools should be distinct and plausible for the scenario.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "The title of the mini-game." },
            scenario: { type: Type.STRING, description: "The overall scenario for the game." },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  description: { type: Type.STRING, description: "The instruction for the current step." },
                  tools: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of three tool names." },
                  correctTool: { type: Type.STRING, description: "The name of the correct tool." },
                  explanation: { type: Type.STRING, description: "A brief, kid-friendly explanation of why the correct tool is used." },
                },
                required: ["description", "tools", "correctTool", "explanation"]
              }
            }
          },
          required: ["title", "scenario", "steps"]
        },
      },
    });
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as InteractiveGame;
  } catch (error) {
    console.error("Error generating interactive game:", error);
    return null;
  }
};

export const generateChallengeImage = async (scenario: string): Promise<string | null> => {
  try {
    const prompt = `A cute, colorful, and simple first-person POV cartoon illustration for a children's game, with no text or hands visible. The scene depicts: ${scenario}`;
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '16:9',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    }
    return null;
  } catch (error) {
    console.error("Error generating challenge image:", error);
    return null;
  }
};