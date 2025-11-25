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
 *           minimum: 0.01
 *           maximum: 1000000
 *           description: Transaction amount (0.01 to 1,000,000)
 *           example: 100.50
 *         description:
 *           type: string
 *           minLength: 3
 *           maxLength: 200
 *           description: Description of the transaction (3-200 characters)
 *           example: "Grocery shopping"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the transaction (cannot be in the future or more than 1 year in the past)
 *           example: "2023-10-01T10:00:00.000Z"
 *         category:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Category of the transaction (2-50 characters)
 *           example: "Food & Dining"
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Type of transaction
 *           example: "expense"
 *         currency:
 *           type: string
 *           pattern: '^[A-Z]{3}$'
 *           description: Currency code (ISO 4217, 3 uppercase letters)
 *           example: "USD"
 */

export const createTransactionSchema = Joi.object({
  accountId: Joi.string()
    .required()
    .messages({
      'string.empty': 'Account ID is required',
      'any.required': 'Account ID is required'
    }),

  amount: Joi.number()
    .positive()
    .precision(2)
    .min(0.01)
    .max(1000000)
    .required()
    .messages({
      'number.base': 'Amount must be a valid number',
      'number.positive': 'Amount must be a positive number',
      'number.precision': 'Amount can have at most 2 decimal places',
      'number.min': 'Amount must be at least 0.01',
      'number.max': 'Amount cannot exceed 1,000,000',
      'any.required': 'Amount is required'
    }),

  description: Joi.string()
    .min(3)
    .max(200)
    .trim()
    .required()
    .messages({
      'string.min': 'Description must be at least 3 characters long',
      'string.max': 'Description cannot exceed 200 characters',
      'string.empty': 'Description is required',
      'any.required': 'Description is required'
    }),

  date: Joi.date().required(),

  category: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      'string.min': 'Category must be at least 2 characters long',
      'string.max': 'Category cannot exceed 50 characters',
      'string.empty': 'Category is required',
      'any.required': 'Category is required'
    }),

  type: Joi.string()
    .valid('income', 'expense')
    .required()
    .messages({
      'any.only': 'Transaction type must be either income or expense',
      'any.required': 'Transaction type is required'
    }),

  currency: Joi.string()
    .length(3)
    .uppercase()
    .pattern(/^[A-Z]{3}$/)
    .required()
    .messages({
      'string.length': 'Currency code must be exactly 3 characters',
      'string.pattern.base': 'Currency code must be 3 uppercase letters (ISO 4217 format)',
      'any.required': 'Currency is required'
    }),
});

export const updateTransactionSchema = Joi.object({
  accountId: Joi.string()
    .optional()
    .messages({
      'string.empty': 'Account ID cannot be empty'
    }),

  amount: Joi.number()
    .positive()
    .precision(2)
    .min(0.01)
    .max(1000000)
    .optional()
    .messages({
      'number.base': 'Amount must be a valid number',
      'number.positive': 'Amount must be a positive number',
      'number.precision': 'Amount can have at most 2 decimal places',
      'number.min': 'Amount must be at least 0.01',
      'number.max': 'Amount cannot exceed 1,000,000'
    }),

  description: Joi.string()
    .min(3)
    .max(200)
    .trim()
    .optional()
    .messages({
      'string.min': 'Description must be at least 3 characters long',
      'string.max': 'Description cannot exceed 200 characters'
    }),

  date: Joi.date().optional(),
  
  category: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .optional()
    .messages({
      'string.min': 'Category must be at least 2 characters long',
      'string.max': 'Category cannot exceed 50 characters'
    }),

  type: Joi.string()
    .valid('income', 'expense')
    .optional()
    .messages({
      'any.only': 'Transaction type must be either income or expense'
    }),

  currency: Joi.string()
    .length(3)
    .uppercase()
    .pattern(/^[A-Z]{3}$/)
    .optional()
    .messages({
      'string.length': 'Currency code must be exactly 3 characters',
      'string.pattern.base': 'Currency code must be 3 uppercase letters (ISO 4217 format)'
    }),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
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
