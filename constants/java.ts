// Java Section - Complete Java Servlet API with Authentication
import { JAVA_OVERVIEW } from './java/overview';
import { JAVA_SETUP_STEPS } from './java/steps/setup';
import { JAVA_SERVLETS_STEPS } from './java/steps/servlets';
import { JAVA_TESTING_STEPS } from './java/steps/testing';

export const JAVA_SECTION = {
  id: 'java',
  title: 'Java Servlets: Enterprise Backend Development',
  description: 'Build a complete Java Servlet API with JDBC database connectivity, password hashing, and RESTful endpoints for user authentication.',
  overview: 'Learn Java Servlets and create a robust backend API with MySQL database integration, secure password handling using BCrypt, and comprehensive testing with Postman.',
  coreConcepts: [
    '**Java Web Technologies:** Servlets, JSP, JSTL, and the Java EE ecosystem',
    '**Servlet Architecture:** Request-response model, HTTP protocol handling, and servlet lifecycle',
    '**Servlet Lifecycle Management:** init(), service(), destroy() methods and their execution order',
    '**HTTP Methods & Handling:** GET, POST, PUT, DELETE operations with doGet(), doPost() methods',
    '**Session Management:** HttpSession interface, session creation, tracking, and security',
    '**Database Connectivity:** JDBC (Java Database Connectivity) with connection pooling',
    '**Connection Pooling:** HikariCP, Apache DBCP for efficient database connection management',
    '**Prepared Statements:** SQL injection prevention and parameterized query execution',
    '**Transaction Management:** ACID properties, commit, rollback, and connection handling',
    '**RESTful API Design:** HTTP status codes, JSON responses, and REST principles',
    '**Security Implementation:** Password hashing with BCrypt, input validation, and CORS handling',
    '**Error Handling & Logging:** Exception handling, custom error pages, and application logging',
    '**Configuration Management:** web.xml deployment descriptor and servlet mappings',
    '**Build Tools & Dependencies:** Maven project structure, dependency management, and packaging',
    '**Application Deployment:** WAR file creation, Tomcat server deployment, and production setup',
    '**Testing & Quality Assurance:** Unit testing, integration testing, and Postman API testing',
    '**Performance Optimization:** Connection pooling, caching strategies, and code efficiency',
    '**Enterprise Patterns:** MVC architecture, DAO pattern, and service layer implementation'
  ],
  steps: [
    ...JAVA_SETUP_STEPS,
    ...JAVA_SERVLETS_STEPS,
    ...JAVA_TESTING_STEPS
  ],
  technologies: ['Java 17', 'Java Servlets', 'JDBC', 'MySQL', 'Maven', 'Apache Tomcat', 'BCrypt', 'RESTful API'],
  prerequisites: 'Basic Java programming knowledge, understanding of HTTP protocol, basic SQL knowledge',
  learningOutcomes: [
    'Understand Java Servlet lifecycle and architecture',
    'Implement secure authentication with password hashing',
    'Connect to MySQL database using JDBC',
    'Build RESTful API endpoints with proper HTTP methods',
    'Manage database connections and transactions',
    'Test APIs comprehensively using Postman',
    'Deploy applications to Apache Tomcat server',
    'Apply security best practices in web applications'
  ],
  commonQuestions: [
    {
      question: 'What is the difference between Servlets and JSP?',
      answer: 'Servlets are Java classes that handle HTTP requests and responses programmatically, while JSP (JavaServer Pages) are HTML pages with embedded Java code. Servlets are better for complex business logic and API development, while JSP is ideal for presentation logic and dynamic content generation. Servlets provide more control over the HTTP lifecycle and are better suited for building RESTful APIs. JSP is compiled into Servlets at runtime, so they ultimately become Servlets anyway.'
    },
    {
      question: 'Why use BCrypt for password hashing?',
      answer: 'BCrypt is a secure password hashing algorithm designed specifically for password storage. It automatically generates a random salt for each password, making rainbow table attacks ineffective. BCrypt is adaptive, meaning you can increase the computational cost as hardware becomes faster, keeping it secure over time. It\'s much more secure than simple hashing algorithms like MD5 or SHA-1, which are vulnerable to brute force attacks and rainbow tables. Always use BCrypt or similar algorithms like Argon2 for password storage.'
    },
    {
      question: 'How does JDBC connection pooling work?',
      answer: 'JDBC connection pooling maintains a pool of database connections that can be reused instead of creating new connections for each request. This significantly improves performance by avoiding the overhead of establishing new database connections. The pool manages connection lifecycle, validates connections, and handles connection failures gracefully. Popular connection pooling libraries include HikariCP, Apache DBCP, and C3P0. Connection pooling is essential for production applications to handle concurrent users efficiently.'
    },
    {
      question: 'What is the Servlet lifecycle?',
      answer: 'The Servlet lifecycle consists of three main phases: 1) Initialization - the init() method is called once when the servlet is first loaded, 2) Request handling - the service() method (or doGet/doPost) is called for each request, and 3) Destruction - the destroy() method is called when the servlet is unloaded. The init() method is ideal for one-time setup like loading configuration files or establishing database connections. The destroy() method is used for cleanup operations like closing database connections.'
    },
    {
      question: 'How do I handle CORS in Java Servlets?',
      answer: 'CORS (Cross-Origin Resource Sharing) can be handled in Java Servlets by creating a filter that adds the necessary HTTP headers to responses. The filter should add headers like Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers. You can configure the filter in web.xml or use annotations. For development, you might allow all origins (*), but for production, specify exact allowed origins. CORS is essential when your frontend and backend are served from different domains or ports.'
    },
    {
      question: 'What are the best practices for Servlet security?',
      answer: 'Servlet security best practices include: 1) Always validate and sanitize input data, 2) Use prepared statements to prevent SQL injection, 3) Hash passwords with strong algorithms like BCrypt, 4) Implement proper session management with timeouts, 5) Use HTTPS in production, 6) Validate file uploads and restrict file types, 7) Implement rate limiting to prevent abuse, 8) Log security events for monitoring, 9) Keep dependencies updated, and 10) Use security headers like X-Frame-Options and Content-Security-Policy.'
    }
  ]
};
