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
  category: Joi.string().required(),
  limit: Joi.number().positive().required(),
  spent: Joi.number().min(0).required(),
  month: Joi.number().integer().min(1).max(12).required(),
  year: Joi.number().integer().min(2000).required(),
});

export const updateBudgetSchema = Joi.object({
  category: Joi.string().optional(),
  limit: Joi.number().positive().optional(),
  spent: Joi.number().min(0).optional(),
  month: Joi.number().integer().min(1).max(12).optional(),
  year: Joi.number().integer().min(2000).optional(),
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
