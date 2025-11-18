import axios from 'axios';
import { ServiceError } from '../src/api/v1/errors/errors';
import { HTTP_STATUS } from '../src/constants/httpConstants';

// Mock environment variable before importing the service
process.env.EXCHANGE_RATE_API_KEY = 'mock-api-key';

import { getExchangeRates, convertCurrency, isValidCurrency } from '../src/api/v1/services/currencyService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Currency Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the API key environment variable
  });

  describe('getExchangeRates', () => {
    it('should return exchange rates successfully', async () => {
      const mockResponse = {
        result: 'success',
        base_code: 'USD',
        conversion_rates: { EUR: 0.85, GBP: 0.73 }
      };
      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const result = await getExchangeRates('USD');

      expect(mockedAxios.get).toHaveBeenCalledWith('https://v6.exchangerate-api.com/v6/mock-api-key/latest/USD');
      expect(result).toEqual(mockResponse);
    });

    it('should throw ServiceError on API failure', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API Error'));

      await expect(getExchangeRates('USD')).rejects.toThrow(ServiceError);
      await expect(getExchangeRates('USD')).rejects.toMatchObject({
        message: 'Failed to fetch exchange rates',
        code: 'FETCH_EXCHANGE_RATES_ERROR',
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR
      });
    });

    it('should use default base currency USD when not provided', async () => {
      const mockResponse = { result: 'success', conversion_rates: {} };
      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      await getExchangeRates();

      expect(mockedAxios.get).toHaveBeenCalledWith('https://v6.exchangerate-api.com/v6/mock-api-key/latest/USD');
    });
  });

  describe('convertCurrency', () => {
    it('should return the same amount when currencies are the same', async () => {
      const result = await convertCurrency(100, 'USD', 'USD');
      expect(result).toBe(100);
    });

    it('should convert currency successfully', async () => {
      const mockRates = {
        result: 'success',
        conversion_rates: { USD: 1.18 } // EUR to USD rate
      };
      mockedAxios.get.mockResolvedValue({ data: mockRates });

      const result = await convertCurrency(100, 'USD', 'EUR');

      expect(result).toBeCloseTo(84.75, 2); // 100 / 1.18 ≈ 84.75
      expect(mockedAxios.get).toHaveBeenCalledWith('https://v6.exchangerate-api.com/v6/mock-api-key/latest/EUR');
    });

    it('should throw ServiceError for unavailable exchange rate', async () => {
      const mockRates = {
        result: 'success',
        conversion_rates: { GBP: 0.73 } // No EUR
      };
      mockedAxios.get.mockResolvedValue({ data: mockRates });

      await expect(convertCurrency(100, 'USD', 'EUR')).rejects.toThrow(ServiceError);
      await expect(convertCurrency(100, 'USD', 'EUR')).rejects.toMatchObject({
        message: 'Exchange rate not available for USD to EUR',
        code: 'EXCHANGE_RATE_NOT_AVAILABLE',
        statusCode: HTTP_STATUS.BAD_REQUEST
      });
    });

    it('should throw ServiceError on currency conversion failure', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API Error'));

      await expect(convertCurrency(100, 'USD', 'EUR')).rejects.toThrow(ServiceError);
      await expect(convertCurrency(100, 'USD', 'EUR')).rejects.toMatchObject({
        message: 'Failed to fetch exchange rates',
        code: 'FETCH_EXCHANGE_RATES_ERROR',
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR
      });
    });
  });

  describe('isValidCurrency', () => {
    it('should return true for valid currency', async () => {
      const mockRates = {
        result: 'success',
        conversion_rates: { EUR: 0.85, GBP: 0.73 }
      };
      mockedAxios.get.mockResolvedValue({ data: mockRates });

      const result = await isValidCurrency('EUR');
      expect(result).toBe(true);
    });

    it('should return true for USD', async () => {
      const mockRates = {
        result: 'success',
        conversion_rates: { EUR: 0.85 }
      };
      mockedAxios.get.mockResolvedValue({ data: mockRates });

      const result = await isValidCurrency('USD');
      expect(result).toBe(true);
    });

    it('should return false for invalid currency', async () => {
      const mockRates = {
        result: 'success',
        conversion_rates: { EUR: 0.85, GBP: 0.73 }
      };
      mockedAxios.get.mockResolvedValue({ data: mockRates });

      const result = await isValidCurrency('INVALID');
      expect(result).toBe(false);
    });

    it('should return false on API failure', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API Error'));

      const result = await isValidCurrency('EUR');
      expect(result).toBe(false);
    });
  });
});
