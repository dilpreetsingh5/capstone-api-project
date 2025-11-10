/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - userId
 *         - accountId
 *         - amount
 *         - description
 *         - date
 *         - category
 *         - type
 *         - currency
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the transaction
 *         userId:
 *           type: string
 *           description: ID of the user who owns the transaction
 *         accountId:
 *           type: string
 *           description: ID of the account associated with the transaction
 *         amount:
 *           type: number
 *           description: Transaction amount
 *         description:
 *           type: string
 *           description: Description of the transaction
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the transaction
 *         category:
 *           type: string
 *           description: Category of the transaction
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Type of transaction
 *         currency:
 *           type: string
 *           description: Currency code (e.g., USD, EUR)
 *         convertedAmount:
 *           type: number
 *           description: Amount converted to base currency
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       example:
 *         id: "txn_123"
 *         userId: "user_456"
 *         accountId: "acc_789"
 *         amount: 100.50
 *         description: "Grocery shopping"
 *         date: "2023-10-01T10:00:00.000Z"
 *         category: "Food"
 *         type: "expense"
 *         currency: "USD"
 *         convertedAmount: 100.50
 *         createdAt: "2023-10-01T10:00:00.000Z"
 *         updatedAt: "2023-10-01T10:00:00.000Z"
 *
 *     CreateTransactionRequest:
 *       type: object
 *       required:
 *         - accountId
 *         - amount
 *         - description
 *         - date
 *         - category
 *         - type
 *         - currency
 *       properties:
 *         accountId:
 *           type: string
 *           description: ID of the account for the transaction
 *         amount:
 *           type: number
 *           description: Transaction amount
 *         description:
 *           type: string
 *           description: Description of the transaction
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the transaction
 *         category:
 *           type: string
 *           description: Category of the transaction
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Type of transaction
 *         currency:
 *           type: string
 *           description: Currency code
 *       example:
 *         accountId: "acc_789"
 *         amount: 100.50
 *         description: "Grocery shopping"
 *         date: "2023-10-01T10:00:00.000Z"
 *         category: "Food"
 *         type: "expense"
 *         currency: "USD"
 *
 *     UpdateTransactionRequest:
 *       type: object
 *       properties:
 *         accountId:
 *           type: string
 *           description: ID of the account for the transaction
 *         amount:
 *           type: number
 *           description: Transaction amount
 *         description:
 *           type: string
 *           description: Description of the transaction
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the transaction
 *         category:
 *           type: string
 *           description: Category of the transaction
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Type of transaction
 *         currency:
 *           type: string
 *           description: Currency code
 *       example:
 *         amount: 150.00
 *         description: "Updated grocery shopping"
 *         category: "Groceries"
 */

export interface Transaction {
  id: string;
  userId?: string;
  accountId: string;
  amount: number;
  description: string;
  date: Date;
  category: string;
  type: 'income' | 'expense';
  currency: string;
  convertedAmount?: number; // Amount converted to base currency (e.g., USD)
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTransactionRequest {
  accountId: string;
  amount: number;
  description: string;
  date: Date;
  category: string;
  type: 'income' | 'expense';
  currency: string;
}

export interface UpdateTransactionRequest {
  accountId?: string;
  amount?: number;
  description?: string;
  date?: Date;
  category?: string;
  type?: 'income' | 'expense';
  currency?: string;
}
