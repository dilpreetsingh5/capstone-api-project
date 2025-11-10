/**
 * @swagger
 * components:
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *           example: true
 *         data:
 *           description: The response data (varies by endpoint)
 *         message:
 *           type: string
 *           description: Success message
 *           example: "Operation completed successfully"
 *         error:
 *           type: string
 *           description: Error type (for error responses)
 *         code:
 *           type: string
 *           description: Error code (for error responses)
 *       example:
 *         success: true
 *         data: {}
 *         message: "Operation completed successfully"
 *
 *     ErrorResponse:
 *       type: object
 *       required:
 *         - success
 *         - message
 *       properties:
 *         success:
 *           type: boolean
 *           description: Always false for error responses
 *           example: false
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "Validation failed"
 *         error:
 *           type: string
 *           description: Error type or category
 *           example: "VALIDATION_ERROR"
 *         code:
 *           type: string
 *           description: Specific error code
 *           example: "VALIDATION_ERROR"
 *         details:
 *           type: array
 *           items:
 *             type: string
 *           description: Detailed validation errors or additional error information
 *           example: ["name is required", "email must be valid"]
 *       example:
 *         success: false
 *         message: "Validation failed"
 *         error: "VALIDATION_ERROR"
 *         code: "VALIDATION_ERROR"
 *         details: ["name is required", "email must be valid"]
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: string;
  code?: string;
  details?: string[];
}

export const successResponse = <T>(
  data?: T,
  message?: string
): ApiResponse<T> => ({
  success: true,
  data,
  message,
});

export const errorResponse = (
  message: string,
  error?: string,
  code?: string,
  details?: string[]
): ErrorResponse => ({
  success: false,
  message,
  error,
  code,
  details,
});
