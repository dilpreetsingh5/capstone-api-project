/**
 * @swagger
 * components:
 *   schemas:
 *     Budget:
 *       type: object
 *       required:
 *         - userId
 *         - category
 *         - limit
 *         - spent
 *         - month
 *         - year
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the budget
 *         userId:
 *           type: string
 *           description: ID of the user who owns the budget
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       example:
 *         id: "budget_123"
 *         userId: "user_456"
 *         category: "Food"
 *         limit: 500.00
 *         spent: 150.00
 *         month: 10
 *         year: 2023
 *         createdAt: "2023-10-01T10:00:00.000Z"
 *         updatedAt: "2023-10-01T10:00:00.000Z"
 *
 *     CreateBudgetRequest:
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
 *           description: Initial amount spent
 *           example: 0.00
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
 *       example:
 *         category: "Food"
 *         limit: 500.00
 *         spent: 0.00
 *         month: 10
 *         year: 2023
 *
 *     UpdateBudgetRequest:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           description: Budget category
 *           example: "Groceries"
 *         limit:
 *           type: number
 *           description: Budget limit amount
 *           example: 600.00
 *         spent:
 *           type: number
 *           description: Amount already spent
 *           example: 200.00
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
 *       example:
 *         limit: 600.00
 *         spent: 200.00
 */

export interface Budget {
  id: string;
  userId?: string;
  category: string;
  limit: number;
  spent: number;
  month: number;
  year: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBudgetRequest {
  category: string;
  limit: number;
  spent: number;
  month: number;
  year: number;
}

export interface UpdateBudgetRequest {
  category?: string;
  limit?: number;
  spent?: number;
  month?: number;
  year?: number;
}
