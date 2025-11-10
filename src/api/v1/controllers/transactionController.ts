import { Request, Response, NextFunction } from 'express';
import * as transactionService from '../services/transactionService';
import { successResponse } from '../models/responseModel';
import { createTransactionSchema, updateTransactionSchema } from '../validation/transactionValidation';
import { HTTP_STATUS } from '../../../constants/httpConstants';

/**
 * Retrieves all transactions
 */
export const getTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const transactions = await transactionService.getAllTransactionsService();
        res.status(HTTP_STATUS.OK).json(successResponse(transactions, 'Transactions retrieved successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Retrieves a transaction by ID
 */
export const getTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const transaction = await transactionService.getTransactionByIdService(req.params.id);
        if (!transaction) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Transaction not found' });
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse(transaction, 'Transaction retrieved successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Creates a new transaction
 */
export const createTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error, value } = createTransactionSchema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Validation failed",
                details: error.details.map(d => d.message),
            });
            return;
        }

        const newTransaction = await transactionService.createTransactionService(value);
        res.status(HTTP_STATUS.CREATED).json(successResponse(newTransaction, 'Transaction created successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Updates a transaction
 */
export const updateTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error, value } = updateTransactionSchema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Validation failed",
                details: error.details.map(d => d.message),
            });
            return;
        }

        const updatedTransaction = await transactionService.updateTransactionService(req.params.id, value);
        if (!updatedTransaction) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Transaction not found' });
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse(updatedTransaction, 'Transaction updated successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Deletes a transaction
 */
export const deleteTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deleted = await transactionService.deleteTransactionService(req.params.id);
        if (!deleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Transaction not found' });
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse({}, 'Transaction deleted successfully'));
    } catch (error: unknown) {
        next(error);
    }
};
