# Angular Lab Session - Login & Home Application

## Prerequisites
- Node.js installed (version 14 or higher)
- Basic knowledge of HTML, CSS, and JavaScript

## Lab Objectives
1. Set up Angular development environment
2. Create a new Angular application
3. Implement login and home components
4. Set up routing and navigation
5. Implement basic authentication logic

## Step 1: Environment Setup

### Install Angular CLI
```bash
npm install -g @angular/cli
```

### Verify Installation
```bash
ng version
```

## Step 2: Create Angular Application

### Generate New Project
```bash
ng new workshop-app
# Choose: Yes for routing, CSS for styling
cd workshop-app
```

### Project Structure
```
workshop-app/
├── src/
│   ├── app/
│   ├── assets/
│   ├── index.html
│   └── styles.css
├── angular.json
└── package.json
```

## Step 3: Create Components

### Generate Components
```bash
ng generate component components/login
ng generate component components/home
ng generate component components/navbar
ng generate component components/auth-guard
```

### Generate Services
```bash
ng generate service services/auth
ng generate service services/user
```

## Step 4: Implement Authentication Service

### Edit `src/app/services/auth.service.ts`
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(username: string, password: string): boolean {
    // Simulate API call - in real app, this would be HTTP request
    if (username === 'admin' && password === 'password') {
      const user: User = {
        id: 1,
        username: username,
        email: 'admin@example.com'
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
```

## Step 5: Implement Login Component

### Edit `src/app/components/login/login.component.ts`
```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    if (this.username && this.password) {
      if (this.authService.login(this.username, this.password)) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    } else {
      this.errorMessage = 'Please enter both username and password';
    }
    
    this.loading = false;
  }
}
```

### Edit `src/app/components/login/login.component.html`
```html
<div class="login-container">
  <div class="login-card">
    <h2>Login</h2>
    
    <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          [(ngModel)]="username"
          required
          class="form-control"
          placeholder="Enter username">
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          [(ngModel)]="password"
          required
          class="form-control"
          placeholder="Enter password">
      </div>

      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <button 
        type="submit" 
        class="btn btn-primary"
        [disabled]="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>

    <div class="demo-credentials">
      <p><strong>Demo Credentials:</strong></p>
      <p>Username: admin</p>
      <p>Password: password</p>
    </div>
  </div>
</div>
```

### Edit `src/app/components/login/login.component.css`
```css
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-card h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #5a6fd8;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  text-align: center;
}

.demo-credentials {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 5px;
  text-align: center;
}

.demo-credentials p {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}
```

## Step 6: Implement Home Component

### Edit `src/app/components/home/home.component.ts`
```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
```

### Edit `src/app/components/home/home.component.html`
```html
<div class="home-container">
  <div class="welcome-section">
    <h1>Welcome to the Workshop!</h1>
    <p>You have successfully logged in to your account.</p>
  </div>

  <div class="user-info-card">
    <h3>User Information</h3>
    <div class="user-details">
      <p><strong>Username:</strong> {{ currentUser?.username }}</p>
      <p><strong>Email:</strong> {{ currentUser?.email }}</p>
      <p><strong>User ID:</strong> {{ currentUser?.id }}</p>
    </div>
  </div>

  <div class="actions-section">
    <button class="btn btn-secondary" (click)="logout()">
      Logout
    </button>
  </div>

  <div class="workshop-info">
    <h3>Workshop Progress</h3>
    <div class="progress-item completed">
      <span class="status">✓</span>
      <span>Angular Setup</span>
    </div>
    <div class="progress-item completed">
      <span class="status">✓</span>
      <span>Login Component</span>
    </div>
    <div class="progress-item completed">
      <span class="status">✓</span>
      <span>Home Component</span>
    </div>
    <div class="progress-item">
      <span class="status">○</span>
      <span>React Session</span>
    </div>
    <div class="progress-item">
      <span class="status">○</span>
      <span>Backend APIs</span>
    </div>
  </div>
</div>
```

### Edit `src/app/components/home/home.component.css`
```css
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-section h1 {
  color: #333;
  margin-bottom: 1rem;
}

.welcome-section p {
  color: #666;
  font-size: 1.1rem;
}

.user-info-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.user-info-card h3 {
  color: #333;
  margin-bottom: 1rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.user-details p {
  margin: 0.5rem 0;
  color: #555;
}

.actions-section {
  text-align: center;
  margin-bottom: 2rem;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.workshop-info {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
}

.workshop-info h3 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.progress-item {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 5px;
}

.progress-item.completed {
  background-color: #d4edda;
  color: #155724;
}

.progress-item .status {
  margin-right: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.progress-item.completed .status {
  color: #28a745;
}
```

## Step 7: Implement Auth Guard

### Edit `src/app/components/auth-guard/auth-guard.component.ts`
```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

## Step 8: Update App Routing

### Edit `src/app/app-routing.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/auth-guard/auth-guard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Step 9: Update App Component

### Edit `src/app/app.component.html`
```html
<router-outlet></router-outlet>
```

## Step 10: Update App Module

### Edit `src/app/app.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuardComponent } from './components/auth-guard/auth-guard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AuthGuardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Step 11: Run the Application

### Start Development Server
```bash
ng serve
```

### Open Browser
Navigate to `http://localhost:4200`

## Testing the Application

1. **Login Page**: Should display login form
2. **Authentication**: Use demo credentials (admin/password)
3. **Navigation**: Should redirect to home page after login
4. **Protected Route**: Home page should only be accessible when logged in
5. **Logout**: Should clear session and redirect to login

## Lab Completion Checklist

- [ ] Angular CLI installed
- [ ] New Angular project created
- [ ] Components generated (login, home, navbar, auth-guard)
- [ ] Services generated (auth, user)
- [ ] Login component implemented with form
- [ ] Home component implemented with user info
- [ ] Authentication service with login/logout logic
- [ ] Route guard implemented
- [ ] Routing configured
- [ ] Application runs without errors
- [ ] Login functionality works
- [ ] Protected routes work
- [ ] Logout functionality works

## Next Steps

1. Add form validation
2. Implement real API calls
3. Add error handling
4. Implement user registration
5. Add password reset functionality
6. Implement remember me functionality

## Troubleshooting

### Common Issues:
1. **Port already in use**: Change port with `ng serve --port 4201`
2. **Module not found**: Check imports and declarations in app.module.ts
3. **Routing not working**: Verify route configuration and component declarations
4. **Form not working**: Ensure FormsModule is imported

### Getting Help:
- Check browser console for errors
- Verify all files are saved
- Restart development server if needed
- Check Angular documentation for syntax
