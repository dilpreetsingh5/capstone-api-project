# Financial Management API

A comprehensive RESTful API for managing personal finances, built with Node.js, Express, TypeScript, and Firebase. This API provides secure endpoints for managing accounts, transactions, budgets, and user authentication with role-based access control.

##  Features

- **User Authentication & Authorization**: Firebase-based authentication with role-based access control (Admin, Manager, User)
- **Account Management**: Create and manage multiple financial accounts (checking, savings, credit, investment)
- **Transaction Tracking**: Record and categorize income and expenses with multi-currency support
- **Budget Management**: Set and monitor spending budgets by category and time period
- **Currency Conversion**: Automatic currency conversion using real-time exchange rates
- **Data Validation**: Comprehensive input validation with detailed error messages
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Comprehensive Testing**: Full test coverage with Jest and Supertest

##  Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Firebase Account** with a project set up
- **Exchange Rate API Key** (from [exchangerate-api.com](https://www.exchangerate-api.com/))

##  Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Milestone-03
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password provider)
   - Create a Firestore database
   - Download your service account key (JSON file)
   - Save it as `Security_Key.json` in the project root

4. **Configure environment variables**
   
   Create a `.env` file in the project root:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Firebase Configuration
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

   # Exchange Rate API
   EXCHANGE_RATE_API_KEY=your-exchange-rate-api-key

   # Firebase Service Account Path
   GOOGLE_APPLICATION_CREDENTIALS=./Security_Key.json
   ```

##  Running the Application

### Development Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

### Running Tests
```bash
npm test
```

##  API Documentation

Once the server is running, access the interactive API documentation at:

```
http://localhost:3000/api-docs
```

The Swagger UI provides:
- Complete endpoint documentation
- Request/response schemas
- Interactive API testing
- Authentication examples

### Generating Static Documentation

To generate static HTML documentation:

```bash
npm run generate-docs
```

This creates an HTML file in the `docs/` directory.

##  Authentication

### Getting Started

1. **Create a user** in Firebase Console or using Firebase SDK
2. **Obtain an ID token** by signing in
3. **Include the token** in API requests:
   ```
   Authorization: Bearer <your-firebase-id-token>
   ```

### User Roles

- **Admin**: Full access to all endpoints, can manage user roles
- **Manager**: Can manage accounts, transactions, and budgets for all users
- **User**: Can only manage their own resources

### Setting User Roles (Admin Only)

```bash
POST /api/v1/admin/setCustomClaims
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "uid": "user-firebase-uid",
  "claims": {
    "role": "manager"
  }
}
```

##  API Endpoints

### Users
- `GET /api/v1/users/:id` - Get user details
- `POST /api/v1/admin/setCustomClaims` - Set custom claims (Admin only)

### Accounts
- `GET /api/v1/accounts` - Get all accounts
- `GET /api/v1/accounts/:id` - Get account by ID
- `POST /api/v1/accounts` - Create new account
- `PUT /api/v1/accounts/:id` - Update account
- `DELETE /api/v1/accounts/:id` - Delete account

### Transactions
- `GET /api/v1/transactions` - Get all transactions
- `GET /api/v1/transactions/:id` - Get transaction by ID
- `POST /api/v1/transactions` - Create new transaction
- `PUT /api/v1/transactions/:id` - Update transaction
- `DELETE /api/v1/transactions/:id` - Delete transaction

### Budgets
- `GET /api/v1/budgets` - Get all budgets
- `GET /api/v1/budgets/:id` - Get budget by ID
- `POST /api/v1/budgets` - Create new budget
- `PUT /api/v1/budgets/:id` - Update budget
- `DELETE /api/v1/budgets/:id` - Delete budget

##  Project Structure

```
Milestone-03/
├── config/                 # Configuration files
│   ├── firebaseConfig.ts   # Firebase initialization
│   ├── swagger.ts          # Swagger setup
│   └── swaggerOptions.ts   # Swagger configuration
├── src/
│   ├── api/v1/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Data models and schemas
│   │   ├── repositories/   # Data access layer
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── validation/     # Input validation schemas
│   │   └── errors/         # Error handling
│   ├── constants/          # Application constants
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server entry point
├── test/                   # Test files
├── docs/                   # Generated documentation
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

##  Testing

The project includes comprehensive test coverage:

- **Unit Tests**: Controller, service, and middleware tests
- **Integration Tests**: End-to-end API tests
- **Authentication Tests**: Firebase auth and authorization tests

### Test Coverage

- 74 tests across 7 test suites
- Controllers: Account, Budget, Transaction, User
- Middleware: Authentication, Authorization, Error Handler
- Services: Currency conversion

### Running Specific Tests

```bash
# Run specific test file
npm test -- accountController.test.ts

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

##  Security Features

- **Firebase Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Fine-grained permissions
- **Input Validation**: Comprehensive validation with Joi
- **Error Handling**: Secure error messages without sensitive data
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers middleware
- **Rate Limiting**: Protection against abuse (configurable)

##  Data Validation Rules

### Accounts
- Name: 3-50 characters
- Balance: -1,000,000 to 100,000,000 (2 decimal places)
- Currency: ISO 4217 format (3 uppercase letters)
- Type: checking, savings, credit, investment

### Transactions
- Amount: 0.01 to 1,000,000 (2 decimal places)
- Description: 3-200 characters
- Date: Cannot be in future or more than 1 year in past
- Category: Any string (2-50 characters)
- Type: income or expense
- Currency: ISO 4217 format

### Budgets
- Category: 2-50 characters
- Limit: 1 to 1,000,000 (2 decimal places)
- Spent: 0 to 150% of limit (2 decimal places)
- Month: 1-12
- Year: 2000 to current year + 1

##  Multi-Currency Support

The API supports multiple currencies with automatic conversion:

- Real-time exchange rates via ExchangeRate-API
- Automatic conversion to base currency (USD)
- Support for all major world currencies
- Currency validation in ISO 4217 format

##  Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "details": ["Detailed error messages"]
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is licensed under the ISC License.

##  Authors

- Your Name - Dilpreet Singh

##  Acknowledgments

- Firebase for authentication and database
- ExchangeRate-API for currency conversion
- Express.js community
- TypeScript team


##  Version History

- **1.0.0** (Current)
  - Initial release
  - User authentication and authorization
  - Account, transaction, and budget management
  - Multi-currency support
  - Comprehensive API documentation
  - Full test coverage
