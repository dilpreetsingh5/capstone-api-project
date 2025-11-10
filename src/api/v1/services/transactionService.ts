import { getAllTransactions, getTransactionById, createTransaction as createTransactionRepo, updateTransaction as updateTransactionRepo, deleteTransaction as deleteTransactionRepo } from '../repositories/transactionRepository';
import { Transaction } from '../models/transactionModel';
import { createTransactionSchema, updateTransactionSchema } from '../validation/transactionValidation';
import { ServiceError } from '../errors/errors';
import { HTTP_STATUS } from '../../../constants/httpConstants';

/**
 * Retrieves all transactions
 * @returns {Promise<Transaction[]>} Array of all transactions
 */
export const getAllTransactionsService = async (): Promise<Transaction[]> => {
  try {
    return getAllTransactions();
  } catch (error) {
    throw new Error('Failed to retrieve transactions');
  }
};

/**
 * Retrieves a transaction by its ID
 * @param {string} id - The ID of the transaction
 * @returns {Promise<Transaction | null>} Transaction object if found, otherwise null
 */
export const getTransactionByIdService = async (id: string): Promise<Transaction | null> => {
  try {
    return getTransactionById(id);
  } catch (error) {
    throw new Error('Failed to retrieve transaction');
  }
};

/**
 * Creates a new transaction
 * @param {Omit<Transaction, 'id'>} transaction - The transaction data without an ID
 * @returns {Promise<Transaction>} The newly created transaction with a generated ID
 */
export const createTransactionService = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  try {
    const { error } = createTransactionSchema.validate(transaction);
    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }
    // Business logic: For Milestone 1, no currency conversion
    const transactionWithConversion = { ...transaction, convertedAmount: transaction.amount };
    return createTransactionRepo(transactionWithConversion);
  } catch (error) {
    throw new Error('Failed to create transaction');
  }
};

/**
 * Updates an existing transaction by ID
 * @param {string} id - The ID of the transaction to update
 * @param {Partial<Transaction>} transaction - The updated transaction data
 * @returns {Promise<Transaction | null>} The updated transaction or null if not found
 */
export const updateTransactionService = async (id: string, transaction: Partial<Transaction>): Promise<Transaction | null> => {
  try {
    const existing = await getTransactionById(id);
    if (!existing) {
      return null;
    }
    const updatedData = { ...existing, ...transaction };
    const { error } = updateTransactionSchema.validate(transaction);
    if (error) {
      throw new ServiceError(`Validation error: ${error.details[0].message}`, 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
    // Business logic: For Milestone 1, no currency conversion
    if (transaction.amount !== undefined) {
      updatedData.convertedAmount = transaction.amount;
    }
    return updateTransactionRepo(id, updatedData);
  } catch (error) {
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new Error('Failed to update transaction');
  }
};

/**
 * Deletes a transaction by ID
 * @param {string} id - The ID of the transaction to delete
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export const deleteTransactionService = async (id: string): Promise<boolean> => {
  try {
    const existing = await getTransactionById(id);
    if (!existing) {
      return false;
    }
    await deleteTransactionRepo(id);
    return true;
  } catch (error) {
    throw new Error('Failed to delete transaction');
  }
};
