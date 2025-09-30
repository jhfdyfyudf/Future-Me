export interface Career {
  id: string;
  name: string;
  Icon: React.FC<{ className?: string }>;
  color: string;
  bgColor: string;
}

export interface CareerDetails {
  storyIntro: string;
  description: string;
  tools: string[];
  skills: string[];
  funFacts: string[];
  qna: { question: string; answer: string }[];
  characterImage?: string;
}

export interface GameStep {
  description: string;
  tools: string[];
  correctTool: string;
  explanation: string;
  hint: string;
}

export interface InteractiveGame {
  title: string;
  scenario: string;
  steps: GameStep[];
}

export interface Journal {
  savedCareers: string[];
  badges: string[];
}