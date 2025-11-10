export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: string;
  code?: string;
  details?: string[];
}

export const successResponse = <T>(
  data?: T,
  message?: string
): ApiResponse<T> => ({
  success: true,
  data,
  message,
});

export const errorResponse = (
  message: string,
  error?: string,
  code?: string,
  details?: string[]
): ErrorResponse => ({
  success: false,
  message,
  error,
  code,
  details,
});
