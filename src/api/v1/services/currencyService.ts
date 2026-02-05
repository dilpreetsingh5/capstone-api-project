import axios from 'axios';
import { ExchangeRateResponse } from '../models/currencyModel';
import { ServiceError } from '../errors/errors';
import { HTTP_STATUS } from '../../../constants/httpConstants';

const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const EXCHANGE_RATE_API_URL = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/`;

/**
 * Fetches the latest exchange rates from the API
 * @param baseCurrency - The base currency to get rates for (default: USD)
 * @returns Promise<ExchangeRateResponse>
 */
export const getExchangeRates = async (baseCurrency: string = 'USD'): Promise<ExchangeRateResponse> => {
  try {
    const response = await axios.get(`${EXCHANGE_RATE_API_URL}${baseCurrency}`);
    return response.data;
  } catch (error) {
    throw new ServiceError('Failed to fetch exchange rates', 'FETCH_EXCHANGE_RATES_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Converts an amount from one currency to another
 * @param amount - The amount to convert
 * @param fromCurrency - The source currency
 * @param toCurrency - The target currency
 * @returns Promise<number> - The converted amount
 */
export const convertCurrency = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  try {
    const rates = await getExchangeRates(toCurrency);
    const rate = rates.conversion_rates[fromCurrency.toUpperCase()];

    if (!rate) {
      throw new ServiceError(`Exchange rate not available for ${fromCurrency} to ${toCurrency}`, 'EXCHANGE_RATE_NOT_AVAILABLE', HTTP_STATUS.BAD_REQUEST);
    }

    return amount / rate;
  } catch (error) {
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError('Currency conversion failed', 'CURRENCY_CONVERSION_ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Validates if a currency code is supported
 * @param currency - The currency code to validate
 * @returns Promise<boolean>
 */
export const isValidCurrency = async (currency: string): Promise<boolean> => {
  try {
    const rates = await getExchangeRates('USD');
    return currency.toUpperCase() in rates.conversion_rates || currency.toUpperCase() === 'USD';
  } catch (error) {
    // For validation, we can return false on error, but perhaps log it
    return false;
  }
};
