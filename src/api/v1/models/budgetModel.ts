export interface Budget {
  id: string;
  userId?: string;
  category: string;
  limit: number;
  spent: number;
  month: number;
  year: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBudgetRequest {
  category: string;
  limit: number;
  spent: number;
  month: number;
  year: number;
}

export interface UpdateBudgetRequest {
  category?: string;
  limit?: number;
  spent?: number;
  month?: number;
  year?: number;
}
