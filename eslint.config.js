const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const playwright = require('eslint-plugin-playwright');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'allure-report/**',
      'allure-results/**',
      'test-results/**',
      '*.js',
      '!eslint.config.js'
    ]
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'playwright': playwright
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-networkidle': 'off',
      'playwright/prefer-web-first-assertions': 'warn',
      'playwright/expect-expect': 'off',
      'no-console': 'warn'
    }
  },
  {
    files: ['src/utils/**/*.ts'],
    rules: {
      'no-console': 'off'
    }
  }
];