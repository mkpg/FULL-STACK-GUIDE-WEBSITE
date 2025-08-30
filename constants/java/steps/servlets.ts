// Java Servlets Steps - Creating Authentication Servlets
export const JAVA_SERVLETS_STEPS = [
  {
    id: 'java-3',
    title: 'Create Database Connection Utility',
    description: 'Implement a database connection utility class for managing MySQL connections with connection pooling and proper resource management.',
    detailedSteps: [
      'Create database utility class',
      'Implement connection pooling',
      'Add proper resource cleanup',
      'Handle database connection errors',
      'Load database properties from file'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Create database utility class
touch src/main/java/com/workshop/auth/util/DatabaseUtil.java

# Create model classes directory
mkdir -p src/main/java/com/workshop/auth/model`
    },
    fileCreationSteps: [
      '📄 Create: src/main/java/com/workshop/auth/util/DatabaseUtil.java',
      '📄 Create: src/main/java/com/workshop/auth/model/User.java',
      '📄 Create: src/main/java/com/workshop/auth/model/AuthRequest.java',
      '📄 Create: src/main/java/com/workshop/auth/model/AuthResponse.java',
      '🔧 Add: Database connection methods',
      '🔧 Add: Connection pooling logic',
      '🔧 Add: Resource cleanup methods',
      '🔧 Add: Error handling and logging'
    ],
    codeSnippet: {
      language: 'java',
      code: `// src/main/java/com/workshop/auth/model/User.java
package com.workshop.auth.model;

import java.time.LocalDateTime;

public class User {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public User() {}

    public User(String username, String email, String password, String firstName, String lastName) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

// src/main/java/com/workshop/auth/model/AuthRequest.java
package com.workshop.auth.model;

public class AuthRequest {
    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private String firstName;
    private String lastName;

    // Constructors
    public AuthRequest() {}

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
}

// src/main/java/com/workshop/auth/model/AuthResponse.java
package com.workshop.auth.model;

public class AuthResponse {
    private boolean success;
    private String message;
    private User user;
    private String token;

    // Constructors
    public AuthResponse() {}

    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public AuthResponse(boolean success, String message, User user) {
        this.success = success;
        this.message = message;
        this.user = user;
    }

    // Getters and Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}

// src/main/java/com/workshop/auth/util/DatabaseUtil.java
package com.workshop.auth.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Logger;

public class DatabaseUtil {
    private static final Logger logger = Logger.getLogger(DatabaseUtil.class.getName());
    private static final Properties properties = new Properties();
    private static final String CONFIG_FILE = "database.properties";
    
    static {
        try (InputStream input = DatabaseUtil.class.getClassLoader().getResourceAsStream(CONFIG_FILE)) {
            if (input == null) {
                throw new RuntimeException("Unable to find " + CONFIG_FILE);
            }
            properties.load(input);
        } catch (IOException e) {
            logger.severe("Error loading database properties: " + e.getMessage());
            throw new RuntimeException("Error loading database properties", e);
        }
    }
    
    public static Connection getConnection() throws SQLException {
        try {
            Class.forName(properties.getProperty("db.driver"));
            return DriverManager.getConnection(
                properties.getProperty("db.url"),
                properties.getProperty("db.username"),
                properties.getProperty("db.password")
            );
        } catch (ClassNotFoundException e) {
            logger.severe("Database driver not found: " + e.getMessage());
            throw new SQLException("Database driver not found", e);
        }
    }
    
    public static void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                logger.warning("Error closing database connection: " + e.getMessage());
            }
        }
    }
    
    public static void rollbackTransaction(Connection connection) {
        if (connection != null) {
            try {
                connection.rollback();
            } catch (SQLException e) {
                logger.warning("Error rolling back transaction: " + e.getMessage());
            }
        }
    }
}`
    },
    verificationSteps: [
      '📄 Verify: All model classes created correctly',
      '📄 Check: DatabaseUtil.java with proper error handling',
      '🔧 Test: Java compilation (mvn compile)',
      '📝 Verify: All getters and setters are present',
      '🔧 Check: Database properties loading works',
      '🔧 Verify: Connection management methods exist'
    ],
    additionalThoughts: 'Model classes provide a clean structure for data transfer between layers. The DatabaseUtil class centralizes database connection logic and provides proper resource management. Using LocalDateTime for timestamps gives us better date handling than the older Date class.'
  },
  {
    id: 'java-4',
    title: 'Create Login Servlet',
    description: 'Implement the LoginServlet to handle user authentication with password verification using BCrypt and proper session management.',
    detailedSteps: [
      'Create LoginServlet class extending HttpServlet',
      'Implement doPost method for login requests',
      'Add password verification with BCrypt',
      'Implement session management',
      'Add proper error handling and JSON responses',
      'Include input validation and security measures'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Create servlets directory
mkdir -p src/main/java/com/workshop/auth/servlet

# Create login servlet
touch src/main/java/com/workshop/auth/servlet/LoginServlet.java`
    },
    fileCreationSteps: [
      '📄 Create: src/main/java/com/workshop/auth/servlet/LoginServlet.java',
      '🔧 Add: HttpServlet extension and imports',
      '🔧 Add: doPost method implementation',
      '🔧 Add: BCrypt password verification',
      '🔧 Add: Session management logic',
      '🔧 Add: Input validation methods',
      '🔧 Add: JSON response handling',
      '🔧 Add: Error handling and logging'
    ],
    codeSnippet: {
      language: 'java',
      code: `// src/main/java/com/workshop/auth/servlet/LoginServlet.java
package com.workshop.auth.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.workshop.auth.model.AuthRequest;
import com.workshop.auth.model.AuthResponse;
import com.workshop.auth.model.User;
import com.workshop.auth.util.DatabaseUtil;
import org.mindrot.jbcrypt.BCrypt;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Logger;

@WebServlet("/api/auth/login")
public class LoginServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(LoginServlet.class.getName());
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        try {
            // Parse request body
            AuthRequest authRequest = parseRequest(request);
            
            // Validate input
            if (!validateLoginRequest(authRequest)) {
                sendErrorResponse(response, "Invalid input data", 400);
                return;
            }
            
            // Authenticate user
            User user = authenticateUser(authRequest.getUsername(), authRequest.getPassword());
            
            if (user != null) {
                // Create session
                HttpSession session = request.getSession();
                session.setAttribute("userId", user.getId());
                session.setAttribute("username", user.getUsername());
                session.setMaxInactiveInterval(1800); // 30 minutes
                
                // Create response
                AuthResponse authResponse = new AuthResponse(true, "Login successful", user);
                String jsonResponse = objectMapper.writeValueAsString(authResponse);
                
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write(jsonResponse);
                
                logger.info("User logged in successfully: " + user.getUsername());
            } else {
                sendErrorResponse(response, "Invalid username or password", 401);
            }
            
        } catch (Exception e) {
            logger.severe("Error during login: " + e.getMessage());
            sendErrorResponse(response, "Internal server error", 500);
        }
    }

    private AuthRequest parseRequest(HttpServletRequest request) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }
        return objectMapper.readValue(sb.toString(), AuthRequest.class);
    }

    private boolean validateLoginRequest(AuthRequest request) {
        return request != null && 
               request.getUsername() != null && 
               !request.getUsername().trim().isEmpty() &&
               request.getPassword() != null && 
               !request.getPassword().isEmpty();
    }

    private User authenticateUser(String username, String password) {
        String sql = "SELECT id, username, email, password, first_name, last_name, created_at, updated_at " +
                    "FROM users WHERE username = ?";
        
        try (Connection connection = DatabaseUtil.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            
            stmt.setString(1, username);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    String hashedPassword = rs.getString("password");
                    
                    // Verify password with BCrypt
                    if (BCrypt.checkpw(password, hashedPassword)) {
                        User user = new User();
                        user.setId(rs.getLong("id"));
                        user.setUsername(rs.getString("username"));
                        user.setEmail(rs.getString("email"));
                        user.setFirstName(rs.getString("first_name"));
                        user.setLastName(rs.getString("last_name"));
                        user.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
                        user.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());
                        
                        return user;
                    }
                }
            }
        } catch (SQLException e) {
            logger.severe("Database error during authentication: " + e.getMessage());
        }
        
        return null;
    }

    private void sendErrorResponse(HttpServletResponse response, String message, int status) 
            throws IOException {
        AuthResponse errorResponse = new AuthResponse(false, message);
        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        
        response.setStatus(status);
        response.getWriter().write(jsonResponse);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        response.getWriter().write("{\"error\": \"GET method not allowed\"}");
    }
}`
    },
    verificationSteps: [
      '📄 Verify: LoginServlet.java created correctly',
      '🔧 Test: Java compilation (mvn compile)',
      '📝 Verify: doPost method implemented',
      '🔧 Check: BCrypt password verification works',
      '🔧 Test: Session management functionality',
      '🔧 Verify: Error handling and logging',
      '🔧 Check: JSON response formatting'
    ],
    additionalThoughts: 'The LoginServlet demonstrates proper HTTP method handling, input validation, secure password verification with BCrypt, and session management. The @WebServlet annotation provides a modern way to configure servlet mappings. Always use prepared statements to prevent SQL injection attacks.'
  },
  {
    id: 'java-5',
    title: 'Create Register Servlet',
    description: 'Implement the RegisterServlet to handle user registration with password hashing, input validation, and duplicate checking.',
    detailedSteps: [
      'Create RegisterServlet class extending HttpServlet',
      'Implement doPost method for registration requests',
      'Add comprehensive input validation',
      'Implement password hashing with BCrypt',
      'Add duplicate username/email checking',
      'Include proper error handling and JSON responses'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Create register servlet file
touch src/main/java/com/workshop/auth/servlet/RegisterServlet.java

# Create CORS filter for cross-origin requests
touch src/main/java/com/workshop/auth/filter/CORSFilter.java`
    },
    fileCreationSteps: [
      '📄 Create: src/main/java/com/workshop/auth/servlet/RegisterServlet.java',
      '📄 Create: src/main/java/com/workshop/auth/filter/CORSFilter.java',
      '🔧 Add: HttpServlet extension and imports',
      '🔧 Add: doPost method implementation',
      '🔧 Add: Comprehensive input validation',
      '🔧 Add: BCrypt password hashing',
      '🔧 Add: Duplicate checking logic',
      '🔧 Add: JSON response handling',
      '🔧 Add: Error handling and logging',
      '🔧 Add: CORS filter implementation'
    ],
    codeSnippet: {
      language: 'java',
      code: `// src/main/java/com/workshop/auth/servlet/RegisterServlet.java
package com.workshop.auth.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.workshop.auth.model.AuthRequest;
import com.workshop.auth.model.AuthResponse;
import com.workshop.auth.model.User;
import com.workshop.auth.util.DatabaseUtil;
import org.mindrot.jbcrypt.BCrypt;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Logger;

@WebServlet("/api/auth/register")
public class RegisterServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(RegisterServlet.class.getName());
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        try {
            // Parse request body
            AuthRequest authRequest = parseRequest(request);
            
            // Validate input
            String validationError = validateRegistrationRequest(authRequest);
            if (validationError != null) {
                sendErrorResponse(response, validationError, 400);
                return;
            }
            
            // Check for duplicate username/email
            String duplicateError = checkForDuplicates(authRequest.getUsername(), authRequest.getEmail());
            if (duplicateError != null) {
                sendErrorResponse(response, duplicateError, 409);
                return;
            }
            
            // Hash password and create user
            User newUser = createUser(authRequest);
            
            // Save user to database
            boolean saved = saveUserToDatabase(newUser);
            
            if (saved) {
                // Create success response
                AuthResponse authResponse = new AuthResponse(true, "Registration successful", newUser);
                String jsonResponse = objectMapper.writeValueAsString(authResponse);
                
                response.setStatus(HttpServletResponse.SC_CREATED);
                response.getWriter().write(jsonResponse);
                
                logger.info("User registered successfully: " + newUser.getUsername());
            } else {
                sendErrorResponse(response, "Failed to save user", 500);
            }
            
        } catch (Exception e) {
            logger.severe("Error during registration: " + e.getMessage());
            sendErrorResponse(response, "Internal server error", 500);
        }
    }

    private AuthRequest parseRequest(HttpServletRequest request) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }
        return objectMapper.readValue(sb.toString(), AuthRequest.class);
    }

    private String validateRegistrationRequest(AuthRequest request) {
        if (request == null) {
            return "Request data is required";
        }
        
        // Username validation
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return "Username is required";
        }
        if (request.getUsername().length() < 3) {
            return "Username must be at least 3 characters";
        }
        if (!request.getUsername().matches("^[a-zA-Z0-9_]+$")) {
            return "Username can only contain letters, numbers, and underscores";
        }
        
        // Email validation
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return "Email is required";
        }
        if (!request.getEmail().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            return "Please enter a valid email address";
        }
        
        // Password validation
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return "Password is required";
        }
        if (request.getPassword().length() < 8) {
            return "Password must be at least 8 characters";
        }
        if (!request.getPassword().matches("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*")) {
            return "Password must contain at least one lowercase letter, one uppercase letter, and one number";
        }
        
        // Confirm password validation
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return "Passwords do not match";
        }
        
        // Name validation
        if (request.getFirstName() == null || request.getFirstName().trim().isEmpty()) {
            return "First name is required";
        }
        if (request.getLastName() == null || request.getLastName().trim().isEmpty()) {
            return "Last name is required";
        }
        
        return null; // No validation errors
    }

    private String checkForDuplicates(String username, String email) {
        String sql = "SELECT COUNT(*) FROM users WHERE username = ? OR email = ?";
        
        try (Connection connection = DatabaseUtil.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            
            stmt.setString(1, username);
            stmt.setString(2, email);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next() && rs.getInt(1) > 0) {
                    // Check which field is duplicate
                    if (isUsernameDuplicate(username)) {
                        return "Username already exists";
                    } else {
                        return "Email already exists";
                    }
                }
            }
        } catch (SQLException e) {
            logger.severe("Database error during duplicate check: " + e.getMessage());
            return "Error checking for duplicates";
        }
        
        return null; // No duplicates found
    }

    private boolean isUsernameDuplicate(String username) {
        String sql = "SELECT COUNT(*) FROM users WHERE username = ?";
        
        try (Connection connection = DatabaseUtil.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            
            stmt.setString(1, username);
            
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next() && rs.getInt(1) > 0;
            }
        } catch (SQLException e) {
            logger.severe("Database error checking username: " + e.getMessage());
            return false;
        }
    }

    private User createUser(AuthRequest request) {
        // Hash password with BCrypt
        String hashedPassword = BCrypt.hashpw(request.getPassword(), BCrypt.gensalt());
        
        return new User(
            request.getUsername(),
            request.getEmail(),
            hashedPassword,
            request.getFirstName(),
            request.getLastName()
        );
    }

    private boolean saveUserToDatabase(User user) {
        String sql = "INSERT INTO users (username, email, password, first_name, last_name, created_at, updated_at) " +
                    "VALUES (?, ?, ?, ?, ?, NOW(), NOW())";
        
        try (Connection connection = DatabaseUtil.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword());
            stmt.setString(4, user.getFirstName());
            stmt.setString(5, user.getLastName());
            
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
            
        } catch (SQLException e) {
            logger.severe("Database error saving user: " + e.getMessage());
            return false;
        }
    }

    private void sendErrorResponse(HttpServletResponse response, String message, int status) 
            throws IOException {
        AuthResponse errorResponse = new AuthResponse(false, message);
        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        
        response.setStatus(status);
        response.getWriter().write(jsonResponse);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        response.getWriter().write("{\"error\": \"GET method not allowed\"}");
    }
}

// src/main/java/com/workshop/auth/filter/CORSFilter.java
package com.workshop.auth.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CORSFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        
        // Allow requests from any origin (for development)
        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        
        // Allow specific HTTP methods
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        
        // Allow specific headers
        httpResponse.setHeader("Access-Control-Allow-Headers", 
            "Origin, Content-Type, Accept, Authorization, X-Requested-With");
        
        // Allow credentials
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
        
        // Handle preflight requests
        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
            httpResponse.setStatus(HttpServletResponse.SC_OK);
            return;
        }
        
        chain.doFilter(request, response);
    }
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization code if needed
    }
    
    @Override
    public void destroy() {
        // Cleanup code if needed
    }
}`
    },
    verificationSteps: [
      '📄 Verify: RegisterServlet.java created correctly',
      '📄 Verify: CORSFilter.java created correctly',
      '🔧 Test: Java compilation (mvn compile)',
      '📝 Verify: doPost method implemented',
      '🔧 Check: Input validation works correctly',
      '🔧 Test: BCrypt password hashing',
      '🔧 Verify: Duplicate checking functionality',
      '🔧 Check: CORS headers are set properly',
      '🔧 Test: Error handling and logging'
    ],
    additionalThoughts: 'The RegisterServlet demonstrates comprehensive input validation, secure password handling, and proper error management. The CORS filter is essential for allowing frontend applications to communicate with the API. The duplicate checking logic prevents data integrity issues, while the BCrypt password hashing ensures security. Always validate input on the server side, even if client-side validation exists.'
  }
];
