import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDeferredAndTimeEstimate, clampEstimatorInput } from './revenueCalculator';

test('100% annual prepaid contracts defer 11/12 in Month 1 and zero out in Month 12', () => {
  const result = calculateDeferredAndTimeEstimate({
    activeContracts: 100,
    averageAcvEur: 1200,
    annualPrepaidSharePct: 100,
    billingSourceCount: 2,
    currentManualCloseHours: 40,
  });

  assert.equal(result.totalContractedArrEur, 120000);
  assert.equal(result.annualPrepaidCashMonth1Eur, 120000);
  // Month 1 recognizes 10,000 -> 110,000 remains deferred
  assert.equal(result.endingMonth1DeferredEur, 110000);
  // Month 12 ends at 0 deferred
  assert.equal(result.endingMonth12DeferredEur, 0);
  assert.equal(result.year1RecognizedEur, 120000);
});

test('100% monthly contracts maintain zero deferred revenue balance at month-end', () => {
  const result = calculateDeferredAndTimeEstimate({
    activeContracts: 50,
    averageAcvEur: 2400,
    annualPrepaidSharePct: 0,
    billingSourceCount: 1,
    currentManualCloseHours: 20,
  });

  assert.equal(result.endingMonth1DeferredEur, 0);
  assert.equal(result.endingMonth12DeferredEur, 0);
  assert.equal(result.year1RecognizedEur, 120000);
});

test('clamps extreme out-of-range inputs safely', () => {
  const clamped = clampEstimatorInput({
    activeContracts: -5,
    averageAcvEur: 50,
    annualPrepaidSharePct: 150,
    billingSourceCount: 0,
    currentManualCloseHours: 999,
  });

  assert.equal(clamped.activeContracts, 10);
  assert.equal(clamped.averageAcvEur, 240);
  assert.equal(clamped.annualPrepaidSharePct, 100);
  assert.equal(clamped.billingSourceCount, 1);
  assert.equal(clamped.currentManualCloseHours, 300);
});
