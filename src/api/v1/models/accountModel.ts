export interface Account {
  id: string;
  userId?: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateAccountRequest {
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
}

export interface UpdateAccountRequest {
  name?: string;
  type?: 'checking' | 'savings' | 'credit' | 'investment';
  balance?: number;
  currency?: string;
}
