# Full-Stack Workshop Guide - One Day Intensive

## Workshop Overview
**Duration:** 8 Hours  
**Format:** Theory + Hands-on Lab Sessions  
**Prerequisites:** Basic programming knowledge  

---

## Learning Path

### 1. Basics
- Frontend and Backend fundamentals
- Server, API, and Database concepts
- API Request and Response understanding

### 2. Frontend
- **Angular:** Explanation and hands-on lab (login page + home page application)
- **React:** Explanation and hands-on lab (login page + home page application)

### 3. Backend
- **PHP:** Setup and API creation for login with SQL connectivity
- **Java Servlets:** Same functionality with Java

---

## Session 1: Basics

### 1.1 Frontend and Backend Fundamentals
- **Frontend:** What users see and interact with (HTML, CSS, JavaScript)
- **Backend:** Server-side logic, databases, and business logic
- **Client-Server Architecture:** How frontend and backend communicate

### 1.2 What is Server, API, and Database
- **Server:** Computer that provides services to other computers (clients)
- **API (Application Programming Interface):** Set of rules for how applications communicate
- **Database:** Organized collection of structured information

### 1.3 API Request and Response
- **HTTP Methods:** GET, POST, PUT, DELETE
- **Request Structure:** Headers, Body, Parameters
- **Response Structure:** Status Code, Headers, Body

**Hands-on Exercise 1:** Create a simple HTML form and understand HTTP requests

---

## Session 2: Frontend - Angular

### 2.1 Angular Explanation
- **What is Angular:** Modern frontend framework by Google
- **MVC Architecture:** Model-View-Controller pattern
- **Key Concepts:** Components, Services, Dependency Injection

### 2.2 Hands-on Angular Lab
**Objective:** Create an Angular application with login and home pages

**Step 1: Setup Angular CLI**
```bash
npm install -g @angular/cli
ng new workshop-app
cd workshop-app
```

**Step 2: Create Components**
```bash
ng generate component login
ng generate component home
ng generate component navbar
```

**Step 3: Implement Login Page**
- Form with username/password fields
- Basic validation
- Navigation to home page

**Step 4: Implement Home Page**
- Welcome message
- User information display
- Logout functionality

**Step 5: Routing Setup**
- Configure Angular Router
- Implement route guards for authentication

---

## Session 3: Frontend - React

### 3.1 React Explanation
- **What is React:** JavaScript library for building user interfaces by Facebook
- **Component-Based Architecture:** Reusable UI components
- **Virtual DOM:** Efficient rendering mechanism

### 3.2 Hands-on React Lab
**Objective:** Create a React application with login and home pages

**Step 1: Setup React App**
```bash
npx create-react-app workshop-react --template typescript
cd workshop-react
npm install react-router-dom
```

**Step 2: Create Components**
- Login component
- Home component
- Navigation component

**Step 3: Implement Login Page**
- Form with username/password fields
- State management with useState
- Form validation

**Step 4: Implement Home Page**
- Protected route
- User dashboard
- Logout functionality

**Step 5: Routing and State Management**
- React Router setup
- Context API for authentication state

---

## Session 4: Backend - PHP

### 4.1 PHP Setup and API Development
- **PHP Installation:** XAMPP/WAMP setup
- **Basic PHP Syntax:** Variables, functions, control structures
- **Database Connectivity:** MySQL integration

### 4.2 Hands-on PHP Lab
**Objective:** Create PHP APIs for login system with MySQL

**Step 1: Environment Setup**
- Install XAMPP
- Start Apache and MySQL services
- Create database and tables

**Step 2: Database Schema**
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Step 3: PHP API Endpoints**
- User registration API
- User login API
- User profile API
- Logout API

**Step 4: Security Implementation**
- Password hashing with password_hash()
- Session management
- Input validation and sanitization

**Step 5: Testing APIs**
- Use Postman or similar tool
- Test all CRUD operations
- Verify error handling

---

## Session 5: Backend - Java Servlets

### 5.1 Java Servlet Architecture
- **Servlet Lifecycle:** init(), service(), destroy()
- **Request Handling:** GET and POST methods
- **Session Management:** Cookies and session handling

### 5.2 Hands-on Java Servlet Lab
**Objective:** Create Java servlet APIs for login system with JDBC

**Step 1: Project Setup**
- Create Java web project
- Configure web.xml
- Add servlet dependencies

**Step 2: Database Connectivity**
- JDBC driver setup
- Connection pooling
- SQL queries for user operations

**Step 3: Servlet Implementation**
- LoginServlet for authentication
- RegistrationServlet for user creation
- ProfileServlet for user data
- LogoutServlet for session termination

**Step 4: Session Management**
- HttpSession implementation
- Cookie handling
- Security considerations

---

## Workshop Materials and Resources

### Required Software
- **Frontend:** Node.js, Angular CLI, Create React App
- **Backend:** XAMPP (PHP), Java JDK, Apache Tomcat
- **Database:** MySQL
- **Tools:** VS Code, Postman, Git

### Code Repositories
- Angular Workshop App: [GitHub Link]
- React Workshop App: [GitHub Link]
- PHP API Backend: [GitHub Link]
- Java Servlet Backend: [GitHub Link]

### Reference Materials
- HTML5 & CSS3 Documentation
- JavaScript ES6+ Guide
- Angular Official Documentation
- React Official Documentation
- PHP Manual
- Java Servlet Specification

---

## Assessment and Evaluation

### Hands-on Projects (60%)
- Angular Application: 20%
- React Application: 20%
- PHP API Backend: 15%
- Java Servlet Backend: 5%

### Theory Understanding (40%)
- Basic concepts quiz
- Architecture understanding
- Best practices discussion

---

## Workshop Outcomes

By the end of this workshop, participants will be able to:

1. **Understand** the fundamentals of web development architecture
2. **Create** modern frontend applications using Angular and React
3. **Develop** backend APIs using PHP and Java Servlets
4. **Connect** frontend and backend applications
5. **Implement** basic authentication and authorization
6. **Deploy** full-stack web applications

---

## Next Steps and Advanced Topics

- **Frontend:** State management (Redux, NgRx), testing frameworks
- **Backend:** RESTful API design, microservices architecture
- **Database:** Advanced SQL, NoSQL databases, ORM tools
- **DevOps:** CI/CD pipelines, containerization, cloud deployment

---

*This workshop provides a solid foundation for full-stack web development. Practice the concepts learned and build upon them to create more complex applications.*
