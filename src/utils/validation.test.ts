import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDemoRequest } from './validation';

test('rejects missing GDPR consent even when other fields are valid', () => {
  const result = validateDemoRequest({
    fullName: 'Katrin Weber',
    workEmail: 'katrin@nordiccloud.de',
    companyName: 'NordicCloud GmbH',
    country: 'Germany',
    arrBand: '€1M – €5M',
    primaryUseCase: 'IFRS 15 Revenue Recognition',
    notes: '',
    gdprConsent: false,
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.gdprConsent);
  assert.equal(result.errors.workEmail, undefined);
});

test('rejects invalid email and empty company name', () => {
  const result = validateDemoRequest({
    fullName: 'A',
    workEmail: 'not-an-email',
    companyName: '',
    country: '',
    arrBand: '',
    primaryUseCase: 'General',
    notes: '',
    gdprConsent: true,
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.workEmail);
  assert.ok(result.errors.companyName);
  assert.ok(result.errors.country);
  assert.ok(result.errors.arrBand);
});

test('accepts complete valid GDPR-consented demo request', () => {
  const result = validateDemoRequest({
    fullName: 'Lukas Meyer',
    workEmail: 'lukas.meyer@finops-example.de',
    companyName: 'Alpen SaaS GmbH',
    country: 'Germany',
    arrBand: '€5M – €20M',
    primaryUseCase: 'Deferred Revenue & DATEV Export',
    notes: 'Multi-entity consolidation needed.',
    gdprConsent: true,
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
});
