import express from "express";
import { getUserHandler, setCustomClaimsHandler } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { validateRequest } from "../middleware/validateRequest";
import { setCustomClaimsSchema } from "../validation/userValidation";

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: User management and authentication endpoints
 */

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user details by ID
 *     description: Retrieve user information by Firebase UID. Users can view their own details, while admins and managers can view any user's details.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Firebase user ID (UID)
 *         example: "abc123xyz789"
 *     responses:
 *       200:
 *         description: User details retrieved successfully
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
 *                   example: "User details retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       description: User's unique identifier
 *                       example: "abc123xyz789"
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                       example: "user@example.com"
 *                     displayName:
 *                       type: string
 *                       description: User's display name
 *                       example: "John Doe"
 *                     role:
 *                       type: string
 *                       description: User's role
 *                       example: "user"
 *                     emailVerified:
 *                       type: boolean
 *                       description: Whether email is verified
 *                       example: true
 *                     disabled:
 *                       type: boolean
 *                       description: Whether account is disabled
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       description: Account creation timestamp
 *                       example: "2023-01-15T10:30:00.000Z"
 *                     lastSignInTime:
 *                       type: string
 *                       description: Last sign-in timestamp
 *                       example: "2024-01-20T14:45:00.000Z"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
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
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - Insufficient permissions
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
 *                   example: "Forbidden: Insufficient permissions"
 *       404:
 *         description: User not found
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
 *                   example: "User not found"
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
 * /admin/setCustomClaims:
 *   post:
 *     summary: Set custom claims for a user (Admin only)
 *     description: Set custom claims (such as roles) for a Firebase user. This endpoint is restricted to admin users only.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetCustomClaimsSchema'
 *           examples:
 *             setManagerRole:
 *               summary: Set user as manager
 *               value:
 *                 uid: "abc123xyz789"
 *                 claims:
 *                   role: "manager"
 *             setAdminRole:
 *               summary: Set user as admin
 *               value:
 *                 uid: "def456uvw012"
 *                 claims:
 *                   role: "admin"
 *     responses:
 *       200:
 *         description: Custom claims set successfully
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
 *                   example: "Custom claims set successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       example: "abc123xyz789"
 *                     claims:
 *                       type: object
 *                       example:
 *                         role: "manager"
 *       400:
 *         description: Validation failed - Invalid input data
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
 *                   example: ["User ID (uid) is required", "Claims object is required"]
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
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
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - Only admins can set custom claims
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
 *                   example: "Forbidden: Admin access required"
 *       404:
 *         description: User not found
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
 *                   example: "User not found"
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
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Firebase authentication token
 */

const router: express.Router = express.Router();

router.get(
    "/users/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager", "user"], allowSameUser: true }),
    getUserHandler
);

router.post(
    "/admin/setCustomClaims",
    authenticate,  
    isAuthorized({ hasRole: ["admin"] }),
    validateRequest(setCustomClaimsSchema),  
    setCustomClaimsHandler
);

export default router;