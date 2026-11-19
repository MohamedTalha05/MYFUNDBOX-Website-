import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBillingComparison, clampBillingInput } from './billingCalculator';

test('Free tier applies when subscribers count <= 25', () => {
  const result = calculateBillingComparison({
    monthlyRevenueEur: 5000,
    subscribersCount: 20,
  });

  assert.equal(result.myfundboxPlanName, 'Free');
  assert.equal(result.myfundboxMonthlyEur, 0);
  assert.equal(result.stripeBillingMonthlyEur, 35); // 5000 * 0.007
  assert.ok(result.annualSavingsVsStripe > 0);
});

test('Professional tier applies for 26 to 500 subscribers at flat 199 EUR/mo', () => {
  const result = calculateBillingComparison({
    monthlyRevenueEur: 80000,
    subscribersCount: 400,
  });

  assert.equal(result.myfundboxPlanName, 'Professional');
  assert.equal(result.myfundboxMonthlyEur, 199);
  assert.equal(result.stripeBillingMonthlyEur, 560); // 80000 * 0.007
  // Savings vs Stripe: (560 - 199) * 12 = 4332 EUR / year
  assert.equal(result.annualSavingsVsStripe, 4332);
});

test('Advanced tier applies for > 500 subscribers with flat 399 EUR/mo', () => {
  const result = calculateBillingComparison({
    monthlyRevenueEur: 150000,
    subscribersCount: 1200,
  });

  assert.equal(result.myfundboxPlanName, 'Advanced');
  assert.equal(result.myfundboxMonthlyEur, 399);
  assert.equal(result.stripeBillingMonthlyEur, 1050); // 150000 * 0.007
  // Savings vs Stripe: (1050 - 399) * 12 = 7812 EUR / year
  assert.equal(result.annualSavingsVsStripe, 7812);
  assert.ok(result.annualSavingsVsPaddle > 50000);
});

test('clamps extreme input values within safe bounds', () => {
  const clampedLow = clampBillingInput({ monthlyRevenueEur: -500, subscribersCount: 0 });
  assert.equal(clampedLow.monthlyRevenueEur, 1000);
  assert.equal(clampedLow.subscribersCount, 1);

  const clampedHigh = clampBillingInput({ monthlyRevenueEur: 5000000, subscribersCount: 999999 });
  assert.equal(clampedHigh.monthlyRevenueEur, 1000000);
  assert.equal(clampedHigh.subscribersCount, 50000);
});

