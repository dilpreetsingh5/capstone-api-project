import express from 'express';
import { accessLogger, errorLogger, consoleLogger } from "./api/v1/middleware/logger";

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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default app;