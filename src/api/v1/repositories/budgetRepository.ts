import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../utils/firestoreUtils';
import { Budget } from '../models/budgetModel';

export const getAllBudgets = async (): Promise<Budget[]> => {
  const snapshot = await getDocuments('budgets');
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() } as Budget));
};

export const getBudgetById = async (id: string): Promise<Budget | null> => {
  const doc = await getDocumentById('budgets', id);
  if (doc && doc.exists) {
    return { id: doc.id, ...doc.data() } as Budget;
  }
  return null;
};

export const createBudget = async (budget: Omit<Budget, 'id'>): Promise<Budget> => {
  const id = await createDocument('budgets', {
    ...budget,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { id, ...budget };
};

export const updateBudget = async (id: string, budget: Partial<Budget>): Promise<void> => {
  await updateDocument('budgets', id, { ...budget, updatedAt: new Date() });
};

export const deleteBudget = async (id: string): Promise<void> => {
  await deleteDocument('budgets', id);
};
