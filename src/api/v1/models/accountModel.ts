/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - userId
 *         - name
 *         - type
 *         - balance
 *         - currency
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the account
 *         userId:
 *           type: string
 *           description: ID of the user who owns the account
 *         name:
 *           type: string
 *           description: Name of the account
 *           example: "Main Checking"
 *         type:
 *           type: string
 *           enum: [checking, savings, credit, investment]
 *           description: Type of account
 *           example: "checking"
 *         balance:
 *           type: number
 *           description: Current balance of the account
 *           example: 1500.00
 *         currency:
 *           type: string
 *           description: Currency code (e.g., USD, EUR)
 *           example: "USD"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       example:
 *         id: "acc_123"
 *         userId: "user_456"
 *         name: "Main Checking"
 *         type: "checking"
 *         balance: 1500.00
 *         currency: "USD"
 *         createdAt: "2023-10-01T10:00:00.000Z"
 *         updatedAt: "2023-10-01T10:00:00.000Z"
 *
 *     CreateAccountRequest:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - balance
 *         - currency
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the account
 *           example: "Main Checking"
 *         type:
 *           type: string
 *           enum: [checking, savings, credit, investment]
 *           description: Type of account
 *           example: "checking"
 *         balance:
 *           type: number
 *           description: Initial balance of the account
 *           example: 1500.00
 *         currency:
 *           type: string
 *           description: Currency code
 *           example: "USD"
 *       example:
 *         name: "Main Checking"
 *         type: "checking"
 *         balance: 1500.00
 *         currency: "USD"
 *
 *     UpdateAccountRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the account
 *           example: "Updated Checking"
 *         type:
 *           type: string
 *           enum: [checking, savings, credit, investment]
 *           description: Type of account
 *           example: "checking"
 *         balance:
 *           type: number
 *           description: Current balance of the account
 *           example: 2000.00
 *         currency:
 *           type: string
 *           description: Currency code
 *           example: "USD"
 *       example:
 *         name: "Updated Checking"
 *         balance: 2000.00
 */

export interface Account {
  id: string;
  userId?: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateAccountRequest {
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
}

export interface UpdateAccountRequest {
  name?: string;
  type?: 'checking' | 'savings' | 'credit' | 'investment';
  balance?: number;
  currency?: string;
}
