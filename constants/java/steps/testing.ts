// Java Testing and Deployment Steps - Database Setup and API Testing
export const JAVA_TESTING_STEPS = [
  {
    id: 'java-6',
    title: 'Setup MySQL Database and Tables',
    description: 'Create the MySQL database schema with proper table structure for user authentication, including indexes and constraints.',

    codeSnippet: {
      language: 'bash',
      code: `# Connect to MySQL as root
mysql -u root -p

# Create database and user
CREATE DATABASE workshop_auth;
CREATE USER 'workshop_user'@'localhost' IDENTIFIED BY 'workshop_password';
GRANT ALL PRIVILEGES ON workshop_auth.* TO 'workshop_user'@'localhost';
FLUSH PRIVILEGES;

# Use the database
USE workshop_auth;`
    },




  },
  {
    id: 'java-7',
    title: 'Test API Endpoints with Postman',
    description: 'Comprehensive testing of the authentication API endpoints using Postman, including request/response validation and error handling.',
    detailedSteps: [
      'Install Postman application',
      'Create Postman collection for authentication API',
      'Test user registration endpoint',
      'Test user login endpoint',
      'Validate response formats and error handling',
      'Test with invalid data and edge cases'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Start the Java application (after building)
mvn clean package
mvn tomcat7:run

# The application will be available at:
# http://localhost:8080/workshop-java-servlets/`
    },
    fileCreationSteps: [
      '📄 Create: postman_collection.json file',
      '🔧 Add: Postman collection with all endpoints',
      '🔧 Add: Environment variables for base URL',
      '🔧 Add: Test scripts for validation',
      '🔧 Add: Example request bodies',
      '🔧 Add: Response validation tests'
    ],
    additionalCodeSnippet: {
      language: 'json',
      code: `{
  "info": {
    "name": "Workshop Java Servlets API",
    "description": "Authentication API testing collection",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:8080/workshop-java-servlets",
      "type": "string"
    }
  ],
  "item": [
    {
      "name": "User Registration",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"username\": \"testuser\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\",\n  \"confirmPassword\": \"password123\",\n  \"firstName\": \"Test\",\n  \"lastName\": \"User\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/auth/register",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "register"]
        }
      },
      "response": [],
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "pm.test(\"Status code is 200\", function () {",
              "    pm.response.to.have.status(200);",
              "});",
              "",
              "pm.test(\"Response has success field\", function () {",
              "    var jsonData = pm.response.json();",
              "    pm.expect(jsonData).to.have.property('success');",
              "});",
              "",
              "pm.test(\"Success is true\", function () {",
              "    var jsonData = pm.response.json();",
              "    pm.expect(jsonData.success).to.eql(true);",
              "});",
              "",
              "pm.test(\"Response contains user data\", function () {",
              "    var jsonData = pm.response.json();",
              "    pm.expect(jsonData).to.have.property('user');",
              "    pm.expect(jsonData.user).to.have.property('username');",
              "    pm.expect(jsonData.user.username).to.eql('testuser');",
              "});"
            ]
          }
        }
      ]
    },
    {
      "name": "User Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"username\": \"testuser\",\n  \"password\": \"password123\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/auth/login",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "login"]
        }
      },
      "response": [],
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "pm.test(\"Status code is 200\", function () {",
              "    pm.response.to.have.status(200);",
              "});",
              "",
              "pm.test(\"Login successful\", function () {",
              "    var jsonData = pm.response.json();",
              "    pm.expect(jsonData.success).to.eql(true);",
              "    pm.expect(jsonData.message).to.include('successful');",
              "});",
              "",
              "pm.test(\"User data returned\", function () {",
              "    var jsonData = pm.response.json();",
              "    pm.expect(jsonData).to.have.property('user');",
              "    pm.expect(jsonData.user.username).to.eql('testuser');",
              "});"
            ]
          }
        }
      ]
    },
    {
      "name": "Login with Invalid Credentials",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"username\": \"invaliduser\",\n  \"password\": \"wrongpassword\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/auth/login",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "login"]
        }
      },
      "response": [],
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "pm.test(\"Status code is 200\", function () {",
              "    pm.response.to.have.status(200);",
              "});",
              "",
              "pm.test(\"Login failed\", function () {",
              "    var jsonData = pm.response.json();",
              "    pm.expect(jsonData.success).to.eql(false);",
              "});"
            ]
          }
        }
      ]
    }
  ]
}`
    },
    verificationSteps: [
      '📄 Verify: postman_collection.json file created',
      '🔧 Test: Import collection into Postman',
      '📝 Verify: All endpoints are properly configured',
      '🔧 Check: Request bodies contain valid JSON',
      '🔧 Test: Response validation scripts work',
      '🔧 Verify: Error handling tests pass',
      '🔧 Test: API endpoints respond correctly'
    ],
    additionalThoughts: 'Postman is an excellent tool for API testing and documentation. The test scripts automatically validate responses, ensuring your API works correctly. Always test both positive and negative scenarios. The collection can be shared with team members and used for automated testing.'
  },
  {
    id: 'java-8',
    title: 'Advanced Postman API Validation Techniques',
    description: 'Learn advanced Postman testing techniques including environment variables, pre-request scripts, automated testing, and CI/CD integration.',
    detailedSteps: [
      'Set up Postman environment variables',
      'Create pre-request scripts for dynamic data',
      'Implement comprehensive test suites',
      'Set up automated testing with Newman',
      'Integrate with CI/CD pipelines',
      'Create detailed test reports'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Install Newman for command-line testing
npm install -g newman

# Run collection with environment
newman run postman_collection.json -e environment.json

# Generate HTML report
newman run postman_collection.json -r html

# Run with custom reporters
newman run postman_collection.json -r cli,html,junit`
    },
    fileCreationSteps: [
      '📄 Create: postman_environment.json file',
      '📄 Create: pre_request_scripts.js file',
      '📄 Create: test_suite.js file',
      '📄 Create: newman_config.json file',
      '🔧 Add: Environment variables setup',
      '🔧 Add: Pre-request scripts for dynamic data',
      '🔧 Add: Advanced test assertions',
      '🔧 Add: Newman configuration for CI/CD'
    ],
    additionalCodeSnippet: {
      language: 'json',
      code: `{
  "name": "Workshop Java API Environment",
  "values": [
    {
      "key": "baseUrl",
      "value": "http://localhost:8080/workshop-java-servlets",
      "type": "default",
      "enabled": true
    },
    {
      "key": "authToken",
      "value": "",
      "type": "secret",
      "enabled": true
    },
    {
      "key": "userId",
      "value": "",
      "type": "default",
      "enabled": true
    },
    {
      "key": "testUsername",
      "value": "testuser_",
      "type": "default",
      "enabled": true
    },
    {
      "key": "testEmail",
      "value": "test",
      "type": "default",
      "enabled": true
    }
  ]
}

// Pre-request Script for Dynamic Data
// Add this to the "Pre-request Script" tab in Postman

// Generate unique username and email for each test run
const timestamp = Date.now();
const randomId = Math.floor(Math.random() * 1000);

pm.environment.set("uniqueUsername", pm.environment.get("testUsername") + timestamp + randomId);
pm.environment.set("uniqueEmail", pm.environment.get("testEmail") + timestamp + randomId + "@example.com");

// Set current timestamp for testing
pm.environment.set("currentTimestamp", new Date().toISOString());

// Advanced Test Script Example
// Add this to the "Tests" tab in Postman

// Test response time
pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Test response headers
pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// Test response structure
pm.test("Response has required fields", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData).to.have.property('message');
});

// Test business logic
pm.test("Success response contains user data", function () {
    const jsonData = pm.response.json();
    if (jsonData.success) {
        pm.expect(jsonData).to.have.property('user');
        pm.expect(jsonData.user).to.have.property('username');
        pm.expect(jsonData.user).to.have.property('email');
    }
});

// Store values for other requests
if (pm.response.json().success && pm.response.json().user) {
    pm.environment.set("userId", pm.response.json().user.id);
    pm.environment.set("authToken", pm.response.json().token || "");
}

// Newman Configuration for CI/CD
{
  "collection": "postman_collection.json",
  "environment": "environment.json",
  "reporters": ["cli", "html", "junit"],
  "reporter": {
    "html": {
      "export": "./reports/report.html"
    },
    "junit": {
      "export": "./reports/report.xml"
    }
  },
  "iterationCount": 3,
  "delayRequest": 1000,
  "timeout": 30000
}`
    },
    verificationSteps: [
      '📄 Verify: Environment file created with variables',
      '🔧 Test: Pre-request scripts generate dynamic data',
      '📝 Verify: Advanced test assertions work correctly',
      '🔧 Check: Newman runs collection successfully',
      '🔧 Test: HTML reports are generated',
      '🔧 Verify: CI/CD integration works',
      '🔧 Check: Environment variables are properly set'
    ],
    additionalThoughts: 'Advanced Postman testing techniques enable professional API testing workflows. Pre-request scripts allow dynamic data generation, making tests more realistic and repeatable. Newman integration enables automated testing in CI/CD pipelines, ensuring API quality across deployments. Environment variables make tests portable across different environments (dev, staging, production).'
  },
  {
    id: 'java-9',
    title: 'Deploy to Apache Tomcat',
    description: 'Build the Maven project and deploy the WAR file to Apache Tomcat for production-like testing and demonstration.',
    detailedSteps: [
      'Build the Maven project',
      'Generate WAR file',
      'Deploy to Tomcat server',
      'Configure Tomcat for the application',
      'Test the deployed application',
      'Monitor logs and performance'
    ],
    codeSnippet: {
      language: 'bash',
      code: `# Build the project
mvn clean package

# The WAR file will be created in target/ directory
# Copy it to Tomcat webapps directory
cp target/workshop-java-servlets-1.0-SNAPSHOT.war /path/to/tomcat/webapps/

# Or use Maven Tomcat plugin for embedded deployment
mvn tomcat7:run

# Check Tomcat logs
tail -f /path/to/tomcat/logs/catalina.out`
    },
    fileCreationSteps: [
      '📄 Create: deployment_guide.md file',
      '🔧 Add: Tomcat installation instructions',
      '🔧 Add: Maven build commands',
      '🔧 Add: WAR deployment steps',
      '🔧 Add: Configuration verification steps',
      '🔧 Add: Troubleshooting guide'
    ],
    additionalCodeSnippet: {
      language: 'markdown',
      code: `# Java Servlet Deployment Guide

## Prerequisites
- Java 17 or higher installed
- Maven 3.6+ installed
- Apache Tomcat 10+ installed
- MySQL 8.0+ running

## Build and Deploy

### 1. Build the Project
\`\`\`bash
# Clean and package the project
mvn clean package

# Verify WAR file creation
ls -la target/*.war
\`\`\`

### 2. Deploy to Tomcat

#### Option A: Manual Deployment
\`\`\`bash
# Copy WAR file to Tomcat webapps
cp target/workshop-java-servlets-1.0-SNAPSHOT.war \\
   $TOMCAT_HOME/webapps/

# Restart Tomcat
$TOMCAT_HOME/bin/shutdown.sh
$TOMCAT_HOME/bin/startup.sh
\`\`\`

#### Option B: Maven Tomcat Plugin
\`\`\`bash
# Run embedded Tomcat
mvn tomcat7:run

# Application will be available at:
# http://localhost:8080/workshop-java-servlets/
\`\`\`

### 3. Verify Deployment
- Check Tomcat logs: \`tail -f $TOMCAT_HOME/logs/catalina.out\`
- Access application: http://localhost:8080/workshop-java-servlets/
- Test API endpoints with Postman

### 4. Configuration
- Update database.properties with correct MySQL credentials
- Ensure MySQL server is running
- Check firewall settings if accessing remotely

## Troubleshooting

### Common Issues:
1. **ClassNotFoundException**: Check Maven dependencies
2. **Database Connection Failed**: Verify MySQL credentials and connectivity
3. **404 Errors**: Check servlet mappings in web.xml
4. **CORS Issues**: Verify CORS filter configuration

### Log Analysis:
- Check Tomcat logs: \`$TOMCAT_HOME/logs/catalina.out\`
- Check application logs in console output
- Verify database connection in logs`
    },
    verificationSteps: [
      '📄 Verify: deployment_guide.md file created',
      '🔧 Test: Maven build completes successfully',
      '📝 Verify: WAR file is generated in target/ directory',
      '🔧 Check: Application deploys to Tomcat without errors',
      '🔧 Test: API endpoints work after deployment',
      '🔧 Verify: Database connectivity in deployed environment',
      '🔧 Check: Tomcat logs for any errors'
    ],
    additionalThoughts: 'Deployment is the final step in the development cycle. Using Maven for building ensures consistent builds across different environments. The embedded Tomcat plugin is great for development and testing, while manual deployment to a standalone Tomcat server is better for production-like environments.'
  }
];
