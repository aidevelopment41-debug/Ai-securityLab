# API Integration & Authentication Setup

This project now includes a complete API integration layer and authentication system based on the frontend best practices.

## Project Structure

```
src/
├── services/
│   ├── api.ts          # Axios configuration with interceptors
│   └── auth.ts         # Authentication API methods
├── hooks/
│   └── useAuth.ts      # useAuth hook with AuthContext
├── types/
│   ├── auth.ts         # Auth-related TypeScript types
│   └── api.ts          # API response types
├── components/
│   └── auth/
│       ├── LoginForm.tsx       # Login component
│       ├── RegisterForm.tsx    # Registration component
│       └── ProtectedRoute.tsx  # Route protection component
└── lib/
    └── constants.ts    # App constants and configuration
```

## Installation

First, install axios dependency:

```bash
npm install
```

This will install axios@^1.6.0 which was added to package.json.

## Configuration

Create or update `.env.local` with your API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=AI Security Lab
NEXT_PUBLIC_VERSION=1.0.0
```

## Usage

### 1. Wrap your app with AuthProvider

In your root layout or _app component:

```typescript
import { AuthProvider } from '@/hooks/useAuth';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 2. Use useAuth hook in components

```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user, logout, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <div>Not authenticated</div>;

  return (
    <div>
      <h1>Welcome, {user?.full_name || user?.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 3. Use LoginForm component

```typescript
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return <LoginForm />;
}
```

### 4. Use ProtectedRoute for pages

```typescript
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div>Admin content</div>
    </ProtectedRoute>
  );
}
```

### 5. Direct API calls with authentication

```typescript
import { api } from '@/services/api';

// API calls automatically include auth token
const response = await api.get('/admin/users');
```

## Features

✅ **Automatic Token Management** - Tokens are automatically added to all requests
✅ **Error Handling** - Global error handling with 401 redirect
✅ **Type Safety** - Full TypeScript support with proper types
✅ **SSR Compatible** - Works with Next.js SSR/SSG
✅ **Loading States** - Built-in loading state management
✅ **Error Messages** - User-friendly error messages
✅ **Protected Routes** - Easy route protection logic

## API Methods

### Login
```typescript
const { login } = useAuth();
await login({ username: 'user', password: 'pass' });
```

### Register
```typescript
const { register } = useAuth();
await register({
  username: 'newuser',
  email: 'user@example.com',
  password: 'securepass',
  full_name: 'John Doe'
});
```

### Get Current User
```typescript
const { user } = useAuth();
console.log(user);
```

### Logout
```typescript
const { logout } = useAuth();
logout();
```

## Error Handling

All errors are captured in the auth context:

```typescript
const { error, clearError } = useAuth();

// Display error
{error && <div className="error">{error}</div>}

// Clear error
<button onClick={clearError}>Clear</button>
```

## Next Steps

1. ✅ API service layer configured
2. ✅ Authentication hooks created
3. ✅ Components ready to use
4. Next: Create login/register pages
5. Next: Add protected dashboard
6. Next: Implement API error boundaries

## Support

For API documentation, visit: http://localhost:8000/docs
