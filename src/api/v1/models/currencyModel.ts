/**
 * @swagger
 * components:
 *   schemas:
 *     ExchangeRateResponse:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *           description: Result status of the API call
 *         documentation:
 *           type: string
 *           description: Link to API documentation
 *         terms_of_use:
 *           type: string
 *           description: Terms of use for the API
 *         time_last_update_unix:
 *           type: number
 *           description: Unix timestamp of last update
 *         time_last_update_utc:
 *           type: string
 *           description: UTC time of last update
 *         time_next_update_unix:
 *           type: number
 *           description: Unix timestamp of next update
 *         time_next_update_utc:
 *           type: string
 *           description: UTC time of next update
 *         base_code:
 *           type: string
 *           description: Base currency code (ISO 4217, e.g., USD)
 *         conversion_rates:
 *           type: object
 *           additionalProperties:
 *             type: number
 *           description: Object containing conversion rates for supported currencies (ISO 4217 codes like USD, EUR, GBP, etc.)
 *       example:
 *         result: "success"
 *         documentation: "https://www.exchangerate-api.com/docs"
 *         terms_of_use: "https://www.exchangerate-api.com/terms"
 *         time_last_update_unix: 1519296206
 *         time_last_update_utc: "Fri, 22 Feb 2019 00:00:06 +0000"
 *         time_next_update_unix: 1519296206
 *         time_next_update_utc: "Fri, 22 Feb 2019 00:00:06 +0000"
 *         base_code: "USD"
 *         conversion_rates:
 *           USD: 1
 *           EUR: 0.85
 *           GBP: 0.75
 */

export interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: { [key: string]: number };
}
