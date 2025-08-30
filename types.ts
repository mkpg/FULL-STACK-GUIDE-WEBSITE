
export interface CodeSnippet {
  language: 'bash' | 'sql' | 'typescript' | 'javascript' | 'html' | 'php' | 'java' | 'text' | 'xml';
  code: string;
}

export interface CommonQuestion {
  question: string;
  answer: string;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  codeSnippet?: CodeSnippet;
}

export interface Section {
  id: string;
  title:string;
  overview?: string;
  coreConcepts?: string[];
  steps: Step[];
  tips?: string;
  estimatedTime?: string;
  prerequisites?: string;
  liveSessionNotes?: string;
  commonQuestions?: CommonQuestion[];
}

export interface Progress {
  [stepId: string]: boolean;
}
