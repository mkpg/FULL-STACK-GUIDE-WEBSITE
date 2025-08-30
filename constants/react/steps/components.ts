// React Components Steps - Creating UI Components
export const REACT_COMPONENTS_STEPS = [
  {
    id: 'react-2',
    title: 'Create Authentication Context - TypeScript',
    description: 'Set up React Context API for global state management of user authentication across the application.',
    detailedSteps: [
      'Create contexts directory in src folder',
      'Create AuthContext.tsx file',
      'Implement authentication state management',
      'Add login, register, and logout functions',
      'Create AuthProvider component wrapper'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Create contexts directory
mkdir src/contexts

# Create auth context file
touch src/contexts/AuthContext.tsx`
    },
    fileCreationSteps: [
      '📁 Create: src/contexts/ directory',
      '📄 Create: src/contexts/AuthContext.tsx',
      '🔧 Add: AuthContext creation with createContext',
      '🔧 Add: AuthProvider component with useState hooks',
      '🔧 Add: login function with localStorage storage',
      '🔧 Add: register function with localStorage storage',
      '🔧 Add: logout function with localStorage cleanup',
      '🔧 Add: useEffect for checking existing auth on mount'
    ],
    codeSnippet: {
      language: 'typescript',
      code: `// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest, AuthResponse, AuthContextType } from '../types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
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
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      // Simulate API call - in real app, this would be a fetch request
      const storedUsers = localStorage.getItem('users');
      if (!storedUsers) {
        return { success: false, message: 'No users registered yet' };
      }

      const users: User[] = JSON.parse(storedUsers);
      const user = users.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password
      );

      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, message: 'Login successful', user };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      if (userData.password !== userData.confirmPassword) {
        return { success: false, message: 'Passwords do not match' };
      }

      const storedUsers = localStorage.getItem('users') || '[]';
      const users: User[] = JSON.parse(storedUsers);

      // Check if username or email already exists
      if (users.some(u => u.username === userData.username)) {
        return { success: false, message: 'Username already exists' };
      }

      if (users.some(u => u.email === userData.email)) {
        return { success: false, message: 'Email already exists' };
      }

      const newUser: User = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        createdAt: new Date()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true, message: 'Registration successful', user: newUser };
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};`
    },
    verificationSteps: [
      '📁 Check: src/contexts/ directory exists',
      '📄 Verify: AuthContext.tsx file created',
      '🔧 Test: TypeScript compilation (no errors)',
      '📝 Verify: All functions are properly implemented',
      '🔧 Check: localStorage operations work correctly'
    ],
    additionalThoughts: 'Context API is React\'s built-in solution for sharing state between components without prop drilling. It\'s perfect for authentication state that needs to be accessed throughout the app. The useAuth hook provides a clean interface for components to access authentication functions.'
  },
  {
    id: 'react-3',
    title: 'Create Login Component - TypeScript',
    description: 'Build a comprehensive login form with validation, error handling, and integration with the authentication context.',
    detailedSteps: [
      'Create components directory in src folder',
      'Create Login.tsx component file',
      'Implement form with username and password fields',
      'Add form validation and error handling',
      'Integrate with authentication context',
      'Add loading states and success feedback'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Create components directory
mkdir src/components

# Create login component file (React equivalent of ng g component)
touch src/components/Login.tsx

# Create CSS file for styling
touch src/components/Login.css

# Create test file (optional but recommended)
touch src/components/Login.test.tsx`
    },
    fileCreationSteps: [
      '📁 Create: src/components/ directory',
      '📄 Create: src/components/Login.tsx',
      '🔧 Add: React imports and useState hooks',
      '🔧 Add: useAuth hook import and usage',
      '🔧 Add: Form state management with useState',
      '🔧 Add: Form validation logic',
      '🔧 Add: HandleSubmit function with auth integration',
      '🔧 Add: JSX form structure with input fields',
      '🔧 Add: Error and success message display',
      '🔧 Add: Loading state management'
    ],
    codeSnippet: {
      language: 'typescript',
      code: `// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginRequest } from '../types/auth.types';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState<LoginRequest>({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<Partial<LoginRequest>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginRequest> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await login(formData);
      
      if (response.success) {
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LoginRequest]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your account</p>
        
        {message && (
          <div className={\`message \${message.includes('successful') ? 'success' : 'error'}\`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username ? 'error' : ''}
              placeholder="Enter your username"
              disabled={isLoading}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <button 
              className="link-button"
              onClick={() => navigate('/register')}
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;`
    },
    verificationSteps: [
      '📁 Check: src/components/ directory exists',
      '📄 Verify: Login.tsx file created',
      '🔧 Test: TypeScript compilation (no errors)',
      '📝 Verify: Form validation works correctly',
      '🔧 Check: Error messages display properly',
      '🔧 Test: Loading states work during submission',
      '🔧 Verify: Navigation to register page works'
    ],
    additionalThoughts: 'The Login component demonstrates several React best practices: controlled components with useState, form validation, error handling, loading states, and integration with React Router for navigation. The component is fully accessible with proper labels and error messages.'
  },
  {
    id: 'react-4',
    title: 'Create Login Component - CSS Styles',
    description: 'Add CSS styling for the login component to create a modern, responsive design.',
    codeSnippet: {
      language: 'css',
      code: `/* src/components/Login.css */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-card h2 {
  color: #333;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 600;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.login-form {
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

.message {
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.message.success {
  background: #f0f9ff;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.message.error {
  background: #fdf2f2;
  color: #e74c3c;
  border: 1px solid #fecaca;
}

.login-button {
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.login-button:hover:not(:disabled) {
  background: #5a6fd8;
}

.login-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 30px;
  text-align: center;
}

.link-button {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
}

.link-button:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
    margin: 10px;
  }
}`
    },
    verificationSteps: [
      '📄 Verify: Login.css file created',
      '🔧 Test: Styles are applied correctly',
      '📱 Check: Responsive design works on mobile',
      '🎨 Verify: Modern design elements are visible',
      '🔧 Test: Hover effects and transitions work'
    ],
    additionalThoughts: 'CSS styling is crucial for creating a professional user experience. The gradient background, card design, and smooth transitions make the login form visually appealing. Responsive design ensures the component works well on all device sizes.'
  },
  {
    id: 'react-5',
    title: 'Create Register Component - TypeScript',
    description: 'Build a comprehensive registration form with validation, password confirmation, and integration with the authentication context.',
    detailedSteps: [
      'Create Register.tsx component file',
      'Implement form with all required fields',
      'Add comprehensive form validation',
      'Integrate with authentication context',
      'Add loading states and success feedback',
      'Include password strength indicators'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Create register component file (React equivalent of ng g component register)
touch src/components/Register.tsx

# Create CSS file for styling
touch src/components/Register.css

# Create test file
touch src/components/Register.test.tsx`
    },
    fileCreationSteps: [
      '📄 Create: src/components/Register.tsx',
      '📄 Create: src/components/Register.css',
      '📄 Create: src/components/Register.test.tsx',
      '🔧 Add: React imports and useState hooks',
      '🔧 Add: useAuth hook import and usage',
      '🔧 Add: Form state management with useState',
      '🔧 Add: Comprehensive form validation logic',
      '🔧 Add: Password strength validation',
      '🔧 Add: HandleSubmit function with auth integration',
      '🔧 Add: JSX form structure with all input fields',
      '🔧 Add: Error and success message display',
      '🔧 Add: Loading state management'
    ],
    codeSnippet: {
      language: 'typescript',
      code: `// src/components/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RegisterRequest } from '../types/auth.types';
import './Register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  
  const [errors, setErrors] = useState<Partial<RegisterRequest>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterRequest> = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await register(formData);
      
      if (response.success) {
        setMessage('Registration successful! Redirecting to home...');
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof RegisterRequest]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const getPasswordStrength = (password: string): string => {
    if (password.length === 0) return '';
    if (password.length < 8) return 'Weak';
    if (password.length < 12) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us today</p>
        
        {message && (
          <div className={\`message \${message.includes('successful') ? 'success' : 'error'}\`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Enter your first name"
                disabled={isLoading}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Enter your last name"
                disabled={isLoading}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username ? 'error' : ''}
              placeholder="Choose a username"
              disabled={isLoading}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder="Create a strong password"
              disabled={isLoading}
            />
            {formData.password && (
              <div className="password-strength">
                <span className={\`strength-\${getPasswordStrength(formData.password).toLowerCase()}\`}>
                  {getPasswordStrength(formData.password)}
                </span>
              </div>
            )}
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>
          
          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <button 
              className="link-button"
              onClick={() => navigate('/login')}
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;`
    },
    verificationSteps: [
      '📄 Verify: Register.tsx file created correctly',
      '🔧 Test: TypeScript compilation (no errors)',
      '📝 Verify: Form validation works correctly',
      '🔧 Check: Password strength indicator works',
      '🔧 Test: Error messages display properly',
      '🔧 Verify: Loading states work during submission',
      '🔧 Check: Navigation to login page works',
      '🔧 Test: All form fields are properly validated'
    ],
    additionalThoughts: 'The Register component demonstrates advanced form validation techniques including password strength indicators, comprehensive error handling, and user-friendly feedback. This component showcases React best practices for complex forms and provides a professional user experience. The password strength indicator helps users create secure passwords while maintaining good UX.'
  }
];

// Add missing Home component step
export const REACT_HOME_STEPS = [
  {
    id: 'react-6',
    title: 'Create Home Component - TypeScript',
    description: 'Build a comprehensive home component that displays user information, workshop progress, and provides logout functionality.',
    detailedSteps: [
      'Create Home.tsx component file',
      'Implement user information display',
      'Add workshop progress tracking',
      'Integrate with authentication context',
      'Add logout functionality',
      'Create responsive layout'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Create home component file
touch src/components/Home.tsx

# Create CSS file for styling
touch src/components/Home.css

# Create test file
touch src/components/Home.test.tsx`
    },
    fileCreationSteps: [
      '📄 Create: src/components/Home.tsx',
      '📄 Create: src/components/Home.css',
      '📄 Create: src/components/Home.test.tsx',
      '🔧 Add: React imports and useAuth hook',
      '🔧 Add: User information display',
      '🔧 Add: Workshop progress tracking',
      '🔧 Add: Logout functionality with navigation',
      '🔧 Add: Responsive layout and styling'
    ],
    codeSnippet: {
      language: 'typescript',
      code: `// src/components/Home.tsx
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
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
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
          <span>Authentication Context</span>
        </div>
        <div className="progress-item completed">
          <span className="status">✓</span>
          <span>Login Component</span>
        </div>
        <div className="progress-item completed">
          <span className="status">✓</span>
          <span>Register Component</span>
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

export default Home;`
    },
    verificationSteps: [
      '📄 Verify: Home.tsx file created correctly',
      '🔧 Test: TypeScript compilation (no errors)',
      '📝 Verify: User information displays correctly',
      '🔧 Check: Workshop progress shows completed items',
      '🔧 Test: Logout functionality works',
      '🔧 Verify: Navigation after logout works',
      '🔧 Test: Responsive design works on different screen sizes'
    ],
    additionalThoughts: 'The Home component serves as the main dashboard after authentication. It demonstrates how to display user data from context, handle user interactions, and create a professional user interface. The workshop progress tracking gives users a sense of accomplishment and shows what\'s next in their learning journey.'
  },
  {
    id: 'react-7',
    title: 'Create Home Component - CSS Styles',
    description: 'Add comprehensive CSS styling for the home component to create a modern, responsive dashboard design.',
    codeSnippet: {
      language: 'css',
      code: `/* src/components/Home.css */
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.welcome-section h1 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 600;
}

.welcome-section p {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

.user-info-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-info-card h3 {
  color: #333;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
}

.user-details p {
  margin: 0.75rem 0;
  color: #555;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-details strong {
  color: #333;
  min-width: 120px;
}

.actions-section {
  text-align: center;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.workshop-info {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.workshop-info h3 {
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.progress-item {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.progress-item.completed {
  background-color: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
}

.progress-item:not(.completed) {
  background-color: #f8f9fa;
  color: #6c757d;
  border-left: 4px solid #dee2e6;
}

.progress-item .status {
  margin-right: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  min-width: 20px;
}

.progress-item.completed .status {
  color: #28a745;
}

.progress-item:not(.completed) .status {
  color: #6c757d;
}

.progress-item span:last-child {
  font-weight: 500;
}

@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }
  
  .welcome-section h1 {
    font-size: 2rem;
  }
  
  .user-details p {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .user-details strong {
    min-width: auto;
  }
}`
    },
    verificationSteps: [
      '📄 Verify: Home.css file created correctly',
      '🔧 Test: Styles are applied correctly',
      '📱 Check: Responsive design works on mobile',
      '🎨 Verify: Modern design elements are visible',
      '🔧 Test: Hover effects and transitions work',
      '🔧 Check: Card shadows and borders display properly'
    ],
    additionalThoughts: 'The Home component CSS creates a professional dashboard appearance with cards, shadows, and responsive design. The gradient background and modern styling make the interface engaging while maintaining excellent readability. The progress tracking section uses visual cues to show completion status.'
  }
];

// Add missing Register.css step
export const REACT_REGISTER_CSS_STEPS = [
  {
    id: 'react-8',
    title: 'Create Register Component - CSS Styles',
    description: 'Add comprehensive CSS styling for the register component to create a modern, responsive registration form.',
    codeSnippet: {
      language: 'css',
      code: `/* src/components/Register.css */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.register-card h2 {
  color: #333;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 600;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.register-form {
  text-align: left;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

.message {
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.message.success {
  background: #f0f9ff;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.message.error {
  background: #fdf2f2;
  color: #e74c3c;
  border: 1px solid #fecaca;
}

.password-strength {
  margin-top: 8px;
  text-align: left;
}

.password-strength span {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.strength-weak {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.strength-medium {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fed7aa;
}

.strength-strong {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.register-button {
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.register-button:hover:not(:disabled) {
  background: #5a6fd8;
}

.register-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.register-footer {
  margin-top: 30px;
  text-align: center;
}

.link-button {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
}

.link-button:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .register-card {
    padding: 30px 20px;
    margin: 10px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}`
    },
    verificationSteps: [
      '📄 Verify: Register.css file created correctly',
      '🔧 Test: Styles are applied correctly',
      '📱 Check: Responsive design works on mobile',
      '🎨 Verify: Modern design elements are visible',
      '🔧 Test: Password strength indicators display properly',
      '🔧 Check: Form layout works on different screen sizes'
    ],
    additionalThoughts: 'The Register component CSS provides a professional and user-friendly interface for user registration. The responsive grid layout for name fields, password strength indicators, and modern styling create an excellent user experience. The mobile-first approach ensures the form works well on all devices.'
  }
];
