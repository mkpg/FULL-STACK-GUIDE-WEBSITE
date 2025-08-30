// Java Setup Steps - Maven Project Setup and Dependencies
export const JAVA_SETUP_STEPS = [
  {
    id: 'java-1',
    title: 'Create Maven Project Structure',
    description: 'Set up a new Maven project with proper directory structure for Java Servlet development and configure essential dependencies.',

    codeSnippet: {
      language: 'powershell',
      code: `# Create project directory
mkdir workshop-java-servlets
cd workshop-java-servlets

# Create Maven project structure
mkdir src\main\java\com\workshop\auth
mkdir src\main\webapp\WEB-INF
mkdir src\main\resources

# Create pom.xml file
New-Item -ItemType File -Path pom.xml -Force

📁 JAVA SERVLET PROJECT STRUCTURE DIAGRAM:
workshop-java-servlets/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── workshop/
│   │   │           └── auth/
│   │   │               ├── models/
│   │   │               │   ├── User.java
│   │   │               │   ├── AuthRequest.java
│   │   │               │   └── AuthResponse.java
│   │   │               ├── servlets/
│   │   │               │   ├── LoginServlet.java
│   │   │               │   └── RegisterServlet.java
│   │   │               ├── utils/
│   │   │               │   ├── DatabaseUtil.java
│   │   │               │   └── CORSFilter.java
│   │   │               └── Main.java
│   │   ├── webapp/
│   │   │   ├── WEB-INF/
│   │   │   │   ├── web.xml
│   │   │   │   └── lib/
│   │   │   └── index.html
│   │   └── resources/
│   │       ├── database.properties
│   │       └── log4j.properties
├── pom.xml
├── target/
└── README.md

🏗️ MAVEN BUILD PROCESS FLOW:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Source Code   │───▶│   Maven Build   │───▶│   WAR File      │
│   (Java Files)  │    │   (Compile)     │    │   (Deployable)  │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Dependencies  │    │   Testing       │    │   Tomcat        │
│   (pom.xml)     │    │   (Unit Tests)  │    │   Deployment    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘

🌐 SERVLET ARCHITECTURE:
┌─────────────────┐    HTTP Request    ┌─────────────────┐
│                 │ ──────────────────→ │                 │
│   Frontend      │                     │   Java Servlet  │
│   (Browser)     │                     │   Container     │
│                 │ ←────────────────── │                 │
└─────────────────┘   HTTP Response    └─────────────────┘
                              │
                              │ JDBC Connection
                              ▼
                    ┌─────────────────┐
                    │                 │
                    │   MySQL         │
                    │   Database      │
                    │                 │
                    └─────────────────┘

🔐 SERVLET LIFECYCLE:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│             │    │             │    │             │    │             │
│   Load      │───▶│   Init      │───▶│   Service   │───▶│  Destroy    │
│   Class     │    │   (Once)    │    │ (Per Request)│   │   (Once)    │
│             │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
         │                 │                 │                 │
         ▼                 ▼                 ▼                 ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│             │    │             │    │             │    │             │
│   Class     │    │   Setup     │    │   Process   │    │   Cleanup   │
│   Loader    │    │   Resources │    │   Request   │    │   Resources │
│             │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘`
    },




  },
  {
    id: 'java-2',
    title: 'Configure Web Application Descriptor',
    description: 'Set up web.xml file to configure servlet mappings, URL patterns, and application settings for deployment to Tomcat.',


    codeSnippet: {
      language: 'xml',
      code: `<!-- src/main/webapp/WEB-INF/web.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee 
         https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0">

    <display-name>Authentication Servlet API</display-name>

    <!-- CORS Filter -->
    <filter>
        <filter-name>CORSFilter</filter-name>
        <filter-class>com.workshop.auth.filter.CORSFilter</filter-class>
    </filter>
    
    <filter-mapping>
        <filter-name>CORSFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!-- Login Servlet -->
    <servlet>
        <servlet-name>LoginServlet</servlet-name>
        <servlet-class>com.workshop.auth.servlet.LoginServlet</servlet-class>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>LoginServlet</servlet-name>
        <url-pattern>/api/auth/login</url-pattern>
    </servlet-mapping>

    <!-- Register Servlet -->
    <servlet>
        <servlet-name>RegisterServlet</servlet-name>
        <servlet-class>com.workshop.auth.servlet.RegisterServlet</servlet-class>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>RegisterServlet</servlet-name>
        <url-pattern>/api/auth/register</url-pattern>
    </servlet-mapping>

    <!-- Session Configuration -->
    <session-config>
        <session-timeout>30</session-timeout>
    </session-config>

    <!-- Welcome File -->
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>

    <!-- Error Pages -->
    <error-page>
        <error-code>404</error-code>
        <location>/error/404.html</location>
    </error-page>
    
    <error-page>
        <error-code>500</error-code>
        <location>/error/500.html</location>
    </error-page>
</web-app>

<!-- src/main/resources/database.properties -->
db.url=jdbc:mysql://localhost:3306/workshop_auth
db.username=workshop_user
db.password=workshop_password
db.driver=com.mysql.cj.jdbc.Driver
db.maxConnections=10`
    },

  }
];
