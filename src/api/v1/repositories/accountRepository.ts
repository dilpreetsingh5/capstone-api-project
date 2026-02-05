import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../utils/firestoreUtils';
import { Account } from '../models/accountModel';

export const getAllAccounts = async (): Promise<Account[]> => {
  const snapshot = await getDocuments('accounts');
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() } as Account));
};

export const getAccountById = async (id: string): Promise<Account | null> => {
  const doc = await getDocumentById('accounts', id);
  if (doc && doc.exists) {
    return { id: doc.id, ...doc.data() } as Account;
  }
  return null;
};

export const createAccount = async (account: Omit<Account, 'id'>): Promise<Account> => {
  const id = await createDocument('accounts', {
    ...account,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { id, ...account };
};

export const updateAccount = async (id: string, account: Partial<Account>): Promise<void> => {
  await updateDocument('accounts', id, { ...account, updatedAt: new Date() });
};

export const deleteAccount = async (id: string): Promise<void> => {
  await deleteDocument('accounts', id);
};
