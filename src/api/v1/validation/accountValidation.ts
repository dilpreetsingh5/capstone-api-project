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
 *           description: Currency code
 *           example: "USD"
 */

export const createAccountSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('checking', 'savings', 'credit', 'investment').required(),
  balance: Joi.number().required(),
  currency: Joi.string().required(),
});

export const updateAccountSchema = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().valid('checking', 'savings', 'credit', 'investment').optional(),
  balance: Joi.number().optional(),
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
