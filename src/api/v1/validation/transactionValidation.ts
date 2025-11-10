import Joi from 'joi';

export const createTransactionSchema = Joi.object({
  accountId: Joi.string().required(),
  amount: Joi.number().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  category: Joi.string().required(),
  type: Joi.string().valid('income', 'expense').required(),
  currency: Joi.string().required(),
});

export const updateTransactionSchema = Joi.object({
  accountId: Joi.string().optional(),
  amount: Joi.number().optional(),
  description: Joi.string().optional(),
  date: Joi.date().optional(),
  category: Joi.string().optional(),
  type: Joi.string().valid('income', 'expense').optional(),
  currency: Joi.string().optional(),
});