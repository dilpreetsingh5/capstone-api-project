import { getAllAccounts as getAllAccountsRepo, getAccountById as getAccountByIdRepo, createAccount as createAccountRepo, updateAccount as updateAccountRepo, deleteAccount as deleteAccountRepo } from '../repositories/accountRepository';
import { Account } from '../models/accountModel';
import { createAccountSchema, updateAccountSchema } from '../validation/accountValidation';
import { ServiceError } from '../errors/errors';
import { HTTP_STATUS } from '../../../constants/httpConstants';

/**
 * Retrieves all accounts
 * @returns {Promise<Account[]>} Array of all accounts
 */
export const getAllAccounts = async (): Promise<Account[]> => {
  try {
    return getAllAccountsRepo();
  } catch (error) {
    throw new ServiceError('Failed to retrieve accounts', 'RETRIEVE_ACCOUNTS_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Retrieves an account by its ID
 * @param {string} id - The ID of the account
 * @returns {Promise<Account | null>} Account object if found, otherwise null
 */
export const getAccountById = async (id: string): Promise<Account | null> => {
  try {
    return getAccountByIdRepo(id);
  } catch (error) {
    throw new ServiceError('Failed to retrieve account', 'RETRIEVE_ACCOUNT_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Creates a new account
 * @param {Omit<Account, 'id'>} account - The account data without an ID
 * @returns {Promise<Account>} The newly created account with a generated ID
 */
export const createAccount = async (account: Omit<Account, 'id'>): Promise<Account> => {
  try {
    const { error } = createAccountSchema.validate(account);
    if (error) {
      throw new ServiceError(`Validation error: ${error.details[0].message}`, 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
    // Business logic: Ensure balance is not negative for certain types
    if (account.type === 'credit' && account.balance > 0) {
      throw new ServiceError('Credit account balance cannot be positive', 'BUSINESS_LOGIC_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
    return createAccountRepo(account);
  } catch (error) {
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError('Failed to create account', 'CREATE_ACCOUNT_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Updates an existing account by ID
 * @param {string} id - The ID of the account to update
 * @param {Partial<Account>} account - The updated account data
 * @returns {Promise<Account | null>} The updated account or null if not found
 */
export const updateAccount = async (id: string, account: Partial<Account>): Promise<Account | null> => {
  try {
    const existing = await getAccountById(id);
    if (!existing) {
      return null;
    }
    const { error } = updateAccountSchema.validate(account);
    if (error) {
      throw new ServiceError(`Validation error: ${error.details[0].message}`, 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
    // Business logic: Prevent changing userId (if present)
    if (account.userId !== undefined && account.userId !== existing.userId) {
      throw new ServiceError('Cannot change account userId', 'BUSINESS_LOGIC_ERROR', HTTP_STATUS.BAD_REQUEST);
    }
    await updateAccountRepo(id, account);
    return { ...existing, ...account, updatedAt: new Date() };
  } catch (error) {
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError('Failed to update account', 'UPDATE_ACCOUNT_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Deletes an account by ID
 * @param {string} id - The ID of the account to delete
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export const deleteAccount = async (id: string): Promise<boolean> => {
  try {
    const existing = await getAccountById(id);
    if (!existing) {
      return false;
    }
    // Business logic: Check if account has transactions (but for simplicity, allow delete)
    await deleteAccountRepo(id);
    return true;
  } catch (error) {
    throw new ServiceError('Failed to delete account', 'DELETE_ACCOUNT_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};
