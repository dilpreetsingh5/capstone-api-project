import express from 'express';
import { accessLogger, errorLogger, consoleLogger } from "./api/v1/middleware/logger";
import accountRoutes from './api/v1/routes/accountRoutes';
import transactionRoutes from './api/v1/routes/transactionRoutes';
import budgetRoutes from './api/v1/routes/budgetRoutes';
import setupSwagger from '../config/swagger';

const app = express();

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
    // Also log to files in development for demonstration
    app.use(accessLogger);
    app.use(errorLogger);
}

// Body parsing middleware
app.use(express.json());

// Setup Swagger
setupSwagger(app);

// Routes
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/budgets', budgetRoutes);

// Error handling middleware
import errorHandler from './api/v1/middleware/errorHandler';
app.use(errorHandler);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default app;