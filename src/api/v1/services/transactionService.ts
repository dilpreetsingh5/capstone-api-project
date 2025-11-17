import { getAllTransactions, getTransactionById, createTransaction as createTransactionRepo, updateTransaction as updateTransactionRepo, deleteTransaction as deleteTransactionRepo } from '../repositories/transactionRepository';
import { Transaction } from '../models/transactionModel';
import { createTransactionSchema, updateTransactionSchema } from '../validation/transactionValidation';
import { ServiceError } from '../errors/errors';
import { HTTP_STATUS } from '../../../constants/httpConstants';
import { convertCurrency, isValidCurrency } from './currencyService';

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
    
    // Validate currency code
    const isValid = await isValidCurrency(transaction.currency);
    if (!isValid) {
      throw new Error(`Invalid currency code: ${transaction.currency}`);
    }

    // Convert currency to base currency (USD)
    let convertedAmount: number;
    try {
      convertedAmount = await convertCurrency(transaction.amount, transaction.currency, 'USD');
    } catch (conversionError) {
      // Fallback: use original amount if conversion fails
      convertedAmount = transaction.amount;
    }

    const transactionWithConversion = { ...transaction, convertedAmount };
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
    
    // Handle currency conversion if amount or currency is being updated
    if (transaction.amount !== undefined || transaction.currency !== undefined) {
      const currencyToUse = transaction.currency || existing.currency;
      const amountToUse = transaction.amount !== undefined ? transaction.amount : existing.amount;

      // Validate currency if it's being updated
      if (transaction.currency !== undefined) {
        const isValid = await isValidCurrency(currencyToUse);
        if (!isValid) {
          throw new Error(`Invalid currency code: ${currencyToUse}`);
        }
      }

      // Convert currency to base currency (USD)
      try {
        updatedData.convertedAmount = await convertCurrency(amountToUse, currencyToUse, 'USD');
      } catch (conversionError) {
        // Fallback: use original amount if conversion fails
        updatedData.convertedAmount = amountToUse;
      }
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
