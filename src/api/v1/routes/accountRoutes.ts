import { Router } from 'express';
import { getAccounts, getAccount, createAccount, updateAccount, deleteAccount } from '../controllers/accountController';
import { validateRequest } from '../middleware/validateRequest';
import { createAccountSchema, updateAccountSchema } from '../validation/accountValidation';

/**
 * @openapi
 * tags:
 *   name: Accounts
 *   description: Account management endpoints
 */

/**
 * @openapi
 * /accounts:
 *   get:
 *     summary: Retrieve all accounts
 *     description: Get a list of all user accounts from the database
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: Accounts retrieved successfully
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
 *                   example: "Accounts retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Account'
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
 * /accounts/{id}:
 *   get:
 *     summary: Retrieve account by ID
 *     description: Get a specific account by its unique identifier
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the account
 *         example: "acc_123456"
 *     responses:
 *       200:
 *         description: Account retrieved successfully
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
 *                   example: "Account retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
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
 *                   example: "Account not found"
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
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     description: Create a new financial account with the provided information
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - balance
 *               - currency
 *             properties:
 *               name:
 *                 type: string
 *                 description: Account name
 *                 example: "Main Checking"
 *               type:
 *                 type: string
 *                 enum: [checking, savings, credit]
 *                 description: Type of account
 *                 example: "checking"
 *               balance:
 *                 type: number
 *                 description: Current account balance
 *                 example: 1500.00
 *               currency:
 *                 type: string
 *                 description: Currency code (ISO 4217)
 *                 example: "USD"
 *     responses:
 *       201:
 *         description: Account created successfully
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
 *                   example: "Account created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Account'
 *       400:
 *         description: Validation failed - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["\"name\" is required", "\"type\" must be one of [checking, savings, credit]"]
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
 * /accounts/{id}:
 *   put:
 *     summary: Update account by ID
 *     description: Update an existing account with partial data (only provided fields will be updated)
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the account to update
 *         example: "acc_123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New account name
 *                 example: "Updated Checking"
 *               balance:
 *                 type: number
 *                 description: New account balance
 *                 example: 2500.00
 *               currency:
 *                 type: string
 *                 description: New currency code
 *                 example: "EUR"
 *     responses:
 *       200:
 *         description: Account updated successfully
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
 *                   example: "Account updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Account'
 *       400:
 *         description: Validation failed - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["\"balance\" must be a number"]
 *       404:
 *         description: Account not found
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
 *                   example: "Account not found"
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
 * /accounts/{id}:
 *   delete:
 *     summary: Delete account by ID
 *     description: Permanently delete an account and all associated data
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the account to delete
 *         example: "acc_123456"
 *     responses:
 *       200:
 *         description: Account deleted successfully
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
 *                   example: "Account deleted successfully"
 *                 data:
 *                   type: object
 *                   example: {}
 *       404:
 *         description: Account not found
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
 *                   example: "Account not found"
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

const router = Router();

router.get('/', getAccounts);
router.get('/:id', getAccount);
router.post('/', validateRequest(createAccountSchema), createAccount);
router.put('/:id', validateRequest(updateAccountSchema), updateAccount);
router.delete('/:id', deleteAccount);

export default router;