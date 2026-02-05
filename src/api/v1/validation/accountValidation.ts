import Joi from 'joi';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAccountSchema:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - balance
 *         - currency
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           description: Name of the account (3-50 characters)
 *           example: "Main Checking"
 *         type:
 *           type: string
 *           enum: [checking, savings, credit, investment]
 *           description: Type of account
 *           example: "checking"
 *         balance:
 *           type: number
 *           description: Current balance of the account. Credit accounts can have negative balances.
 *           example: 1500.00
 *         currency:
 *           type: string
 *           pattern: '^[A-Z]{3}$'
 *           description: Currency code (ISO 4217, 3 uppercase letters)
 *           example: "USD"
 */

export const createAccountSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .trim()
    .required()
    .messages({
      'string.min': 'Account name must be at least 3 characters long',
      'string.max': 'Account name cannot exceed 50 characters',
      'string.empty': 'Account name is required',
      'any.required': 'Account name is required'
    }),
    
  type: Joi.string()
    .valid('checking', 'savings', 'credit', 'investment')
    .required()
    .messages({
      'any.only': 'Account type must be one of: checking, savings, credit, investment',
      'any.required': 'Account type is required'
    }),

  balance: Joi.number()
    .precision(2)
    .min(-1000000)
    .max(100000000)
    .required()
    .messages({
      'number.base': 'Balance must be a valid number',
      'number.precision': 'Balance can have at most 2 decimal places',
      'number.min': 'Balance cannot be less than -1,000,000',
      'number.max': 'Balance cannot exceed 100,000,000',
      'any.required': 'Balance is required'
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

export const updateAccountSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .trim()
    .optional()
    .messages({
      'string.min': 'Account name must be at least 3 characters long',
      'string.max': 'Account name cannot exceed 50 characters'
    }),

  type: Joi.string()
    .valid('checking', 'savings', 'credit', 'investment')
    .optional()
    .messages({
      'any.only': 'Account type must be one of: checking, savings, credit, investment'
    }),

  balance: Joi.number()
    .precision(2)
    .min(-1000000)
    .max(100000000)
    .optional()
    .messages({
      'number.base': 'Balance must be a valid number',
      'number.precision': 'Balance can have at most 2 decimal places',
      'number.min': 'Balance cannot be less than -1,000,000',
      'number.max': 'Balance cannot exceed 100,000,000'
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
