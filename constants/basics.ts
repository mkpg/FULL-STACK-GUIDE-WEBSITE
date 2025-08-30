// Basics Section - Frontend/Backend Fundamentals, Server/API/Database, API Request/Response
import type { Section } from '../types';

export const BASICS_SECTION: Section = {
  id: 'basics',
  title: 'Basics',
  overview: 'Learn the fundamental concepts of web development including frontend/backend architecture, server/API/database concepts, and how API requests and responses work.',
  coreConcepts: [
    '**Frontend:** What users see and interact with (HTML, CSS, JavaScript)',
    '**Backend:** Server-side logic, databases, and business logic',
    '**Client-Server Architecture:** How frontend and backend communicate',
    '**Server:** Computer that provides services to other computers (clients)',
    '**API:** Set of rules for how applications communicate',
    '**Database:** Organized collection of structured information',
    '**HTTP Methods:** GET, POST, PUT, DELETE for different operations'
  ],
  steps: [
    {
      id: 'basics-1',
      title: 'Frontend and Backend Fundamentals',
      description: 'Understand the difference between frontend (what users see) and backend (server logic and data).',
      codeSnippet: {
        language: 'text',
        code: `Frontend (Client-Side):
- HTML: Structure
- CSS: Styling  
- JavaScript: Interactivity

Backend (Server-Side):
- Server Logic
- Database Operations
- Business Rules
- Security

📊 ARCHITECTURE DIAGRAM:
┌─────────────────────────────────────────────────────────────┐
│                    WEB APPLICATION                          │
├─────────────────────────────────┬───────────────────────────┤
│         FRONTEND                │         BACKEND           │
│      (Client-Side)              │      (Server-Side)        │
├─────────────────────────────────┼───────────────────────────┤
│  ┌─────────────┐                │  ┌─────────────────────┐  │
│  │   HTML      │ ← Structure    │  │   Server Logic      │  │
│  └─────────────┘                │  └─────────────────────┘  │
│  ┌─────────────┐                │  ┌─────────────────────┐  │
│  │    CSS      │ ← Styling      │  │  Database Ops       │  │
│  └─────────────┘                │  └─────────────────────┘  │
│  ┌─────────────┐                │  ┌─────────────────────┐  │
│  │ JavaScript  │ ← Interactivity│  │  Business Rules     │  │
│  └─────────────┘                │  └─────────────────────┘  │
│  ┌─────────────┐                │  ┌─────────────────────┐  │
│  │   Browser   │ ← User Interface│  │     Security        │  │
│  └─────────────┘                │  └─────────────────────┘  │
└─────────────────────────────────┴───────────────────────────┘`
      }
    },
    {
      id: 'basics-2',
      title: 'Server, API, and Database Concepts',
      description: 'Learn how servers provide services, APIs enable communication, and databases store information.',
      codeSnippet: {
        language: 'text',
        code: `Server: Computer that provides services
API: Rules for communication between applications
Database: Organized data storage

Example: Login System
1. User enters credentials (Frontend)
2. Frontend sends data to Backend via API
3. Backend checks Database
4. Backend sends response to Frontend

🌐 SYSTEM ARCHITECTURE DIAGRAM:
┌─────────────────┐    HTTP Request    ┌─────────────────┐
│                 │ ──────────────────→ │                 │
│   FRONTEND      │                     │    BACKEND      │
│   (Browser)     │                     │   (Server)      │
│                 │ ←────────────────── │                 │
└─────────────────┘   HTTP Response    └─────────────────┘
                              │
                              │ API Endpoints
                              │ /login, /register, /users
                              ▼
                    ┌─────────────────┐
                    │                 │
                    │   DATABASE      │
                    │   (MySQL)       │
                    │                 │
                    └─────────────────┘

📋 API ENDPOINTS EXAMPLE:
┌─────────────┬─────────────┬─────────────────┬─────────────┐
│ HTTP Method │ Endpoint    │ Description     │ Response    │
├─────────────┼─────────────┼─────────────────┼─────────────┤
│ POST        │ /api/login  │ User Login      │ JWT Token   │
│ POST        │ /api/register│ User Registration│ Success Msg │
│ GET         │ /api/users  │ Get User List   │ User Data   │
│ PUT         │ /api/users  │ Update User     │ Updated Data│
│ DELETE      │ /api/users  │ Delete User     │ Success Msg │
└─────────────┴─────────────┴─────────────────┴─────────────┘`
      }
    },
    {
      id: 'basics-3',
      title: 'API Request and Response',
      description: 'Understand how HTTP requests and responses work for communication between frontend and backend.',
      codeSnippet: {
        language: 'text',
        code: `HTTP Request:
- Method: GET, POST, PUT, DELETE
- Headers: Authentication, content type
- Body: Data being sent

HTTP Response:
- Status Code: 200 (success), 404 (not found), 500 (error)
- Headers: Response information
- Body: Data returned

📡 HTTP REQUEST/RESPONSE FLOW DIAGRAM:
┌─────────────────────────────────────────────────────────────────┐
│                        HTTP REQUEST                            │
├─────────────────────────────────────────────────────────────────┤
│ Method: POST                                                    │
│ URL: https://api.example.com/login                             │
│ Headers: {                                                      │
│   Content-Type: application/json                               │
│   Authorization: Bearer <token>                                 │
│ }                                                              │
│ Body: {                                                        │
│   "username": "john_doe",                                      │
│   "password": "secure123"                                      │
│ }                                                              │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SERVER PROCESSING                        │
├─────────────────────────────────────────────────────────────────┤
│ 1. Receive Request                                             │
│ 2. Validate Input                                              │
│ 3. Check Database                                              │
│ 4. Generate Response                                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       HTTP RESPONSE                            │
├─────────────────────────────────────────────────────────────────┤
│ Status: 200 OK                                                 │
│ Headers: {                                                     │
│   Content-Type: application/json                               │
│   Set-Cookie: session=abc123                                   │
│ }                                                              │
│ Body: {                                                        │
│   "success": true,                                             │
│   "message": "Login successful",                               │
│   "user": {                                                    │
│     "id": 123,                                                 │
│     "username": "john_doe"                                     │
│   }                                                            │
│ }                                                              │
└─────────────────────────────────────────────────────────────────┘

🔢 HTTP STATUS CODES:
┌─────────┬─────────────────┬─────────────────────────────────────┐
│ Code    │ Category        │ Description                         │
├─────────┼─────────────────┼─────────────────────────────────────┤
│ 2xx     │ Success         │ Request completed successfully      │
│ 200     │ OK              │ Request succeeded                   │
│ 201     │ Created         │ Resource created successfully       │
├─────────┼─────────────────┼─────────────────────────────────────┤
│ 4xx     │ Client Error    │ Request contains bad syntax         │
│ 400     │ Bad Request     │ Invalid request format              │
│ 401     │ Unauthorized    │ Authentication required             │
│ 404     │ Not Found       │ Resource not found                  │
├─────────┼─────────────────┼─────────────────────────────────────┤
│ 5xx     │ Server Error    │ Server failed to fulfill request   │
│ 500     │ Internal Error  │ Server encountered an error         │
│ 503     │ Service Unavailable│ Server temporarily unavailable   │
└─────────┴─────────────────┴─────────────────────────────────────┘`
      }
    }
  ],
  tips: 'Think of a restaurant: Frontend is the dining area (what customers see), Backend is the kitchen (where work happens), API is the menu (how to order), and Database is the pantry (where ingredients are stored).',
  prerequisites: 'Basic understanding of web browsers and internet',
  liveSessionNotes: 'Start with simple analogies. Draw diagrams showing client-server communication. Use real examples like login forms to demonstrate the flow.',
  commonQuestions: [
    {
      question: 'What is the difference between frontend and backend?',
      answer: 'Frontend is what users see and interact with in their browser (HTML, CSS, JavaScript). Backend is the server-side logic that processes requests, manages databases, and handles business logic. Think of frontend as the user interface and backend as the engine that powers the application.'
    },
    {
      question: 'Why do we need both frontend and backend?',
      answer: 'Frontend provides the user experience and interface, while backend handles data processing, security, and business logic. Separating them allows for better scalability, security, and maintainability. Frontend can be updated independently, and backend can serve multiple frontend applications.'
    },
    {
      question: 'What is an API and why is it important?',
      answer: 'An API (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other. It\'s important because it enables frontend and backend to exchange data, allows different systems to integrate, and provides a standardized way for applications to interact.'
    },
    {
      question: 'How do frontend and backend communicate?',
      answer: 'Frontend and backend communicate through HTTP requests and responses. The frontend sends HTTP requests (GET, POST, PUT, DELETE) to specific API endpoints on the backend. The backend processes these requests, interacts with the database if needed, and sends back HTTP responses with data or status information.'
    }
  ]
};
