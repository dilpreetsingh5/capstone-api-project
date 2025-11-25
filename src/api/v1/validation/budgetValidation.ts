import Joi from 'joi';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBudgetSchema:
 *       type: object
 *       required:
 *         - category
 *         - limit
 *         - spent
 *         - month
 *         - year
 *       properties:
 *         category:
 *           type: string
 *           description: Budget category
 *           example: "Food"
 *         limit:
 *           type: number
 *           description: Budget limit amount
 *           example: 500.00
 *         spent:
 *           type: number
 *           description: Amount already spent
 *           example: 150.00
 *         month:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           description: Month of the budget (1-12)
 *           example: 10
 *         year:
 *           type: integer
 *           minimum: 2000
 *           description: Year of the budget
 *           example: 2023
 */

export const createBudgetSchema = Joi.object({
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

  limit: Joi.number()
    .positive()
    .precision(2)
    .min(1)
    .max(1000000)
    .required()
    .messages({
      'number.base': 'Limit must be a valid number',
      'number.positive': 'Limit must be a positive number',
      'number.precision': 'Limit can have at most 2 decimal places',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 1,000,000',
      'any.required': 'Limit is required'
    }),

  spent: Joi.number()
    .min(0)
    .precision(2)
    .max(Joi.ref('limit', { adjust: (limit) => limit * 1.5 }))
    .required()
    .messages({
      'number.base': 'Spent amount must be a valid number',
      'number.min': 'Spent amount cannot be negative',
      'number.precision': 'Spent amount can have at most 2 decimal places',
      'number.max': 'Spent amount cannot exceed 150% of the budget limit',
      'any.required': 'Spent amount is required'
    }),

  month: Joi.number()
    .integer()
    .min(1)
    .max(12)
    .required()
    .messages({
      'number.base': 'Month must be a valid number',
      'number.integer': 'Month must be an integer',
      'number.min': 'Month must be between 1 and 12',
      'number.max': 'Month must be between 1 and 12',
      'any.required': 'Month is required'
    }),

  year: Joi.number()
    .integer()
    .min(2000)
    .max(new Date().getFullYear() + 1)
    .required()
    .messages({
      'number.base': 'Year must be a valid number',
      'number.integer': 'Year must be an integer',
      'number.min': 'Year must be 2000 or later',
      'number.max': `Year cannot be more than ${new Date().getFullYear() + 1}`,
      'any.required': 'Year is required'
    }),
});

export const updateBudgetSchema = Joi.object({
  category: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .optional()
    .messages({
      'string.min': 'Category must be at least 2 characters long',
      'string.max': 'Category cannot exceed 50 characters'
    }),

  limit: Joi.number()
    .positive()
    .precision(2)
    .min(1)
    .max(1000000)
    .optional()
    .messages({
      'number.base': 'Limit must be a valid number',
      'number.positive': 'Limit must be a positive number',
      'number.precision': 'Limit can have at most 2 decimal places',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 1,000,000'
    }),

  spent: Joi.number()
    .min(0)
    .precision(2)
    .optional()
    .messages({
      'number.base': 'Spent amount must be a valid number',
      'number.min': 'Spent amount cannot be negative',
      'number.precision': 'Spent amount can have at most 2 decimal places'
    }),

  month: Joi.number()
    .integer()
    .min(1)
    .max(12)
    .optional()
    .messages({
      'number.base': 'Month must be a valid number',
      'number.integer': 'Month must be an integer',
      'number.min': 'Month must be between 1 and 12',
      'number.max': 'Month must be between 1 and 12'
    }),

  year: Joi.number()
    .integer()
    .min(2000)
    .max(new Date().getFullYear() + 1)
    .optional()
    .messages({
      'number.base': 'Year must be a valid number',
      'number.integer': 'Year must be an integer',
      'number.min': 'Year must be 2000 or later',
      'number.max': `Year cannot be more than ${new Date().getFullYear() + 1}`
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
