// React Routing Steps - Setting up Navigation and Protected Routes
export const REACT_ROUTING_STEPS = [
  {
    id: 'react-6',
    title: 'Setup React Router and Protected Routes',
    description: 'Configure React Router for navigation between components and implement protected routes that require authentication.',
    detailedSteps: [
      'Install React Router DOM package',
      'Create App.tsx with routing configuration',
      'Implement protected route wrapper component',
      'Set up navigation between login, register, and home pages',
      'Add route guards for authenticated users'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Install React Router (if not already installed)
npm install react-router-dom @types/react-router-dom

# Create protected route component
touch src/components/ProtectedRoute.tsx

# Update main App.tsx file
# (App.tsx already exists, we'll modify it)`
    },
    fileCreationSteps: [
      '📄 Modify: src/App.tsx (existing file)',
      '📄 Create: src/components/ProtectedRoute.tsx',
              'Add: BrowserRouter wrapper in App.tsx',
        'Add: Routes and Route components',
        'Add: ProtectedRoute component for home page',
        'Add: Navigation between auth pages',
        'Add: AuthProvider wrapper around routes'
    ],
    codeSnippet: {
      language: 'typescript',
      code: `// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

// src/App.tsx (updated)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;`
    },
    verificationSteps: [
      '📄 Verify: ProtectedRoute.tsx file created',
              'Test: TypeScript compilation (no errors)',
        'Verify: Navigation between pages works',
        'Check: Protected routes redirect to login when not authenticated',
        'Test: Authenticated users can access home page',
        'Verify: Default route redirects to login'
    ],
    additionalThoughts: 'React Router provides declarative routing for React applications. Protected routes ensure that only authenticated users can access certain pages. The Navigate component is perfect for redirects, and the ProtectedRoute wrapper component keeps the routing logic clean and reusable.'
  }
];
