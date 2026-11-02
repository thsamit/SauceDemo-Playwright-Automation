# SauceDemo Playwright Automation

End-to-end test automation framework for [SauceDemo](https://www.saucedemo.com), a sample e-commerce web application, built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** design pattern.

---

## 📁 Project Structure

```
SauceDemo Playwright Automation/
├── fixtures/
│   └── pageFixtures.ts          # Custom Playwright fixtures for page objects
├── pages/
│   ├── BasePage.ts              # Base page class with shared functionality
│   ├── CartPage.ts              # Shopping cart page actions & locators
│   ├── CheckoutCompletePage.ts  # Order confirmation page
│   ├── CheckoutStepOnePage.ts   # Checkout information form
│   ├── CheckoutStepTwoPage.ts   # Checkout overview/summary
│   ├── InventoryPage.ts         # Products listing page
│   ├── LoginPage.ts             # Login page
│   ├── ProductDetailsPage.ts    # Individual product detail page
│   └── SideMenu.ts              # Hamburger side menu component
├── tests/
│   ├── auth.spec.ts             # Authentication & login tests
│   ├── cart.spec.ts             # Shopping cart tests
│   ├── checkout.spec.ts         # Checkout flow tests
│   └── inventory.spec.ts        # Product listing & sorting tests
├── .env.example                 # Environment variables template
├── .gitignore
├── .prettierrc                  # Code formatting configuration
├── package.json
├── playwright.config.ts         # Playwright configuration
└── tsconfig.json                # TypeScript configuration
```

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/SauceDemo-Playwright-Automation.git
cd SauceDemo-Playwright-Automation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install --with-deps
```

### 4. Set up environment variables

Copy the example environment file and update values if needed:

```bash
cp .env.example .env
```

The `.env` file contains credentials and configuration:

| Variable                  | Description                      |
| ------------------------- | -------------------------------- |
| `BASE_URL`                | Application base URL             |
| `STANDARD_USER`           | Standard test user username      |
| `LOCKED_OUT_USER`         | Locked out user username         |
| `PROBLEM_USER`            | Problem user username            |
| `PERFORMANCE_GLITCH_USER` | Performance glitch user username |
| `ERROR_USER`              | Error user username              |
| `STANDARD_PASSWORD`       | Shared password for test users   |

> **Note:** The `.env` file is gitignored. Never commit credentials to version control.

---

## Running Tests

### Run all tests (headless)

```bash
npm test
```

### Run tests in headed mode (visible browser)

```bash
npm run test:headed
```

### Run tests with Playwright UI mode

```bash
npm run test:ui
```

### Run a specific test file

```bash
npx playwright test tests/auth.spec.ts
```

### Run tests with a specific tag/grep

```bash
npx playwright test --grep "TC_AUTH_001"
```

### View the HTML test report

```bash
npm run test:report
```

---

## 📊 Test Coverage

The framework includes **21 test cases** across 4 test suites:

### Authentication Tests (`auth.spec.ts`) — 5 Tests

| Test ID     | Description                                               |
| ----------- | --------------------------------------------------------- |
| TC_AUTH_001 | Verify successful login with valid credentials            |
| TC_AUTH_002 | Verify locked-out user receives appropriate error message |
| TC_AUTH_003 | Verify invalid password shows error message               |
| TC_AUTH_004 | Verify empty credentials show validation message          |
| TC_AUTH_005 | Verify logged-in user can successfully log out            |

### Cart Tests (`cart.spec.ts`) — 6 Tests

| Test ID     | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| TC_CART_001 | Verify adding an item updates the cart badge count             |
| TC_CART_002 | Verify removing an item updates the cart badge count           |
| TC_CART_003 | Verify added items are listed on the cart page                 |
| TC_CART_004 | Verify items can be removed from the cart page                 |
| TC_CART_005 | Verify Continue Shopping returns to inventory with cart intact |
| TC_CART_006 | Verify multiple items can be added simultaneously              |

### Checkout Tests (`checkout.spec.ts`) — 4 Tests

| Test ID    | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| TC_CHK_001 | Verify end-to-end order checkout completion                 |
| TC_CHK_002 | Verify validation errors for empty/incomplete checkout info |
| TC_CHK_003 | Verify item subtotal, tax, and total price calculations     |
| TC_CHK_004 | Verify canceling checkout returns to inventory page         |

### Inventory Tests (`inventory.spec.ts`) — 6 Tests

| Test ID          | Description                                         |
| ---------------- | --------------------------------------------------- |
| TC_INV_001       | Verify all products are displayed on inventory page |
| TC_INV_002       | Verify sorting products by Name (A to Z)            |
| TC_INV_003       | Verify sorting products by Name (Z to A)            |
| TC_INV_004       | Verify sorting products by Price (low to high)      |
| TC_INV_005       | Verify sorting products by Price (high to low)      |
| TC_INV_006 & 007 | Verify product details view and back navigation     |

---

## Framework Design

### Page Object Model (POM)

Each page/component of the application is represented by a class in the `pages/` directory:

- **`BasePage`** — Abstract base class with shared navigation method
- **Page classes** — Encapsulate locators as `readonly` properties and actions as methods
- **`SideMenu`** — Standalone component class for the hamburger menu

### Custom Fixtures

Page object instances are injected via Playwright's fixture system ([`fixtures/pageFixtures.ts`](fixtures/pageFixtures.ts)), eliminating manual instantiation in tests:

```typescript
test('example', async ({ loginPage, inventoryPage, cartPage }) => {
    // Page objects are automatically created and ready to use
});
```

---

## Tech Stack

| Tool / Library | Purpose                         |
| -------------- | ------------------------------- |
| Playwright     | Browser automation & testing    |
| TypeScript     | Type-safe test scripting        |
| dotenv         | Environment variable management |
| Prettier       | Code formatting                 |

---
