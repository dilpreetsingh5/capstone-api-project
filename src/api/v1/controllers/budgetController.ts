import { Request, Response, NextFunction } from 'express';
import * as budgetService from '../services/budgetService';
import { successResponse } from '../models/responseModel';
import { createBudgetSchema, updateBudgetSchema } from '../validation/budgetValidation';
import { HTTP_STATUS } from '../../../constants/httpConstants';

/**
 * Retrieves all budgets
 */
export const getBudgets = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const budgets = await budgetService.getAllBudgetsService();
        res.status(HTTP_STATUS.OK).json(successResponse(budgets, 'Budgets retrieved successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Retrieves a budget by ID
 */
export const getBudget = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const budget = await budgetService.getBudgetByIdService(req.params.id);
        if (!budget) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Budget not found' });
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse(budget, 'Budget retrieved successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Creates a new budget
 */
export const createBudget = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error, value } = createBudgetSchema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Validation failed",
                details: error.details.map(d => d.message),
            });
            return;
        }

        const newBudget = await budgetService.createBudgetService(value);
        res.status(HTTP_STATUS.CREATED).json(successResponse(newBudget, 'Budget created successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Updates a budget
 */
export const updateBudget = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error, value } = updateBudgetSchema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Validation failed",
                details: error.details.map(d => d.message),
            });
            return;
        }

        const updatedBudget = await budgetService.updateBudgetService(req.params.id, value);
        if (!updatedBudget) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Budget not found' });
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse(updatedBudget, 'Budget updated successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Deletes a budget
 */
export const deleteBudget = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deleted = await budgetService.deleteBudgetService(req.params.id);
        if (!deleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Budget not found' });
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse({}, 'Budget deleted successfully'));
    } catch (error: unknown) {
        next(error);
    }
};
