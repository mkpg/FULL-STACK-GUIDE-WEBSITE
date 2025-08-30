# React Lab Session - Login & Home Application

## Prerequisites
- Node.js installed (version 14 or higher)
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of ES6+ features

## Lab Objectives
1. Set up React development environment
2. Create a new React application with TypeScript
3. Implement login and home components
4. Set up routing and navigation
5. Implement basic authentication logic with Context API

## Step 1: Environment Setup

### Verify Node.js Installation
```bash
node --version
npm --version
```

### Install Create React App (if not already installed)
```bash
npm install -g create-react-app
```

## Step 2: Create React Application

### Generate New Project
```bash
npx create-react-app workshop-react --template typescript
cd workshop-react
```

### Install Additional Dependencies
```bash
npm install react-router-dom @types/react-router-dom
```

### Project Structure
```
workshop-react/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── types/
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
└── tsconfig.json
```

## Step 3: Create Project Structure

### Create Directories
```bash
mkdir src/components
mkdir src/contexts
mkdir src/types
```

## Step 4: Define TypeScript Types

### Create `src/types/index.ts`
```typescript
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface LoginFormData {
  username: string;
  password: string;
}
```

## Step 5: Implement Authentication Context

### Create `src/contexts/AuthContext.tsx`
```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simulate API call - in real app, this would be HTTP request
    if (username === 'admin' && password === 'password') {
      const userData: User = {
        id: 1,
        username: username,
        email: 'admin@example.com'
      };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: user !== null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Step 6: Create Login Component

### Create `src/components/Login.tsx`
```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginFormData } from '../types';
import './Login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (formData.username && formData.password) {
      if (login(formData.username, formData.password)) {
        navigate('/home');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } else {
      setErrorMessage('Please enter both username and password');
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Username: admin</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

### Create `src/components/Login.css`
```css
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-card h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #5a6fd8;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  text-align: center;
}

.demo-credentials {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 5px;
  text-align: center;
}

.demo-credentials p {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}
```

## Step 7: Create Home Component

### Create `src/components/Home.tsx`
```typescript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null; // This shouldn't happen due to ProtectedRoute
  }

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to the React Workshop!</h1>
        <p>You have successfully logged in to your account.</p>
      </div>

      <div className="user-info-card">
        <h3>User Information</h3>
        <div className="user-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
        </div>
      </div>

      <div className="actions-section">
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="workshop-info">
        <h3>Workshop Progress</h3>
        <div className="progress-item completed">
          <span className="status">✓</span>
          <span>React Setup</span>
        </div>
        <div className="progress-item completed">
          <span className="status">✓</span>
          <span>Login Component</span>
        </div>
        <div className="progress-item completed">
          <span className="status">✓</span>
          <span>Home Component</span>
        </div>
        <div className="progress-item">
          <span className="status">○</span>
          <span>PHP Backend</span>
        </div>
        <div className="progress-item">
          <span className="status">○</span>
          <span>Java Servlets</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
```

### Create `src/components/Home.css`
```css
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-section h1 {
  color: #333;
  margin-bottom: 1rem;
}

.welcome-section p {
  color: #666;
  font-size: 1.1rem;
}

.user-info-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.user-info-card h3 {
  color: #333;
  margin-bottom: 1rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.user-details p {
  margin: 0.5rem 0;
  color: #555;
}

.actions-section {
  text-align: center;
  margin-bottom: 2rem;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.workshop-info {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
}

.workshop-info h3 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.progress-item {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 5px;
}

.progress-item.completed {
  background-color: #d4edda;
  color: #155724;
}

.progress-item .status {
  margin-right: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.progress-item.completed .status {
  color: #28a745;
}
```

## Step 8: Create Protected Route Component

### Create `src/components/ProtectedRoute.tsx`
```typescript
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
```

## Step 9: Create Navigation Component

### Create `src/components/Navigation.tsx`
```typescript
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navigation.css';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/home">React Workshop</Link>
        </div>
        <div className="nav-menu">
          <span className="nav-user">Welcome, {user.username}!</span>
          <button className="nav-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
```

### Create `src/components/Navigation.css`
```css
.navigation {
  background-color: #333;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-brand a {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-user {
  color: #ccc;
}

.nav-logout {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-logout:hover {
  background-color: #c82333;
}
```

## Step 10: Update App Component

### Update `src/App.tsx`
```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
```

### Update `src/App.css`
```css
.App {
  text-align: center;
  min-height: 100vh;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}
```

## Step 11: Run the Application

### Start Development Server
```bash
npm start
```

### Open Browser
Navigate to `http://localhost:3000`

## Testing the Application

1. **Login Page**: Should display login form
2. **Authentication**: Use demo credentials (admin/password)
3. **Navigation**: Should redirect to home page after login
4. **Protected Route**: Home page should only be accessible when logged in
5. **Logout**: Should clear session and redirect to login
6. **Navigation Bar**: Should show user info and logout button

## Lab Completion Checklist

- [ ] React app created with TypeScript
- [ ] Dependencies installed (react-router-dom)
- [ ] Project structure created
- [ ] TypeScript types defined
- [ ] Authentication context implemented
- [ ] Login component created with form
- [ ] Home component created with user info
- [ ] Protected route component implemented
- [ ] Navigation component created
- [ ] Routing configured
- [ ] Application runs without errors
- [ ] Login functionality works
- [ ] Protected routes work
- [ ] Logout functionality works
- [ ] Navigation bar displays correctly

## Next Steps

1. Add form validation with libraries like Formik or React Hook Form
2. Implement real API calls with fetch or axios
3. Add error boundaries for better error handling
4. Implement user registration
5. Add password reset functionality
6. Implement remember me functionality
7. Add unit tests with Jest and React Testing Library

## Troubleshooting

### Common Issues:
1. **Port already in use**: Change port with `PORT=3001 npm start`
2. **TypeScript errors**: Check type definitions and imports
3. **Routing not working**: Verify BrowserRouter and Routes setup
4. **Context not working**: Ensure components are wrapped in AuthProvider

### Getting Help:
- Check browser console for errors
- Verify all files are saved
- Restart development server if needed
- Check React documentation for syntax
- Use TypeScript compiler for type checking
