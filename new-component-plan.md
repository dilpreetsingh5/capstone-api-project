# New Component Plan: Real-Time Currency Conversion API Integration

## Chosen Component
I have selected the integration of a third-party API for real-time currency conversion as the new back-end component for my Personal Finance Tracker API. This component will allow users to record transactions in multiple currencies and automatically convert them to a base currency (e.g., USD) for consistent tracking and reporting.

## Why This Component?
- **Practical Value:** Supports international users who deal with multiple currencies, making the app more useful for global finance management.
- **Enhancement:** Adds real-time data handling and external API integration, which improves the API's functionality without overcomplicating the core features.
- **Manageability:** It's a focused addition that builds on existing CRUD operations for transactions, fitting within the project timeline.

## Research and Analysis
I researched several options for currency conversion APIs:
1. **ExchangeRate-API:** Free tier with 1,500 requests/month, reliable, simple JSON responses.
2. **CurrencyAPI:** Paid, but offers more features like historical rates.
3. **Fixer.io:** Good for developers, free tier available.

I chose ExchangeRate-API because it's free, easy to use, and meets the project's needs without extra cost.

## Implementation Plan
### Step 1: API Selection and Setup
- Use ExchangeRate-API (https://exchangerate-api.com/).
- Sign up for a free API key.
- Store the API key securely in environment variables (using dotenv).

### Step 2: Integration Points
- Integrate into the Transactions resource.
- When creating or updating a transaction, if the currency differs from the base currency, call the API to get the conversion rate.
- Store the converted amount in the base currency alongside the original amount.

### Step 3: Code Changes
- **Services Layer:** Add a new service for currency conversion (e.g., CurrencyService).
- **Repository Layer:** Update transaction repository to handle converted amounts.
- **Controllers:** Modify transaction controllers to include conversion logic.
- **Validation:** Use Joi to validate currency codes (e.g., USD, EUR).

### Step 4: Error Handling
- Handle API rate limits (1,500 requests/month).
- Cache rates for a short time to reduce API calls.
- Provide fallback if API is down (use last known rate or skip conversion).

### Step 5: Testing
- Unit tests for the conversion service.
- Mock the API calls in tests.
- Ensure 65%+ coverage includes new code.

### Step 6: Documentation
- Update Swagger/OpenAPI docs to include currency fields in transaction endpoints.
- Add notes on supported currencies.

## Integration with Existing API
- The component will enhance the POST /transactions and PUT /transactions/:id endpoints.
- No changes to other resources (Accounts, Budgets).
- Maintains layered architecture: Routes -> Controllers -> Services -> Repository.                                            

## Potential Challenges
- API rate limits: Mitigate with caching.
- Network issues: Add retries and fallbacks.
- Currency code validation: Ensure only valid codes are accepted.

## Timeline
- Research and planning: Complete (this document).
- Basic integration: Milestone 2.
- Advanced features (caching, error handling): Milestone 3.

This component adds value by supporting multi-currency transactions, aligning with the project's goal of comprehensive personal finance tracking.
