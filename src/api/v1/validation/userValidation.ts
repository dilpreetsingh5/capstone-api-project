import Joi from 'joi';

/**
 * @openapi
 * components:
 *   schemas:
 *     SetCustomClaimsSchema:
 *       type: object
 *       required:
 *         - uid
 *         - claims
 *       properties:
 *         uid:
 *           type: string
 *           minLength: 1
 *           description: Firebase user ID
 *           example: "abc123xyz789"
 *         claims:
 *           type: object
 *           description: Custom claims object (typically includes role)
 *           properties:
 *             role:
 *               type: string
 *               enum: [admin, manager, user]
 *               description: User role
 *               example: "manager"
 *           example:
 *             role: "manager"
 */

export const setCustomClaimsSchema = Joi.object({
  uid: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.empty': 'User ID (uid) is required',
      'any.required': 'User ID (uid) is required'
    }),
  
  claims: Joi.object()
    .pattern(
      Joi.string(),
      Joi.alternatives().try(
        Joi.string(),
        Joi.number(),
        Joi.boolean()
      )
    )
    .min(1)
    .required()
    .messages({
      'object.base': 'Claims must be a valid object',
      'object.min': 'Claims object must contain at least one property',
      'any.required': 'Claims object is required'
    }),
});

/**
 * Validation schema for role-specific claims
 */
export const setRoleClaimsSchema = Joi.object({
  uid: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.empty': 'User ID (uid) is required',
      'any.required': 'User ID (uid) is required'
    }),
  
  claims: Joi.object({
    role: Joi.string()
      .valid('admin', 'manager', 'user')
      .required()
      .messages({
        'any.only': 'Role must be one of: admin, manager, user',
        'any.required': 'Role is required in claims'
      })
  })
    .unknown(true)
    .required()
    .messages({
      'any.required': 'Claims object is required'
    }),
});
