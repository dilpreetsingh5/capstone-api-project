import { Request, Response, NextFunction } from 'express';
import * as accountService from '../services/accountService';
import { successResponse } from '../models/responseModel';
import { createAccountSchema, updateAccountSchema } from '../validation/accountValidation';
import { HTTP_STATUS } from '../../../constants/httpConstants';

/**
 * Retrieves all accounts
 */
export const getAccounts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const accounts = await accountService.getAllAccounts();
        res.status(HTTP_STATUS.OK).json(successResponse(accounts, 'Accounts retrieved successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Retrieves an account by ID
 */
export const getAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const account = await accountService.getAccountById(req.params.id);
        if (!account) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Account not found' });
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse(account, 'Account retrieved successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Creates a new account
 */
export const createAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error, value } = createAccountSchema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Validation failed",
                details: error.details.map(d => d.message),
            });
            return;
        }

        const newAccount = await accountService.createAccount(value);
        res.status(HTTP_STATUS.CREATED).json(successResponse(newAccount, 'Account created successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Updates an account
 */
export const updateAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { error, value } = updateAccountSchema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Validation failed",
                details: error.details.map(d => d.message),
            });
            return;
        }

        const updatedAccount = await accountService.updateAccount(req.params.id, value);
        if (!updatedAccount) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Account not found' });
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse(updatedAccount, 'Account updated successfully'));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Deletes an account
 */
export const deleteAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deleted = await accountService.deleteAccount(req.params.id);
        if (!deleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Account not found' });
            return;
        }
        res.status(HTTP_STATUS.OK).json(successResponse({}, 'Account deleted successfully'));
    } catch (error: unknown) {
        next(error);
    }
};
