export interface EstimatorInput {
  /** Total active customer contracts */
  activeContracts: number;
  /** Average annual contract value (ACV) in EUR */
  averageAcvEur: number;
  /** Percentage of contracts billed annually upfront (0 to 100) */
  annualPrepaidSharePct: number;
  /** Number of upstream billing/payment/ERP sources */
  billingSourceCount: number;
  /** Current manual close hours per month spent reconciling deferred revenue */
  currentManualCloseHours: number;
}

export interface MonthlyScheduleRow {
  monthIndex: number;
  monthLabel: string;
  cashCollectedEur: number;
  recognizedRevenueEur: number;
  endingDeferredRevenueEur: number;
}

export interface EstimatorResult {
  totalContractedArrEur: number;
  annualPrepaidCashMonth1Eur: number;
  endingMonth1DeferredEur: number;
  endingMonth12DeferredEur: number;
  year1RecognizedEur: number;
  estimatedHoursSavedPerMonth: number;
  estimatedAnnualHoursSaved: number;
  estimatedRemainingManualHours: number;
  schedule: MonthlyScheduleRow[];
  assumptions: string[];
}

const MONTH_LABELS = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];

export function clampEstimatorInput(input: EstimatorInput): EstimatorInput {
  return {
    activeContracts: Math.max(10, Math.min(25000, Math.round(input.activeContracts || 10))),
    averageAcvEur: Math.max(240, Math.min(250000, Math.round(input.averageAcvEur || 240))),
    annualPrepaidSharePct: Math.max(0, Math.min(100, Math.round(input.annualPrepaidSharePct))),
    billingSourceCount: Math.max(1, Math.min(15, Math.round(input.billingSourceCount || 1))),
    currentManualCloseHours: Math.max(2, Math.min(300, Math.round(input.currentManualCloseHours || 2))),
  };
}

/**
 * Computes a deterministic 12-month IFRS 15 / HGB straight-line revenue recognition
 * and deferred revenue roll-forward estimate for a cohort of contracts starting in Month 1,
 * plus an estimated monthly close time reduction model.
 */
export function calculateDeferredAndTimeEstimate(rawInput: EstimatorInput): EstimatorResult {
  const input = clampEstimatorInput(rawInput);
  const totalArr = input.activeContracts * input.averageAcvEur;
  const annualRatio = input.annualPrepaidSharePct / 100;
  const monthlyRatio = 1 - annualRatio;

  const annualCohortValue = totalArr * annualRatio;
  const monthlyCohortAnnualValue = totalArr * monthlyRatio;

  const monthlyRecognitionFromAnnual = annualCohortValue / 12;
  const monthlyBillingAndRecFromMonthly = monthlyCohortAnnualValue / 12;

  const schedule: MonthlyScheduleRow[] = [];
  let deferredBalance = 0;

  for (let i = 0; i < 12; i++) {
    const annualCash = i === 0 ? annualCohortValue : 0;
    const cashCollected = Math.round(annualCash + monthlyBillingAndRecFromMonthly);
    const recognized = Math.round(monthlyRecognitionFromAnnual + monthlyBillingAndRecFromMonthly);

    // Roll-forward: Beginning Deferred + Cash/Billed Invoiced - Recognized Revenue
    deferredBalance = Math.max(0, deferredBalance + cashCollected - recognized);

    schedule.push({
      monthIndex: i + 1,
      monthLabel: MONTH_LABELS[i],
      cashCollectedEur: cashCollected,
      recognizedRevenueEur: recognized,
      endingDeferredRevenueEur: Math.round(deferredBalance),
    });
  }

  // Deterministic close time savings estimate:
  // Multi-source reconciliation overhead scales with billing sources and contract volume.
  // Conservative benchmark model assumes automated rule-based mapping reduces manual
  // spreadsheet allocation/reconciliation by 55% to 75% depending on source complexity.
  const complexityFactor = Math.min(0.75, 0.52 + (input.billingSourceCount - 1) * 0.035);
  const estimatedHoursSavedPerMonth = Math.max(
    1,
    Math.round(input.currentManualCloseHours * complexityFactor)
  );
  const estimatedRemainingManualHours = Math.max(
    1,
    input.currentManualCloseHours - estimatedHoursSavedPerMonth
  );

  return {
    totalContractedArrEur: Math.round(totalArr),
    annualPrepaidCashMonth1Eur: Math.round(annualCohortValue),
    endingMonth1DeferredEur: schedule[0]?.endingDeferredRevenueEur ?? 0,
    endingMonth12DeferredEur: schedule[11]?.endingDeferredRevenueEur ?? 0,
    year1RecognizedEur: schedule.reduce((sum, r) => sum + r.recognizedRevenueEur, 0),
    estimatedHoursSavedPerMonth,
    estimatedAnnualHoursSaved: estimatedHoursSavedPerMonth * 12,
    estimatedRemainingManualHours,
    schedule,
    assumptions: [
      'Cohort model assumes all active contracts begin on the first day of Month 1 under straight-line 1/12th monthly IFRS 15 / HGB recognition.',
      'Net-zero mid-term upgrades, cancellations, or credit notes are excluded from this baseline illustration.',
      `Close-time estimate assumes ${Math.round(complexityFactor * 100)}% reduction in manual reconciliation and spreadsheet waterfall maintenance across ${input.billingSourceCount} billing source(s); actual savings vary by ERP workflow.`,
      'Figures exclude EU VAT (USt/TVA), which is booked to VAT liability accounts rather than recognized or deferred revenue.',
    ],
  };
}
