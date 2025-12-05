# MultiBank Web UI Automation Framework

This project is a web UI for the MultiBank platform, built using TypeScript and Playwright. It includes a suite of automated tests using Playwright Test, and is configured to run on CI using GitHub Actions.

---

## 📑 Table of Contents

- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
  - [Local Execution](#local-execution)
  - [CI/CD Execution](#cicd-execution)
- [Test Suites](#-test-suites)
- [Allure Reporting](#-allure-reporting)

---

## 📁 Project Structure

```
mb-webui-autoframework/
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions CI/CD workflow
├── data/                       # Test data (localization/data-driven)
│   ├── contentValidation.json  # Content validation test data
│   ├── navigation.json         # Navigation menu locators/texts
│   ├── spotSection.json        # Spot trading section data
│   └── stringFrequency.json    # String frequency test data
├── src/
│   ├── pages/                  # Page Object Models
│   │   ├── BasePage.ts         # Base class with reusable methods
│   │   ├── HomePage.ts         # Homepage page object
│   │   └── WhyMultiBankPage.ts # Why MultiBank page object
│   └── utils/                  # Utility functions
│       └── stringFrequency.ts  # String frequency utility
├── tests/                      # Test specifications
│   ├── contentValidation.spec.ts
│   ├── navigation.spec.ts
│   ├── spotSection.spec.ts
│   └── stringFrequency.spec.ts
├── allure-results/             # Raw Allure data (gitignored)
├── allure-report/              # Generated HTML report (gitignored)
├── test-results/               # Playwright artifacts (gitignored)
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint configuration
└── package.json                # Dependencies and scripts
```

---

## 📋 Prerequisites

Before running the tests, ensure you have the following installed:

| **Node.js** | 20.x or higher | [Download](https://nodejs.org/) |

| **npm** | 10.x or higher | Comes with Node.js |

| **Git** | Latest | [Download](https://git-scm.com/) |

| **Allure CLI** | Latest | `npm install -g allure-commandline` |

### Verify Installation

```bash
node --version    # Should be v20.x.x or higher
npm --version     # Should be v10.x.x or higher
git --version     # Any recent version
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/chougulesanman/mb-webui-autoframework.git
cd mb-webui-autoframework
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install --with-deps
```

### 4. (Optional) Install Allure CLI Globally

```bash
npm install -g allure-commandline
```

---

## ▶️ Running Tests

### Local Execution

#### Run All Tests

```bash
npm test
```

#### Run Specific Test Suite

```bash
# Navigation tests
npm run test:nav

# Spot section tests
npm run test:spot

# Content validation tests
npm run test:content

# String frequency tests
npm run test:string
```

#### Run Tests on Specific Browser

```bash
# Chromium (default)
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# WebKit (Safari)
npx playwright test --project=webkit

# All browsers
npx playwright test
```

#### Run Specific Test File

```bash
npx playwright test tests/navigation.spec.ts
```

---

### CI/CD Execution

Tests automatically run on **GitHub Actions** when:
- Code is pushed to `main` branch
- A Pull Request is opened against `main`

#### Manual Trigger with Test Selection

1. Go to **[Actions](https://github.com/chougulesanman/mb-webui-autoframework/actions)** tab
2. Select **"Playwright Tests"** workflow
3. Click **"Run workflow"**
4. Choose options:

| Test Suite | `all`, `navigation`, `spot`, `content`, `stringFrequency` |

| Browser | `chromium`, `firefox`, `webkit`, `all` |

5. Click **"Run workflow"**

---

## 🧪 Test Suites

| **Navigation** | `navigation.spec.ts` | Verifies top navigation menu items visibility and navigation |

| **Spot Section** | `spotSection.spec.ts` | Tests spot trading section, category tabs, table data |

| **Content Validation** | `contentValidation.spec.ts` | Validates marketing banners, download links, Why MultiBank page |

| **String Frequency** | `stringFrequency.spec.ts` | Tests string frequency utility function |

---

## 📊 Allure Reporting

### Generate and View Report

After running tests:

```bash
# Generate the report
npm run allure:generate

# Open in browser
npm run allure:open

# Or do both at once
npm run report
```

### CI/CD Reports

After GitHub Actions run:
1. Go to the completed workflow run
2. Download `allure-report` artifact
3. Extract and open `index.html`

---

## 👤 Author

**Sanman Chougule**

- GitHub: [@chougulesanman](https://github.com/chougulesanman)

