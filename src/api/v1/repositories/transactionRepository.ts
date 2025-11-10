import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../utils/firestoreUtils';
import { Transaction } from '../models/transactionModel';

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const snapshot = await getDocuments('transactions');
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
};

export const getTransactionById = async (id: string): Promise<Transaction | null> => {
  const doc = await getDocumentById('transactions', id);
  if (doc && doc.exists) {
    return { id: doc.id, ...doc.data() } as Transaction;
  }
  return null;
};

export const createTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  const id = await createDocument('transactions', {
    ...transaction,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { id, ...transaction };
};

export const updateTransaction = async (id: string, transaction: Partial<Transaction>): Promise<Transaction | null> => {
  await updateDocument('transactions', id, { ...transaction, updatedAt: new Date() });
  const doc = await getDocumentById('transactions', id);
  if (doc && doc.exists) {
    return { id: doc.id, ...doc.data() } as Transaction;
  }
  return null;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  await deleteDocument('transactions', id);
};
