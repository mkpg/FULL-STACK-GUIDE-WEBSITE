// React Section - Complete React Application with Authentication
import { REACT_OVERVIEW } from './react/overview';
import { REACT_SETUP_STEPS } from './react/steps/setup';
import { REACT_COMPONENTS_STEPS } from './react/steps/components';
import { REACT_ROUTING_STEPS } from './react/steps/routing';

export const REACT_SECTION = {
  id: 'react',
  title: 'React: Modern Frontend Development',
  description: 'Build a complete React application with TypeScript, authentication, routing, and modern React patterns.',
  overview: 'Learn React fundamentals and build a full-featured authentication system with user registration, login, and protected home pages.',
  coreConcepts: [
    '**Component-Based Architecture:** Reusable UI components that can be composed together',
    '**JSX (JavaScript XML):** Syntax extension that allows writing HTML-like code in JavaScript',
    '**Virtual DOM:** Lightweight copy of the actual DOM for efficient rendering and updates',
    '**State Management:** Component state using useState hook and global state with Context API',
    '**Props:** Data passing mechanism from parent to child components',
    '**Hooks:** Functions that allow functional components to use state and lifecycle features',
    '**Unidirectional Data Flow:** Data flows down from parent to child components',
    '**Event Handling:** Synthetic events that provide cross-browser compatibility',
    '**Conditional Rendering:** Dynamic UI based on component state and props',
    '**Lists and Keys:** Efficient rendering of dynamic lists with unique identifiers',
    '**Forms and Controlled Components:** Form state management with React state',
    '**Lifecycle Methods:** Component mounting, updating, and unmounting phases',
    '**Error Boundaries:** Components that catch JavaScript errors in child components',
    '**Performance Optimization:** React.memo, useMemo, and useCallback for optimization',
    '**Testing:** Jest and React Testing Library for component testing'
  ],
  steps: [
    ...REACT_SETUP_STEPS,
    ...REACT_COMPONENTS_STEPS,
    ...REACT_ROUTING_STEPS
  ],
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
  ],
  commonQuestions: [
    {
      question: 'What is the difference between React and Angular?',
      answer: 'React is a JavaScript library focused on building user interfaces, while Angular is a full-featured framework. React is more lightweight and flexible, using JSX for templating and a component-based architecture. Angular provides more built-in features like dependency injection, routing, and form handling out of the box. React is often preferred for smaller to medium applications, while Angular is popular for large enterprise applications.'
    },
    {
      question: 'Why use TypeScript with React?',
      answer: 'TypeScript adds static type checking to JavaScript, which helps catch errors at compile time rather than runtime. In React applications, TypeScript provides better IntelliSense, refactoring support, and helps maintain code quality as applications grow. It makes component props and state more predictable and helps teams collaborate more effectively by providing clear contracts between components.'
    },
    {
      question: 'What are React Hooks and when should I use them?',
      answer: 'React Hooks are functions that allow you to use state and other React features in functional components. useState manages component state, useEffect handles side effects like API calls and subscriptions, useContext accesses React context, and useReducer manages complex state logic. Hooks should be used at the top level of functional components and follow the rules of hooks (only call hooks from React functions, not from loops or nested functions).'
    },
    {
      question: 'How does Context API work for state management?',
      answer: 'Context API provides a way to share data between components without prop drilling. It creates a context object that can hold data and provides a Provider component to wrap the component tree. Components can then consume the context using the useContext hook. Context is ideal for global state like user authentication, themes, or language preferences. For complex state management, you might still want to use Redux or Zustand.'
    },
    {
      question: 'What is the Virtual DOM and why is it important?',
      answer: 'The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize rendering performance. When state changes, React creates a new Virtual DOM tree and compares it with the previous one to find the minimal number of changes needed. This diffing process allows React to update only the necessary parts of the actual DOM, making it much faster than manually manipulating the DOM. The Virtual DOM abstraction also makes React components more predictable and easier to test.'
    },
    {
      question: 'How do I handle form validation in React?',
      answer: 'Form validation in React can be handled in several ways: controlled components with state management, form libraries like Formik or React Hook Form, or HTML5 validation attributes. For controlled components, you maintain form state in component state and validate on change or submit. You can implement custom validation logic, use regular expressions, or integrate with validation libraries like Yup or Joi. Always validate both on the client side for user experience and on the server side for security.'
    }
  ]
};
