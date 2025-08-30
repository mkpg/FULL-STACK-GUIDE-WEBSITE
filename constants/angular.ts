// Angular Section - Explanation and Hands-on Lab for Login + Home Page Application
import type { Section } from '../types';

export const ANGULAR_SECTION: Section = {
  id: 'angular',
  title: 'Frontend - Angular',
  overview: 'Learn Angular framework and build a complete application with user registration, login, and home pages. Includes form validation, localStorage management, and navigation with route guards.',
  coreConcepts: [
    '**Angular Framework:** Modern TypeScript-based frontend framework by Google',
    '**Component-Based Architecture:** Reusable UI components with encapsulated logic and styling',
    '**TypeScript Integration:** Strong typing, interfaces, and object-oriented programming features',
    '**Dependency Injection:** Built-in DI container for managing service dependencies and singletons',
    '**Module System:** NgModule for organizing components, services, and other Angular features',
    '**Routing & Navigation:** Angular Router for single-page application navigation and route guards',
    '**Reactive Forms:** FormBuilder for complex form creation with validation and error handling',
    '**Template-Driven Forms:** Two-way data binding with ngModel for simple form scenarios',
    '**Services & State Management:** Injectable services for business logic and data sharing',
    '**Observables & RxJS:** Reactive programming for handling asynchronous operations and data streams',
    '**Lifecycle Hooks:** ngOnInit, ngOnDestroy, and other component lifecycle management',
    '**Input/Output Properties:** Data flow between parent and child components',
    '**ViewChild & ContentChild:** Accessing child components and content projection',
    '**Pipes:** Data transformation and formatting in templates',
    '**Directives:** Structural (ngIf, ngFor) and attribute directives for DOM manipulation',
    '**HTTP Client:** HttpClient for making API calls and handling responses',
    '**Testing:** Jasmine and Karma for unit testing Angular components and services',
    '**Build & Deployment:** Angular CLI for development, building, and production deployment'
  ],
  steps: [
    {
      id: 'angular-1',
      title: 'Setup Angular CLI and Project Structure',
      description: 'Install Angular CLI and create a new Angular application with routing and forms support.',
      codeSnippet: { 
        language: 'bash', 
        code: `# Install Angular CLI globally
npm install -g @angular/cli

# Create new Angular project with routing
ng new workshop-app --routing=true --style=css

# Navigate to project directory
cd workshop-app

# Install additional dependencies
npm install @angular/forms @angular/common @angular/router

📁 PROJECT STRUCTURE DIAGRAM:
workshop-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.css
│   │   │   ├── register/
│   │   │   │   ├── register.component.ts
│   │   │   │   ├── register.component.html
│   │   │   │   └── register.component.css
│   │   │   └── home/
│   │   │       ├── home.component.ts
│   │   │       ├── home.component.html
│   │   │       └── home.component.css
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── user.service.ts
│   │   ├── models/
│   │   │   ├── user.interface.ts
│   │   │   └── auth.interface.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/
│   ├── index.html
│   └── styles.css
├── package.json
├── angular.json
└── tsconfig.json`
      }
    },
    {
      id: 'angular-2',
      title: 'Generate Components and Services with CLI',
      description: 'Use Angular CLI to generate all required components, services, guards, and interfaces.',
      codeSnippet: {
        language: 'bash',
        code: `# Generate all required components and services
ng generate component components/login --skip-tests
ng generate component components/register --skip-tests
ng generate component components/home --skip-tests

# Generate services
ng generate service services/auth --skip-tests

# Generate guards
ng generate guard guards/auth --skip-tests
ng generate guard guards/no-auth --skip-tests

# Generate interfaces
ng generate interface models/user --skip-tests
ng generate interface models/auth --skip-tests

# Or use shorter syntax:
# ng g c components/login --skip-tests
# ng g s services/auth --skip-tests
# ng g g guards/auth --skip-tests`
      }
    },
    {
      id: 'angular-3',
      title: 'Create User Interface and Models',
      description: 'Define user interface and create models for user data management.',
      codeSnippet: { 
        language: 'typescript', 
        code: `// src/app/models/user.interface.ts
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

// src/app/models/auth.interface.ts
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}` 
      }
    },
    {
      id: 'angular-4',
      title: 'Create Models Index File',
      description: 'Create an index file to enable clean imports from the models directory.',
      codeSnippet: {
        language: 'typescript',
        code: `// src/app/models/index.ts
export { User } from './user.interface';
export { LoginRequest, RegisterRequest, AuthResponse } from './auth.interface';`
      }
    },
    {
      id: 'angular-5',
      title: 'Angular CLI Commands Reference',
      description: 'Complete reference of Angular CLI commands for generating components, services, and other files.',
      codeSnippet: {
        language: 'bash',
        code: `# ANGULAR CLI COMMANDS REFERENCE

# 1. COMPONENT GENERATION
ng generate component components/login
ng g c components/login                    # Shorter syntax
ng g c components/login --skip-tests      # No spec file
ng g c components/login --inline-template --inline-styles  # Inline template/styles

# 2. SERVICE GENERATION
ng generate service services/auth
ng g s services/auth                      # Shorter syntax
ng g s services/auth --skip-tests        # No spec file

# 3. GUARD GENERATION
ng generate guard guards/auth
ng g g guards/auth                        # Shorter syntax
ng g g guards/auth --skip-tests          # No spec file

# 4. INTERFACE GENERATION
ng generate interface models/user
ng g i models/user                        # Shorter syntax
ng g i models/user --skip-tests          # No spec file

# 5. PIPE GENERATION
ng generate pipe pipes/custom
ng g p pipes/custom                       # Shorter syntax

# 6. DIRECTIVE GENERATION
ng generate directive directives/highlight
ng g d directives/highlight               # Shorter syntax

# 7. MODULE GENERATION
ng generate module modules/shared
ng g m modules/shared                     # Shorter syntax

# 8. COMPLETE WORKSHOP SETUP
ng new workshop-app --routing=true --style=css
cd workshop-app
npm install @angular/forms @angular/common @angular/router

# Generate all components
ng g c components/login --skip-tests
ng g c components/register --skip-tests
ng g c components/home --skip-tests

# Generate services
ng g s services/auth --skip-tests

# Generate guards
ng g g guards/auth --skip-tests
ng g g guards/no-auth --skip-tests

# Generate interfaces
ng g i models/user --skip-tests
ng g i models/auth --skip-tests

# 9. USEFUL FLAGS
--skip-tests                              # Don't create spec files
--inline-template                         # Template in component file
--inline-styles                           # Styles in component file
--dry-run                                 # Show what would be created
--force                                   # Overwrite existing files
--help                                    # Show help for command`
      }
    },
    {
      id: 'angular-6',
      title: 'Create Authentication Service',
      description: 'Implement service for user authentication, registration, and localStorage management.',
      codeSnippet: { 
        language: 'typescript', 
        code: `// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  // Load user from localStorage on app start
  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.currentUserSubject.next(user);
    }
  }

  // User registration with validation
  register(userData: RegisterRequest): AuthResponse {
    // Check if username already exists
    const existingUsers = this.getUsersFromStorage();
    if (existingUsers.find(u => u.username === userData.username)) {
      return { success: false, message: 'Username already exists' };
    }

    // Check if email already exists
    if (existingUsers.find(u => u.email === userData.email)) {
      return { success: false, message: 'Email already exists' };
    }

    // Validate password confirmation
    if (userData.password !== userData.confirmPassword) {
      return { success: false, message: 'Passwords do not match' };
    }

    // Validate password strength
    if (userData.password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    // Create new user
    const newUser: User = {
      id: this.generateId(),
      username: userData.username,
      email: userData.email,
      password: this.hashPassword(userData.password), // Simulate hashing
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date()
    };

    // Save to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    return { 
      success: true, 
      message: 'Registration successful! Please login.',
      user: newUser 
    };
  }

  // User login with validation
  login(credentials: LoginRequest): AuthResponse {
    const users = this.getUsersFromStorage();
    const user = users.find(u => u.username === credentials.username);

    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }

    // Simulate password verification (in real app, use proper hashing)
    if (this.verifyPassword(credentials.password, user.password)) {
      // Store current user in localStorage and service
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      
      return { 
        success: true, 
        message: 'Login successful!',
        user: user 
      };
    }

    return { success: false, message: 'Invalid username or password' };
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Helper methods
  private getUsersFromStorage(): User[] {
    const usersStr = localStorage.getItem('users');
    return usersStr ? JSON.parse(usersStr) : [];
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private hashPassword(password: string): string {
    // Simulate password hashing (in real app, use bcrypt or similar)
    return btoa(password + 'salt');
  }

  private verifyPassword(password: string, hashedPassword: string): boolean {
    // Simulate password verification
    return this.hashPassword(password) === hashedPassword;
  }
}` 
      }
    },
    {
      id: 'angular-7',
      title: 'Create Login Component - TypeScript',
      description: 'Implement the TypeScript logic for the login component with form validation and authentication.',
      codeSnippet: {
        language: 'typescript',
        code: `// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const result = this.authService.login(this.loginForm.value);
      
      if (result.success) {
        // Navigate to home page on successful login
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = result.message;
      }
      
      this.loading = false;
    }
  }
}`
      }
    },
    {
      id: 'angular-8',
      title: 'Create Login Component - HTML Template',
      description: 'Create the HTML template for the login component with form structure and validation display.',
      codeSnippet: {
        language: 'html',
        code: `<!-- src/app/components/login/login.component.html -->
<div class="login-container">
  <div class="login-card">
    <h2>Welcome Back</h2>
    <p class="subtitle">Sign in to your account</p>
    
    <div *ngIf="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          formControlName="username"
          [class.error]="f['username'].invalid && f['username'].touched"
          placeholder="Enter your username"
          [disabled]="loading"
        />
        <div *ngIf="f['username'].invalid && f['username'].touched" class="error-text">
          <span *ngIf="f['username'].errors?.['required']">Username is required</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          formControlName="password"
          [class.error]="f['password'].invalid && f['password'].touched"
          placeholder="Enter your password"
          [disabled]="loading"
        />
        <div *ngIf="f['password'].invalid && f['password'].touched" class="error-text">
          <span *ngIf="f['password'].errors?.['required']">Password is required</span>
        </div>
      </div>
      
      <button 
        type="submit" 
        class="login-button"
        [disabled]="loading || loginForm.invalid"
      >
        {{ loading ? 'Signing In...' : 'Sign In' }}
      </button>
    </form>
    
    <div class="login-footer">
      <p>
        Don't have an account? 
        <a routerLink="/register" class="link-button">Sign up</a>
      </p>
    </div>
  </div>
</div>`
      }
    },
    {
      id: 'angular-9',
      title: 'Create Login Component - CSS Styles',
      description: 'Add CSS styling for the login component to create a modern, responsive design.',
      codeSnippet: {
        language: 'text',
        code: `/* src/app/components/login/login.component.css */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-card h2 {
  color: #333;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 600;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.login-form {
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

.error-message {
  background: #fdf2f2;
  color: #e74c3c;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #fecaca;
}

.login-button {
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.login-button:hover:not(:disabled) {
  background: #5a6fd8;
}

.login-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 30px;
  text-align: center;
}

.link-button {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.link-button:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
    margin: 10px;
  }
}`
      }
    },
    {
      id: 'angular-10',
      title: 'Create Register Component - TypeScript',
      description: 'Implement the TypeScript logic for the registration component with comprehensive form validation.',
      codeSnippet: {
        language: 'typescript',
        code: `// src/app/components/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Custom validator for password confirmation
  passwordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  // Get form controls for easy access in template
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const result = this.authService.register(this.registerForm.value);
      
      if (result.success) {
        this.successMessage = result.message;
        this.registerForm.reset();
        
        // Redirect to login after successful registration
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.errorMessage = result.message;
      }
      
      this.loading = false;
    } else {
      this.markFormGroupTouched();
    }
  }

  // Mark all form controls as touched to show validation errors
  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }
}`
      }
    },
    {
      id: 'angular-11',
      title: 'Create Register Component - HTML Template',
      description: 'Create the HTML template for the registration component with comprehensive form fields and validation.',
      codeSnippet: {
        language: 'html',
        code: `<!-- src/app/components/register/register.component.html -->
<div class="register-container">
  <div class="register-card">
    <h2>Create Account</h2>
    <p class="subtitle">Join us today</p>
    
    <div *ngIf="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div *ngIf="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            formControlName="firstName"
            [class.error]="f['firstName'].invalid && f['firstName'].touched"
            placeholder="Enter your first name"
            [disabled]="loading"
          />
          <div *ngIf="f['firstName'].invalid && f['firstName'].touched" class="error-text">
            <span *ngIf="f['firstName'].errors?.['required']">First name is required</span>
            <span *ngIf="f['firstName'].errors?.['minlength']">First name must be at least 2 characters</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            formControlName="lastName"
            [class.error]="f['lastName'].invalid && f['lastName'].touched"
            placeholder="Enter your last name"
            [disabled]="loading"
          />
          <div *ngIf="f['lastName'].invalid && f['lastName'].touched" class="error-text">
            <span *ngIf="f['lastName'].errors?.['required']">Last name is required</span>
            <span *ngIf="f['lastName'].errors?.['minlength']">Last name must be at least 2 characters</span>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          formControlName="username"
          [class.error]="f['username'].invalid && f['username'].touched"
          placeholder="Choose a username"
          [disabled]="loading"
        />
        <div *ngIf="f['username'].invalid && f['username'].touched" class="error-text">
          <span *ngIf="f['username'].errors?.['required']">Username is required</span>
          <span *ngIf="f['username'].errors?.['minlength']">Username must be at least 3 characters</span>
          <span *ngIf="f['username'].errors?.['pattern']">Username can only contain letters, numbers, and underscores</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          formControlName="email"
          [class.error]="f['email'].invalid && f['email'].touched"
          placeholder="Enter your email"
          [disabled]="loading"
        />
        <div *ngIf="f['email'].invalid && f['email'].touched" class="error-text">
          <span *ngIf="f['email'].errors?.['required']">Email is required</span>
          <span *ngIf="f['email'].errors?.['email']">Please enter a valid email address</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          formControlName="password"
          [class.error]="f['password'].invalid && f['password'].touched"
          placeholder="Create a strong password"
          [disabled]="loading"
        />
        <div *ngIf="f['password'].invalid && f['password'].touched" class="error-text">
          <span *ngIf="f['password'].errors?.['required']">Password is required</span>
          <span *ngIf="f['password'].errors?.['minlength']">Password must be at least 8 characters</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          formControlName="confirmPassword"
          [class.error]="f['confirmPassword'].invalid && f['confirmPassword'].touched"
          placeholder="Confirm your password"
          [disabled]="loading"
        />
        <div *ngIf="f['confirmPassword'].invalid && f['confirmPassword'].touched" class="error-text">
          <span *ngIf="f['confirmPassword'].errors?.['required']">Please confirm your password</span>
        </div>
        <div *ngIf="registerForm.errors?.['passwordMismatch'] && f['confirmPassword'].touched" class="error-text">
          Passwords do not match
        </div>
      </div>
      
      <button 
        type="submit" 
        class="register-button"
        [disabled]="loading || registerForm.invalid"
      >
        {{ loading ? 'Creating Account...' : 'Create Account' }}
      </button>
    </form>
    
    <div class="register-footer">
      <p>
        Already have an account? 
        <a routerLink="/login" class="link-button">Sign in</a>
      </p>
    </div>
  </div>
</div>`
      }
    },
    {
      id: 'angular-12',
      title: 'Create Register Component - CSS Styles',
      description: 'Add CSS styling for the registration component with responsive design and modern aesthetics.',
      codeSnippet: {
        language: 'text',
        code: `/* src/app/components/register/register.component.css */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.register-card h2 {
  color: #333;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 600;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.register-form {
  text-align: left;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

.error-message {
  background: #fdf2f2;
  color: #e74c3c;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #fecaca;
}

.success-message {
  background: #f0f9ff;
  color: #059669;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #a7f3d0;
}

.register-button {
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.register-button:hover:not(:disabled) {
  background: #5a6fd8;
}

.register-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.register-footer {
  margin-top: 30px;
  text-align: center;
}

.link-button {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.link-button:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .register-card {
    padding: 30px 20px;
    margin: 10px;
  }
}`
      }
    },
    {
      id: 'angular-13',
      title: 'Create Home Component - TypeScript',
      description: 'Implement the TypeScript logic for the home component with user information display and logout functionality.',
      codeSnippet: {
        language: 'typescript',
        code: `// src/app/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  currentTime: Date = new Date();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // Redirect to login if not authenticated
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    // Update time every second
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getFormattedDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getFormattedTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}`
      }
    },
    {
      id: 'angular-14',
      title: 'Create Home Component - HTML Template',
      description: 'Create the HTML template for the home component with user dashboard and navigation.',
      codeSnippet: {
        language: 'html',
        code: `<!-- src/app/components/home/home.component.html -->
<div class="home-container" *ngIf="currentUser">
  <!-- Header -->
  <header class="home-header">
    <div class="header-content">
      <h1>Welcome, {{ currentUser.firstName }}!</h1>
      <div class="header-actions">
        <span class="current-time">
          {{ getFormattedTime(currentTime) }}
        </span>
        <button class="logout-button" (click)="logout()">
          Logout
        </button>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="home-main">
    <div class="welcome-section">
      <h2>Dashboard Overview</h2>
      <p>Welcome to your personalized dashboard. Here's what's happening today.</p>
    </div>

    <div class="user-info-card">
      <div class="user-avatar">
        {{ currentUser.firstName.charAt(0).toUpperCase() }}
      </div>
      <div class="user-details">
        <h3>{{ currentUser.firstName }} {{ currentUser.lastName }}</h3>
        <p class="user-username">{{ currentUser.username }}</p>
        <p class="user-email">{{ currentUser.email }}</p>
        <p class="user-joined">
          Member since {{ getFormattedDate(currentUser.createdAt) }}
        </p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <h4>Account Status</h4>
        <p class="stat-value">Active</p>
        <p class="stat-description">Your account is in good standing</p>
      </div>
      <div class="stat-card">
        <h4>Last Login</h4>
        <p class="stat-value">Today</p>
        <p class="stat-description">{{ getFormattedDate(currentTime) }}</p>
      </div>
      <div class="stat-card">
        <h4>Session Time</h4>
        <p class="stat-value">Active</p>
        <p class="stat-description">Session is secure and valid</p>
      </div>
    </div>

    <div class="quick-actions">
      <h3>Quick Actions</h3>
      <div class="action-buttons">
        <button class="action-btn primary">
          Edit Profile
        </button>
        <button class="action-btn secondary">
          Change Password
        </button>
        <button class="action-btn secondary">
          Contact Support
        </button>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="home-footer">
    <p>2024 Workshop Application. Welcome back, {{ currentUser.firstName }}!</p>
  </footer>
</div>`
      }
    },
    {
      id: 'angular-15',
      title: 'Create Home Component - CSS Styles',
      description: 'Add comprehensive CSS styling for the home component to create a modern dashboard design.',
      codeSnippet: {
        language: 'text',
        code: `/* src/app/components/home/home.component.css */
.home-container {
  min-height: 100vh;
  background: #f8fafc;
}

.home-header {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  color: #333;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.current-time {
  color: #666;
  font-size: 14px;
  font-family: monospace;
}

.logout-button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background: #c0392b;
}

.home-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
}

.welcome-section h2 {
  color: #333;
  font-size: 32px;
  margin-bottom: 16px;
}

.welcome-section p {
  color: #666;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
}

.user-info-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: 600;
}

.user-details h3 {
  color: #333;
  font-size: 24px;
  margin: 0 0 8px 0;
}

.user-username {
  color: #667eea;
  font-size: 16px;
  margin: 0 0 8px 0;
  font-weight: 500;
}

.user-email {
  color: #666;
  font-size: 14px;
  margin: 0 0 8px 0;
}

.user-joined {
  color: #999;
  font-size: 12px;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.stat-card h4 {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.stat-description {
  color: #999;
  font-size: 14px;
  margin: 0;
}

.quick-actions {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.quick-actions h3 {
  color: #333;
  font-size: 20px;
  margin: 0 0 24px 0;
}

.action-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: #667eea;
  color: white;
}

.action-btn.primary:hover {
  background: #5a6fd8;
}

.action-btn.secondary {
  background: #f8fafc;
  color: #333;
  border: 1px solid #e1e5e9;
}

.action-btn.secondary:hover {
  background: #e1e5e9;
}

.home-footer {
  background: white;
  border-top: 1px solid #e1e5e9;
  padding: 20px 0;
  text-align: center;
  margin-top: 40px;
}

.home-footer p {
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .user-info-card {
    flex-direction: column;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    justify-content: center;
  }
}`
      }
    },
    {
      id: 'angular-16',
      title: 'Implement Route Guards for Authentication',
      description: 'Create authentication guard to protect routes and redirect unauthorized users.',
      codeSnippet: {
        language: 'typescript',
        code: `// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Redirect to login if not authenticated
    router.navigate(['/login']);
    return false;
  }
};

// src/app/guards/no-auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const NoAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  } else {
    // Redirect to home if already authenticated
    router.navigate(['/home']);
    return false;
  }
};`
      }
    },
    {
      id: 'angular-17',
      title: 'Configure Routing and Navigation',
      description: 'Set up Angular routing with protected routes and navigation between components.',
      codeSnippet: {
        language: 'typescript',
        code: `// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [NoAuthGuard] 
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [NoAuthGuard] 
  },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// src/app/app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: \`
    <nav *ngIf="authService.isAuthenticated()" class="navbar">
      <div class="nav-brand">Workshop App</div>
      <div class="nav-menu">
        <a routerLink="/home" routerLinkActive="active">Home</a>
        <button (click)="logout()" class="logout-btn">Logout</button>
      </div>
    </nav>
    
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  \`
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}`
      }
    },
    {
      id: 'angular-18',
      title: 'Create Main App Component',
      description: 'Implement the main app component that serves as the root component with navigation and routing using standalone approach.',
      codeSnippet: {
        language: 'typescript',
        code: `// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}`
      }
    },
    {
      id: 'angular-19',
      title: 'Create Main App Template',
      description: 'Create the main app HTML template with navigation bar and router outlet.',
      codeSnippet: {
        language: 'html',
        code: `<!-- src/app/app.component.html -->
<nav *ngIf="authService.isAuthenticated()" class="navbar">
  <div class="nav-brand">
    <h1>Workshop App</h1>
  </div>
  <div class="nav-menu">
    <a routerLink="/home" routerLinkActive="active" class="nav-link">Home</a>
    <button (click)="logout()" class="logout-btn">Logout</button>
  </div>
</nav>

<main class="main-content">
  <router-outlet></router-outlet>
</main>

<footer *ngIf="authService.isAuthenticated()" class="footer">
  <p>2024 Workshop Application. All rights reserved.</p>
</footer>`
      }
    },
    {
      id: 'angular-20',
      title: 'Create Main App Styles',
      description: 'Add CSS styling for the main app component including navigation and layout.',
      codeSnippet: {
        language: 'text',
        code: `/* src/app/app.component.css */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.nav-brand h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.main-content {
  min-height: calc(100vh - 140px);
  padding: 2rem;
}

.footer {
  background: #f8f9fa;
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  color: #6c757d;
}`
      }
    },
    {
      id: 'angular-21',
      title: 'Create App Routes Configuration',
      description: 'Configure routing for the application using modern Angular 17+ standalone approach.',
      codeSnippet: {
        language: 'typescript',
        code: `// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [NoAuthGuard] 
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [NoAuthGuard] 
  },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/login' }
];`
      }
    },
    {
      id: 'angular-22',
      title: 'Create App Configuration',
      description: 'Configure the application using modern Angular 17+ standalone approach.',
      codeSnippet: {
        language: 'typescript',
        code: `// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    AuthService
  ]
};`
      }
    },
    {
      id: 'angular-23',
      title: 'Create Main Index HTML',
      description: 'Create the main index.html file with proper meta tags and Angular app mounting.',
      codeSnippet: {
        language: 'html',
        code: `<!-- src/index.html -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Workshop App - Full Stack Development</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Full Stack Workshop Application with Angular, React, PHP, and Java">
  <meta name="keywords" content="Angular, React, PHP, Java, Full Stack, Workshop">
  <meta name="author" content="Workshop Team">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
            <!-- Icons removed for cleaner design -->
</head>
<body>
  <app-root></app-root>
  
  <!-- Loading indicator -->
  <div id="loading" style="display: none;">
    <div class="spinner"></div>
  </div>
</body>
</html>`
      }
    },
    {
      id: 'angular-24',
      title: 'Create Global Styles',
      description: 'Add global CSS styles for the entire application including reset styles and common utilities.',
      codeSnippet: {
        language: 'text',
        code: `/* src/styles.css */
/* Global Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 1rem;
}

/* Links */
a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #5a6fd8;
}

/* Buttons */
button {
  cursor: pointer;
  border: none;
  outline: none;
  font-family: inherit;
  transition: all 0.3s ease;
}

/* Form Elements */
input, textarea, select {
  font-family: inherit;
  font-size: inherit;
}

/* Utility Classes */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 1rem; }
.mt-4 { margin-top: 1.5rem; }
.mt-5 { margin-top: 3rem; }

.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 3rem; }

.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 1rem; }
.p-4 { padding: 1.5rem; }
.p-5 { padding: 3rem; }

/* Loading Spinner */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .nav-menu {
    flex-direction: column;
    gap: 1rem;
  }
}`
      }
    },
    {
      id: 'angular-25',
      title: 'Create NoAuthGuard for Public Routes',
      description: 'Implement guard to prevent authenticated users from accessing login/register pages using modern functional approach.',
      codeSnippet: {
        language: 'typescript',
        code: `// src/app/guards/no-auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const NoAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  } else {
    // Redirect to home if already authenticated
    router.navigate(['/home']);
    return false;
  }
};`
      }
    },
    {
      id: 'angular-19',
      title: 'Complete HTML Templates for Components',
      description: 'Create complete HTML templates for login, register, and home components.',
      codeSnippet: {
        language: 'html',
        code: `<!-- src/app/components/login/login.component.html -->
<div class="login-container">
  <div class="login-card">
    <h2>Welcome Back</h2>
    <p class="subtitle">Sign in to your account</p>
    
    <div *ngIf="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          formControlName="username"
          [class.error]="f['username'].invalid && f['username'].touched"
          placeholder="Enter your username"
          [disabled]="loading"
        />
        <div *ngIf="f['username'].invalid && f['username'].touched" class="error-text">
          <span *ngIf="f['username'].errors?.['required']">Username is required</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          formControlName="password"
          [class.error]="f['password'].invalid && f['password'].touched"
          placeholder="Enter your password"
          [disabled]="loading"
        />
        <div *ngIf="f['password'].invalid && f['password'].touched" class="error-text">
          <span *ngIf="f['password'].errors?.['required']">Password is required</span>
        </div>
      </div>
      
      <button 
        type="submit" 
        class="login-button"
        [disabled]="loading || loginForm.invalid"
      >
        {{ loading ? 'Signing In...' : 'Sign In' }}
      </button>
    </form>
    
    <div class="login-footer">
      <p>
        Don't have an account? 
        <a routerLink="/register" class="link-button">Sign up</a>
      </p>
    </div>
  </div>
</div>

<!-- src/app/components/register/register.component.html -->
<div class="register-container">
  <div class="register-card">
    <h2>Create Account</h2>
    <p class="subtitle">Join us today</p>
    
    <div *ngIf="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div *ngIf="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            formControlName="firstName"
            [class.error]="f['firstName'].invalid && f['firstName'].touched"
            placeholder="Enter your first name"
            [disabled]="loading"
          />
          <div *ngIf="f['firstName'].invalid && f['firstName'].touched" class="error-text">
            <span *ngIf="f['firstName'].errors?.['required']">First name is required</span>
            <span *ngIf="f['firstName'].errors?.['minlength']">First name must be at least 2 characters</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            formControlName="lastName"
            [class.error]="f['lastName'].invalid && f['lastName'].touched"
            placeholder="Enter your last name"
            [disabled]="loading"
          />
          <div *ngIf="f['lastName'].invalid && f['lastName'].touched" class="error-text">
            <span *ngIf="f['lastName'].errors?.['required']">Last name is required</span>
            <span *ngIf="f['lastName'].errors?.['minlength']">Last name must be at least 2 characters</span>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          formControlName="username"
          [class.error]="f['username'].invalid && f['username'].touched"
          placeholder="Choose a username"
          [disabled]="loading"
        />
        <div *ngIf="f['username'].invalid && f['username'].touched" class="error-text">
          <span *ngIf="f['username'].errors?.['required']">Username is required</span>
          <span *ngIf="f['username'].errors?.['minlength']">Username must be at least 3 characters</span>
          <span *ngIf="f['username'].errors?.['pattern']">Username can only contain letters, numbers, and underscores</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          formControlName="email"
          [class.error]="f['email'].invalid && f['email'].touched"
          placeholder="Enter your email"
          [disabled]="loading"
        />
        <div *ngIf="f['email'].invalid && f['email'].touched" class="error-text">
          <span *ngIf="f['email'].errors?.['required']">Email is required</span>
          <span *ngIf="f['email'].errors?.['email']">Please enter a valid email address</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          formControlName="password"
          [class.error]="f['password'].invalid && f['password'].touched"
          placeholder="Create a strong password"
          [disabled]="loading"
        />
        <div *ngIf="f['password'].invalid && f['password'].touched" class="error-text">
          <span *ngIf="f['password'].errors?.['required']">Password is required</span>
          <span *ngIf="f['password'].errors?.['minlength']">Password must be at least 8 characters</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          formControlName="confirmPassword"
          [class.error]="f['confirmPassword'].invalid && f['confirmPassword'].touched"
          placeholder="Confirm your password"
          [disabled]="loading"
        />
        <div *ngIf="f['confirmPassword'].invalid && f['confirmPassword'].touched" class="error-text">
          <span *ngIf="f['confirmPassword'].errors?.['required']">Please confirm your password</span>
        </div>
        <div *ngIf="registerForm.errors?.['passwordMismatch'] && f['confirmPassword'].touched" class="error-text">
          Passwords do not match
        </div>
      </div>
      
      <button 
        type="submit" 
        class="register-button"
        [disabled]="loading || registerForm.invalid"
      >
        {{ loading ? 'Creating Account...' : 'Create Account' }}
      </button>
    </form>
    
    <div class="register-footer">
      <p>
        Already have an account? 
        <a routerLink="/login" class="link-button">Sign in</a>
      </p>
    </div>
  </div>
</div>

<!-- src/app/components/home/home.component.html -->
<div class="home-container" *ngIf="currentUser">
  <!-- Header -->
  <header class="home-header">
    <div class="header-content">
      <h1>Welcome, {{ currentUser.firstName }}!</h1>
      <div class="header-actions">
        <span class="current-time">
          {{ getFormattedTime(currentTime) }}
        </span>
        <button class="logout-button" (click)="logout()">
          Logout
        </button>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="home-main">
    <div class="welcome-section">
      <h2>Dashboard Overview</h2>
      <p>Welcome to your personalized dashboard. Here's what's happening today.</p>
    </div>

    <div class="user-info-card">
      <div class="user-avatar">
        {{ currentUser.firstName.charAt(0).toUpperCase() }}
      </div>
      <div class="user-details">
        <h3>{{ currentUser.firstName }} {{ currentUser.lastName }}</h3>
        <p class="user-username">{{ currentUser.username }}</p>
        <p class="user-email">{{ currentUser.email }}</p>
        <p class="user-joined">
          Member since {{ getFormattedDate(currentUser.createdAt) }}
        </p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <h4>Account Status</h4>
        <p class="stat-value">Active</p>
        <p class="stat-description">Your account is in good standing</p>
      </div>
      <div class="stat-card">
        <h4>Last Login</h4>
        <p class="stat-value">Today</p>
        <p class="stat-description">{{ getFormattedDate(currentTime) }}</p>
      </div>
      <div class="stat-card">
        <h4>Session Time</h4>
        <p class="stat-value">Active</p>
        <p class="stat-description">Session is secure and valid</p>
      </div>
    </div>

    <div class="quick-actions">
      <h3>Quick Actions</h3>
      <div class="action-buttons">
        <button class="action-btn primary">
          Edit Profile
        </button>
        <button class="action-btn secondary">
          Change Password
        </button>
        <button class="action-btn secondary">
          Contact Support
        </button>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <p>2024 Workshop Application. All rights reserved.</p>
  </footer>
</div>`
      }
    },
    {
      id: 'angular-20',
      title: 'Complete CSS Styles for Components',
      description: 'Add comprehensive CSS styling for all components to create a modern, responsive design.',
      codeSnippet: {
        language: 'text',
        code: `/* src/app/components/login/login.component.css */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-card h2 {
  color: #333;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 600;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.login-form {
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

.error-message {
  background: #fdf2f2;
  color: #e74c3c;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #fecaca;
}

.login-button {
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.login-button:hover:not(:disabled) {
  background: #5a6fd8;
}

.login-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 30px;
  text-align: center;
}

.link-button {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.link-button:hover {
  text-decoration: underline;
}

/* src/app/components/register/register.component.css */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.register-card h2 {
  color: #333;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 600;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.register-form {
  text-align: left;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

.error-message {
  background: #fdf2f2;
  color: #e74c3c;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #fecaca;
}

.success-message {
  background: #f0f9ff;
  color: #059669;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #a7f3d0;
}

.register-button {
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.register-button:hover:not(:disabled) {
  background: #5a6fd8;
}

.register-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.register-footer {
  margin-top: 30px;
  text-align: center;
}

.link-button {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.link-button:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .register-card {
    padding: 30px 20px;
    margin: 10px;
  }
}

/* src/app/components/home/home.component.css */
.home-container {
  min-height: 100vh;
  background: #f8fafc;
}

.home-header {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  color: #333;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.current-time {
  color: #666;
  font-size: 14px;
  font-family: monospace;
}

.logout-button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background: #c0392b;
}

.home-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
}

.welcome-section h2 {
  color: #333;
  font-size: 32px;
  margin-bottom: 16px;
}

.welcome-section p {
  color: #666;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
}

.user-info-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: 600;
}

.user-details h3 {
  color: #333;
  font-size: 24px;
  margin: 0 0 8px 0;
}

.user-username {
  color: #667eea;
  font-size: 16px;
  margin: 0 0 8px 0;
  font-weight: 500;
}

.user-email {
  color: #666;
  font-size: 14px;
  margin: 0 0 8px 0;
}

.user-joined {
  color: #999;
  font-size: 12px;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.stat-card h4 {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.stat-description {
  color: #999;
  font-size: 14px;
  margin: 0;
}

.quick-actions {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.quick-actions h3 {
  color: #333;
  font-size: 20px;
  margin: 0 0 24px 0;
}

.action-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: #667eea;
  color: white;
}

.action-btn.primary:hover {
  background: #5a6fd8;
}

.action-btn.secondary {
  background: #f8fafc;
  color: #333;
  border: 1px solid #e1e5e9;
}

.action-btn.secondary:hover {
  background: #e1e5e9;
}

.home-footer {
  background: white;
  border-top: 1px solid #e1e5e9;
  padding: 20px 0;
  text-align: center;
  margin-top: 40px;
}

.home-footer p {
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .user-info-card {
    flex-direction: column;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    justify-content: center;
  }
}`
      }
    },
    {
      id: 'angular-26',
      title: 'Create Main Entry Point',
      description: 'Create the main.ts file to bootstrap the Angular application using modern standalone approach.',
      codeSnippet: {
        language: 'typescript',
        code: `// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));`
      }
    },
    {
      id: 'angular-27',
      title: 'Create Angular Configuration',
      description: 'Configure angular.json for proper build settings and project configuration.',
      codeSnippet: {
        language: 'text',
        code: `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "workshop-app": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/workshop-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": false
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "browserTarget": "workshop-app:build:production"
            },
            "development": {
              "browserTarget": "workshop-app:build:development"
            }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  }
}`
      }
    }
  ],
  tips: 'Focus on component structure and how components communicate. Use Angular CLI commands to generate code quickly. Pay attention to standalone components and modern Angular 17+ features. Implement proper form validation and error handling. Use functional guards for route protection.',
  prerequisites: 'Basic HTML, CSS, and JavaScript knowledge, understanding of TypeScript basics',
  liveSessionNotes: 'Start with Angular CLI setup. Show how to generate components and services. Build the registration form step by step with validation. Demonstrate localStorage usage and authentication flow. Show routing and route guards in action.',
  commonQuestions: [
    {
      question: 'What is the difference between Angular and React?',
      answer: 'Angular is a full-featured framework with built-in tools for routing, forms, HTTP, and testing. React is a library focused on UI components. Angular uses TypeScript by default and has a steeper learning curve but provides more structure. React is more flexible and has a larger ecosystem of third-party libraries.'
    },
    {
      question: 'Why use Angular CLI?',
      answer: 'Angular CLI automates common development tasks like creating components, services, and modules. It ensures consistent project structure, generates boilerplate code, and provides commands for building, testing, and deploying applications. It saves time and reduces errors in development.'
    },
    {
      question: 'How do components communicate?',
      answer: 'Components communicate through several methods: Input/Output properties for parent-child communication, services for sharing data across components, event emitters for child-to-parent communication, and routing for navigation between components. Services are the most common way to share data and state.'
    },
    {
      question: 'What is dependency injection?',
      answer: 'Dependency injection is a design pattern where dependencies (services, classes) are provided to a component rather than the component creating them itself. Angular\'s DI system automatically provides instances of services when they\'re requested in component constructors, making code more testable and maintainable.'
    }
  ]
};
