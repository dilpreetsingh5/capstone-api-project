import { Request, Response, NextFunction } from 'express';
import * as budgetController from '../src/api/v1/controllers/budgetController';
import * as budgetService from '../src/api/v1/services/budgetService';

// Mock the budget service
jest.mock('../src/api/v1/services/budgetService');

const mockBudgetService = budgetService as jest.Mocked<typeof budgetService>;

describe('Budget Controller', () => {
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

    describe('getBudgets', () => {
        it('should return all budgets', async () => {
            const mockBudgets = [
                { id: '1', category: 'Food', limit: 500, spent: 100, month: 10, year: 2023, createdAt: new Date(), updatedAt: new Date() },
                { id: '2', category: 'Transport', limit: 200, spent: 50, month: 10, year: 2023, createdAt: new Date(), updatedAt: new Date() },
            ];
            mockBudgetService.getAllBudgetsService.mockResolvedValue(mockBudgets);

            await budgetController.getBudgets(mockReq as Request, mockRes as Response, mockNext);

            expect(mockBudgetService.getAllBudgetsService).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Budgets retrieved successfully',
                data: mockBudgets,
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle service errors', async () => {
            mockBudgetService.getAllBudgetsService.mockRejectedValue(new Error('Database error'));

            await budgetController.getBudgets(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('getBudget', () => {
        it('should return budget by ID', async () => {
            const mockBudget = { id: '1', category: 'Food', limit: 500, spent: 100, month: 10, year: 2023, createdAt: new Date(), updatedAt: new Date() };
            mockReq.params = { id: '1' };
            mockBudgetService.getBudgetByIdService.mockResolvedValue(mockBudget);

            await budgetController.getBudget(mockReq as Request, mockRes as Response, mockNext);

            expect(mockBudgetService.getBudgetByIdService).toHaveBeenCalledWith('1');
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Budget retrieved successfully',
                data: mockBudget,
            });
        });

        it('should return 404 when budget not found', async () => {
            mockReq.params = { id: '1' };
            mockBudgetService.getBudgetByIdService.mockResolvedValue(null);

            await budgetController.getBudget(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Budget not found',
            });
        });

        it('should handle service errors', async () => {
            mockReq.params = { id: '1' };
            mockBudgetService.getBudgetByIdService.mockRejectedValue(new Error('Database error'));

            await budgetController.getBudget(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('createBudget', () => {
        it('should create a new budget', async () => {
            const newBudgetData = {
                category: 'Food',
                limit: 500,
                spent: 0,
                month: 10,
                year: 2023,
            };
            const createdBudget = { id: 'newId', ...newBudgetData, createdAt: new Date(), updatedAt: new Date() };
            mockReq.body = newBudgetData;
            mockBudgetService.createBudgetService.mockResolvedValue(createdBudget);

            await budgetController.createBudget(mockReq as Request, mockRes as Response, mockNext);

            expect(mockBudgetService.createBudgetService).toHaveBeenCalledWith(newBudgetData);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Budget created successfully',
                data: createdBudget,
            });
        });

        it('should handle service errors', async () => {
            mockReq.body = { category: 'Food', limit: 500, spent: 0, month: 10, year: 2023 };
            mockBudgetService.createBudgetService.mockRejectedValue(new Error('Database error'));

            await budgetController.createBudget(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('updateBudget', () => {
        it('should update a budget', async () => {
            const updateData = { spent: 150 };
            const updatedBudget = { id: '1', category: 'Food', limit: 500, spent: 150, month: 10, year: 2023, createdAt: new Date(), updatedAt: new Date() };
            mockReq.params = { id: '1' };
            mockReq.body = updateData;
            mockBudgetService.updateBudgetService.mockResolvedValue(updatedBudget);

            await budgetController.updateBudget(mockReq as Request, mockRes as Response, mockNext);

            expect(mockBudgetService.updateBudgetService).toHaveBeenCalledWith('1', updateData);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Budget updated successfully',
                data: updatedBudget,
            });
        });

        it('should return 404 when budget not found', async () => {
            mockReq.params = { id: '1' };
            mockReq.body = { spent: 150 };
            mockBudgetService.updateBudgetService.mockResolvedValue(null);

            await budgetController.updateBudget(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Budget not found',
            });
        });

        it('should handle service errors', async () => {
            mockReq.params = { id: '1' };
            mockReq.body = { spent: 150 };
            mockBudgetService.updateBudgetService.mockRejectedValue(new Error('Database error'));

            await budgetController.updateBudget(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('deleteBudget', () => {
        it('should delete a budget', async () => {
            mockReq.params = { id: '1' };
            mockBudgetService.deleteBudgetService.mockResolvedValue(true);

            await budgetController.deleteBudget(mockReq as Request, mockRes as Response, mockNext);

            expect(mockBudgetService.deleteBudgetService).toHaveBeenCalledWith('1');
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Budget deleted successfully',
                data: {},
            });
        });

        it('should return 404 when budget not found', async () => {
            mockReq.params = { id: '1' };
            mockBudgetService.deleteBudgetService.mockResolvedValue(false);

            await budgetController.deleteBudget(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Budget not found',
            });
        });

        it('should handle service errors', async () => {
            mockReq.params = { id: '1' };
            mockBudgetService.deleteBudgetService.mockRejectedValue(new Error('Database error'));

            await budgetController.deleteBudget(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });
});
