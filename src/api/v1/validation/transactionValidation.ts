import Joi from 'joi';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTransactionSchema:
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
 *           example: "acc_789"
 *         amount:
 *           type: number
 *           description: Transaction amount
 *           example: 100.50
 *         description:
 *           type: string
 *           description: Description of the transaction
 *           example: "Grocery shopping"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the transaction
 *           example: "2023-10-01T10:00:00.000Z"
 *         category:
 *           type: string
 *           description: Category of the transaction
 *           example: "Food"
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Type of transaction
 *           example: "expense"
 *         currency:
 *           type: string
 *           description: Currency code
 *           example: "USD"
 */

export const createTransactionSchema = Joi.object({
  accountId: Joi.string().required(),
  amount: Joi.number().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  category: Joi.string().required(),
  type: Joi.string().valid('income', 'expense').required(),
  currency: Joi.string().required(),
});

export const updateTransactionSchema = Joi.object({
  accountId: Joi.string().optional(),
  amount: Joi.number().optional(),
  description: Joi.string().optional(),
  date: Joi.date().optional(),
  category: Joi.string().optional(),
  type: Joi.string().valid('income', 'expense').optional(),
  currency: Joi.string().optional(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "The email field is required"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "email"
 *               issue:
 *                 type: string
 *                 example: "must be a valid email address"
 *           description: Detailed validation errors (optional)
 */
