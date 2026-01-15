import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisRequest, CareerAnalysis } from "../types";

const SYSTEM_INSTRUCTION = `
You are a ruthless, data-driven Career Risk & Longevity Analyzer. 
Your goal is to stress-test careers against reality. 
Do NOT sell dreams. Be brutally honest about survivability, automation, and burnout.
If a career is dying or high-risk, say so.
Consider geography and time horizon if provided.

Output MUST be strictly JSON.
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    careerOverview: { type: Type.STRING, description: "A brutal, 2-sentence summary of the career's current state." },
    shortTermUpside: { type: Type.STRING, description: "What is good about this right now? (Salary, demand, prestige)." },
    longTermRisks: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of 3-4 specific existential threats (AI, offshoring, saturation)." 
    },
    automationExposure: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "0 to 100 probability of AI/Robot replacement within 10 years." },
        details: { type: Type.STRING, description: "Why is it exposed or safe?" }
      }
    },
    burnoutProbability: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "0 to 100 probability of severe burnout." },
        details: { type: Type.STRING, description: "Stress factors impacting this role." }
      }
    },
    survivalScore: { type: Type.NUMBER, description: "Overall rating 0.0 to 10.0. 0 is dead, 10 is future-proof." },
    survivalScoreExplanation: { type: Type.STRING, description: "Final verdict logic." }
  },
  required: ["careerOverview", "shortTermUpside", "longTermRisks", "automationExposure", "burnoutProbability", "survivalScore", "survivalScoreExplanation"]
};

export const analyzeCareerRisk = async (request: AnalysisRequest): Promise<CareerAnalysis> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Analyze the following career profile:
    Job Title: ${request.jobTitle}
    Industry: ${request.industry || "General"}
    Location: ${request.location || "Global/Remote"}
    Experience: ${request.yearsExperience || "Not specified"}

    Provide a risk assessment based on current market trends, AI advancement, and economic factors.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA
      }
    });

    if (!response.text) {
      throw new Error("No response generated from AI.");
    }

    const jsonResponse = JSON.parse(response.text) as CareerAnalysis;
    return jsonResponse;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
