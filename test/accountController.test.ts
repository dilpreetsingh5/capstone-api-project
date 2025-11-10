import { Request, Response, NextFunction } from 'express';
import * as accountController from '../src/api/v1/controllers/accountController';
import * as accountService from '../src/api/v1/services/accountService';

// Mock the account service
jest.mock('../src/api/v1/services/accountService');

const mockAccountService = accountService as jest.Mocked<typeof accountService>;

describe('Account Controller', () => {
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

    describe('getAccounts', () => {
        it('should return all accounts', async () => {
            const mockAccounts = [
                { id: '1', name: 'Account 1', type: 'checking' as const, balance: 1000, currency: 'USD', createdAt: new Date(), updatedAt: new Date() },
                { id: '2', name: 'Account 2', type: 'savings' as const, balance: 2000, currency: 'USD', createdAt: new Date(), updatedAt: new Date() },
            ];
            mockAccountService.getAllAccounts.mockResolvedValue(mockAccounts);

            await accountController.getAccounts(mockReq as Request, mockRes as Response, mockNext);

            expect(mockAccountService.getAllAccounts).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Accounts retrieved successfully',
                data: mockAccounts,
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle service errors', async () => {
            mockAccountService.getAllAccounts.mockRejectedValue(new Error('Database error'));

            await accountController.getAccounts(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('getAccount', () => {
        it('should return account by ID', async () => {
            const mockAccount = { id: '1', name: 'Account 1', type: 'checking' as const, balance: 1000, currency: 'USD', createdAt: new Date(), updatedAt: new Date() };
            mockReq.params = { id: '1' };
            mockAccountService.getAccountById.mockResolvedValue(mockAccount);

            await accountController.getAccount(mockReq as Request, mockRes as Response, mockNext);

            expect(mockAccountService.getAccountById).toHaveBeenCalledWith('1');
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Account retrieved successfully',
                data: mockAccount,
            });
        });

        it('should return 404 when account not found', async () => {
            mockReq.params = { id: '1' };
            mockAccountService.getAccountById.mockResolvedValue(null);

            await accountController.getAccount(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Account not found',
            });
        });

        it('should handle service errors', async () => {
            mockReq.params = { id: '1' };
            mockAccountService.getAccountById.mockRejectedValue(new Error('Database error'));

            await accountController.getAccount(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('createAccount', () => {
        it('should create a new account', async () => {
            const newAccountData = {
                name: 'Test Account',
                type: 'checking' as const,
                balance: 1000,
                currency: 'USD',
            };
            const createdAccount = { id: 'newId', ...newAccountData, createdAt: new Date(), updatedAt: new Date() };
            mockReq.body = newAccountData;
            mockAccountService.createAccount.mockResolvedValue(createdAccount);

            await accountController.createAccount(mockReq as Request, mockRes as Response, mockNext);

            expect(mockAccountService.createAccount).toHaveBeenCalledWith(newAccountData);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Account created successfully',
                data: createdAccount,
            });
        });

        it('should handle service errors', async () => {
            mockReq.body = { name: 'Test Account', type: 'checking', balance: 1000, currency: 'USD' };
            mockAccountService.createAccount.mockRejectedValue(new Error('Database error'));

            await accountController.createAccount(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('updateAccount', () => {
        it('should update an account', async () => {
            const updateData = { balance: 1500 };
            const updatedAccount = { id: '1', name: 'Account 1', type: 'checking' as const, balance: 1500, currency: 'USD', createdAt: new Date(), updatedAt: new Date() };
            mockReq.params = { id: '1' };
            mockReq.body = updateData;
            mockAccountService.updateAccount.mockResolvedValue(updatedAccount);

            await accountController.updateAccount(mockReq as Request, mockRes as Response, mockNext);

            expect(mockAccountService.updateAccount).toHaveBeenCalledWith('1', updateData);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Account updated successfully',
                data: updatedAccount,
            });
        });

        it('should return 404 when account not found', async () => {
            mockReq.params = { id: '1' };
            mockReq.body = { balance: 1500 };
            mockAccountService.updateAccount.mockResolvedValue(null);

            await accountController.updateAccount(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Account not found',
            });
        });

        it('should handle service errors', async () => {
            mockReq.params = { id: '1' };
            mockReq.body = { balance: 1500 };
            mockAccountService.updateAccount.mockRejectedValue(new Error('Database error'));

            await accountController.updateAccount(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('deleteAccount', () => {
        it('should delete an account', async () => {
            mockReq.params = { id: '1' };
            mockAccountService.deleteAccount.mockResolvedValue(true);

            await accountController.deleteAccount(mockReq as Request, mockRes as Response, mockNext);

            expect(mockAccountService.deleteAccount).toHaveBeenCalledWith('1');
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Account deleted successfully',
                data: {},
            });
        });

        it('should return 404 when account not found', async () => {
            mockReq.params = { id: '1' };
            mockAccountService.deleteAccount.mockResolvedValue(false);

            await accountController.deleteAccount(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Account not found',
            });
        });

        it('should handle service errors', async () => {
            mockReq.params = { id: '1' };
            mockAccountService.deleteAccount.mockRejectedValue(new Error('Database error'));

            await accountController.deleteAccount(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });
});
