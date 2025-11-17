import axios from 'axios';
import { ExchangeRateResponse } from '../models/currencyModel';

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
    throw new Error('Failed to fetch exchange rates');
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
      throw new Error(`Exchange rate not available for ${fromCurrency} to ${toCurrency}`);
    }

    return amount / rate;
  } catch (error) {
    throw new Error('Currency conversion failed');
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
    return false;
  }
};
