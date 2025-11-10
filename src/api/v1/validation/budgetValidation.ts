import Joi from 'joi';

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