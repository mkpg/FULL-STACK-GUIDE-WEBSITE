# Java Servlets Lab Session - Login System with JDBC

## Prerequisites
- Java JDK 8 or higher installed
- Apache Tomcat 9.x installed
- MySQL database running
- IDE (Eclipse, IntelliJ IDEA, or NetBeans)
- Basic knowledge of Java and SQL

## Lab Objectives
1. Set up Java web development environment
2. Create a Java web project with servlets
3. Implement JDBC database connectivity
4. Create authentication servlets (login, logout, profile)
5. Implement session management and security
6. Deploy and test the web application

## Step 1: Environment Setup

### Install Java JDK
1. Download JDK from Oracle or OpenJDK
2. Set JAVA_HOME environment variable
3. Add Java to PATH

### Install Apache Tomcat
1. Download Tomcat 9.x from https://tomcat.apache.org/
2. Extract to a directory (e.g., `C:\apache-tomcat-9.0.x`)
3. Set CATALINA_HOME environment variable

### Verify Installation
```bash
java -version
javac -version
echo %JAVA_HOME%
echo %CATALINA_HOME%
```

## Step 2: Create Java Web Project

### Project Structure
```
workshop-servlets/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── com/
│   │   │   │   └── workshop/
│   │   │   │       ├── servlets/
│   │   │   │       ├── models/
│   │   │   │       ├── dao/
│   │   │   │       └── utils/
│   │   │   └── META-INF/
│   │   ├── webapp/
│   │   │   ├── WEB-INF/
│   │   │   ├── css/
│   │   │   ├── js/
│   │   │   └── index.html
│   │   └── resources/
│   └── test/
├── pom.xml (if using Maven)
└── web.xml
```

### Create Maven Project (Recommended)
```xml
<!-- pom.xml -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.workshop</groupId>
    <artifactId>workshop-servlets</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    
    <dependencies>
        <!-- Servlet API -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>
        </dependency>
        
        <!-- JSTL -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>
        
        <!-- MySQL Connector -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.27</version>
        </dependency>
        
        <!-- JSON Processing -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.13.0</version>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.3.1</version>
            </plugin>
        </plugins>
    </build>
</project>
```

## Step 3: Database Setup

### Create Database and Tables
```sql
-- Create database
CREATE DATABASE workshop_db;
USE workshop_db;

-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert demo user (password: 'password')
INSERT INTO users (username, email, password) VALUES 
('admin', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Create user_sessions table
CREATE TABLE user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Step 4: Database Connection Utility

### Create `src/main/java/com/workshop/utils/DatabaseConnection.java`
```java
package com.workshop.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/workshop_db";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "";
    
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("MySQL JDBC Driver not found", e);
        }
    }
    
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }
    
    public static void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

## Step 5: User Model

### Create `src/main/java/com/workshop/models/User.java`
```java
package com.workshop.models;

import java.sql.Timestamp;

public class User {
    private int id;
    private String username;
    private String email;
    private String password;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    
    // Constructors
    public User() {}
    
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    
    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
    
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
```

## Step 6: User DAO (Data Access Object)

### Create `src/main/java/com/workshop/dao/UserDAO.java`
```java
package com.workshop.dao;

import com.workshop.models.User;
import com.workshop.utils.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {
    
    // Create new user
    public boolean createUser(User user) {
        String sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, user.getUsername());
            pstmt.setString(2, user.getEmail());
            pstmt.setString(3, user.getPassword());
            
            return pstmt.executeUpdate() > 0;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    // Get user by username
    public User getUserByUsername(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                return mapResultSetToUser(rs);
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return null;
    }
    
    // Get user by email
    public User getUserByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, email);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                return mapResultSetToUser(rs);
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return null;
    }
    
    // Get user by ID
    public User getUserById(int id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                return mapResultSetToUser(rs);
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return null;
    }
    
    // Check if username exists
    public boolean usernameExists(String username) {
        String sql = "SELECT COUNT(*) FROM users WHERE username = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, username);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return false;
    }
    
    // Check if email exists
    public boolean emailExists(String email) {
        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, email);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return false;
    }
    
    // Get all users (for admin purposes)
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        String sql = "SELECT * FROM users ORDER BY created_at DESC";
        
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                users.add(mapResultSetToUser(rs));
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return users;
    }
    
    // Helper method to map ResultSet to User object
    private User mapResultSetToUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setUsername(rs.getString("username"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setCreatedAt(rs.getTimestamp("created_at"));
        user.setUpdatedAt(rs.getTimestamp("updated_at"));
        return user;
    }
}
```

## Step 7: Authentication Utility

### Create `src/main/java/com/workshop/utils/AuthUtil.java`
```java
package com.workshop.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class AuthUtil {
    
    // Hash password using SHA-256 (in production, use BCrypt or Argon2)
    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
    
    // Verify password
    public static boolean verifyPassword(String password, String hashedPassword) {
        String hashedInput = hashPassword(password);
        return hashedInput.equals(hashedPassword);
    }
    
    // Generate random session token
    public static String generateSessionToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getEncoder().encodeToString(bytes);
    }
    
    // Validate email format
    public static boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email != null && email.matches(emailRegex);
    }
    
    // Validate username format
    public static boolean isValidUsername(String username) {
        String usernameRegex = "^[a-zA-Z0-9_]{3,20}$";
        return username != null && username.matches(usernameRegex);
    }
    
    // Validate password strength
    public static boolean isValidPassword(String password) {
        return password != null && password.length() >= 6;
    }
}
```

## Step 8: Login Servlet

### Create `src/main/java/com/workshop/servlets/LoginServlet.java`
```java
package com.workshop.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.workshop.dao.UserDAO;
import com.workshop.models.User;
import com.workshop.utils.AuthUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/api/login")
public class LoginServlet extends HttpServlet {
    private UserDAO userDAO;
    private ObjectMapper objectMapper;
    
    @Override
    public void init() throws ServletException {
        userDAO = new UserDAO();
        objectMapper = new ObjectMapper();
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Get request parameters
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            
            // Validate input
            if (username == null || username.trim().isEmpty() || 
                password == null || password.trim().isEmpty()) {
                result.put("success", false);
                result.put("message", "Username and password are required");
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            } else {
                // Get user from database
                User user = userDAO.getUserByUsername(username.trim());
                
                if (user != null && AuthUtil.verifyPassword(password, user.getPassword())) {
                    // Create session
                    HttpSession session = request.getSession();
                    session.setAttribute("user_id", user.getId());
                    session.setAttribute("username", user.getUsername());
                    session.setAttribute("email", user.getEmail());
                    
                    // Set session timeout (30 minutes)
                    session.setMaxInactiveInterval(30 * 60);
                    
                    result.put("success", true);
                    result.put("message", "Login successful");
                    result.put("data", Map.of(
                        "user_id", user.getId(),
                        "username", user.getUsername(),
                        "email", user.getEmail()
                    ));
                    
                    response.setStatus(HttpServletResponse.SC_OK);
                } else {
                    result.put("success", false);
                    result.put("message", "Invalid username or password");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                }
            }
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Internal server error");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
        
        // Send response
        String jsonResponse = objectMapper.writeValueAsString(result);
        response.getWriter().write(jsonResponse);
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
}
```

## Step 9: Registration Servlet

### Create `src/main/java/com/workshop/servlets/RegisterServlet.java`
```java
package com.workshop.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.workshop.dao.UserDAO;
import com.workshop.models.User;
import com.workshop.utils.AuthUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/api/register")
public class RegisterServlet extends HttpServlet {
    private UserDAO userDAO;
    private ObjectMapper objectMapper;
    
    @Override
    public void init() throws ServletException {
        userDAO = new UserDAO();
        objectMapper = new ObjectMapper();
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Get request parameters
            String username = request.getParameter("username");
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            
            // Validate input
            if (username == null || username.trim().isEmpty() ||
                email == null || email.trim().isEmpty() ||
                password == null || password.trim().isEmpty()) {
                result.put("success", false);
                result.put("message", "All fields are required");
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            } else {
                username = username.trim();
                email = email.trim();
                
                // Validate format
                if (!AuthUtil.isValidUsername(username)) {
                    result.put("success", false);
                    result.put("message", "Username must be 3-20 characters, alphanumeric and underscore only");
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                } else if (!AuthUtil.isValidEmail(email)) {
                    result.put("success", false);
                    result.put("message", "Invalid email format");
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                } else if (!AuthUtil.isValidPassword(password)) {
                    result.put("success", false);
                    result.put("message", "Password must be at least 6 characters");
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                } else {
                    // Check if username or email already exists
                    if (userDAO.usernameExists(username)) {
                        result.put("success", false);
                        result.put("message", "Username already exists");
                        response.setStatus(HttpServletResponse.SC_CONFLICT);
                    } else if (userDAO.emailExists(email)) {
                        result.put("success", false);
                        result.put("message", "Email already exists");
                        response.setStatus(HttpServletResponse.SC_CONFLICT);
                    } else {
                        // Create new user
                        User newUser = new User(username, email, AuthUtil.hashPassword(password));
                        
                        if (userDAO.createUser(newUser)) {
                            result.put("success", true);
                            result.put("message", "User registered successfully");
                            result.put("data", Map.of(
                                "username", username,
                                "email", email
                            ));
                            response.setStatus(HttpServletResponse.SC_CREATED);
                        } else {
                            result.put("success", false);
                            result.put("message", "Failed to create user");
                            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                        }
                    }
                }
            }
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Internal server error");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
        
        // Send response
        String jsonResponse = objectMapper.writeValueAsString(result);
        response.getWriter().write(jsonResponse);
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
}
```

## Step 10: Profile Servlet

### Create `src/main/java/com/workshop/servlets/ProfileServlet.java`
```java
package com.workshop.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.workshop.dao.UserDAO;
import com.workshop.models.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/api/profile")
public class ProfileServlet extends HttpServlet {
    private UserDAO userDAO;
    private ObjectMapper objectMapper;
    
    @Override
    public void init() throws ServletException {
        userDAO = new UserDAO();
        objectMapper = new ObjectMapper();
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Check if user is logged in
            HttpSession session = request.getSession(false);
            if (session == null || session.getAttribute("user_id") == null) {
                result.put("success", false);
                result.put("message", "User not authenticated");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            } else {
                // Get user ID from session
                int userId = (Integer) session.getAttribute("user_id");
                
                // Get user from database
                User user = userDAO.getUserById(userId);
                
                if (user != null) {
                    result.put("success", true);
                    result.put("message", "Profile retrieved successfully");
                    result.put("data", Map.of(
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "email", user.getEmail(),
                        "created_at", user.getCreatedAt()
                    ));
                    response.setStatus(HttpServletResponse.SC_OK);
                } else {
                    result.put("success", false);
                    result.put("message", "User not found");
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                }
            }
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Internal server error");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
        
        // Send response
        String jsonResponse = objectMapper.writeValueAsString(result);
        response.getWriter().write(jsonResponse);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
}
```

## Step 11: Logout Servlet

### Create `src/main/java/com/workshop/servlets/LogoutServlet.java`
```java
package com.workshop.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/api/logout")
public class LogoutServlet extends HttpServlet {
    private ObjectMapper objectMapper;
    
    @Override
    public void init() throws ServletException {
        objectMapper = new ObjectMapper();
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Get current session
            HttpSession session = request.getSession(false);
            
            if (session != null) {
                // Invalidate session
                session.invalidate();
                result.put("success", true);
                result.put("message", "Logged out successfully");
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                result.put("success", false);
                result.put("message", "No active session");
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Internal server error");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
        
        // Send response
        String jsonResponse = objectMapper.writeValueAsString(result);
        response.getWriter().write(jsonResponse);
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
}
```

## Step 12: Web Configuration

### Create `src/main/webapp/WEB-INF/web.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
         http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    
    <display-name>Workshop Servlets</display-name>
    
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>
    
    <session-config>
        <session-timeout>30</session-timeout>
    </session-config>
    
    <error-page>
        <error-code>404</error-code>
        <location>/error/404.html</location>
    </error-page>
    
    <error-page>
        <error-code>500</error-code>
        <location>/error/500.html</location>
    </error-page>
</web-app>
```

## Step 13: Test HTML Page

### Create `src/main/webapp/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Java Servlets Workshop</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; }
        input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
        .response { margin-top: 20px; padding: 15px; border-radius: 4px; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; }
        .error { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; }
        .tabs { display: flex; margin-bottom: 20px; }
        .tab { padding: 10px 20px; cursor: pointer; border: 1px solid #ddd; background: #f8f9fa; }
        .tab.active { background: #007bff; color: white; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
    </style>
</head>
<body>
    <h1>Java Servlets Workshop</h1>
    
    <div class="tabs">
        <div class="tab active" onclick="showTab('login')">Login</div>
        <div class="tab" onclick="showTab('register')">Register</div>
        <div class="tab" onclick="showTab('profile')">Profile</div>
        <div class="tab" onclick="showTab('logout')">Logout</div>
    </div>
    
    <div id="login" class="tab-content active">
        <h2>User Login</h2>
        <form id="loginForm">
            <div class="form-group">
                <label for="loginUsername">Username:</label>
                <input type="text" id="loginUsername" name="username" required>
            </div>
            <div class="form-group">
                <label for="loginPassword">Password:</label>
                <input type="password" id="loginPassword" name="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
        <div id="loginResponse"></div>
    </div>
    
    <div id="register" class="tab-content">
        <h2>User Registration</h2>
        <form id="registerForm">
            <div class="form-group">
                <label for="regUsername">Username:</label>
                <input type="text" id="regUsername" name="username" required>
            </div>
            <div class="form-group">
                <label for="regEmail">Email:</label>
                <input type="email" id="regEmail" name="email" required>
            </div>
            <div class="form-group">
                <label for="regPassword">Password:</label>
                <input type="password" id="regPassword" name="password" required>
            </div>
            <button type="submit">Register</button>
        </form>
        <div id="registerResponse"></div>
    </div>
    
    <div id="profile" class="tab-content">
        <h2>User Profile</h2>
        <button onclick="getProfile()">Get Profile</button>
        <div id="profileResponse"></div>
    </div>
    
    <div id="logout" class="tab-content">
        <h2>Logout</h2>
        <button onclick="logout()">Logout</button>
        <div id="logoutResponse"></div>
    </div>
    
    <div class="demo-credentials">
        <h3>Demo Credentials</h3>
        <p><strong>Username:</strong> admin</p>
        <p><strong>Password:</strong> password</p>
    </div>
    
    <script>
        // Tab functionality
        function showTab(tabName) {
            // Hide all tab contents
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Remove active class from all tabs
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Show selected tab content
            document.getElementById(tabName).classList.add('active');
            
            // Add active class to selected tab
            event.target.classList.add('active');
        }
        
        // Login form
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                username: formData.get('username'),
                password: formData.get('password')
            };
            
            try {
                const response = await fetch('api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(data)
                });
                const result = await response.json();
                displayResponse('loginResponse', result, response.ok);
            } catch (error) {
                displayResponse('loginResponse', { message: 'Error: ' + error.message }, false);
            }
        });
        
        // Registration form
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            };
            
            try {
                const response = await fetch('api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(data)
                });
                const result = await response.json();
                displayResponse('registerResponse', result, response.ok);
            } catch (error) {
                displayResponse('registerResponse', { message: 'Error: ' + error.message }, false);
            }
        });
        
        // Get Profile
        async function getProfile() {
            try {
                const response = await fetch('api/profile');
                const result = await response.json();
                displayResponse('profileResponse', result, response.ok);
            } catch (error) {
                displayResponse('profileResponse', { message: 'Error: ' + error.message }, false);
            }
        }
        
        // Logout
        async function logout() {
            try {
                const response = await fetch('api/logout', { method: 'POST' });
                const result = await response.json();
                displayResponse('logoutResponse', result, response.ok);
            } catch (error) {
                displayResponse('logoutResponse', { message: 'Error: ' + error.message }, false);
            }
        }
        
        // Display Response
        function displayResponse(elementId, data, isSuccess) {
            const element = document.getElementById(elementId);
            element.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            element.className = `response ${isSuccess ? 'success' : 'error'}`;
        }
    </script>
</body>
</html>
```

## Step 14: Build and Deploy

### Build the Project
```bash
# If using Maven
mvn clean package

# If using IDE, build through the IDE
```

### Deploy to Tomcat
1. Copy the generated WAR file to `%CATALINA_HOME%/webapps/`
2. Start Tomcat: `%CATALINA_HOME%/bin/startup.bat`
3. Access the application: `http://localhost:8080/workshop-servlets`

## Step 15: Test the Application

### Test Flow
1. **Register** a new user
2. **Login** with the registered credentials
3. **Get Profile** to verify authentication
4. **Logout** to end session

### Test with Postman
- **Login:** `POST http://localhost:8080/workshop-servlets/api/login`
- **Register:** `POST http://localhost:8080/workshop-servlets/api/register`
- **Profile:** `GET http://localhost:8080/workshop-servlets/api/profile`
- **Logout:** `POST http://localhost:8080/workshop-servlets/api/logout`

## Lab Completion Checklist

- [ ] Java JDK installed and configured
- [ ] Apache Tomcat installed and configured
- [ ] MySQL database created with tables
- [ ] Maven project structure created
- [ ] Database connection utility implemented
- [ ] User model and DAO created
- [ ] Authentication utility implemented
- [ ] All servlets implemented (Login, Register, Profile, Logout)
- [ ] Web configuration completed
- [ ] Test HTML page created
- [ ] Project built successfully
- [ ] Application deployed to Tomcat
- [ ] All APIs tested and working
- [ ] Complete authentication flow working

## Next Steps

1. Implement JWT token authentication
2. Add password reset functionality
3. Implement user roles and permissions
4. Add input validation filters
5. Implement connection pooling
6. Add logging and monitoring
7. Create unit tests with JUnit
8. Implement RESTful API design patterns

## Troubleshooting

### Common Issues:
1. **ClassNotFoundException**: Check if all dependencies are in classpath
2. **Database connection error**: Verify database credentials and connection string
3. **Servlet not found**: Check web.xml configuration and annotations
4. **Compilation errors**: Ensure Java version compatibility
5. **Deployment issues**: Check Tomcat logs and WAR file structure

### Getting Help:
- Check Tomcat logs in `%CATALINA_HOME%/logs/`
- Verify database connection separately
- Check servlet mapping in web.xml
- Ensure all required JAR files are included
- Test individual components in isolation
