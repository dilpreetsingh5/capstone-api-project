import { getAllBudgets, getBudgetById, createBudget as createBudgetRepo, updateBudget as updateBudgetRepo, deleteBudget as deleteBudgetRepo } from '../repositories/budgetRepository';
import { Budget } from '../models/budgetModel';
import { createBudgetSchema, updateBudgetSchema } from '../validation/budgetValidation';
import { ServiceError } from '../errors/errors';
import { HTTP_STATUS } from '../../../constants/httpConstants';

/**
 * Retrieves all budgets
 * @returns {Promise<Budget[]>} Array of all budgets
 */
export const getAllBudgetsService = async (): Promise<Budget[]> => {
  try {
    return getAllBudgets();
  } catch (error) {
    throw new ServiceError('Failed to retrieve budgets', 'RETRIEVE_BUDGETS_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Retrieves a budget by its ID
 * @param {string} id - The ID of the budget
 * @returns {Promise<Budget | null>} Budget object if found, otherwise null
 */
export const getBudgetByIdService = async (id: string): Promise<Budget | null> => {
  try {
    return getBudgetById(id);
  } catch (error) {
    throw new ServiceError('Failed to retrieve budget', 'RETRIEVE_BUDGET_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Creates a new budget
 * @param {Omit<Budget, 'id'>} budget - The budget data without an ID
 * @returns {Promise<Budget>} The newly created budget with a generated ID
 */
export const createBudgetService = async (budget: Omit<Budget, 'id'>): Promise<Budget> => {
  try {
    const { error } = createBudgetSchema.validate(budget);
    if (error) {
      throw new ServiceError(`Validation error: ${error.details[0].message}`, 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
    // Business logic: Ensure spent does not exceed limit
    if (budget.spent > budget.limit) {
      throw new ServiceError('Spent amount cannot exceed budget limit', 'BUSINESS_LOGIC_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
    return createBudgetRepo(budget);
  } catch (error) {
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError('Failed to create budget', 'CREATE_BUDGET_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Updates an existing budget by ID
 * @param {string} id - The ID of the budget to update
 * @param {Partial<Budget>} budget - The updated budget data
 * @returns {Promise<Budget | null>} The updated budget or null if not found
 */
export const updateBudgetService = async (id: string, budget: Partial<Budget>): Promise<Budget | null> => {
  try {
    const existing = await getBudgetById(id);
    if (!existing) {
      return null;
    }
    const updatedData = { ...existing, ...budget };
    const { error } = updateBudgetSchema.validate(budget);
    if (error) {
      throw new ServiceError(`Validation error: ${error.details[0].message}`, 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
    // Business logic: Prevent changing userId (if present)
    if (budget.userId !== undefined && budget.userId !== existing.userId) {
      throw new ServiceError('Cannot change budget userId', 'BUSINESS_LOGIC_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
    // Business logic: Check spent vs limit
    if (updatedData.spent > updatedData.limit) {
      throw new ServiceError('Spent amount cannot exceed budget limit', 'BUSINESS_LOGIC_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
    await updateBudgetRepo(id, budget);
    return { ...existing, ...budget, updatedAt: new Date() };
  } catch (error) {
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError('Failed to update budget', 'UPDATE_BUDGET_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Deletes a budget by ID
 * @param {string} id - The ID of the budget to delete
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export const deleteBudgetService = async (id: string): Promise<boolean> => {
  try {
    const existing = await getBudgetById(id);
    if (!existing) {
      return false;
    }
    await deleteBudgetRepo(id);
    return true;
  } catch (error) {
    throw new ServiceError('Failed to delete budget', 'DELETE_BUDGET_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};
