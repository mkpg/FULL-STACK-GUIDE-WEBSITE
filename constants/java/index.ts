// Java Section Index - Export all Java components
export { JAVA_OVERVIEW } from './overview';
export { JAVA_SETUP_STEPS } from './steps/setup';
export { JAVA_SERVLETS_STEPS } from './steps/servlets';
export { JAVA_TESTING_STEPS } from './steps/testing';

// Java Section Configuration
export const JAVA_SECTION_CONFIG = {
  title: 'Java Servlets: Enterprise Backend Development',
  description: 'Build a complete Java Servlet API with JDBC database connectivity, password hashing, and RESTful endpoints for user authentication.',
  overview: 'Learn Java Servlets and create a robust backend API with MySQL database integration, secure password handling using BCrypt, and comprehensive testing with Postman.',
  totalSteps: 9,
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
  ]
};
