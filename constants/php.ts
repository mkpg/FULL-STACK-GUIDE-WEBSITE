// PHP Section - Setup and API Creation for Login with SQL Connectivity
import type { Section } from '../types';

export const PHP_SECTION: Section = {
  id: 'php',
  title: 'Backend - PHP',
  overview: 'Learn PHP setup and create comprehensive APIs for user registration and login system with MySQL database connectivity. Includes password hashing, input validation, session management, and security best practices.',
  coreConcepts: [
    '**PHP Language Fundamentals:** Variables, data types, operators, control structures, and functions',
    '**Object-Oriented Programming:** Classes, objects, inheritance, encapsulation, and polymorphism',
    '**Web Development Concepts:** HTTP protocol, request/response cycle, and stateless nature of web',
    '**Database Integration:** MySQL connectivity using PDO (PHP Data Objects) with prepared statements',
    '**RESTful API Design:** HTTP methods (GET, POST, PUT, DELETE), status codes, and JSON responses',
    '**Security Best Practices:** Password hashing with password_hash(), SQL injection prevention, XSS protection',
    '**Session Management:** User authentication, session creation, token-based authentication, and security',
    '**Input Validation & Sanitization:** Data validation rules, sanitization techniques, and error handling',
    '**Error Handling & Logging:** Try-catch blocks, custom error handlers, and application logging',
    '**File Operations:** File uploads, directory management, and file security considerations',
    '**Configuration Management:** Environment variables, configuration files, and database credentials',
    '**Performance Optimization:** Database query optimization, caching strategies, and code efficiency',
    '**Testing & Debugging:** Unit testing, API testing with Postman, and debugging techniques',
    '**Deployment & Production:** Server configuration, security hardening, and monitoring'
  ],
  steps: [
    {
      id: 'php-1',
      title: 'Environment Setup and Project Structure',
      description: 'Install XAMPP, create project structure, and set up database connection.',
      codeSnippet: {
        language: 'bash',
        code: `# Install XAMPP and start Apache + MySQL
# Create project folder in htdocs directory
mkdir workshop-api
cd workshop-api

# Create project structure
mkdir config
mkdir api
mkdir includes
mkdir logs

📁 PHP PROJECT STRUCTURE DIAGRAM:
workshop-api/
├── config/
│   ├── database.php      # Database connection class
│   ├── config.php        # Application configuration
│   └── cors.php          # CORS headers configuration
├── api/
│   ├── auth/
│   │   ├── login.php     # Login endpoint
│   │   ├── register.php  # Registration endpoint
│   │   └── logout.php    # Logout endpoint
│   ├── users/
│   │   ├── profile.php   # User profile endpoint
│   │   └── update.php    # Update user endpoint
│   └── index.php         # API entry point
├── includes/
│   ├── auth.php          # Authentication helper functions
│   ├── validation.php    # Input validation functions
│   ├── response.php      # Standardized API responses
│   └── database.php      # Database utility functions
├── logs/
│   ├── error.log         # Error logging
│   └── access.log        # Access logging
└── .htaccess             # Apache configuration

🌐 API ARCHITECTURE FLOW:
┌─────────────────┐    HTTP Request    ┌─────────────────┐
│                 │ ──────────────────→ │                 │
│   Frontend      │                     │   PHP API       │
│   (React/Angular)│                     │   (Apache)      │
│                 │ ←────────────────── │                 │
└─────────────────┘   JSON Response    └─────────────────┘
                              │
                              │ PDO Connection
                              ▼
                    ┌─────────────────┐
                    │                 │
                    │   MySQL         │
                    │   Database      │
                    │                 │
                    └─────────────────┘

🔐 AUTHENTICATION FLOW:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│             │    │             │    │             │    │             │
│   User      │───▶│   Login     │───▶│  Validate   │───▶│  Database   │
│   Input     │    │   Form      │    │  Credentials│    │  Check      │
│             │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
         │                 │                 │                 │
         ▼                 ▼                 ▼                 ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│             │    │             │    │             │    │             │
│   JWT       │    │   Password  │    │   Input     │    │   User      │
│   Token     │    │   Hashing   │    │   Sanitize  │    │   Session   │
│             │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘`
      }
    },
    {
      id: 'php-2',
      title: 'Database Schema and Connection Setup',
      description: 'Create MySQL database, user table, and establish database connection with PDO.',
      codeSnippet: {
        language: 'sql',
        code: `-- Create database
CREATE DATABASE workshop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE workshop_db;

-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- Create user_sessions table for session management
CREATE TABLE user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id)
);`
      }
    },
    {
      id: 'php-3',
      title: 'Database Connection and Configuration',
      description: 'Set up PDO database connection with error handling and configuration management.',
      codeSnippet: {
        language: 'php',
        code: `// config/database.php
<?php
class Database {
    private $host = 'localhost';
    private $db_name = 'workshop_db';
    private $username = 'root';
    private $password = '';
    private $conn;
    
    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username,
                $this->password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            throw new Exception("Database connection failed");
        }
        
        return $this->conn;
    }
}

// config/config.php
<?php
define('JWT_SECRET', 'your-super-secret-jwt-key-here');
define('JWT_EXPIRY', 3600); // 1 hour
define('PASSWORD_COST', 12); // bcrypt cost factor

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set timezone
date_default_timezone_set('UTC');

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}`
      }
    },
    {
      id: 'php-4',
      title: 'User Model and Validation Class',
      description: 'Create User class for database operations and validation class for input sanitization.',
      codeSnippet: {
        language: 'php',
        code: `// includes/User.php
<?php
class User {
    private $conn;
    private $table_name = "users";
    
    public $id;
    public $username;
    public $email;
    public $password;
    public $first_name;
    public $last_name;
    public $is_active;
    public $created_at;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Create new user
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                (username, email, password, first_name, last_name)
                VALUES (:username, :email, :password, :first_name, :last_name)";
        
        $stmt = $this->conn->prepare($query);
        
        // Sanitize and hash password
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->first_name = htmlspecialchars(strip_tags($this->first_name));
        $this->last_name = htmlspecialchars(strip_tags($this->last_name));
        $this->password = password_hash($this->password, PASSWORD_BCRYPT, ['cost' => PASSWORD_COST]);
        
        // Bind parameters
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        
        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }
    
    // Check if username exists
    public function usernameExists() {
        $query = "SELECT id, username, password FROM " . $this->table_name . " WHERE username = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->username);
        $stmt->execute();
        
        $num = $stmt->rowCount();
        if($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            $this->password = $row['password'];
            return true;
        }
        return false;
    }
    
    // Check if email exists
    public function emailExists() {
        $query = "SELECT id FROM " . $this->table_name . " WHERE email = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->email);
        $stmt->execute();
        
        return $stmt->rowCount() > 0;
    }
    
    // Get user by ID
    public function read() {
        $query = "SELECT id, username, email, first_name, last_name, created_at 
                FROM " . $this->table_name . " WHERE id = ? AND is_active = 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

// includes/Validator.php
<?php
class Validator {
    public static function validateRegistration($data) {
        $errors = [];
        
        // Username validation
        if (empty($data['username'])) {
            $errors['username'] = 'Username is required';
        } elseif (strlen($data['username']) < 3) {
            $errors['username'] = 'Username must be at least 3 characters';
        } elseif (!preg_match('/^[a-zA-Z0-9_]+$/', $data['username'])) {
            $errors['username'] = 'Username can only contain letters, numbers, and underscores';
        }
        
        // Email validation
        if (empty($data['email'])) {
            $errors['email'] = 'Email is required';
        } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Invalid email format';
        }
        
        // Password validation
        if (empty($data['password'])) {
            $errors['password'] = 'Password is required';
        } elseif (strlen($data['password']) < 6) {
            $errors['password'] = 'Password must be at least 6 characters';
        }
        
        // Confirm password validation
        if (empty($data['confirm_password'])) {
            $errors['confirm_password'] = 'Password confirmation is required';
        } elseif ($data['password'] !== $data['confirm_password']) {
            $errors['confirm_password'] = 'Passwords do not match';
        }
        
        // Name validation
        if (empty($data['first_name'])) {
            $errors['first_name'] = 'First name is required';
        }
        if (empty($data['last_name'])) {
            $errors['last_name'] = 'Last name is required';
        }
        
        return $errors;
    }
    
    public static function validateLogin($data) {
        $errors = [];
        
        if (empty($data['username'])) {
            $errors['username'] = 'Username is required';
        }
        if (empty($data['password'])) {
            $errors['password'] = 'Password is required';
        }
        
        return $errors;
    }
}`
      }
    },
    {
      id: 'php-5',
      title: 'User Registration API Endpoint',
      description: 'Create comprehensive user registration API with validation, error handling, and database operations.',
      codeSnippet: {
        language: 'php',
        code: `// api/register.php
<?php
require_once '../config/config.php';
require_once '../includes/Database.php';
require_once '../includes/User.php';
require_once '../includes/Validator.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }
    
    // Validate input
    $validator = new Validator();
    $errors = Validator::validateRegistration($input);
    
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
        exit();
    }
    
    // Create database connection
    $database = new Database();
    $db = $database->getConnection();
    
    // Create user object
    $user = new User($db);
    $user->username = $input['username'];
    $user->email = $input['email'];
    $user->password = $input['password'];
    $user->first_name = $input['first_name'];
    $user->last_name = $input['last_name'];
    
    // Check if username already exists
    if ($user->usernameExists()) {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'Username already exists'
        ]);
        exit();
    }
    
    // Check if email already exists
    if ($user->emailExists()) {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'Email already exists'
        ]);
        exit();
    }
    
    // Create user
    if ($user->create()) {
        // Get created user data (without password)
        $userData = $user->read();
        
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => $userData
        ]);
    } else {
        throw new Exception('Failed to create user');
    }
    
} catch (Exception $e) {
    error_log("Registration error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error'
    ]);
}`
      }
    },
    {
      id: 'php-6',
      title: 'User Login API Endpoint',
      description: 'Implement secure login API with password verification, session management, and JWT token generation.',
      codeSnippet: {
        language: 'php',
        code: `// api/login.php
<?php
require_once '../config/config.php';
require_once '../includes/Database.php';
require_once '../includes/User.php';
require_once '../includes/Validator.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }
    
    // Validate input
    $errors = Validator::validateLogin($input);
    
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
        exit();
    }
    
    // Create database connection
    $database = new Database();
    $db = $database->getConnection();
    
    // Create user object
    $user = new User($db);
    $user->username = $input['username'];
    
    // Check if username exists and get password
    if (!$user->usernameExists()) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid username or password'
        ]);
        exit();
    }
    
    // Verify password
    if (!password_verify($input['password'], $user->password)) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid username or password'
        ]);
        exit();
    }
    
    // Get user data
    $userData = $user->read();
    
    // Generate session token
    $sessionToken = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', time() + JWT_EXPIRY);
    
    // Store session in database
    $query = "INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)";
    $stmt = $db->prepare($query);
    $stmt->execute([$userData['id'], $sessionToken, $expiresAt]);
    
    // Return success response with user data and token
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'data' => [
            'user' => $userData,
            'token' => $sessionToken,
            'expires_at' => $expiresAt
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Login error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error'
    ]);
}`
      }
    },
    {
      id: 'php-7',
      title: 'User Profile and Logout APIs',
      description: 'Create APIs for retrieving user profile, updating user information, and secure logout functionality.',
      codeSnippet: {
        language: 'php',
        code: `// api/profile.php
<?php
require_once '../config/config.php';
require_once '../includes/Database.php';
require_once '../includes/User.php';

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Get authorization header
    $headers = getallheaders();
    $token = null;
    
    if (isset($headers['Authorization'])) {
        $token = str_replace('Bearer ', '', $headers['Authorization']);
    }
    
    if (!$token) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Authorization token required']);
        exit();
    }
    
    // Create database connection
    $database = new Database();
    $db = $database->getConnection();
    
    // Verify session token
    $query = "SELECT user_id, expires_at FROM user_sessions WHERE session_token = ? AND expires_at > NOW()";
    $stmt = $db->prepare($query);
    $stmt->execute([$token]);
    
    if ($stmt->rowCount() === 0) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid or expired token']);
        exit();
    }
    
    $session = $stmt->fetch(PDO::FETCH_ASSOC);
    $userId = $session['user_id'];
    
    // Get user data
    $user = new User($db);
    $user->id = $userId;
    $userData = $user->read();
    
    if (!$userData) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit();
    }
    
    echo json_encode([
        'success' => true,
        'data' => $userData
    ]);
    
} catch (Exception $e) {
    error_log("Profile error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error'
    ]);
}

// api/logout.php
<?php
require_once '../config/config.php';
require_once '../includes/Database.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Get authorization header
    $headers = getallheaders();
    $token = null;
    
    if (isset($headers['Authorization'])) {
        $token = str_replace('Bearer ', '', $headers['Authorization']);
    }
    
    if (!$token) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Authorization token required']);
        exit();
    }
    
    // Create database connection
    $database = new Database();
    $db = $database->getConnection();
    
    // Remove session token
    $query = "DELETE FROM user_sessions WHERE session_token = ?";
    $stmt = $db->prepare($query);
    $stmt->execute([$token]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Logged out successfully'
    ]);
    
} catch (Exception $e) {
    error_log("Logout error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error'
    ]);
}`
      }
    },
    {
      id: 'php-8',
      title: 'Testing and Security Implementation',
      description: 'Test all API endpoints and implement additional security measures like rate limiting and input sanitization.',
      codeSnippet: {
        language: 'text',
        code: `# Test Registration API
curl -X POST http://localhost/workshop-api/api/register.php \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User"
  }'

# Test Login API
curl -X POST http://localhost/workshop-api/api/login.php \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "testuser",
    "password": "password123"
  }'

# Test Profile API (with token)
curl -X GET http://localhost/workshop-api/api/profile.php \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Test Logout API
curl -X POST http://localhost/workshop-api/api/logout.php \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE`
      }
    },
    {
      id: 'php-9',
      title: 'Complete Helper Classes Implementation',
      description: 'Implement all missing helper classes and utility functions for complete functionality.',
      codeSnippet: {
        language: 'php',
        code: `// includes/Validator.php
<?php
class Validator {
    // Validate registration data
    public static function validateRegistration($data) {
        $errors = [];
        
        // Username validation
        if (empty($data['username'])) {
            $errors['username'] = 'Username is required';
        } elseif (strlen($data['username']) < 3) {
            $errors['username'] = 'Username must be at least 3 characters';
        } elseif (!preg_match('/^[a-zA-Z0-9_]+$/', $data['username'])) {
            $errors['username'] = 'Username can only contain letters, numbers, and underscores';
        }
        
        // Email validation
        if (empty($data['email'])) {
            $errors['email'] = 'Email is required';
        } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Please enter a valid email address';
        }
        
        // Password validation
        if (empty($data['password'])) {
            $errors['password'] = 'Password is required';
        } elseif (strlen($data['password']) < 6) {
            $errors['password'] = 'Password must be at least 6 characters';
        }
        
        // First name validation
        if (empty($data['first_name'])) {
            $errors['first_name'] = 'First name is required';
        } elseif (strlen($data['first_name']) < 2) {
            $errors['first_name'] = 'First name must be at least 2 characters';
        }
        
        // Last name validation
        if (empty($data['last_name'])) {
            $errors['last_name'] = 'Last name is required';
        } elseif (strlen($data['last_name']) < 2) {
            $errors['last_name'] = 'Last name must be at least 2 characters';
        }
        
        return $errors;
    }
    
    // Validate login data
    public static function validateLogin($data) {
        $errors = [];
        
        if (empty($data['username'])) {
            $errors['username'] = 'Username is required';
        }
        
        if (empty($data['password'])) {
            $errors['password'] = 'Password is required';
        }
        
        return $errors;
    }
    
    // Sanitize input data
    public static function sanitize($data) {
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                $data[$key] = self::sanitize($value);
            }
        } else {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
        }
        
        return $data;
    }
}

// includes/User.php (Complete Implementation)
<?php
class User {
    private $conn;
    private $table_name = "users";
    
    public $id;
    public $username;
    public $email;
    public $password;
    public $first_name;
    public $last_name;
    public $is_active;
    public $created_at;
    public $updated_at;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Create new user
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                (username, email, password, first_name, last_name, is_active)
                VALUES (?, ?, ?, ?, ?, ?)";
        
        $stmt = $this->conn->prepare($query);
        
        // Hash password
        $hashedPassword = password_hash($this->password, PASSWORD_BCRYPT, ['cost' => 12]);
        
        $stmt->bindParam(1, $this->username);
        $stmt->bindParam(2, $this->email);
        $stmt->bindParam(3, $hashedPassword);
        $stmt->bindParam(4, $this->first_name);
        $stmt->bindParam(5, $this->last_name);
        $stmt->bindParam(6, $this->is_active);
        
        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        
        return false;
    }
    
    // Read user by ID
    public function read() {
        $query = "SELECT id, username, email, first_name, last_name, is_active, created_at, updated_at
                FROM " . $this->table_name . " WHERE id = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    // Read user by username
    public function readByUsername() {
        $query = "SELECT id, username, email, password, first_name, last_name, is_active, created_at, updated_at
                FROM " . $this->table_name . " WHERE username = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->username);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    // Check if username exists
    public function usernameExists() {
        $query = "SELECT COUNT(*) as count FROM " . $this->table_name . " WHERE username = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->username);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['count'] > 0;
    }
    
    // Check if email exists
    public function emailExists() {
        $query = "SELECT COUNT(*) as count FROM " . $this->table_name . " WHERE email = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->email);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['count'] > 0;
    }
    
    // Verify password
    public function verifyPassword($password) {
        $query = "SELECT password FROM " . $this->table_name . " WHERE username = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->username);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row) {
            return password_verify($password, $row['password']);
        }
        
        return false;
    }
    
    // Create session token
    public function createSession($token, $expiresAt) {
        $query = "INSERT INTO user_sessions (user_id, session_token, expires_at)
                VALUES (?, ?, ?)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->bindParam(2, $token);
        $stmt->bindParam(3, $expiresAt);
        
        return $stmt->execute();
    }
    
    // Get user ID by username
    public function getIdByUsername() {
        $query = "SELECT id FROM " . $this->table_name . " WHERE username = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->username);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? $row['id'] : null;
    }
}

// includes/Response.php
<?php
class Response {
    public static function success($data = null, $message = 'Success', $statusCode = 200) {
        http_response_code($statusCode);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
        exit();
    }
    
    public static function error($message = 'Error', $statusCode = 400, $errors = null) {
        http_response_code($statusCode);
        $response = [
            'success' => false,
            'message' => $message
        ];
        
        if ($errors) {
            $response['errors'] = $errors;
        }
        
        echo json_encode($response);
        exit();
    }
}

// includes/JWT.php
<?php
class JWT {
    private static $secret = null;
    
    public static function init() {
        if (self::$secret === null) {
            self::$secret = JWT_SECRET;
        }
    }
    
    public static function generate($payload, $expiry = 3600) {
        self::init();
        
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload['exp'] = time() + $expiry;
        $payload['iat'] = time();
        
        $base64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
        
        $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, self::$secret, true);
        $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        return $base64Header . "." . $base64Payload . "." . $base64Signature;
    }
    
    public static function verify($token) {
        self::init();
        
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return false;
        }
        
        $header = $parts[0];
        $payload = $parts[1];
        $signature = $parts[2];
        
        $expectedSignature = hash_hmac('sha256', $header . "." . $payload, self::$secret, true);
        $expectedSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($expectedSignature));
        
        if (!hash_equals($signature, $expectedSignature)) {
            return false;
        }
        
        $payloadData = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $payload)), true);
        
        if ($payloadData['exp'] < time()) {
            return false;
        }
        
        return $payloadData;
    }
}`
      }
    },
    {
      id: 'php-10',
      title: 'PHP File Creation Commands Reference',
      description: 'Complete reference of PHP development commands and file creation shortcuts for efficient development workflow.',
      codeSnippet: {
        language: 'bash',
        code: `# 🚀 PHP FILE CREATION COMMANDS REFERENCE

# 📁 Directory Creation Commands
mkdir -p workshop-api/config
mkdir -p workshop-api/api/auth
mkdir -p workshop-api/api/users
mkdir -p workshop-api/includes
mkdir -p workshop-api/logs

# 📄 File Creation Commands (Unix/Linux/macOS)
touch workshop-api/config/database.php
touch workshop-api/config/config.php
touch workshop-api/config/cors.php

touch workshop-api/api/auth/login.php
touch workshop-api/api/auth/register.php
touch workshop-api/api/auth/logout.php

touch workshop-api/api/users/profile.php
touch workshop-api/api/users/update.php

touch workshop-api/includes/auth.php
touch workshop-api/includes/validation.php
touch workshop-api/includes/response.php
touch workshop-api/includes/database.php

touch workshop-api/logs/error.log
touch workshop-api/logs/access.log

# 📄 File Creation Commands (Windows PowerShell)
New-Item -ItemType Directory -Path workshop-api\\config -Force
New-Item -ItemType Directory -Path workshop-api\\api\\auth -Force
New-Item -ItemType Directory -Path workshop-api\\api\\users -Force
New-Item -ItemType Directory -Path workshop-api\\includes -Force
New-Item -ItemType Directory -Path workshop-api\\logs -Force

New-Item -ItemType File -Path workshop-api\\config\\database.php -Force
New-Item -ItemType File -Path workshop-api\\config\\config.php -Force
New-Item -ItemType File -Path workshop-api\\config\\cors.php -Force

New-Item -ItemType File -Path workshop-api\\api\\auth\\login.php -Force
New-Item -ItemType File -Path workshop-api\\api\\auth\\register.php -Force
New-Item -ItemType File -Path workshop-api\\api\\auth\\logout.php -Force

New-Item -ItemType File -Path workshop-api\\api\\users\\profile.php -Force
New-Item -ItemType File -Path workshop-api\\api\\users\\update.php -Force

New-Item -ItemType File -Path workshop-api\\includes\\auth.php -Force
New-Item -ItemType File -Path workshop-api\\includes\\validation.php -Force
New-Item -ItemType File -Path workshop-api\\includes\\response.php -Force
New-Item -ItemType File -Path workshop-api\\includes\\database.php -Force

New-Item -ItemType File -Path workshop-api\\logs\\error.log -Force
New-Item -ItemType File -Path workshop-api\\logs\\access.log -Force

# 📄 File Creation Commands (Windows Command Prompt)
echo. > workshop-api\\config\\database.php
echo. > workshop-api\\config\\config.php
echo. > workshop-api\\config\\cors.php

echo. > workshop-api\\api\\auth\\login.php
echo. > workshop-api\\api\\auth\\register.php
echo. > workshop-api\\api\\auth\\logout.php

echo. > workshop-api\\api\\users\\profile.php
echo. > workshop-api\\api\\users\\update.php

echo. > workshop-api\\includes\\auth.php
echo. > workshop-api\\includes\\validation.php
echo. > workshop-api\\includes\\response.php
echo. > workshop-api\\includes\\database.php

echo. > workshop-api\\logs\\error.log
echo. > workshop-api\\logs\\access.log

# 🎯 COMPLETE PHP PROJECT SETUP SEQUENCE
# 1. Create main project directory
mkdir workshop-api
cd workshop-api

# 2. Create directory structure
mkdir -p config api/auth api/users includes logs

# 3. Create configuration files
touch config/database.php
touch config/config.php
touch config/cors.php

# 4. Create API endpoint files
touch api/auth/login.php
touch api/auth/register.php
touch api/auth/logout.php
touch api/users/profile.php
touch api/users/update.php

# 5. Create helper class files
touch includes/auth.php
touch includes/validation.php
touch includes/response.php
touch includes/database.php

# 6. Create log files
touch logs/error.log
touch logs/access.log

# 7. Create .htaccess file
touch .htaccess

# 8. Set proper permissions (Unix/Linux/macOS)
chmod 755 api/ includes/ config/
chmod 644 *.php
chmod 666 logs/*.log

# 9. Start XAMPP services
# Start Apache and MySQL from XAMPP Control Panel
# Or use command line (if available):
# sudo /opt/lampp/lampp start  # Linux
# /Applications/XAMPP/xamppfiles/xampp start  # macOS`
      }
    }
  ],
  tips: 'Always validate and sanitize user input. Use prepared statements to prevent SQL injection. Implement proper error handling and logging. Test your APIs thoroughly with different scenarios. Use HTTPS in production and implement rate limiting.',
  prerequisites: 'Basic programming concepts, understanding of databases, familiarity with HTTP methods',
  liveSessionNotes: 'Start with XAMPP installation and setup. Show how to create database and tables. Build APIs step by step with proper error handling. Demonstrate security measures like password hashing. Test APIs live with Postman or curl commands.',
  commonQuestions: [
    {
      question: 'What is the difference between XAMPP and WAMP?',
      answer: 'XAMPP is a cross-platform package that works on Windows, macOS, and Linux, while WAMP is Windows-specific. XAMPP includes Apache, MySQL, PHP, and Perl, while WAMP includes Apache, MySQL, and PHP. XAMPP is more portable and easier to set up, while WAMP is optimized for Windows environments.'
    },
    {
      question: 'How do I prevent SQL injection?',
      answer: 'Use prepared statements with PDO or MySQLi instead of concatenating user input directly into SQL queries. Prepared statements separate SQL logic from data, making it impossible for malicious input to alter the query structure. Always validate and sanitize user input before processing.'
    },
    {
      question: 'Why hash passwords?',
      answer: 'Hashing passwords converts them into irreversible, fixed-length strings. Even if a database is compromised, attackers cannot retrieve the original passwords. PHP\'s password_hash() function automatically handles salt generation and uses secure algorithms like bcrypt. Always use password_verify() to check passwords, never compare hashes directly.'
    },
    {
      question: 'How do sessions work in PHP?',
      answer: 'Sessions store user data on the server and associate it with a unique session ID stored in a cookie. When a user visits your site, PHP creates or retrieves their session data. Sessions are useful for maintaining user state across page requests, such as keeping users logged in. Sessions are more secure than cookies for sensitive data.'
    }
  ]
};
