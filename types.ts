export interface CareerAnalysis {
  careerOverview: string;
  shortTermUpside: string;
  longTermRisks: string[];
  automationExposure: {
    score: number; // 0-100
    details: string;
  };
  burnoutProbability: {
    score: number; // 0-100
    details: string;
  };
  survivalScore: number; // 0-10
  survivalScoreExplanation: string;
}

export interface AnalysisRequest {
  jobTitle: string;
  industry?: string;
  location?: string;
  yearsExperience?: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
