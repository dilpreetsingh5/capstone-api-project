import Joi from 'joi';

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