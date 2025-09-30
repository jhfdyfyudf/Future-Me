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
}

export interface GameStep {
  description: string;
  tools: string[];
  correctTool: string;
  explanation: string;
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