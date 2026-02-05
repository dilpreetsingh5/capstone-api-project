import { Request, Response, NextFunction } from 'express';
import * as transactionController from '../src/api/v1/controllers/transactionController';
import * as transactionService from '../src/api/v1/services/transactionService';

// Mock the transaction service
jest.mock('../src/api/v1/services/transactionService');

const mockTransactionService = transactionService as jest.Mocked<typeof transactionService>;

describe('Transaction Controller', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
        jest.clearAllMocks();
    });

    describe('getTransactions', () => {
        it('should return all transactions', async () => {
            const mockTransactions = [
                { id: '1', accountId: 'acc1', amount: 100, description: 'Grocery', date: new Date(), category: 'Food', type: 'expense' as const, currency: 'USD', createdAt: new Date(), updatedAt: new Date() },
                { id: '2', accountId: 'acc1', amount: 2000, description: 'Salary', date: new Date(), category: 'Income', type: 'income' as const, currency: 'USD', createdAt: new Date(), updatedAt: new Date() },
            ];
            mockTransactionService.getAllTransactionsService.mockResolvedValue(mockTransactions);

            await transactionController.getTransactions(mockReq as Request, mockRes as Response, mockNext);

            expect(mockTransactionService.getAllTransactionsService).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Transactions retrieved successfully',
                data: mockTransactions,
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle service errors', async () => {
            mockTransactionService.getAllTransactionsService.mockRejectedValue(new Error('Database error'));

            await transactionController.getTransactions(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('getTransaction', () => {
        it('should return transaction by ID', async () => {
            const mockTransaction = { id: '1', accountId: 'acc1', amount: 100, description: 'Grocery', date: new Date(), category: 'Food', type: 'expense' as const, currency: 'USD', createdAt: new Date(), updatedAt: new Date() };
            mockReq.params = { id: '1' };
            mockTransactionService.getTransactionByIdService.mockResolvedValue(mockTransaction);

            await transactionController.getTransaction(mockReq as Request, mockRes as Response, mockNext);

            expect(mockTransactionService.getTransactionByIdService).toHaveBeenCalledWith('1');
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Transaction retrieved successfully',
                data: mockTransaction,
            });
        });

        it('should return 404 when transaction not found', async () => {
            mockReq.params = { id: '1' };
            mockTransactionService.getTransactionByIdService.mockResolvedValue(null);

            await transactionController.getTransaction(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Transaction not found',
            });
        });

        it('should handle service errors', async () => {
            mockReq.params = { id: '1' };
            mockTransactionService.getTransactionByIdService.mockRejectedValue(new Error('Database error'));

            await transactionController.getTransaction(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('createTransaction', () => {
        it('should create a new transaction', async () => {
            const newTransactionData = {
                accountId: 'acc1',
                amount: 100,
                description: 'Grocery shopping',
                date: new Date(),
                category: 'Food',
                type: 'expense' as const,
                currency: 'USD',
            };
            const createdTransaction = { id: 'newId', ...newTransactionData, createdAt: new Date(), updatedAt: new Date() };
            mockReq.body = newTransactionData;
            mockTransactionService.createTransactionService.mockResolvedValue(createdTransaction);

            await transactionController.createTransaction(mockReq as Request, mockRes as Response, mockNext);

            expect(mockTransactionService.createTransactionService).toHaveBeenCalledWith(newTransactionData);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Transaction created successfully',
                data: createdTransaction,
            });
        });

        it('should handle service errors', async () => {
            mockReq.body = { accountId: 'acc1', amount: 100, description: 'Grocery', date: new Date(), category: 'Food', type: 'expense', currency: 'USD' };
            mockTransactionService.createTransactionService.mockRejectedValue(new Error('Database error'));

            await transactionController.createTransaction(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('updateTransaction', () => {
        it('should update a transaction', async () => {
            const updateData = { amount: 150 };
            const updatedTransaction = { id: '1', accountId: 'acc1', amount: 150, description: 'Grocery', date: new Date(), category: 'Food', type: 'expense' as const, currency: 'USD', createdAt: new Date(), updatedAt: new Date() };
            mockReq.params = { id: '1' };
            mockReq.body = updateData;
            mockTransactionService.updateTransactionService.mockResolvedValue(updatedTransaction);

            await transactionController.updateTransaction(mockReq as Request, mockRes as Response, mockNext);

            expect(mockTransactionService.updateTransactionService).toHaveBeenCalledWith('1', updateData);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Transaction updated successfully',
                data: updatedTransaction,
            });
        });

        it('should return 404 when transaction not found', async () => {
            mockReq.params = { id: '1' };
            mockReq.body = { amount: 150 };
            mockTransactionService.updateTransactionService.mockResolvedValue(null);

            await transactionController.updateTransaction(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Transaction not found',
            });
        });

        it('should handle service errors', async () => {
            mockReq.params = { id: '1' };
            mockReq.body = { amount: 150 };
            mockTransactionService.updateTransactionService.mockRejectedValue(new Error('Database error'));

            await transactionController.updateTransaction(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('deleteTransaction', () => {
        it('should delete a transaction', async () => {
            mockReq.params = { id: '1' };
            mockTransactionService.deleteTransactionService.mockResolvedValue(true);

            await transactionController.deleteTransaction(mockReq as Request, mockRes as Response, mockNext);

            expect(mockTransactionService.deleteTransactionService).toHaveBeenCalledWith('1');
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Transaction deleted successfully',
                data: {},
            });
        });

        it('should return 404 when transaction not found', async () => {
            mockReq.params = { id: '1' };
            mockTransactionService.deleteTransactionService.mockResolvedValue(false);

            await transactionController.deleteTransaction(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Transaction not found',
            });
        });

        it('should handle service errors', async () => {
            mockReq.params = { id: '1' };
            mockTransactionService.deleteTransactionService.mockRejectedValue(new Error('Database error'));

            await transactionController.deleteTransaction(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });
});
