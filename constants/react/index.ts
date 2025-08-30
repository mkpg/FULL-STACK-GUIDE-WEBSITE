// React Section Index - Export all React components
export { REACT_OVERVIEW } from './overview';
export { REACT_SETUP_STEPS } from './steps/setup';
export { REACT_COMPONENTS_STEPS } from './steps/components';
export { REACT_ROUTING_STEPS } from './steps/routing';
export { REACT_HOME_STEPS } from './steps/components';
export { REACT_REGISTER_CSS_STEPS } from './steps/components';

// React Section Configuration
export const REACT_SECTION_CONFIG = {
  title: 'React: Modern Frontend Development',
  description: 'Build a complete React application with TypeScript, authentication, routing, and modern React patterns.',
  overview: 'Learn React fundamentals and build a full-featured authentication system with user registration, login, and protected home pages.',
  totalSteps: 8,
  technologies: ['React', 'TypeScript', 'React Router', 'Context API', 'Hooks', 'JSX'],
  prerequisites: 'Basic HTML, CSS, JavaScript knowledge, understanding of React fundamentals',
  learningOutcomes: [
    'Understand React component architecture and JSX',
    'Implement state management with React Hooks',
    'Use Context API for global state management',
    'Create protected routes with React Router',
    'Build forms with validation and error handling',
    'Integrate localStorage for client-side data persistence',
    'Apply TypeScript for type safety in React applications'
  ]
};
