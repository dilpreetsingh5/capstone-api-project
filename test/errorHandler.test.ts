import { Request, Response, NextFunction } from "express";
import errorHandler from "../src/api/v1/middleware/errorHandler";
import {
    AppError,
    AuthenticationError,
    AuthorizationError,
    ServiceError,
} from "../src/api/v1/errors/errors";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("errorHandler middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        mockRequest = {};
        mockResponse = {
            status: statusMock,
        };
        nextFunction = jest.fn();

        // Spy on console.error to prevent cluttering test output
        consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
        consoleErrorSpy.mockRestore();
    });

    it("should handle AuthenticationError with correct status and message", () => {
        // Arrange
        const error = new AuthenticationError("Invalid token", "TOKEN_INVALID");

        // Act
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED);
        expect(jsonMock).toHaveBeenCalledWith({
            success: false,
            message: "Invalid token",
            error: "TOKEN_INVALID",
            code: undefined,
            details: undefined,
        });
    });

    it("should handle AuthorizationError with correct status and message", () => {
        // Arrange
        const error = new AuthorizationError(
            "Insufficient permissions",
            "INSUFFICIENT_ROLE"
        );

        // Act
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.FORBIDDEN);
        expect(jsonMock).toHaveBeenCalledWith({
            success: false,
            message: "Insufficient permissions",
            error: "INSUFFICIENT_ROLE",
            code: undefined,
            details: undefined,
        });
    });

    it("should handle generic Error with 500 status", () => {
        // Arrange
        const error = new Error("Unexpected error");

        // Act
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(statusMock).toHaveBeenCalledWith(
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
        expect(jsonMock).toHaveBeenCalledWith({
            success: false,
            message: "An unexpected error occurred",
            error: "UNKNOWN_ERROR",
            code: undefined,
            details: undefined,
        });
    });

    it("should handle null error gracefully", () => {
        // Act
        errorHandler(
            null,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(statusMock).toHaveBeenCalledWith(
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
        expect(jsonMock).toHaveBeenCalledWith({
            success: false,
            message: "An unexpected error occurred",
            error: "UNKNOWN_ERROR",
            code: undefined,
            details: undefined,
        });
    });

    it("should handle ServiceError with custom status code", () => {
        // Arrange
        const error = new ServiceError(
            "Validation failed",
            "VALIDATION_ERROR",
            422
        );

        // Act
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(statusMock).toHaveBeenCalledWith(422);
        expect(jsonMock).toHaveBeenCalledWith({
            success: false,
            message: "Validation failed",
            error: "VALIDATION_ERROR",
            code: undefined,
            details: undefined,
        });
    });

    it("should log error message", () => {
        // Arrange
        const error = new Error("Test error");

        // Act
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Test error");
    });

    it("should log stack trace in non-production environment", () => {
        // Arrange
        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = "development";
        const error = new Error("Test error");

        // Act
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining("Stack:")
        );

        // Cleanup
        process.env.NODE_ENV = originalEnv;
    });

    it("should not log stack trace in production environment", () => {
        // Arrange
        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = "production";
        const error = new Error("Test error");

        // Act
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        const stackCalls = consoleErrorSpy.mock.calls.filter((call) =>
            call[0].includes("Stack:")
        );
        expect(stackCalls.length).toBe(0);

        // Cleanup
        process.env.NODE_ENV = originalEnv;
    });

    it("should handle AppError base class", () => {
        // Arrange
        const error = new AppError("Custom error", "CUSTOM_ERROR", 418);

        // Act
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(statusMock).toHaveBeenCalledWith(418);
        expect(jsonMock).toHaveBeenCalledWith({
            success: false,
            message: "Custom error",
            error: "CUSTOM_ERROR",
            code: undefined,
            details: undefined,
        });
    });
});
