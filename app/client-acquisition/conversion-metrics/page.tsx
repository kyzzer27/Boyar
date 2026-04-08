/* Boyar Partners — Client Acquisition & Conversion Model (Institutional Edition) */
"use client";

import { useMemo, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
} from "recharts";
// Inline SVG icons (no external dependency)
const IconTrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const IconArrowDownRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const IconGauge = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const IconActivity = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const IconTimer = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconPercent = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-5m-6 5h.01M9 17h.01M9 7h.01M15 7h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

type Scenario = "conservative" | "base" | "aggressive";
type Currency = "INR" | "USD" | "EUR";
type ViewMode = "revenue" | "contribution";
type CACMode = "marketing" | "fullyLoaded";

const SERVICE_IDS = [
  "company",
  "trust",
  "full",
  "licensing",
  "corporate",
  "office",
  "banking",
] as const;

type ServiceId = (typeof SERVICE_IDS)[number];

const SERVICE_DEFINITIONS: { id: ServiceId; label: string; isRecurring: boolean }[] =
  [
    { id: "company", label: "Company Formation", isRecurring: true },
    { id: "trust", label: "Standalone Trust Formation", isRecurring: true },
    { id: "full", label: "Full Structure (Trust + Corporates)", isRecurring: true },
    { id: "licensing", label: "Licensing", isRecurring: true },
    { id: "corporate", label: "Corporate Services", isRecurring: false },
    { id: "office", label: "Office Registration", isRecurring: false },
    { id: "banking", label: "Banking", isRecurring: false },
  ];

// FX rates (base currency: USD) — as of 26 March 2026
const FX_RATES: Record<Currency, number> = {
  USD: 1,
  INR: 94.0,
  EUR: 0.865,
};

const YEAR_1_DATA = {
  totalAdSpend: 17_000,
  totalClosedClients: 16,
  totalRevenue: 110_900,
  blendedCPC: 3.09,
  totalClicks: 5_497,
  salesCycle: 75,
  initialContributionMargin: 0.4,
  impressions: 458_000,
  paidClicks: 5_497,
  ctr: 1.2,
  clickToLeadConversion: 0.12,
  leadToMQLConversion: 0.35,
  mqlToSQLConversion: 0.5,
  sqlToProposalConversion: 0.6,
  proposalToCloseConversion: 0.25,
  clickToClientConversion: 0.00291,
  recurringEligibleClients: 9,
  annualRecurringContributionYear2: 34_960,
  fiveYearCumulativeRecurring: 117_520,
  retentionRate: 0.8,
};

interface FunnelStage {
  id: string;
  label: string;
  inputSummary: string;
  primaryMetricLabel: string;
  primaryMetricValue: number;
  conversionRate: number;
  efficiencyScore: number;
  secondaryMetrics?: Record<string, number>;
}

interface GlobalMetrics {
  blendedMarketingCAC: number;
  blendedFullyLoadedCAC: number;
  avgRevenuePerClient: number;
  initialContributionPerClient: number;
  totalYear1Contribution: number;
  revenueROAS: number;
  contributionROAS: number;
  ltvRevenue: number;
  ltvContribution: number;
  ltvToCacMarketing: number;
  ltvToCacFullyLoaded: number;
  salesVelocity: number;
  avgSalesCycle: number;
  grossPipelineValue: number;
  weightedPipelineValue: number;
  funnelConversion: number;
  clickToClientConversion: number;
}

function convertCurrency(usdValue: number, currency: Currency): number {
  return usdValue * FX_RATES[currency];
}

function formatCurrency(usdValue: number, currency: Currency) {
  const converted = convertCurrency(usdValue, currency);
  const currencyMap: Record<Currency, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
  };
  const symbol = currencyMap[currency];
  return `${symbol}${converted.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;
}

function formatCompact(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

function calculateFunnelStages(scenario: Scenario): FunnelStage[] {
  const data = YEAR_1_DATA;
  
  if (scenario === "conservative") {
    // Real Year 1 data
    const leads = Math.round(data.totalClicks * data.clickToLeadConversion);
    const mql = Math.round(leads * data.leadToMQLConversion);
    const sql = Math.round(mql * data.mqlToSQLConversion);
    const proposals = Math.round(sql * data.sqlToProposalConversion);
    const closed = data.totalClosedClients;
    
    return [
      {
        id: "reach",
        label: "Marketable Reach",
        inputSummary: "Impressions & spend across acquisition channels",
        primaryMetricLabel: "Impressions",
        primaryMetricValue: data.impressions,
        conversionRate: data.ctr,
        efficiencyScore: 75,
        secondaryMetrics: {
          clicks: data.totalClicks,
          ctr: data.ctr,
        },
      },
      {
        id: "paidClicks",
        label: "Paid Clicks",
        inputSummary: "Targeted traffic from Google, Meta, YouTube, LinkedIn",
        primaryMetricLabel: "Paid Clicks",
        primaryMetricValue: data.paidClicks,
        conversionRate: data.clickToLeadConversion * 100,
        efficiencyScore: 72,
        secondaryMetrics: {
          blendedCPC: data.blendedCPC,
          adSpend: data.totalAdSpend,
        },
      },
      {
        id: "leads",
        label: "Leads / MQL",
        inputSummary: "High-intent inbound & nurtured leads",
        primaryMetricLabel: "MQL Volume",
        primaryMetricValue: mql,
        conversionRate: data.leadToMQLConversion * 100,
        efficiencyScore: 78,
        secondaryMetrics: {
          leads,
          mql,
        },
      },
      {
        id: "sql",
        label: "Sales Qualified Lead (SQL)",
        inputSummary: "Screened for budget, authority & fit",
        primaryMetricLabel: "SQL Volume",
        primaryMetricValue: sql,
        conversionRate: data.mqlToSQLConversion * 100,
        efficiencyScore: 80,
      },
      {
        id: "proposal",
        label: "Proposal Stage",
        inputSummary: "Structured proposals & mandate drafts",
        primaryMetricLabel: "Proposals Issued",
        primaryMetricValue: proposals,
        conversionRate: data.sqlToProposalConversion * 100,
        efficiencyScore: 76,
      },
      {
        id: "closed",
        label: "Closed Won",
        inputSummary: "Mandates signed & in execution",
        primaryMetricLabel: "Closed Clients",
        primaryMetricValue: closed,
        conversionRate: data.proposalToCloseConversion * 100,
        efficiencyScore: 88,
      },
      {
        id: "expansion",
        label: "Expansion & Monetization",
        inputSummary: "Recurring revenue & LTV expansion",
        primaryMetricLabel: "Recurring Clients",
        primaryMetricValue: data.recurringEligibleClients,
        conversionRate: 0,
        efficiencyScore: 84,
      },
    ];
  } else {
    // Base and Aggressive use multipliers
    const multiplier = scenario === "aggressive" ? 1.2 : 1.0;
    const baseImpressions = 185_000;
    const baseMQL = 1_850;
    const baseSQL = 740;
    const baseProposals = 260;
    const baseClosed = 78;
    
    return [
      {
        id: "reach",
        label: "Marketable Reach",
        inputSummary: "Impressions & spend across acquisition channels",
        primaryMetricLabel: "Qualified Reach",
        primaryMetricValue: Math.round(baseImpressions * multiplier),
        conversionRate: 3.4,
        efficiencyScore: 78,
      },
      {
        id: "paidClicks",
        label: "Paid Clicks",
        inputSummary: "Targeted traffic from Google, Meta, YouTube, LinkedIn",
        primaryMetricLabel: "Paid Clicks",
        primaryMetricValue: Math.round(6_300 * multiplier),
        conversionRate: 29.4,
        efficiencyScore: 74,
      },
      {
        id: "mql",
        label: "Marketing Qualified Lead (MQL)",
        inputSummary: "High-intent inbound & nurtured leads",
        primaryMetricLabel: "MQL Volume",
        primaryMetricValue: Math.round(baseMQL * multiplier),
        conversionRate: 28.0,
        efficiencyScore: 82,
      },
      {
        id: "sql",
        label: "Sales Qualified Lead (SQL)",
        inputSummary: "Screened for budget, authority & fit",
        primaryMetricLabel: "SQL Volume",
        primaryMetricValue: Math.round(baseSQL * multiplier),
        conversionRate: 40.0,
        efficiencyScore: 80,
      },
      {
        id: "proposal",
        label: "Proposal Stage",
        inputSummary: "Structured proposals & mandate drafts",
        primaryMetricLabel: "Active Proposals",
        primaryMetricValue: Math.round(baseProposals * multiplier),
        conversionRate: 35.0,
        efficiencyScore: 76,
      },
      {
        id: "closed",
        label: "Closed Won",
        inputSummary: "Mandates signed & in execution",
        primaryMetricLabel: "New Mandates",
        primaryMetricValue: Math.round(baseClosed * multiplier),
        conversionRate: 30.0,
        efficiencyScore: 88,
      },
      {
        id: "expansion",
        label: "Expansion & Monetization",
        inputSummary: "Cross-sell, banking, licensing & LTV",
        primaryMetricLabel: "Expansion Revenue %",
        primaryMetricValue: 46,
        conversionRate: 0,
        efficiencyScore: 84,
      },
    ];
  }
}

function calculateGlobalMetrics(
  scenario: Scenario,
  viewMode: ViewMode,
  cacMode: CACMode,
): GlobalMetrics {
  const data = YEAR_1_DATA;
  
  if (scenario === "conservative") {
    // Real Year 1 calculations
    const avgRevenuePerClient = data.totalRevenue / data.totalClosedClients;
    const initialContributionPerClient = avgRevenuePerClient * data.initialContributionMargin;
    const totalYear1Contribution = initialContributionPerClient * data.totalClosedClients;
    
    const blendedMarketingCAC = data.totalAdSpend / data.totalClosedClients;
    const blendedFullyLoadedCAC = 2_000; // Stress scenario
    
    const revenueROAS = data.totalRevenue / data.totalAdSpend;
    const contributionROAS = totalYear1Contribution / data.totalAdSpend;
    
    // LTV calculations
    const avgRecurringContributionPerClient = data.fiveYearCumulativeRecurring / data.recurringEligibleClients;
    const ltvContribution = initialContributionPerClient + avgRecurringContributionPerClient;
    const ltvRevenue = avgRevenuePerClient + (avgRecurringContributionPerClient / data.initialContributionMargin);
    
    const ltvToCacMarketing = ltvContribution / blendedMarketingCAC;
    const ltvToCacFullyLoaded = ltvContribution / blendedFullyLoadedCAC;
    
    const salesVelocity = data.totalRevenue / 12; // Monthly equivalent
    const grossPipelineValue = 69 * avgRevenuePerClient; // 69 proposals
    const weightedPipelineValue = grossPipelineValue * 0.25; // 25% probability
    
    const funnelConversion = (data.totalClosedClients / data.impressions) * 100;
    
    return {
      blendedMarketingCAC,
      blendedFullyLoadedCAC,
      avgRevenuePerClient,
      initialContributionPerClient,
      totalYear1Contribution,
      revenueROAS,
      contributionROAS,
      ltvRevenue,
      ltvContribution,
      ltvToCacMarketing,
      ltvToCacFullyLoaded,
      salesVelocity,
      avgSalesCycle: data.salesCycle,
      grossPipelineValue,
      weightedPipelineValue,
      funnelConversion,
      clickToClientConversion: data.clickToClientConversion * 100,
    };
  } else {
    // Base and Aggressive scenarios (keep original logic)
    const multiplier = scenario === "aggressive" ? 1.2 : 1.0;
    const avgDealSize = 180_000 * multiplier;
    const closed = scenario === "aggressive" ? 94 : 78;
    const blendedCAC = (24_000 / multiplier);
    const ltv = blendedCAC * 3.6;
    const salesCycle = scenario === "aggressive" ? 75 : 90;
    
    return {
      blendedMarketingCAC: blendedCAC,
      blendedFullyLoadedCAC: blendedCAC * 2,
      avgRevenuePerClient: avgDealSize,
      initialContributionPerClient: avgDealSize * 0.4,
      totalYear1Contribution: avgDealSize * 0.4 * closed,
      revenueROAS: (avgDealSize * closed) / (blendedCAC * closed),
      contributionROAS: (avgDealSize * 0.4 * closed) / (blendedCAC * closed),
      ltvRevenue: ltv / 0.4,
      ltvContribution: ltv,
      ltvToCacMarketing: ltv / blendedCAC,
      ltvToCacFullyLoaded: ltv / (blendedCAC * 2),
      salesVelocity: (closed * avgDealSize) / 12,
      avgSalesCycle: salesCycle,
      grossPipelineValue: 260 * avgDealSize,
      weightedPipelineValue: 260 * avgDealSize * 0.25,
      funnelConversion: (closed / 185_000) * 100,
      clickToClientConversion: 0.309,
    };
  }
}

function getRecurringEngineData(scenario: Scenario) {
  if (scenario === "base") {
    return {
      annualRecurringContribution: 280_000,
      recurringEligibleClients: 52,
      label: "Projected annual recurring contribution entering Year 2",
    };
  }
  return {
    annualRecurringContribution: 385_000,
    recurringEligibleClients: 63,
    label: "Projected annual recurring contribution entering Year 2",
  };
}

export default function ConversionMetricsPage() {
  const scenario: Scenario = "conservative";
  const [currency, setCurrency] = useState<Currency>("USD");
  const [viewMode, setViewMode] = useState<ViewMode>("contribution");
  const [cacMode, setCacMode] = useState<CACMode>("marketing");

  // Service-level recurring projection assumptions
  const [serviceAvgRevenue, setServiceAvgRevenue] = useState<
    Record<ServiceId, number>
  >({
    company: 2500,
    trust: 13000,
    full: 29700,
    licensing: 65000,
    corporate: 3500,
    office: 1500,
    banking: 6500,
  });

  const [serviceClients, setServiceClients] = useState<
    Record<ServiceId, { y1: number; y2: number; y3: number }>
  >({
    company: { y1: 6, y2: 6, y3: 6 },
    trust: { y1: 1, y2: 1, y3: 1 },
    full: { y1: 2, y2: 2, y3: 2 },
    licensing: { y1: 0, y2: 0, y3: 0 },
    corporate: { y1: 4, y2: 4, y3: 4 },
    office: { y1: 2, y2: 2, y3: 2 },
    banking: { y1: 1, y2: 1, y3: 1 },
  });

  const [retentionRate, setRetentionRate] = useState<number>(0.8);
  const [recurringPercent, setRecurringPercent] = useState<number>(0.8);
  const [supplierCostPercent, setSupplierCostPercent] = useState<number>(0.5);
  const [licensingMargin, setLicensingMargin] = useState<number>(0.15);
  const [initialContributionMargin, setInitialContributionMargin] =
    useState<number>(0.4);
  const [evMultiple, setEvMultiple] = useState<number>(7);
  const [newClientGrowthY2, setNewClientGrowthY2] = useState<number>(0.2);
  const [newClientGrowthY3, setNewClientGrowthY3] = useState<number>(0.4);
  const [crossSellRate, setCrossSellRate] = useState<number>(0.3);
  const [avgCrossSellRevenue, setAvgCrossSellRevenue] = useState<number>(5000);
  const [blendedGrossMargin, setBlendedGrossMargin] = useState<number>(0.52);
  const [showAssumptions, setShowAssumptions] = useState<boolean>(true);

  const funnelStages = useMemo(
    () => calculateFunnelStages(scenario),
    [scenario],
  );

  const globalMetrics = useMemo(
    () => calculateGlobalMetrics(scenario, viewMode, cacMode),
    [scenario, viewMode, cacMode],
  );

  // 3-year recurring compounding model (service-level, derived from assumptions)
  const recurringProjection = useMemo(() => {
    const data = YEAR_1_DATA;

    // Per-service recurring contribution per client
    const computeRecurringPerClient = (service: ServiceId): number => {
      const perUnit = serviceAvgRevenue[service] ?? 0;
      if (service === "company" || service === "trust" || service === "full") {
        return (
          perUnit *
          recurringPercent *
          (1 - supplierCostPercent)
        );
      }
      if (service === "licensing") {
        return perUnit * 0.7 * licensingMargin;
      }
      return 0;
    };

    const companyPerClient = computeRecurringPerClient("company");
    const trustPerClient = computeRecurringPerClient("trust");
    const fullPerClient = computeRecurringPerClient("full");
    const licensingPerClient = computeRecurringPerClient("licensing");

    // Totals per year (all services)
    const totalY1 = SERVICE_IDS.reduce(
      (sum, id) => sum + (serviceClients[id]?.y1 ?? 0),
      0,
    );
    const totalY2 = SERVICE_IDS.reduce(
      (sum, id) => sum + (serviceClients[id]?.y2 ?? 0),
      0,
    );
    const totalY3 = SERVICE_IDS.reduce(
      (sum, id) => sum + (serviceClients[id]?.y3 ?? 0),
      0,
    );

    // Recurring base per year (by service)
    const companyY1 = serviceClients.company.y1;
    const trustY1 = serviceClients.trust.y1;
    const fullY1 = serviceClients.full.y1;
    const licensingY1 = serviceClients.licensing.y1;

    const companyY2 = serviceClients.company.y2;
    const trustY2 = serviceClients.trust.y2;
    const fullY2 = serviceClients.full.y2;
    const licensingY2 = serviceClients.licensing.y2;

    const companyY3 = serviceClients.company.y3;
    const trustY3 = serviceClients.trust.y3;
    const fullY3 = serviceClients.full.y3;
    const licensingY3 = serviceClients.licensing.y3;

    const baseY1 =
      companyY1 * companyPerClient +
      trustY1 * trustPerClient +
      fullY1 * fullPerClient +
      licensingY1 * licensingPerClient;

    const baseY2 =
      companyY2 * companyPerClient +
      trustY2 * trustPerClient +
      fullY2 * fullPerClient +
      licensingY2 * licensingPerClient;

    const baseY3 =
      companyY3 * companyPerClient +
      trustY3 * trustPerClient +
      fullY3 * fullPerClient +
      licensingY3 * licensingPerClient;

    // Year 1 / 2 / 3 recurring using cohort retention stack
    const year1Recurring = baseY1;

    const currentYear2Recurring = baseY2;
    const year2Recurring =
      year1Recurring * retentionRate + currentYear2Recurring;

    const currentYear3Recurring = baseY3;
    const year3Recurring =
      year1Recurring * retentionRate * retentionRate +
      baseY2 * retentionRate +
      currentYear3Recurring;

    // CAGR (Year 1 → Year 3)
    const cagr =
      year1Recurring > 0
        ? Math.pow(year3Recurring / year1Recurring, 1 / 2) - 1
        : 0;

    // Enterprise value via EBITDA multiple
    const evYear1 = year1Recurring * evMultiple;
    const evYear2 = year2Recurring * evMultiple;
    const evYear3 = year3Recurring * evMultiple;

    // Capital efficiency per CAC dollar (marketing CAC)
    const totalAdSpend = data.totalAdSpend;
    const capEffYear1 =
      totalAdSpend > 0 ? year1Recurring / totalAdSpend : 0;
    const capEffYear2 =
      totalAdSpend > 0 ? year2Recurring / totalAdSpend : 0;
    const capEffYear3 =
      totalAdSpend > 0 ? year3Recurring / totalAdSpend : 0;

    // Rounded values for display
    const rounded = (v: number) => Math.round(v);
    const year1Rounded = rounded(year1Recurring);
    const year2Rounded = rounded(year2Recurring);
    const year3Rounded = rounded(year3Recurring);

    const year2CohortY1 = rounded(year1Recurring * retentionRate);
    const year2CohortY2 = rounded(currentYear2Recurring);

    const year3CohortY1 = rounded(year1Recurring * retentionRate * retentionRate);
    const year3CohortY2 = rounded(baseY2 * retentionRate);
    const year3CohortY3 = rounded(currentYear3Recurring);

    return {
      year1: year1Rounded,
      year2: year2Rounded,
      year3: year3Rounded,
      cagr,
      cohorts: {
        year1: { year1: year1Rounded, year2: 0, year3: 0 },
        year2: { year1: 0, year2: year2CohortY2, year3: year3CohortY2 },
        year3: { year1: 0, year2: 0, year3: year3CohortY3 },
        perYear: {
          year1: { cohort1: year1Rounded, cohort2: 0, cohort3: 0 },
          year2: {
            cohort1: year2CohortY1,
            cohort2: year2CohortY2,
            cohort3: 0,
          },
          year3: {
            cohort1: year3CohortY1,
            cohort2: year3CohortY2,
            cohort3: year3CohortY3,
          },
        },
      },
      enterpriseValue: {
        year1: evYear1,
        year2: evYear2,
        year3: evYear3,
      },
      capitalEfficiency: {
        year1: capEffYear1,
        year2: capEffYear2,
        year3: capEffYear3,
      },
      totals: { y1: totalY1, y2: totalY2, y3: totalY3 },
      recurringEligibleRatios: {
        y1:
          totalY1 > 0
            ? (companyY1 + trustY1 + fullY1 + licensingY1) / totalY1
            : 0,
        y2:
          totalY2 > 0
            ? (companyY2 + trustY2 + fullY2 + licensingY2) / totalY2
            : 0,
        y3:
          totalY3 > 0
            ? (companyY3 + trustY3 + fullY3 + licensingY3) / totalY3
            : 0,
      },
    };
  }, [
    serviceAvgRevenue,
    serviceClients,
    retentionRate,
    recurringPercent,
    supplierCostPercent,
    licensingMargin,
    initialContributionMargin,
    evMultiple,
    YEAR_1_DATA.totalAdSpend,
  ]);

  const valuationProjection = useMemo(() => {
    const baseNewRevenue = SERVICE_IDS.reduce(
      (sum, id) => sum + (serviceClients[id]?.y1 ?? 0) * (serviceAvgRevenue[id] ?? 0),
      0,
    );

    // New mandate gross profit per year (with growth)
    const newMandateGP_Y1 = baseNewRevenue * blendedGrossMargin;
    const newMandateGP_Y2 = baseNewRevenue * (1 + newClientGrowthY2) * blendedGrossMargin;
    const newMandateGP_Y3 = baseNewRevenue * (1 + newClientGrowthY3) * blendedGrossMargin;

    // Recurring contribution (from existing recurringProjection)
    const recurringGP_Y1 = recurringProjection.year1;
    const recurringGP_Y2 = recurringProjection.year2;
    const recurringGP_Y3 = recurringProjection.year3;

    // Cross-sell expansion (recurring-eligible clients buy additional services)
    const recurringClientsY1 = serviceClients.company.y1 + serviceClients.trust.y1 + serviceClients.full.y1 + serviceClients.licensing.y1;
    const cumulativeRecurringClients_Y2 = recurringClientsY1 + Math.round(recurringClientsY1 * (1 + newClientGrowthY2));
    const cumulativeRecurringClients_Y3 = cumulativeRecurringClients_Y2 + Math.round(recurringClientsY1 * (1 + newClientGrowthY3));

    const crossSellGP_Y1 = 0; // No cross-sell in Year 1
    const crossSellGP_Y2 = Math.round(recurringClientsY1 * crossSellRate * avgCrossSellRevenue * blendedGrossMargin);
    const crossSellGP_Y3 = Math.round(cumulativeRecurringClients_Y2 * crossSellRate * avgCrossSellRevenue * blendedGrossMargin);

    // Total gross profit per year
    const totalGP_Y1 = newMandateGP_Y1 + recurringGP_Y1 + crossSellGP_Y1;
    const totalGP_Y2 = newMandateGP_Y2 + recurringGP_Y2 + crossSellGP_Y2;
    const totalGP_Y3 = newMandateGP_Y3 + recurringGP_Y3 + crossSellGP_Y3;

    // Enterprise value at multiple
    const ev_Y1 = totalGP_Y1 * evMultiple;
    const ev_Y2 = totalGP_Y2 * evMultiple;
    const ev_Y3 = totalGP_Y3 * evMultiple;

    // Total revenue per year (for context)
    const totalRevenue_Y1 = baseNewRevenue;
    const totalRevenue_Y2 = baseNewRevenue * (1 + newClientGrowthY2);
    const totalRevenue_Y3 = baseNewRevenue * (1 + newClientGrowthY3);

    return {
      newMandateGP: { y1: Math.round(newMandateGP_Y1), y2: Math.round(newMandateGP_Y2), y3: Math.round(newMandateGP_Y3) },
      recurringGP: { y1: recurringGP_Y1, y2: recurringGP_Y2, y3: recurringGP_Y3 },
      crossSellGP: { y1: crossSellGP_Y1, y2: crossSellGP_Y2, y3: crossSellGP_Y3 },
      totalGP: { y1: Math.round(totalGP_Y1), y2: Math.round(totalGP_Y2), y3: Math.round(totalGP_Y3) },
      enterpriseValue: { y1: Math.round(ev_Y1), y2: Math.round(ev_Y2), y3: Math.round(ev_Y3) },
      totalRevenue: { y1: Math.round(totalRevenue_Y1), y2: Math.round(totalRevenue_Y2), y3: Math.round(totalRevenue_Y3) },
    };
  }, [
    serviceClients,
    serviceAvgRevenue,
    blendedGrossMargin,
    newClientGrowthY2,
    newClientGrowthY3,
    crossSellRate,
    avgCrossSellRevenue,
    evMultiple,
    recurringProjection,
  ]);

  // Chart data
  const funnelDropOffData = useMemo(() => {
    if (scenario === "conservative") {
      // Use clicks → MQL → SQL → Proposal → Closed (no impressions)
      return [
        { stage: "Clicks", volume: YEAR_1_DATA.totalClicks },
        {
          stage: "MQL",
          volume:
            funnelStages.find((s) => s.id === "leads")?.primaryMetricValue ?? 231,
        },
        {
          stage: "SQL",
          volume:
            funnelStages.find((s) => s.id === "sql")?.primaryMetricValue ?? 115,
        },
        {
          stage: "Proposal",
          volume:
            funnelStages.find((s) => s.id === "proposal")?.primaryMetricValue ??
            69,
        },
        { stage: "Closed", volume: YEAR_1_DATA.totalClosedClients },
      ];
    }
    // For non-conservative scenarios, still show click-level funnel (no impressions)
    return [
      { stage: "Clicks", volume: YEAR_1_DATA.totalClicks },
      { stage: "MQL", volume: 1_850 },
      { stage: "SQL", volume: 740 },
      { stage: "Proposal", volume: 260 },
      { stage: "Closed", volume: 78 },
    ];
  }, [scenario, funnelStages]);

  const revenueForecastData = useMemo(() => {
    return [
      { year: "Year 1", revenue: 110_900 },
      { year: "Year 2", revenue: 212_780 },
      { year: "Year 3", revenue: 315_500 },
      { year: "Year 4", revenue: 539_970 },
      { year: "Year 5", revenue: 672_740 },
    ];
  }, []);

  const cacVsLtvData = useMemo(() => {
    const ltvValues: Record<string, number> = {
      Advisory: 2_000,
      Corporate: 5_000,
      Licensing: 12_000,
      Fiduciary: 15_666,
      Banking: 18_000,
    };

    const marketingCAC = 1_000;
    const fullyLoadedCAC = 2_000;
    const currentCAC = cacMode === "marketing" ? marketingCAC : fullyLoadedCAC;

    return Object.entries(ltvValues).map(([segment, ltv]) => ({
      segment,
      ratio: parseFloat((ltv / currentCAC).toFixed(1)),
    }));
  }, [cacMode]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f7f8fa] text-slate-900">
        <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Boyar Partners
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                Client Acquisition &amp; Conversion Architecture
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Institutional capital efficiency framework across reach, qualification,
                proposals, mandates, and expansion economics.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {/* Scenario label */}
              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Scenario
                </span>
                <span className="rounded-xl bg-slate-900 px-2 py-1 text-[11px] font-medium text-white">
                  Base
                </span>
              </div>

              {/* View Mode Toggle */}
              <div className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  View
                </p>
                <div className="mt-1 flex gap-1.5">
                  {(["revenue", "contribution"] as ViewMode[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setViewMode(opt)}
                      className={`rounded-xl px-2 py-1 text-[11px] font-medium transition ${
                        viewMode === opt
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {opt === "revenue" ? "Revenue" : "Contribution"}
                    </button>
                  ))}
                </div>
              </div>

              {/* CAC Mode Toggle */}
              <div className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  CAC Type
                </p>
                <div className="mt-1 flex gap-1.5">
                  {(["marketing", "fullyLoaded"] as CACMode[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setCacMode(opt)}
                      className={`rounded-xl px-2 py-1 text-[11px] font-medium transition ${
                        cacMode === opt
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {opt === "marketing" ? "Marketing" : "Fully Loaded"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  As of
                </span>
                <span className="text-[11px] font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

              {/* Currency toggle */}
              <div className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Currency
                </p>
                <div className="mt-1 flex gap-1.5">
                  {(["INR", "USD", "EUR"] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`rounded-xl px-2 py-1 text-[11px] font-medium transition ${
                        currency === c
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {currency !== "USD" && (
                  <p className="mt-1 text-[9px] text-slate-400">
                    1 USD = {FX_RATES[currency]} {currency}
                  </p>
                )}
              </div>
            </div>
          </header>

          {/* Top grid: stages + global metrics */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* Funnel stages grid */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Funnel Stages
                </h2>
                {scenario === "conservative" && (
                  <span className="text-xs text-slate-500">
                    Click → Client: {globalMetrics.clickToClientConversion.toFixed(3)}%
                  </span>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {funnelStages.map((stage, index) => (
                  <motion.article
                    key={stage.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.4 }}
                    className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {`Stage ${index + 1}`}
                        </p>
                        <h3 className="mt-1 text-sm font-semibold text-slate-900">
                          {stage.label}
                        </h3>
                        <p className="mt-1 text-[11px] leading-snug text-slate-500">
                          {stage.inputSummary}
                        </p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500">
                        {index <= 1 ? (
                          <IconActivity className="h-4 w-4" />
                        ) : index <= 3 ? (
                          <IconGauge className="h-4 w-4" />
                        ) : (
                          <IconTrendingUp className="h-4 w-4" />
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] text-slate-500">
                          {stage.primaryMetricLabel}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">
                          {stage.id === "expansion"
                            ? `${stage.primaryMetricValue}`
                            : formatCompact(stage.primaryMetricValue)}
                        </p>
                        {stage.secondaryMetrics && (
                          <div className="mt-2 space-y-1 text-[10px] text-slate-500">
                            {Object.entries(stage.secondaryMetrics).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="capitalize">{key}:</span>
                                <span className="font-medium">
                                  {typeof value === "number" && value < 1
                                    ? `${(value * 100).toFixed(1)}%`
                                    : formatCompact(value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        {stage.conversionRate > 0 && (
                          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                            <IconPercent className="h-3 w-3" />
                            <span>{stage.conversionRate.toFixed(1)}% conversion</span>
                          </div>
                        )}
                      </div>

                      {/* Efficiency gauge */}
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <IconTimer className="h-3 w-3" />
                          <span>Efficiency</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${
                                stage.efficiencyScore >= 80
                                  ? "bg-emerald-500"
                                  : stage.efficiencyScore >= 60
                                    ? "bg-amber-400"
                                    : "bg-rose-500"
                              }`}
                              style={{ width: `${stage.efficiencyScore}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-slate-600">
                            {stage.efficiencyScore}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mini trend line */}
                    <div className="mt-4 h-16">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { t: 1, v: stage.primaryMetricValue * 0.7 },
                            { t: 2, v: stage.primaryMetricValue * 0.85 },
                            { t: 3, v: stage.primaryMetricValue },
                          ]}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                            vertical={false}
                          />
                          <XAxis dataKey="t" hide />
                          <YAxis hide />
                          <RechartsTooltip
                            contentStyle={{
                              borderRadius: 8,
                              borderColor: "#e5e7eb",
                              fontSize: 11,
                            }}
                            formatter={(value) => [
                              formatCompact(Number(value ?? 0)),
                              stage.primaryMetricLabel,
                            ]}
                          />
                          <Line
                            type="monotone"
                            dataKey="v"
                            stroke="#1e3a8a"
                            strokeWidth={1.8}
                            dot={false}
                            activeDot={{ r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Global metrics panel */}
            <aside className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Global Metrics
                </h2>
              </div>

              <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] text-slate-500">
                      {cacMode === "marketing" ? "Marketing CAC" : "Fully Loaded CAC"}
                    </p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">
                      {formatCurrency(
                        cacMode === "marketing"
                          ? globalMetrics.blendedMarketingCAC
                          : globalMetrics.blendedFullyLoadedCAC,
                        currency,
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-slate-500">LTV / CAC</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">
                      {(
                        cacMode === "marketing"
                          ? globalMetrics.ltvToCacMarketing
                          : globalMetrics.ltvToCacFullyLoaded
                      ).toFixed(1)}
                      x
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">
                      {viewMode === "revenue" ? "Lifetime Value (Revenue)" : "LTV (Contribution)"}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {formatCurrency(
                        viewMode === "revenue" ? globalMetrics.ltvRevenue : globalMetrics.ltvContribution,
                        currency,
                      )}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">Weighted Pipeline</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {formatCurrency(globalMetrics.weightedPipelineValue, currency)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">Avg. Sales Cycle</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {Math.round(globalMetrics.avgSalesCycle)} days
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">
                      {viewMode === "revenue" ? "Revenue ROAS" : "Contribution ROAS"}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {(viewMode === "revenue" ? globalMetrics.revenueROAS : globalMetrics.contributionROAS).toFixed(1)}
                      x
                    </p>
                  </div>
                </div>
              </div>

              {/* Sales velocity */}
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Sales Velocity
                    </p>
                    <p className="mt-2 text-[11px] text-slate-600">
                      Revenue = (Deals × Avg Deal Size)
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <IconTrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 text-xl font-semibold text-slate-900">
                  {formatCurrency(globalMetrics.salesVelocity, currency)}
                  <span className="ml-1 text-xs font-normal text-slate-500">
                    per month
                  </span>
                </p>
              </div>

              {/* Recurring Engine */}
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Recurring Engine
                    </p>
                    <p className="mt-2 text-[11px] text-slate-600">
                      {scenario === "conservative"
                        ? "Annual Recurring Contribution entering Year 2"
                        : getRecurringEngineData(scenario).label}
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <IconTrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 text-xl font-semibold text-slate-900">
                  {formatCurrency(
                    scenario === "conservative"
                      ? YEAR_1_DATA.annualRecurringContributionYear2
                      : getRecurringEngineData(scenario).annualRecurringContribution,
                    currency,
                  )}
                </p>
                <p className="mt-2 text-[11px] text-slate-500">
                  {scenario === "conservative"
                    ? `${YEAR_1_DATA.recurringEligibleClients} recurring-eligible clients`
                    : `${getRecurringEngineData(scenario).recurringEligibleClients} recurring-eligible clients`}
                </p>
              </div>
            </aside>
          </div>

          {/* Charts row */}
          <section className="grid gap-6 lg:grid-cols-3">
            {/* Funnel drop-off */}
            <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Funnel Drop-off
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Volume retained from reach to closed mandates.
                  </p>
                </div>
                <IconArrowDownRight className="h-4 w-4 text-slate-400" />
              </div>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelDropOffData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />
                    <XAxis dataKey="stage" tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis
                      tickLine={false}
                      tick={{ fontSize: 11 }}
                      tickFormatter={(v) => formatCompact(v)}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        borderRadius: 8,
                        borderColor: "#e5e7eb",
                        fontSize: 11,
                      }}
                      formatter={(value) => [
                        formatCompact(Number(value ?? 0)),
                        "Volume",
                      ]}
                    />
                    <Bar dataKey="volume" radius={[4, 4, 0, 0]} fill="#1e3a8a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            {/* Revenue forecast — Year 1 to Year 5 */}
            <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Revenue Projection
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Five-year revenue trajectory (Year 1 to Year 5).
                  </p>
                </div>
                <IconActivity className="h-4 w-4 text-slate-400" />
              </div>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueForecastData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />
                    <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis
                      tickLine={false}
                      tick={{ fontSize: 11 }}
                      tickFormatter={(v) => formatCurrency(v, currency)}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        borderRadius: 8,
                        borderColor: "#e5e7eb",
                        fontSize: 11,
                      }}
                      formatter={(value) => [
                        formatCurrency(Number(value ?? 0), currency),
                        "Revenue",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#1e3a8a"
                      strokeWidth={2}
                      dot={{ r: 3.5 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    LTV / CAC Ratio
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Capital efficiency by revenue stream ({cacMode === "marketing" ? "Marketing" : "Fully Loaded"} CAC).
                  </p>
                </div>
                <IconGauge className="h-4 w-4 text-slate-400" />
              </div>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cacVsLtvData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="segment" tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis tickLine={false} tick={{ fontSize: 11 }} domain={[0, "auto"]} tickFormatter={(v) => `${v}x`} />
                    <RechartsTooltip
                      contentStyle={{ borderRadius: 8, borderColor: "#e5e7eb", fontSize: 11 }}
                      formatter={(value) => [`${Number(value ?? 0).toFixed(1)}x`, "LTV / CAC"]}
                    />
                    <Bar dataKey="ratio" name="LTV / CAC" radius={[4, 4, 0, 0]} fill="#1e3a8a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </section>

          {/* Recurring Revenue Compounding Model (3-Year Projection) */}
          <section className="mt-8 space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Recurring Revenue Compounding Model (3-Year Projection)
                </h2>
                <p className="mt-2 max-w-2xl text-xs text-slate-600">
                  Cohort-based recurring contribution model showing how advisory mandates
                  compound over a 3-year horizon without increasing CAC.
                </p>
              </div>
            </div>

            {/* Assumptions & KPIs */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              {/* Assumptions card */}
              <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setShowAssumptions((v) => !v)}
                >
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Projection Assumptions
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      Year 1 client base, recurring eligibility, retention and contribution
                      engine inputs.
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {showAssumptions ? "Hide" : "Show"}
                  </span>
                </button>

                {showAssumptions && (
                  <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-[11px]">

                    <label className="space-y-1">
                      <span className="text-slate-500">Annual Retention Rate</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0.6}
                          max={0.95}
                          step={0.01}
                          value={retentionRate}
                          onChange={(e) => setRetentionRate(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="w-12 text-right text-[11px] text-slate-700">
                          {(retentionRate * 100).toFixed(0)}%
                        </span>
                      </div>
                    </label>

                    <label className="space-y-1">
                      <span className="text-slate-500">Recurring % of Initial Revenue</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0.5}
                          max={1}
                          step={0.05}
                          value={recurringPercent}
                          onChange={(e) => setRecurringPercent(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="w-12 text-right text-[11px] text-slate-700">
                          {(recurringPercent * 100).toFixed(0)}%
                        </span>
                      </div>
                    </label>

                    <label className="space-y-1">
                      <span className="text-slate-500">Supplier Cost % on Recurring</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0.3}
                          max={0.7}
                          step={0.05}
                          value={supplierCostPercent}
                          onChange={(e) =>
                            setSupplierCostPercent(Number(e.target.value))
                          }
                          className="flex-1"
                        />
                        <span className="w-12 text-right text-[11px] text-slate-700">
                          {(supplierCostPercent * 100).toFixed(0)}%
                        </span>
                      </div>
                    </label>

                    <label className="space-y-1">
                      <span className="text-slate-500">Initial Contribution Margin</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0.3}
                          max={0.6}
                          step={0.02}
                          value={initialContributionMargin}
                          onChange={(e) =>
                            setInitialContributionMargin(Number(e.target.value))
                          }
                          className="flex-1"
                        />
                        <span className="w-12 text-right text-[11px] text-slate-700">
                          {(initialContributionMargin * 100).toFixed(0)}%
                        </span>
                      </div>
                    </label>

                    <label className="space-y-1">
                      <span className="text-slate-500">EV Multiple (Gross Profit)</span>
                      <div className="flex items-center gap-2">
                        <input type="range" min={3} max={12} step={0.5} value={evMultiple}
                          onChange={(e) => setEvMultiple(Number(e.target.value))} className="flex-1" />
                        <span className="w-10 text-right text-[11px] text-slate-700">{evMultiple.toFixed(1)}x</span>
                      </div>
                    </label>

                    <label className="space-y-1">
                      <span className="text-slate-500">Blended Gross Margin</span>
                      <div className="flex items-center gap-2">
                        <input type="range" min={0.35} max={0.7} step={0.01} value={blendedGrossMargin}
                          onChange={(e) => setBlendedGrossMargin(Number(e.target.value))} className="flex-1" />
                        <span className="w-12 text-right text-[11px] text-slate-700">{(blendedGrossMargin * 100).toFixed(0)}%</span>
                      </div>
                    </label>

                    <label className="space-y-1">
                      <span className="text-slate-500">New Client Growth Y2</span>
                      <div className="flex items-center gap-2">
                        <input type="range" min={0} max={1} step={0.05} value={newClientGrowthY2}
                          onChange={(e) => setNewClientGrowthY2(Number(e.target.value))} className="flex-1" />
                        <span className="w-12 text-right text-[11px] text-slate-700">{(newClientGrowthY2 * 100).toFixed(0)}%</span>
                      </div>
                    </label>

                    <label className="space-y-1">
                      <span className="text-slate-500">New Client Growth Y3</span>
                      <div className="flex items-center gap-2">
                        <input type="range" min={0} max={1.5} step={0.05} value={newClientGrowthY3}
                          onChange={(e) => setNewClientGrowthY3(Number(e.target.value))} className="flex-1" />
                        <span className="w-12 text-right text-[11px] text-slate-700">{(newClientGrowthY3 * 100).toFixed(0)}%</span>
                      </div>
                    </label>

                    <label className="space-y-1">
                      <span className="text-slate-500">Cross-sell Rate (% of recurring clients)</span>
                      <div className="flex items-center gap-2">
                        <input type="range" min={0.1} max={0.6} step={0.05} value={crossSellRate}
                          onChange={(e) => setCrossSellRate(Number(e.target.value))} className="flex-1" />
                        <span className="w-12 text-right text-[11px] text-slate-700">{(crossSellRate * 100).toFixed(0)}%</span>
                      </div>
                    </label>

                    <label className="space-y-1">
                      <span className="text-slate-500">Avg Cross-sell Revenue (USD)</span>
                      <div className="flex items-center gap-2">
                        <input type="range" min={2000} max={15000} step={500} value={avgCrossSellRevenue}
                          onChange={(e) => setAvgCrossSellRevenue(Number(e.target.value))} className="flex-1" />
                        <span className="w-16 text-right text-[11px] text-slate-700">${avgCrossSellRevenue.toLocaleString()}</span>
                      </div>
                    </label>
                  </div>
                )}
              </article>

              {/* KPI tiles */}
              <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  3-Year Recurring Contribution
                </p>
                <div className="mt-3 grid grid-cols-3 gap-3 text-[11px]">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">Year 1</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {formatCurrency(recurringProjection.year1, currency)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">Year 2</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {formatCurrency(recurringProjection.year2, currency)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-slate-500">Year 3</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {formatCurrency(recurringProjection.year3, currency)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px]">
                  <div>
                    <p className="text-slate-500">CAGR (Year 1 → 3)</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {(recurringProjection.cagr * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500">Enterprise Value (Year 3)</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {formatCurrency(valuationProjection.enterpriseValue.y3, currency)}
                    </p>
                  </div>
                </div>
              </article>
            </div>

            {/* Service-level table and client matrix */}
            <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm text-[11px]">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Service Mix & Average Revenue
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Service-level closed clients and average revenue per client driving the recurring engine.
                  </p>
                </div>
                <div className="text-right text-[10px] text-slate-500 space-y-1">
                  <div>
                    Y1 Total:{" "}
                    <span className="font-semibold text-slate-800">
                      {recurringProjection.totals.y1}
                    </span>
                    {" · "}
                    Recurring-eligible:{" "}
                    <span className="font-semibold text-slate-800">
                      {(recurringProjection.recurringEligibleRatios.y1 * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    Y2 Total:{" "}
                    <span className="font-semibold text-slate-800">
                      {recurringProjection.totals.y2}
                    </span>
                    {" · "}
                    Recurring-eligible:{" "}
                    <span className="font-semibold text-slate-800">
                      {(recurringProjection.recurringEligibleRatios.y2 * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    Y3 Total:{" "}
                    <span className="font-semibold text-slate-800">
                      {recurringProjection.totals.y3}
                    </span>
                    {" · "}
                    Recurring-eligible:{" "}
                    <span className="font-semibold text-slate-800">
                      {(recurringProjection.recurringEligibleRatios.y3 * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Service table: Y1 view + avg revenue */}
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-1">
                  <thead>
                    <tr className="text-[10px] text-slate-500">
                      <th className="text-left font-medium">Service Type</th>
                      <th className="text-right font-medium pr-2">Clients (Y1)</th>
                      <th className="text-right font-medium pr-2">
                        Avg Rev / Client ({currency})
                      </th>
                      <th className="text-right font-medium pr-2">Revenue ({currency})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SERVICE_DEFINITIONS.map((service) => {
                      const id = service.id;
                      const clientsY1 = serviceClients[id].y1;
                      const avgRev = serviceAvgRevenue[id] ?? 0;
                      const revenue = clientsY1 * avgRev;
                      return (
                        <tr key={id} className="align-middle">
                          <td className="py-1 text-slate-800">{service.label}</td>
                          <td className="py-1 text-right">
                            <input
                              type="number"
                              min={0}
                              className="w-16 rounded-md border border-gray-200 bg-slate-50 px-2 py-0.5 text-right text-[11px] text-slate-900"
                              value={clientsY1}
                              onChange={(e) =>
                                setServiceClients((prev) => ({
                                  ...prev,
                                  [id]: {
                                    ...prev[id],
                                    y1: Number.isNaN(Number(e.target.value))
                                      ? 0
                                      : Math.max(0, Number(e.target.value)),
                                  },
                                }))
                              }
                            />
                          </td>
                          <td className="py-1 text-right">
                            <input
                              type="number"
                              min={0}
                              className="w-20 rounded-md border border-gray-200 bg-slate-50 px-2 py-0.5 text-right text-[11px] text-slate-900"
                              value={avgRev}
                              onChange={(e) =>
                                setServiceAvgRevenue((prev) => ({
                                  ...prev,
                                  [id]: Number.isNaN(Number(e.target.value))
                                    ? 0
                                    : Math.max(0, Number(e.target.value)),
                                }))
                              }
                            />
                          </td>
                          <td className="py-1 text-right text-slate-800">
                            {formatCurrency(revenue, currency)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Service × year matrix for client counts */}
              <div className="mt-4 border-t border-gray-100 pt-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Service Clients by Year
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-1">
                    <thead>
                      <tr className="text-[10px] text-slate-500">
                        <th className="text-left font-medium">Service</th>
                        <th className="text-right font-medium pr-2">Y1</th>
                        <th className="text-right font-medium pr-2">Y2</th>
                        <th className="text-right font-medium pr-2">Y3</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SERVICE_DEFINITIONS.map((service) => {
                        const id = service.id;
                        const row = serviceClients[id];
                        return (
                          <tr key={id} className="align-middle">
                            <td className="py-1 text-slate-800">{service.label}</td>
                            <td className="py-1 text-right">
                              <input
                                type="number"
                                min={0}
                                className="w-16 rounded-md border border-gray-200 bg-slate-50 px-2 py-0.5 text-right text-[11px] text-slate-900"
                                value={row.y1}
                                onChange={(e) =>
                                  setServiceClients((prev) => ({
                                    ...prev,
                                    [id]: {
                                      ...prev[id],
                                      y1: Number.isNaN(Number(e.target.value))
                                        ? 0
                                        : Math.max(0, Number(e.target.value)),
                                    },
                                  }))
                                }
                              />
                            </td>
                            <td className="py-1 text-right">
                              <input
                                type="number"
                                min={0}
                                className="w-16 rounded-md border border-gray-200 bg-slate-50 px-2 py-0.5 text-right text-[11px] text-slate-900"
                                value={row.y2}
                                onChange={(e) =>
                                  setServiceClients((prev) => ({
                                    ...prev,
                                    [id]: {
                                      ...prev[id],
                                      y2: Number.isNaN(Number(e.target.value))
                                        ? 0
                                        : Math.max(0, Number(e.target.value)),
                                    },
                                  }))
                                }
                              />
                            </td>
                            <td className="py-1 text-right">
                              <input
                                type="number"
                                min={0}
                                className="w-16 rounded-md border border-gray-200 bg-slate-50 px-2 py-0.5 text-right text-[11px] text-slate-900"
                                value={row.y3}
                                onChange={(e) =>
                                  setServiceClients((prev) => ({
                                    ...prev,
                                    [id]: {
                                      ...prev[id],
                                      y3: Number.isNaN(Number(e.target.value))
                                        ? 0
                                        : Math.max(0, Number(e.target.value)),
                                    },
                                  }))
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            {/* Charts: Recurring & Valuation & Capital Efficiency */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Recurring contribution growth line chart */}
              <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Recurring Contribution Growth
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Year 1 to Year 3 recurring contribution trajectory.
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        {
                          year: "Year 1",
                          recurring: recurringProjection.year1,
                        },
                        {
                          year: "Year 2",
                          recurring: recurringProjection.year2,
                        },
                        {
                          year: "Year 3",
                          recurring: recurringProjection.year3,
                        },
                      ]}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        vertical={false}
                      />
                      <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 11 }} />
                      <YAxis
                        tickLine={false}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v) => formatCurrency(v, currency)}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          borderRadius: 8,
                          borderColor: "#e5e7eb",
                          fontSize: 11,
                        }}
                        formatter={(value) => [
                          formatCurrency(Number(value ?? 0), currency),
                          "Recurring Contribution",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="recurring"
                        stroke="#1e3a8a"
                        strokeWidth={1.8}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </article>

              {/* Cohort stacked bar chart */}
              <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Cohort Contribution by Year
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Stacked view of recurring contribution by originating cohort.
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          year: "Year 1",
                          cohort1:
                            recurringProjection.cohorts.perYear.year1.cohort1,
                          cohort2:
                            recurringProjection.cohorts.perYear.year1.cohort2,
                          cohort3:
                            recurringProjection.cohorts.perYear.year1.cohort3,
                        },
                        {
                          year: "Year 2",
                          cohort1:
                            recurringProjection.cohorts.perYear.year2.cohort1,
                          cohort2:
                            recurringProjection.cohorts.perYear.year2.cohort2,
                          cohort3:
                            recurringProjection.cohorts.perYear.year2.cohort3,
                        },
                        {
                          year: "Year 3",
                          cohort1:
                            recurringProjection.cohorts.perYear.year3.cohort1,
                          cohort2:
                            recurringProjection.cohorts.perYear.year3.cohort2,
                          cohort3:
                            recurringProjection.cohorts.perYear.year3.cohort3,
                        },
                      ]}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        vertical={false}
                      />
                      <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 11 }} />
                      <YAxis
                        tickLine={false}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v) => formatCurrency(v, currency)}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          borderRadius: 8,
                          borderColor: "#e5e7eb",
                          fontSize: 11,
                        }}
                        formatter={(value, name) => [
                          formatCurrency(Number(value ?? 0), currency),
                          name === "cohort1"
                            ? "Year 1 Cohort"
                            : name === "cohort2"
                              ? "Year 2 Cohort"
                              : "Year 3 Cohort",
                        ]}
                      />
                      <Bar
                        dataKey="cohort1"
                        stackId="cohorts"
                        radius={[4, 4, 0, 0]}
                        fill="#1e3a8a"
                      />
                      <Bar
                        dataKey="cohort2"
                        stackId="cohorts"
                        radius={[0, 0, 0, 0]}
                        fill="#64748b"
                      />
                      <Bar
                        dataKey="cohort3"
                        stackId="cohorts"
                        radius={[0, 0, 4, 4]}
                        fill="#94a3b8"
                        fillOpacity={0.8}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>

              {/* Valuation & capital efficiency */}
              <article className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                {/* Enterprise Valuation — Sum of Parts */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Enterprise Valuation — Sum of Parts
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Gross profit multiple at {evMultiple.toFixed(1)}x across all value drivers.
                  </p>

                  {/* GP component breakdown tiles */}
                  <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                    <div className="rounded-lg bg-blue-50 p-2">
                      <p className="text-slate-500">New Mandates GP</p>
                      <p className="mt-1 text-xs font-semibold text-slate-900">
                        {formatCurrency(valuationProjection.newMandateGP.y3, currency)}
                      </p>
                      <p className="text-[9px] text-slate-400">Year 3</p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-2">
                      <p className="text-slate-500">Recurring GP</p>
                      <p className="mt-1 text-xs font-semibold text-slate-900">
                        {formatCurrency(valuationProjection.recurringGP.y3, currency)}
                      </p>
                      <p className="text-[9px] text-slate-400">Year 3</p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-2">
                      <p className="text-slate-500">Cross-sell GP</p>
                      <p className="mt-1 text-xs font-semibold text-slate-900">
                        {formatCurrency(valuationProjection.crossSellGP.y3, currency)}
                      </p>
                      <p className="text-[9px] text-slate-400">Year 3</p>
                    </div>
                  </div>

                  {/* EV line chart */}
                  <div className="mt-3 h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { year: "Year 1", ev: valuationProjection.enterpriseValue.y1 },
                          { year: "Year 2", ev: valuationProjection.enterpriseValue.y2 },
                          { year: "Year 3", ev: valuationProjection.enterpriseValue.y3 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 11 }} />
                        <YAxis tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(v) => formatCurrency(v, currency)} />
                        <RechartsTooltip
                          contentStyle={{ borderRadius: 8, borderColor: "#e5e7eb", fontSize: 11 }}
                          formatter={(value) => [formatCurrency(Number(value ?? 0), currency), "Enterprise Value"]}
                        />
                        <Line type="monotone" dataKey="ev" stroke="#0f172a" strokeWidth={1.8} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <div>
                      <p className="text-slate-500">Year 3 Total GP</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {formatCurrency(valuationProjection.totalGP.y3, currency)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-500">Year 3 EV ({evMultiple.toFixed(1)}x GP)</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {formatCurrency(valuationProjection.enterpriseValue.y3, currency)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stacked GP composition chart */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Gross Profit Composition
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Value drivers stacked across the 3-year horizon.
                  </p>
                  <div className="mt-3 h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          {
                            year: "Year 1",
                            newMandates: valuationProjection.newMandateGP.y1,
                            recurring: valuationProjection.recurringGP.y1,
                            crossSell: valuationProjection.crossSellGP.y1,
                          },
                          {
                            year: "Year 2",
                            newMandates: valuationProjection.newMandateGP.y2,
                            recurring: valuationProjection.recurringGP.y2,
                            crossSell: valuationProjection.crossSellGP.y2,
                          },
                          {
                            year: "Year 3",
                            newMandates: valuationProjection.newMandateGP.y3,
                            recurring: valuationProjection.recurringGP.y3,
                            crossSell: valuationProjection.crossSellGP.y3,
                          },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 11 }} />
                        <YAxis tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(v) => formatCurrency(v, currency)} />
                        <RechartsTooltip
                          contentStyle={{ borderRadius: 8, borderColor: "#e5e7eb", fontSize: 11 }}
                          formatter={(value, name) => [
                            formatCurrency(Number(value ?? 0), currency),
                            name === "newMandates" ? "New Mandates" : name === "recurring" ? "Recurring" : "Cross-sell",
                          ]}
                        />
                        <Bar dataKey="newMandates" stackId="gp" radius={[0, 0, 0, 0]} fill="#1e3a8a" />
                        <Bar dataKey="recurring" stackId="gp" radius={[0, 0, 0, 0]} fill="#0f766e" />
                        <Bar dataKey="crossSell" stackId="gp" radius={[4, 4, 0, 0]} fill="#d97706" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}

