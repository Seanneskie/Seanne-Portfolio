"use client";

import type { JSX } from "react";
import { memo, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Metric {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly change?: string;
  readonly positive?: boolean;
  readonly helperText?: string;
}

interface Highlight {
  readonly title: string;
  readonly description: string;
  readonly status: "stable" | "improving" | "attention";
}

interface TrendMetric {
  readonly label: string;
  readonly baseline: string;
  readonly delta: string;
  readonly isPositive: boolean;
  readonly narrative: string;
}

interface SparkPoint {
  readonly month: string;
  readonly total: number;
}

interface ExportTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly format: "PDF" | "Excel" | "CSV";
  readonly cadence: string;
  readonly lastGenerated: string;
}

interface ActivityItem {
  readonly id: string;
  readonly time: string;
  readonly title: string;
  readonly detail: string;
  readonly status: "synced" | "exported" | "generated" | "warning";
}

type TabId = "overview" | "performance" | "exports" | "activity";

interface TabDefinition {
  readonly id: TabId;
  readonly label: string;
  readonly description: string;
}

const TAB_DEFINITIONS: readonly TabDefinition[] = [
  {
    id: "overview",
    label: "Overview",
    description: "High-level reporting performance and submission coverage for the current quarter.",
  },
  {
    id: "performance",
    label: "Performance",
    description: "Trends across submission cadence, timeliness, and review completion rates.",
  },
  {
    id: "exports",
    label: "Exports",
    description: "Reusable export templates for finance, compliance, and executive reporting.",
  },
  {
    id: "activity",
    label: "Activity",
    description: "Latest automation events and manual interventions logged by the workspace.",
  },
] as const satisfies readonly TabDefinition[];

const TAB_IDS = new Set<TabId>(TAB_DEFINITIONS.map((tab) => tab.id));

const OVERVIEW_METRICS: readonly Metric[] = [
  {
    id: "reports",
    label: "Total Reports",
    value: "128",
    change: "+12% vs last quarter",
    positive: true,
    helperText: "Automations generated 64 of these reports.",
  },
  {
    id: "on-time",
    label: "On-Time Rate",
    value: "94.2%",
    change: "+4.1 pts",
    positive: true,
    helperText: "Service level objective is 92%.",
  },
  {
    id: "review",
    label: "Review Completion",
    value: "87%",
    change: "-3 pts",
    positive: false,
    helperText: "Finance review queue caught up yesterday.",
  },
];

const OVERVIEW_HIGHLIGHTS: readonly Highlight[] = [
  {
    title: "Automated ingestion",
    description: "Three new divisions are feeding daily ledger snapshots through the Supabase listener.",
    status: "improving",
  },
  {
    title: "Variance monitoring",
    description: "Two anomalies flagged in Q2 Week 4; both acknowledged and resolved within the SLA.",
    status: "stable",
  },
  {
    title: "Data freshness",
    description: "Latest sync completed 14 minutes ago. Inventory aging remains within the 6-hour target window.",
    status: "improving",
  },
];

const PERFORMANCE_SERIES: readonly SparkPoint[] = [
  { month: "Jan", total: 96 },
  { month: "Feb", total: 104 },
  { month: "Mar", total: 112 },
  { month: "Apr", total: 121 },
  { month: "May", total: 118 },
  { month: "Jun", total: 128 },
];

const PERFORMANCE_TRENDS: readonly TrendMetric[] = [
  {
    label: "Submission cadence",
    baseline: "Weekly",
    delta: "+8.3%",
    isPositive: true,
    narrative: "Teams are consistently landing before the Thursday 5 PM cutoff.",
  },
  {
    label: "Exception handling",
    baseline: "16 cases",
    delta: "-5",
    isPositive: true,
    narrative: "Automated reconciliation closed most of the prior backlog.",
  },
  {
    label: "Review cycle time",
    baseline: "14h 12m",
    delta: "+1h",
    isPositive: false,
    narrative: "Two manual audits stretched the average turnaround this week.",
  },
];

const PERFORMANCE_PROGRESS: readonly { label: string; value: number; helper: string }[] = [
  {
    label: "On-time submissions",
    value: 92,
    helper: "Goal: ≥ 90% submissions before the SLA",
  },
  {
    label: "Reviewer utilization",
    value: 68,
    helper: "Coverage across finance reviewers for the past 7 days",
  },
  {
    label: "Automation coverage",
    value: 74,
    helper: "Percent of reports generated without manual steps",
  },
];

const EXPORT_TEMPLATES: readonly ExportTemplate[] = [
  {
    id: "finance-quarterly",
    name: "Quarterly finance package",
    description: "Consolidated P&L, burn-down charts, and variance tables for CFO review.",
    format: "PDF",
    cadence: "Scheduled every 15th",
    lastGenerated: "June 15, 9:42 AM",
  },
  {
    id: "compliance-audit",
    name: "Compliance audit trail",
    description: "Full submission log with reviewer notes and attachment manifest.",
    format: "Excel",
    cadence: "On demand",
    lastGenerated: "June 24, 2:18 PM",
  },
  {
    id: "executive-digest",
    name: "Executive weekly digest",
    description: "High-level KPIs and annotated highlights for leadership stand-ups.",
    format: "PDF",
    cadence: "Every Monday 8 AM",
    lastGenerated: "June 23, 8:01 AM",
  },
];

const ACTIVITY_FEED: readonly ActivityItem[] = [
  {
    id: "sync-1",
    time: "10:42 AM",
    title: "Ledger sync completed",
    detail: "Finance warehouse ingestion finished in 2m 14s (Supabase edge function).",
    status: "synced",
  },
  {
    id: "export-1",
    time: "9:55 AM",
    title: "Generated quarterly finance package",
    detail: "Delivered to CFO distribution list with 4 attachments.",
    status: "exported",
  },
  {
    id: "generator-1",
    time: "8:16 AM",
    title: "Weekly executive digest drafted",
    detail: "Auto-populated 6 insights; 2 flagged for manual review.",
    status: "generated",
  },
  {
    id: "warning-1",
    time: "Yesterday",
    title: "Variance threshold alert",
    detail: "Ops expense line item exceeded tolerance by 7.8%. Investigation underway.",
    status: "warning",
  },
];

const STATUS_STYLES: Record<ActivityItem["status"], string> = {
  synced: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200",
  exported: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
  generated: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  warning: "bg-amber-100 text-amber-900 dark:bg-amber-900/45 dark:text-amber-200",
};

const HIGHLIGHT_BADGE: Record<Highlight["status"], string> = {
  stable: "bg-slate-100 text-slate-800 dark:bg-slate-900/50 dark:text-slate-100",
  improving: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  attention: "bg-amber-100 text-amber-900 dark:bg-amber-900/45 dark:text-amber-100",
};

/**
 * Example usage:
 * ```tsx
 * import DesignWireReportTabs from "@/components/design-wire/design-wire-report-tabs";
 *
 * export default function ReportPreview(): JSX.Element {
 *   return (
 *     <section className="container mx-auto max-w-5xl px-4 py-12">
 *       <DesignWireReportTabs />
 *     </section>
 *   );
 * }
 * ```
 */
function DesignWireReportTabsComponent(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const sparklinePoints = useMemo(() => {
    return buildSparklinePoints(PERFORMANCE_SERIES);
  }, []);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(next) => {
        if (TAB_IDS.has(next as TabId)) {
          setActiveTab(next as TabId);
        }
      }}
      className="w-full space-y-6"
    >
      <TabsList className="flex w-full flex-wrap justify-start gap-2 bg-transparent p-0">
        {TAB_DEFINITIONS.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
            }}
            className="rounded-xl border border-teal-200/60 bg-white/80 px-4 py-2 text-sm text-teal-900 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-teal-500/60 dark:border-teal-800/60 dark:bg-gray-950/50 dark:text-teal-100"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {TAB_DEFINITIONS.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-xl font-semibold text-teal-900 dark:text-teal-200">
              {tab.label}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">{tab.description}</p>
          </header>

          {tab.id === "overview" ? (
            <OverviewSection />
          ) : null}

          {tab.id === "performance" ? (
            <PerformanceSection sparklinePoints={sparklinePoints} />
          ) : null}

          {tab.id === "exports" ? <ExportsSection /> : null}

          {tab.id === "activity" ? <ActivitySection /> : null}
        </TabsContent>
      ))}
    </Tabs>
  );
}

function OverviewSection(): JSX.Element {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {OVERVIEW_METRICS.map((metric) => (
          <Card
            key={metric.id}
            className="relative overflow-hidden rounded-2xl border border-teal-200/70 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-teal-900/60 dark:bg-gray-950/50"
          >
            <div className="space-y-2">
              <p className="text-sm font-medium text-teal-700 dark:text-teal-200">
                {metric.label}
              </p>
              <p className="text-3xl font-semibold text-teal-900 dark:text-teal-50">
                {metric.value}
              </p>
              {metric.change ? (
                <Badge
                  variant="secondary"
                  className={cn(
                    "w-fit rounded-full border border-transparent px-3 py-1 text-xs font-semibold",
                    metric.positive
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                      : "bg-amber-100 text-amber-900 dark:bg-amber-900/45 dark:text-amber-100",
                  )}
                >
                  {metric.change}
                </Badge>
              ) : null}
              {metric.helperText ? (
                <p className="text-xs text-gray-600 dark:text-gray-400">{metric.helperText}</p>
              ) : null}
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-teal-400/20 blur-2xl"
            />
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border border-teal-200/70 bg-white/90 p-6 shadow-sm dark:border-teal-900/60 dark:bg-gray-950/50">
        <div className="grid gap-6 md:grid-cols-3">
          {OVERVIEW_HIGHLIGHTS.map((item) => (
            <div key={item.title} className="space-y-3">
              <Badge
                variant="outline"
                className={cn(
                  "w-fit rounded-full border border-transparent px-3 py-1 text-xs font-semibold",
                  HIGHLIGHT_BADGE[item.status],
                )}
              >
                {item.status === "improving" ? "Improving" : item.status === "stable" ? "Stable" : "Needs attention"}
              </Badge>
              <h3 className="text-base font-semibold text-teal-900 dark:text-teal-200">{item.title}</h3>
              <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

interface PerformanceSectionProps {
  readonly sparklinePoints: string;
}

function PerformanceSection({ sparklinePoints }: PerformanceSectionProps): JSX.Element {
  return (
    <section className="space-y-6">
      <Card className="rounded-2xl border border-teal-200/70 bg-white/90 p-6 shadow-sm dark:border-teal-900/60 dark:bg-gray-950/50">
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-teal-900 dark:text-teal-200">
                  Submission volume trend
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Rolling 6-month cadence of generated and manual reports.
                </p>
              </div>
              <Badge className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-900/40 dark:text-teal-200">
                +7.9% YoY
              </Badge>
            </div>
            <figure className="rounded-2xl border border-dashed border-teal-200/60 bg-gradient-to-br from-teal-50 via-white to-sky-50 p-4 dark:border-teal-900/40 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
              <svg
                viewBox="0 0 100 40"
                role="img"
                aria-label="Monthly submission volume sparkline"
                className="h-40 w-full text-teal-500"
              >
                <polyline
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  points={sparklinePoints}
                />
              </svg>
              <figcaption className="mt-2 flex justify-between text-xs text-gray-600 dark:text-gray-400">
                {PERFORMANCE_SERIES.map((point) => (
                  <span key={point.month}>{point.month}</span>
                ))}
              </figcaption>
            </figure>
          </div>

          <div className="space-y-4">
            {PERFORMANCE_PROGRESS.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2 overflow-hidden rounded-full bg-teal-100 dark:bg-teal-900/40" />
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.helper}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {PERFORMANCE_TRENDS.map((trend) => (
          <Card
            key={trend.label}
            className="rounded-2xl border border-teal-200/70 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-teal-900/60 dark:bg-gray-950/50"
          >
            <p className="text-sm font-semibold text-teal-800 dark:text-teal-200">{trend.label}</p>
            <p className="mt-1 text-2xl font-bold text-teal-900 dark:text-white">{trend.baseline}</p>
            <Badge
              variant="secondary"
              className={cn(
                "mt-3 w-fit rounded-full border border-transparent px-3 py-1 text-xs font-semibold",
                trend.isPositive
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                  : "bg-amber-100 text-amber-900 dark:bg-amber-900/45 dark:text-amber-100",
              )}
            >
              {trend.delta}
            </Badge>
            <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">{trend.narrative}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ExportsSection(): JSX.Element {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {EXPORT_TEMPLATES.map((template) => (
        <Card
          key={template.id}
          className="flex h-full flex-col justify-between rounded-2xl border border-teal-200/70 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-teal-900/60 dark:bg-gray-950/50"
        >
          <div className="space-y-3">
            <Badge className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-900/40 dark:text-teal-200">
              {template.format}
            </Badge>
            <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">{template.name}</h3>
            <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">{template.description}</p>
          </div>
          <div className="mt-6 space-y-3 text-xs text-gray-600 dark:text-gray-400">
            <p>
              <strong className="font-semibold text-teal-800 dark:text-teal-200">Cadence:</strong> {template.cadence}
            </p>
            <p>
              <strong className="font-semibold text-teal-800 dark:text-teal-200">Last generated:</strong> {template.lastGenerated}
            </p>
            <Button
              type="button"
              variant="secondary"
              className="w-full rounded-full border border-teal-200 bg-white/90 text-teal-800 hover:border-teal-300 hover:text-teal-900 focus-visible:ring-2 focus-visible:ring-teal-500/60 dark:border-teal-800 dark:bg-gray-950/50 dark:text-teal-200"
            >
              Generate now
            </Button>
          </div>
        </Card>
      ))}
    </section>
  );
}

function ActivitySection(): JSX.Element {
  return (
    <section>
      <Card className="rounded-2xl border border-teal-200/70 bg-white/90 p-6 shadow-sm dark:border-teal-900/60 dark:bg-gray-950/50">
        <ol className="space-y-4">
          {ACTIVITY_FEED.map((activity) => (
            <li key={activity.id} className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-teal-200/70 bg-white dark:border-teal-900/40 dark:bg-gray-950/60">
                <span className="text-xs font-semibold text-teal-800 dark:text-teal-100">{activity.time}</span>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-teal-900 dark:text-teal-200">{activity.title}</h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full border border-transparent px-3 py-1 text-xs font-semibold",
                      STATUS_STYLES[activity.status],
                    )}
                  >
                    {formatStatusLabel(activity.status)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{activity.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </section>
  );
}

function buildSparklinePoints(points: readonly SparkPoint[]): string {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    const singleX = 50;
    const singleY = 50;
    return `${singleX},${singleY}`;
  }

  const totals = points.map((point) => point.total);
  const max = Math.max(...totals);
  const min = Math.min(...totals);
  const range = max - min || 1;

  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const normalized = (point.total - min) / range;
      const y = 100 - normalized * 100;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function formatStatusLabel(status: ActivityItem["status"]): string {
  switch (status) {
    case "synced":
      return "Sync";
    case "exported":
      return "Export";
    case "generated":
      return "Generated";
    case "warning":
      return "Attention";
    default:
      return status;
  }
}

const DesignWireReportTabs = memo(DesignWireReportTabsComponent);
DesignWireReportTabs.displayName = "DesignWireReportTabs";

export default DesignWireReportTabs;
export { buildSparklinePoints, formatStatusLabel };
