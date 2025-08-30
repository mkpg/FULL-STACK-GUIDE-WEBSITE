# PHP Backend Lab Session - Login API with MySQL

## Prerequisites
- XAMPP or WAMP installed
- Basic knowledge of PHP syntax
- Understanding of SQL and databases
- Postman or similar API testing tool

## Lab Objectives
1. Set up PHP development environment with XAMPP
2. Create MySQL database and tables
3. Implement PHP API endpoints for user authentication
4. Implement security features (password hashing, input validation)
5. Test APIs with Postman

## Step 1: Environment Setup

### Install XAMPP
1. Download XAMPP from https://www.apachefriends.org/
2. Install XAMPP (choose default options)
3. Start Apache and MySQL services

### Verify Installation
- Apache: http://localhost (should show XAMPP welcome page)
- MySQL: http://localhost/phpmyadmin (should show phpMyAdmin)

### Project Structure
```
htdocs/
└── workshop-api/
    ├── config/
    ├── api/
    ├── includes/
    └── database/
```

## Step 2: Create Project Directory

### Navigate to XAMPP htdocs
```bash
cd C:\xampp\htdocs
mkdir workshop-api
cd workshop-api
```

### Create Subdirectories
```bash
mkdir config
mkdir api
mkdir includes
mkdir database
```

## Step 3: Database Setup

### Create Database
1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Click "New" to create a new database
3. Enter database name: `workshop_db`
4. Click "Create"

### Create Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert demo user
INSERT INTO users (username, email, password) VALUES 
('admin', 'admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
-- Password is 'password' (hashed with password_hash)
```

### Create Sessions Table (Optional)
```sql
CREATE TABLE user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Step 4: Database Configuration

### Create `config/database.php`
```php
<?php
class Database {
    private $host = "localhost";
    private $db_name = "workshop_db";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
```

## Step 5: User Model

### Create `includes/User.php`
```php
<?php
class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $username;
    public $email;
    public $password;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create new user
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (username, email, password) VALUES (:username, :email, :password)";

        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));

        // Hash password
        $this->password = password_hash($this->password, PASSWORD_DEFAULT);

        // Bind parameters
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Check if user exists
    public function userExists() {
        $query = "SELECT id, username, email, password FROM " . $this->table_name . " 
                  WHERE username = :username OR email = :email LIMIT 1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":email", $this->email);

        $stmt->execute();

        if($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            $this->username = $row['username'];
            $this->email = $row['email'];
            $this->password = $row['password'];
            return true;
        }
        return false;
    }

    // Verify login credentials
    public function verifyLogin($username, $password) {
        $query = "SELECT id, username, email, password FROM " . $this->table_name . " 
                  WHERE username = :username LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $username);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if(password_verify($password, $row['password'])) {
                $this->id = $row['id'];
                $this->username = $row['username'];
                $this->email = $row['email'];
                return true;
            }
        }
        return false;
    }

    // Get user by ID
    public function readOne() {
        $query = "SELECT id, username, email, created_at FROM " . $this->table_name . " 
                  WHERE id = :id LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->username = $row['username'];
            $this->email = $row['email'];
            $this->created_at = $row['created_at'];
            return true;
        }
        return false;
    }
}
?>
```

## Step 6: Response Helper

### Create `includes/Response.php`
```php
<?php
class Response {
    public static function json($data, $status_code = 200) {
        http_response_code($status_code);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit();
    }

    public static function error($message, $status_code = 400) {
        self::json([
            'success' => false,
            'message' => $message
        ], $status_code);
    }

    public static function success($data = null, $message = 'Success') {
        self::json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
    }
}
?>
```

## Step 7: Input Validation Helper

### Create `includes/Validator.php`
```php
<?php
class Validator {
    public static function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    public static function validateUsername($username) {
        // Username should be 3-20 characters, alphanumeric and underscore only
        return preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username);
    }

    public static function validatePassword($password) {
        // Password should be at least 6 characters
        return strlen($password) >= 6;
    }

    public static function sanitizeInput($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    public static function validateRequired($data, $fields) {
        $errors = [];
        foreach($fields as $field) {
            if(empty($data[$field])) {
                $errors[] = ucfirst($field) . " is required";
            }
        }
        return $errors;
    }
}
?>
```

## Step 8: User Registration API

### Create `api/register.php`
```php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/database.php';
require_once '../includes/User.php';
require_once '../includes/Response.php';
require_once '../includes/Validator.php';

// Only allow POST method
if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Method not allowed', 405);
}

// Get posted data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
$required_fields = ['username', 'email', 'password'];
$validation_errors = Validator::validateRequired($data, $required_fields);

if(!empty($validation_errors)) {
    Response::error(implode(', ', $validation_errors));
}

// Sanitize inputs
$username = Validator::sanitizeInput($data['username']);
$email = Validator::sanitizeInput($data['email']);
$password = $data['password']; // Don't sanitize password before hashing

// Validate inputs
if(!Validator::validateUsername($username)) {
    Response::error('Username must be 3-20 characters, alphanumeric and underscore only');
}

if(!Validator::validateEmail($email)) {
    Response::error('Invalid email format');
}

if(!Validator::validatePassword($password)) {
    Response::error('Password must be at least 6 characters');
}

// Create database connection
$database = new Database();
$db = $database->getConnection();

// Create user object
$user = new User($db);

// Check if user already exists
$user->username = $username;
$user->email = $email;

if($user->userExists()) {
    Response::error('Username or email already exists');
}

// Create user
$user->password = $password;
if($user->create()) {
    Response::success([
        'username' => $username,
        'email' => $email
    ], 'User registered successfully');
} else {
    Response::error('Unable to register user');
}
?>
```

## Step 9: User Login API

### Create `api/login.php`
```php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/database.php';
require_once '../includes/User.php';
require_once '../includes/Response.php';
require_once '../includes/Validator.php';

// Only allow POST method
if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Method not allowed', 405);
}

// Get posted data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
$required_fields = ['username', 'password'];
$validation_errors = Validator::validateRequired($data, $required_fields);

if(!empty($validation_errors)) {
    Response::error(implode(', ', $validation_errors));
}

// Sanitize inputs
$username = Validator::sanitizeInput($data['username']);
$password = $data['password'];

// Create database connection
$database = new Database();
$db = $database->getConnection();

// Create user object
$user = new User($db);

// Verify login credentials
if($user->verifyLogin($username, $password)) {
    // Start session
    session_start();
    
    // Store user data in session
    $_SESSION['user_id'] = $user->id;
    $_SESSION['username'] = $user->username;
    $_SESSION['email'] = $user->email;
    
    Response::success([
        'user_id' => $user->id,
        'username' => $user->username,
        'email' => $user->email,
        'session_id' => session_id()
    ], 'Login successful');
} else {
    Response::error('Invalid username or password', 401);
}
?>
```

## Step 10: User Profile API

### Create `api/profile.php`
```php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/database.php';
require_once '../includes/User.php';
require_once '../includes/Response.php';

// Only allow GET method
if($_SERVER['REQUEST_METHOD'] !== 'GET') {
    Response::error('Method not allowed', 405);
}

// Start session
session_start();

// Check if user is logged in
if(!isset($_SESSION['user_id'])) {
    Response::error('User not authenticated', 401);
}

// Create database connection
$database = new Database();
$db = $database->getConnection();

// Create user object
$user = new User($db);
$user->id = $_SESSION['user_id'];

// Get user profile
if($user->readOne()) {
    Response::success([
        'id' => $user->id,
        'username' => $user->username,
        'email' => $user->email,
        'created_at' => $user->created_at
    ], 'Profile retrieved successfully');
} else {
    Response::error('User not found');
}
?>
```

## Step 11: Logout API

### Create `api/logout.php`
```php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../includes/Response.php';

// Only allow POST method
if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Method not allowed', 405);
}

// Start session
session_start();

// Destroy session
session_destroy();

Response::success(null, 'Logged out successfully');
?>
```

## Step 12: Test APIs with Postman

### Test Registration API
**Endpoint:** `POST http://localhost/workshop-api/api/register.php`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
}
```

### Test Login API
**Endpoint:** `POST http://localhost/workshop-api/api/login.php`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
    "username": "testuser",
    "password": "password123"
}
```

### Test Profile API
**Endpoint:** `GET http://localhost/workshop-api/api/profile.php`

**Headers:** (No additional headers needed - uses session)

### Test Logout API
**Endpoint:** `POST http://localhost/workshop-api/api/logout.php`

**Headers:** (No additional headers needed)

## Step 13: Create Test HTML Page

### Create `test.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP API Test</title>
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
    </style>
</head>
<body>
    <h1>PHP API Test Page</h1>
    
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

    <h2>User Profile</h2>
    <button onclick="getProfile()">Get Profile</button>
    <div id="profileResponse"></div>

    <h2>Logout</h2>
    <button onclick="logout()">Logout</button>
    <div id="logoutResponse"></div>

    <script>
        // Registration
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            try {
                const response = await fetch('api/register.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                displayResponse('registerResponse', result, response.ok);
            } catch (error) {
                displayResponse('registerResponse', { message: 'Error: ' + error.message }, false);
            }
        });

        // Login
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                username: formData.get('username'),
                password: formData.get('password')
            };

            try {
                const response = await fetch('api/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                displayResponse('loginResponse', result, response.ok);
            } catch (error) {
                displayResponse('loginResponse', { message: 'Error: ' + error.message }, false);
            }
        });

        // Get Profile
        async function getProfile() {
            try {
                const response = await fetch('api/profile.php');
                const result = await response.json();
                displayResponse('profileResponse', result, response.ok);
            } catch (error) {
                displayResponse('profileResponse', { message: 'Error: ' + error.message }, false);
            }
        }

        // Logout
        async function logout() {
            try {
                const response = await fetch('api/logout.php', { method: 'POST' });
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

## Step 14: Test the Complete System

### Access Test Page
Navigate to: `http://localhost/workshop-api/test.html`

### Test Flow
1. **Register** a new user
2. **Login** with the registered credentials
3. **Get Profile** to verify authentication
4. **Logout** to end session

## Lab Completion Checklist

- [ ] XAMPP installed and running
- [ ] Database created with users table
- [ ] Project structure created
- [ ] Database connection class implemented
- [ ] User model with CRUD operations
- [ ] Response helper class created
- [ ] Input validation helper created
- [ ] Registration API implemented
- [ ] Login API implemented
- [ ] Profile API implemented
- [ ] Logout API implemented
- [ ] Test HTML page created
- [ ] All APIs tested with Postman
- [ ] Complete authentication flow working

## Next Steps

1. Add JWT token authentication
2. Implement password reset functionality
3. Add user roles and permissions
4. Implement rate limiting
5. Add API documentation with Swagger
6. Implement unit tests
7. Add logging and monitoring

## Troubleshooting

### Common Issues:
1. **Apache not starting**: Check if port 80 is free
2. **MySQL not starting**: Check if port 3306 is free
3. **Database connection error**: Verify database name and credentials
4. **CORS issues**: Check Access-Control-Allow-Origin headers
5. **Session not working**: Ensure session_start() is called

### Getting Help:
- Check XAMPP control panel for service status
- Check Apache error logs in `C:\xampp\apache\logs\`
- Check PHP error logs in `C:\xampp\php\logs\`
- Verify file permissions and paths
- Test database connection separately
