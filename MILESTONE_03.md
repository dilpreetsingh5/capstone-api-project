# Personal Finance Management API

A secure, scalable RESTful API for managing personal finances built with Node.js, Express, TypeScript, and Firebase.

##  Features

- **User Authentication**: Secure Firebase Authentication with JWT tokens
- **Role-Based Access Control (RBAC)**: Admin, Manager, and User roles
- **Account Management**: Create and manage multiple financial accounts
- **Transaction Tracking**: Record and categorize income and expenses
- **Budget Management**: Set and monitor spending budgets
- **Currency Conversion**: Real-time currency exchange rates
- **Comprehensive Error Handling**: Standardized error responses
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Full Test Coverage**: 74 passing tests with Jest

##  Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Admin SDK credentials
- Git

##  Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Milestone-03
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"

# API Configuration
API_VERSION=v1
```

### 4. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Navigate to **Project Settings** > **Service Accounts**
4. Click **Generate New Private Key**
5. Save the JSON file securely
6. Copy the credentials to your `.env` file

### 5. Enable Firebase Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** sign-in method
4. Create test users for development

##  Running the Application

### Development Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Test Results**:  74/74 tests passing

### Generate API Documentation

```bash
npm run generate-docs
```

Access the documentation at `http://localhost:3000/api-docs`

##  Authentication

### Getting a Firebase Token

1. **Register a User** (via Firebase Console or client app)

2. **Get ID Token** using Firebase REST API:

```bash
curl --location 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_FIREBASE_API_KEY' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@example.com",
    "password": "userpassword",
    "returnSecureToken": true
}'
```

3. **Use the Token** in API requests:

```bash
curl --location 'http://localhost:3000/api/v1/accounts' \
--header 'Authorization: Bearer YOUR_ID_TOKEN'
```

### Setting User Roles

User roles must be set using Firebase Custom Claims:

```bash
# Example: Set admin role
curl --location 'http://localhost:3000/api/v1/admin/setCustomClaims' \
--header 'Authorization: Bearer ADMIN_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "uid": "user-uid-here",
    "claims": {
        "role": "admin"
    }
}'
```

**Available Roles:**
- `admin`: Full access to all resources
- `manager`: Can manage resources and users
- `user`: Can manage own resources only

##  API Endpoints

### Authentication Required

All endpoints require a valid Firebase ID token in the Authorization header:

```
Authorization: Bearer <your-firebase-id-token>
```

### Accounts

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/accounts` | All authenticated users | Get all accounts |
| GET | `/api/v1/accounts/:id` | Owner, Admin, Manager | Get account by ID |
| POST | `/api/v1/accounts` | Admin, Manager | Create new account |
| PUT | `/api/v1/accounts/:id` | Owner, Admin, Manager | Update account |
| DELETE | `/api/v1/accounts/:id` | Admin, Manager | Delete account |

### Transactions

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/transactions` | All authenticated users | Get all transactions |
| GET | `/api/v1/transactions/:id` | Owner, Admin, Manager | Get transaction by ID |
| POST | `/api/v1/transactions` | All authenticated users | Create transaction |
| PUT | `/api/v1/transactions/:id` | Owner, Admin, Manager | Update transaction |
| DELETE | `/api/v1/transactions/:id` | Admin, Manager | Delete transaction |

### Budgets

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/budgets` | All authenticated users | Get all budgets |
| GET | `/api/v1/budgets/:id` | Owner, Admin, Manager | Get budget by ID |
| POST | `/api/v1/budgets` | All authenticated users | Create budget |
| PUT | `/api/v1/budgets/:id` | Owner, Admin, Manager | Update budget |
| DELETE | `/api/v1/budgets/:id` | Admin, Manager | Delete budget |

### Users

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/users/:id` | Owner, Admin, Manager | Get user details |
| POST | `/api/v1/admin/setCustomClaims` | Admin only | Set user roles |

## 📝 Example Requests

### Create an Account

```bash
curl --location 'http://localhost:3000/api/v1/accounts' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Main Checking",
    "type": "checking",
    "balance": 5000.00,
    "currency": "USD"
}'
```

### Create a Transaction

```bash
curl --location 'http://localhost:3000/api/v1/transactions' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "accountId": "account-id-here",
    "type": "expense",
    "amount": 50.00,
    "category": "groceries",
    "description": "Weekly grocery shopping",
    "date": "2024-01-15"
}'
```

### Create a Budget

```bash
curl --location 'http://localhost:3000/api/v1/budgets' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "category": "groceries",
    "limit": 500.00,
    "period": "monthly",
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
}'
```

##  Security Features

### Authentication
- Firebase JWT token verification
- Secure token validation on every request
- Automatic token expiration handling

### Authorization
- Role-based access control (RBAC)
- Resource ownership validation
- Granular permission system

### Error Handling
- Standardized error responses
- Secure error messages (no sensitive data leakage)
- Comprehensive error logging

### Data Protection
- Input validation with Joi schemas
- NoSQL injection prevention
- XSS protection ready
- Rate limiting ready

##  Testing

The project includes comprehensive test coverage with 74 passing tests:

### Test Suites
-  Authentication Middleware (6 tests)
-  Authorization Middleware (9 tests)
-  Error Handler Middleware (9 tests)
-  Account Controller (13 tests)
-  Budget Controller (13 tests)
-  Transaction Controller (16 tests)
-  Currency Service (8 tests)

### Running Tests

```bash
npm test
```

##  Project Structure

```
Milestone-03/
├── config/
│   ├── firebaseConfig.ts      # Firebase Admin SDK setup
│   ├── swagger.ts              # Swagger configuration
│   └── swaggerOptions.ts       # Swagger options
├── src/
│   ├── api/
│   │   └── v1/
│   │       ├── controllers/    # Request handlers
│   │       ├── errors/         # Custom error classes
│   │       ├── middleware/     # Authentication, authorization, etc.
│   │       ├── models/         # Data models and interfaces
│   │       ├── repositories/   # Database access layer
│   │       ├── routes/         # API route definitions
│   │       ├── services/       # Business logic
│   │       ├── types/          # TypeScript type definitions
│   │       ├── utils/          # Utility functions
│   │       └── validation/     # Input validation schemas
│   ├── constants/              # Application constants
│   ├── logs/                   # Application logs
│   ├── app.ts                  # Express app setup
│   └── server.ts               # Server entry point
├── test/                       # Test files
│   └── middleware/             # Middleware tests
├── .env                        # Environment variables (not in repo)
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🔧 Configuration

### HTTP Status Codes

- `200 OK`: Successful GET, PUT requests
- `201 Created`: Successful POST requests
- `204 No Content`: Successful DELETE requests
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `422 Unprocessable Entity`: Validation errors
- `500 Internal Server Error`: Server errors

### Response Format

**Success Response:**
```json
{
    "success": true,
    "message": "Operation completed successfully",
    "data": { }
}
```

**Error Response:**
```json
{
    "success": false,
    "error": "ERROR_CODE",
    "message": "Human-readable error message",
    "timestamp": "2024-01-15T10:30:00.000Z"
}
```

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/advance-features`)
3. Commit your changes (`git commit -m 'Add some advance-features'`)
4. Push to the branch (`git push origin feature/advance-features`)
5. Open a Pull Request

## Acknowledgments

- Firebase for authentication and database services
- Express.js community
- TypeScript team
- Jest testing framework

**Built with using Node.js, Express, TypeScript, and Firebase**
