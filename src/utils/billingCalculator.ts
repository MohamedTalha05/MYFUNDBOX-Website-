/**
 * Compares MYFUNDBOX's flat-rate subscriber pricing against %-of-revenue pricing models
 * from US-centric competitors (Stripe Billing, Paddle, Recurly).
 */

export interface BillingCalculatorInput {
  monthlyRevenueEur: number;
  subscribersCount: number;
}

export interface BillingComparisonResult {
  monthlyRevenueEur: number;
  subscribersCount: number;
  myfundboxPlanName: string;
  myfundboxMonthlyEur: number;
  stripeBillingMonthlyEur: number;
  paddleMonthlyEur: number;
  recurlyMonthlyEur: number;
  annualSavingsVsStripe: number;
  annualSavingsVsPaddle: number;
  annualSavingsVsRecurly: number;
}

export function clampBillingInput(input: Partial<BillingCalculatorInput>): BillingCalculatorInput {
  const rawRevenue =
    input.monthlyRevenueEur !== undefined && !Number.isNaN(Number(input.monthlyRevenueEur))
      ? Number(input.monthlyRevenueEur)
      : 50000;
  const rawSubscribers =
    input.subscribersCount !== undefined && !Number.isNaN(Number(input.subscribersCount))
      ? Number(input.subscribersCount)
      : 250;

  const monthlyRevenueEur = Math.max(1000, Math.min(1000000, Math.round(rawRevenue)));
  const subscribersCount = Math.max(1, Math.min(50000, Math.round(rawSubscribers)));
  return { monthlyRevenueEur, subscribersCount };
}

export function calculateBillingComparison(
  rawInput: Partial<BillingCalculatorInput>
): BillingComparisonResult {
  const { monthlyRevenueEur, subscribersCount } = clampBillingInput(rawInput);

  // MYFUNDBOX flat pricing:
  // - Free: up to 25 subscribers = 0 €/mo
  // - Professional: up to 500 subscribers = 199 €/mo (billed annually)
  // - Advanced: unlimited subscribers = 399 €/mo (billed annually)
  let myfundboxPlanName = 'Free';
  let myfundboxMonthlyEur = 0;

  if (subscribersCount > 500) {
    myfundboxPlanName = 'Advanced';
    myfundboxMonthlyEur = 399;
  } else if (subscribersCount > 25) {
    myfundboxPlanName = 'Professional';
    myfundboxMonthlyEur = 199;
  }

  // Stripe Billing: 0.7% of recurring volume
  const stripeBillingMonthlyEur = Math.round(monthlyRevenueEur * 0.007);

  // Paddle: 5% + 0.50 € per transaction/subscriber charge
  const paddleMonthlyEur = Math.round(monthlyRevenueEur * 0.05 + subscribersCount * 0.5);

  // Recurly: 249 €/mo base + 0.9% on volume above 40,000 €/mo
  const recurlyVolumeFee = Math.max(0, monthlyRevenueEur - 40000) * 0.009;
  const recurlyMonthlyEur = Math.round(249 + recurlyVolumeFee);

  const annualSavingsVsStripe = Math.max(0, (stripeBillingMonthlyEur - myfundboxMonthlyEur) * 12);
  const annualSavingsVsPaddle = Math.max(0, (paddleMonthlyEur - myfundboxMonthlyEur) * 12);
  const annualSavingsVsRecurly = Math.max(0, (recurlyMonthlyEur - myfundboxMonthlyEur) * 12);

  return {
    monthlyRevenueEur,
    subscribersCount,
    myfundboxPlanName,
    myfundboxMonthlyEur,
    stripeBillingMonthlyEur,
    paddleMonthlyEur,
    recurlyMonthlyEur,
    annualSavingsVsStripe,
    annualSavingsVsPaddle,
    annualSavingsVsRecurly,
  };
}
