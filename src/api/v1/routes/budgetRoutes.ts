import { Router } from 'express';
import { getBudgets, getBudget, createBudget, updateBudget, deleteBudget } from '../controllers/budgetController';
import { validateRequest } from '../middleware/validateRequest';
import { createBudgetSchema, updateBudgetSchema } from '../validation/budgetValidation';

/**
 * @openapi
 * tags:
 *   name: Budgets
 *   description: Budget management endpoints
 */

/**
 * @openapi
 * /budgets:
 *   get:
 *     summary: Retrieve all budgets
 *     description: Get a list of all spending budgets from the database
 *     tags: [Budgets]
 *     responses:
 *       200:
 *         description: Budgets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Budgets retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Budget'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @openapi
 * /budgets/{id}:
 *   get:
 *     summary: Get budget by ID
 *     tags: [Budgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     responses:
 *       200:
 *         description: Budget retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Budget retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Budget'
 *       404:
 *         description: Budget not found
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /budgets:
 *   post:
 *     summary: Create a new budget
 *     tags: [Budgets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBudgetRequest'
 *     responses:
 *       201:
 *         description: Budget created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Budget created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Budget'
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /budgets/{id}:
 *   put:
 *     summary: Update budget by ID
 *     tags: [Budgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBudgetRequest'
 *     responses:
 *       200:
 *         description: Budget updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Budget updated successfully"
 *                 data:
 *                   type: object
 *                   example: {}
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Budget not found
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /budgets/{id}:
 *   delete:
 *     summary: Delete budget by ID
 *     tags: [Budgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     responses:
 *       200:
 *         description: Budget deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Budget deleted successfully"
 *                 data:
 *                   type: object
 *                   example: {}
 *       404:
 *         description: Budget not found
 *       500:
 *         description: Internal server error
 */

const router = Router();

router.get('/', getBudgets);
router.get('/:id', getBudget);
router.post('/', validateRequest(createBudgetSchema), createBudget);
router.put('/:id', validateRequest(updateBudgetSchema), updateBudget);
router.delete('/:id', deleteBudget);

export default router;