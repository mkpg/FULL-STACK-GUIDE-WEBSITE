// React Setup Steps - Project Creation and Initial Setup
export const REACT_SETUP_STEPS = [
  {
    id: 'react-1',
    title: 'Setup React App with TypeScript',
    description: 'Create a new React application using Create React App with TypeScript template and install necessary dependencies.',
    detailedSteps: [
      'Open terminal/command prompt',
      'Navigate to your desired project directory',
      'Run Create React App command with TypeScript template',
      'Install additional dependencies for routing and types',
      'Start development server to verify setup'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Create new React project with TypeScript
npx create-react-app workshop-react --template typescript

# Navigate to project directory
cd workshop-react

# Install additional dependencies
npm install react-router-dom @types/react-router-dom
npm install @types/node

# Start development server
npm start

📁 REACT PROJECT STRUCTURE DIAGRAM:
workshop-react/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Login/
│   │   │   ├── Login.tsx
│   │   │   └── Login.css
│   │   ├── Register/
│   │   │   ├── Register.tsx
│   │   │   └── Register.css
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   └── Home.css
│   │   └── ProtectedRoute/
│   │       └── ProtectedRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── types/
│   │   └── auth.types.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md

🔄 REACT COMPONENT FLOW:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   App.tsx       │───▶│  AuthContext    │───▶│   Components    │
│   (Router)      │    │   (Provider)    │    │  (Login/Home)   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│  React Router   │    │   useState      │    │  Event Handlers │
│  (Navigation)   │    │   useEffect     │    │  (Form Submit)  │
│                 │    │   useContext    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘`
    },
    fileCreationSteps: [
              'Project structure created automatically by Create React App',
        'src/ folder with initial components',
        'package.json with dependencies',
        'tsconfig.json for TypeScript configuration',
        'public/ folder for static assets'
    ],
    verificationSteps: [
              'Open http://localhost:3000 in browser',
        'See React logo spinning (default app)',
        'Check terminal for successful compilation',
      '📁 Verify project structure in file explorer'
    ],
    additionalThoughts: 'Create React App is the official way to bootstrap React projects. It provides a modern build setup with no configuration required. The TypeScript template gives us type safety from the start, which is crucial for building maintainable applications.'
  },
  {
    id: 'react-2',
    title: 'Create TypeScript Interfaces and Types',
    description: 'Define comprehensive TypeScript interfaces for user data, authentication requests, and API responses.',
    detailedSteps: [
      'Create types directory in src folder',
      'Create auth.types.ts file for authentication types',
      'Define User interface with all required properties',
      'Create request/response interfaces for API calls',
      'Export all types for use in components'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Create types directory
mkdir src/types

# Create auth types file
touch src/types/auth.types.ts

# 🛠️ REACT FILE CREATION COMMANDS:
# Create directories
mkdir -p src/components src/contexts src/types src/hooks src/utils

# Create component files (React equivalent of ng g component)
touch src/components/Login/Login.tsx
touch src/components/Login/Login.css
touch src/components/Login/Login.test.tsx

touch src/components/Register/Register.tsx
touch src/components/Register/Register.css
touch src/components/Register/Register.test.tsx

touch src/components/Home/Home.tsx
touch src/components/Home/Home.css
touch src/components/Home/Home.test.tsx

# Create context files
touch src/contexts/AuthContext.tsx

# Create type definition files
touch src/types/auth.types.ts
touch src/types/user.types.ts

# Create utility files
touch src/utils/validation.ts
touch src/utils/storage.ts

# ALTERNATIVE: Using React CLI Tools
# Install React CLI globally (optional)
npm install -g create-react-app

# Generate components with create-react-app (if using custom templates)
# npx create-react-app component-name --template typescript

# 📁 MANUAL FILE CREATION (Windows PowerShell):
# New-Item -ItemType Directory -Path src\components\Login -Force
# New-Item -ItemType File -Path src\components\Login\Login.tsx -Force
# New-Item -ItemType File -Path src\components\Login\Login.css -Force`
    },
    fileCreationSteps: [
      '📁 Create: src/types/ directory',
      '📄 Create: src/types/auth.types.ts',
              'Add: User interface with properties',
        'Add: LoginRequest interface',
        'Add: RegisterRequest interface',
        'Add: AuthResponse interface',
        'Add: AuthContextType interface'
    ],
    codeSnippet: {
      language: 'typescript',
      code: `// src/types/auth.types.ts
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (userData: RegisterRequest) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
}`
    },
    verificationSteps: [
      '📁 Check: src/types/ directory exists',
      '📄 Verify: auth.types.ts file created',
              'Test: TypeScript compilation (no errors)',
        'Verify: All interfaces are properly exported'
    ],
    additionalThoughts: 'TypeScript interfaces are crucial for maintaining code quality and catching errors at compile time. They serve as contracts between different parts of your application. Always define interfaces before implementing components - this helps with planning and ensures consistency.'
  },
  {
    id: 'react-3',
    title: 'React CLI Commands Reference',
    description: 'Complete reference of React development commands and file creation shortcuts for efficient development workflow.',
    detailedSteps: [
      'Learn React CLI commands for file creation',
      'Understand manual file creation alternatives',
      'Master directory structure creation',
      'Use Windows PowerShell alternatives for touch command'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# REACT CLI COMMANDS REFERENCE

# 📦 Project Creation
npx create-react-app my-app --template typescript
npx create-react-app my-app --template typescript --yes
npx create-react-app my-app --template typescript --scripts-version 5.0.1

# Development Commands
npm start                    # Start development server
npm run build               # Build for production
npm test                    # Run tests
npm run eject              # Eject from Create React App (irreversible)

# 📁 Directory Creation Commands
mkdir -p src/components src/contexts src/types src/hooks src/utils
mkdir -p src/components/Login src/components/Register src/components/Home

# 📄 File Creation Commands (Unix/Linux/macOS)
touch src/components/Login/Login.tsx
touch src/components/Login/Login.css
touch src/components/Login/Login.test.tsx

# 📄 File Creation Commands (Windows PowerShell)
New-Item -ItemType File -Path src\components\Login\Login.tsx -Force
New-Item -ItemType File -Path src\components\Login\Login.css -Force
New-Item -ItemType File -Path src\components\Login\Login.test.tsx -Force

# 📄 File Creation Commands (Windows Command Prompt)
echo. > src\components\Login\Login.tsx
echo. > src\components\Login\Login.css
echo. > src\components\Login\Login.test.tsx

# COMPLETE PROJECT SETUP SEQUENCE
# 1. Create project
npx create-react-app workshop-react --template typescript
cd workshop-react

# 2. Install dependencies
npm install react-router-dom @types/react-router-dom
npm install @types/node

# 3. Create directory structure
mkdir -p src/components src/contexts src/types src/utils

# 4. Create component directories
mkdir -p src/components/Login src/components/Register src/components/Home

# 5. Create all required files
# Login Component
touch src/components/Login/Login.tsx
touch src/components/Login/Login.css
touch src/components/Login/Login.test.tsx

# Register Component
touch src/components/Register/Register.tsx
touch src/components/Register/Register.css
touch src/components/Register/Register.test.tsx

# Home Component
touch src/components/Home/Home.tsx
touch src/components/Home/Home.css
touch src/components/Home/Home.test.tsx

# Context and Types
touch src/contexts/AuthContext.tsx
touch src/types/auth.types.ts
touch src/utils/validation.ts

# 6. Start development
npm start`
    },
    fileCreationSteps: [
      '📚 Learn: All React CLI commands',
              'Practice: Directory creation commands',
        'Master: File creation commands for different OS',
        'Execute: Complete project setup sequence'
    ],
    verificationSteps: [
      '📚 Verify: Understanding of all CLI commands',
              'Test: Directory creation commands work',
        'Test: File creation commands work on your OS',
        'Execute: Complete project setup successfully'
    ],
    additionalThoughts: 'React doesn\'t have a built-in CLI like Angular, but Create React App provides excellent tooling. Learning these commands will significantly speed up your development workflow. Always use the appropriate commands for your operating system - Unix commands for macOS/Linux, PowerShell for Windows.'
  }
];

