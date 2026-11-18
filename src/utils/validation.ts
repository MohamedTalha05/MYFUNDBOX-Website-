export interface DemoRequestPayload {
  fullName: string;
  workEmail: string;
  companyName: string;
  country: string;
  arrBand: string;
  primaryUseCase: string;
  notes: string;
  gdprConsent: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof DemoRequestPayload, string>>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateDemoRequest(payload: DemoRequestPayload): ValidationResult {
  const errors: Partial<Record<keyof DemoRequestPayload, string>> = {};

  if (!payload.fullName || payload.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (minimum 2 characters).';
  }

  const email = payload.workEmail?.trim() ?? '';
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.workEmail = 'Please enter a valid work email address.';
  }

  if (!payload.companyName || payload.companyName.trim().length < 2) {
    errors.companyName = 'Please enter your company or entity name.';
  }

  if (!payload.country || payload.country.trim().length === 0) {
    errors.country = 'Please select your primary EU/EEA or global jurisdiction.';
  }

  if (!payload.arrBand || payload.arrBand.trim().length === 0) {
    errors.arrBand = 'Please select your approximate recurring revenue band.';
  }

  if (!payload.gdprConsent) {
    errors.gdprConsent =
      'Explicit GDPR consent is required so we can process your demo request without third-party data sharing.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
