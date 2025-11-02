# Capstone Project Proposal: Personal Finance Tracker API

## Project Concept
**Theme:** Personal Finance Tracker – This is a RESTful API that helps people manage their money by keeping track of accounts, transactions, and budgets. I picked this idea because managing personal finances is something everyone needs, and it lets me practice important skills like creating, reading, updating, and deleting data, checking data for errors, and adding security. The API will let users keep an eye on their income, spending, and money goals, which can help them build better habits with their money.

**Purpose:** The API acts as the back-end for a personal finance app, giving endpoints to create and handle financial accounts, record transactions, and set budgets. It focuses on security with user login and permissions, so users can only see their own info.

## Scope and Functionality
**Planned Functionality:**
- **User Authentication and Authorization:** Users can sign up, log in, and manage their profiles using Firebase Authentication. I'll use role-based access (like user roles) with Firebase custom claims to protect the endpoints.
- **Accounts Resource:** Basic operations to manage financial accounts (like bank accounts or credit cards). Endpoints: GET /accounts, POST /accounts, PUT /accounts/:id, DELETE /accounts/:id. Info includes account name, type, balance, and currency.
- **Transactions Resource:** Basic operations to record money coming in and going out. Endpoints: GET /transactions, POST /transactions, PUT /transactions/:id, DELETE /transactions/:id. Info includes amount, description, date, category, and linked account.
- **Budgets Resource:** Basic operations to set and check monthly budgets by category. Endpoints: GET /budgets, POST /budgets, PUT /budgets/:id, DELETE /budgets/:id. Info includes category, monthly limit, amount spent, and time period.
- **Additional Features:** I'll check data with Joi, handle errors, document the API with Swagger/OpenAPI, test with Jest (aiming for 65% coverage), and use CI/CD with GitHub Actions.

**Data Needs:**
- Users: Handled by Firebase Auth (no extra storage needed).
- Accounts: Saved in Firestore with fields like userId, name, type, balance, currency.
- Transactions: Saved in Firestore with fields like userId, accountId, amount, description, date, category.
- Budgets: Saved in Firestore with fields like userId, category, limit, spent, month, year.

**Out-of-Scope:** Building a front-end, advanced charts or analytics, or connecting to a mobile app.

## Course Content Alignment
**Alignment with Course Content:**
- **Technologies:** This uses Node.js, TypeScript, Express, Firebase Firestore and Authentication, Jest, Swagger/OpenAPI, Joi, dotenv, helmet.js, CORS – all as taught in class.
- **Architecture:** I'll follow the layered setup (Routes, Controllers, Services, Repository) from the course.
- **Authentication/Authorization:** Using Firebase Auth and custom claims for role-based access, just like the demos.
- **CRUD Operations:** Standard setup for the three main resources.
- **Testing, Documentation, Security:** Following class practices for unit tests, TSDoc, checking code style, and security tools.
- **Git Workflow:** Using main, development, and feature branches as explained.

**Areas Outside Course Scope (Requiring Approval):**
- **New Component:** Adding a third-party API for real-time currency conversion (like ExchangeRate-API). This will let transactions use different currencies, with automatic changes to a main currency. It adds real value for users in other countries but brings in API limits and error handling not covered in class. I'm asking for approval since it improves the project without making it too complex.

## GitHub Project Setup
**GitHub Repository:** The project is in a GitHub repo called "backend-capstone-project" (started locally). I'll follow a simple Git Workflow like Atlassian:
- **main:** Ready-for-use code.
- **development:** Ongoing stable work.
- **feature branches:** One for each issue (like feature/setup-project-structure).

**Project Board:** I'll make a GitHub Project board with columns for Backlog, In Progress, Review, and Done. High-level tasks for each milestone are listed below as GitHub issues.

**High-Level Tasks by Milestone:**
- **Pre-Milestone (Planning and Proposal):**
  - Issue #1: Write the project proposal document.
  - Issue #2: Research and plan the new back-end part in new-component-plan.md.
- **Milestone 1 (Initial Setup and Development - Weeks 1-2):**
  - Issue #3: Set up the development environment and upload starting code to GitHub.
  - Issue #4: Design the database and basic API endpoints with simple CRUD for main resources.
  - Issue #5: Set up basic API docs (Swagger/OpenAPI).
  - Issue #6: Add basic CRUD operations using best practices.
  - Issue #7: Make sure unit tests cover at least 65% for CRUD operations.
- **Milestone 2 (Sprint Demo and Component Integration - Week 3):**
  - Issue #8: Improve CRUD operations and add more details.
  - Issue #9: Start adding the new back-end component.
  - Issue #10: Have a working basic version with no errors.
  - Issue #11: Get ready for a 5-8 minute demo showing progress, new part, and next steps.
  - Issue #12: Update tests for new parts and make sure they pass.
- **Milestone 3 (Final Touches and Project Completion - Weeks 4-5):**
  - Issue #13: Add more features to the new component (like filtering, sorting).
  - Issue #14: Add secure login and permissions.
  - Issue #15: Finish and update API docs.
  - Issue #16: Get full test coverage and all tests passing.
  - Issue #17: Organize the project, polish the code, and review it.
- **Final Project Demonstration (Week 5):**
  - Issue #18: Make a 5-minute video demo or set up a live demo with the instructor, showing the app, tests, how it matches the course, and what I learned.
