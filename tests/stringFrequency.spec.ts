import { test, expect } from '@playwright/test';
import { countCharacterFrequency } from '../src/utils/stringFrequency';
import testData from '../data/stringFrequency.json';

test.describe('String Char Frequency Tests', () => {
  testData.testCases.forEach(({ name, input, expected }) => {
    test(`${name}`, () => {
      expect(countCharacterFrequency(input)).toBe(expected);
    });
  });
});