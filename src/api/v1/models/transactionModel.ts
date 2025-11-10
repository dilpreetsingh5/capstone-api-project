export interface Transaction {
  id: string;
  userId?: string;
  accountId: string;
  amount: number;
  description: string;
  date: Date;
  category: string;
  type: 'income' | 'expense';
  currency: string;
  convertedAmount?: number; // Amount converted to base currency (e.g., USD)
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTransactionRequest {
  accountId: string;
  amount: number;
  description: string;
  date: Date;
  category: string;
  type: 'income' | 'expense';
  currency: string;
}

export interface UpdateTransactionRequest {
  accountId?: string;
  amount?: number;
  description?: string;
  date?: Date;
  category?: string;
  type?: 'income' | 'expense';
  currency?: string;
}
