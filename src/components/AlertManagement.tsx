"use client"
import React, { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type Severity = "High" | "Medium" | "Low";
type Source   = "Inventory" | "Machine" | "Job" | "Labour";
type Status   = "open" | "acknowledged";

interface Alert {
  id: number;
  title: string;
  source: Source;
  severity: Severity;
  timeToImpact: string;
  timeAgo: string;
  status: Status;
}

// ── Static Data ────────────────────────────────────────────────────────────
const alerts: Alert[] = [
  { id: 1, title: "Material shortage detected for JOB-0852", source: "Inventory", severity: "High",   timeToImpact: "2 hours", timeAgo: "5 min ago",   status: "open"         },
  { id: 2, title: "CNC-03 maintenance due soon",             source: "Machine",   severity: "Medium", timeToImpact: "2 days",  timeAgo: "1 hour ago",  status: "open"         },
  { id: 3, title: "Delayed delivery expected for TechCorp",  source: "Job",       severity: "High",   timeToImpact: "1 day",   timeAgo: "2 hours ago", status: "open"         },
  { id: 4, title: "Labour shortage on second shift",         source: "Labour",    severity: "Medium", timeToImpact: "8 hours", timeAgo: "3 hours ago", status: "open"         },
  { id: 5, title: "Low stock: Hydraulic Oil Grade 68",       source: "Inventory", severity: "High",   timeToImpact: "3 days",  timeAgo: "4 hours ago", status: "acknowledged" },
  { id: 6, title: "LATHE-02 idle for 4 hours",               source: "Machine",   severity: "Low",    timeToImpact: "-",       timeAgo: "5 hours ago", status: "open"         },
  { id: 7, title: "Quality check failed for JOB-0843",       source: "Job",       severity: "High",   timeToImpact: "1 hour",  timeAgo: "6 hours ago", status: "open"         },
  { id: 8, title: "Vendor delivery delay: SteelCo",          source: "Inventory", severity: "Medium", timeToImpact: "2 days",  timeAgo: "7 hours ago", status: "acknowledged" },
];

// ── Config ─────────────────────────────────────────────────────────────────
const severityConfig: Record<Severity, { icon: React.ReactNode; iconColor: string; borderColor: string; bgColor: string }> = {
  High: {
    iconColor: "text-error",
    borderColor: "border-error/25",
    bgColor: "bg-error/5",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  Medium: {
    iconColor: "text-warning",
    borderColor: "border-warning/25",
    bgColor: "bg-warning/5",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  Low: {
    iconColor: "text-info",
    borderColor: "border-info/25",
    bgColor: "bg-info/5",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

const statusBadge: Record<Status, string> = {
  open:         "badge-error badge-outline",
  acknowledged: "badge-ghost",
};

const severityBadge: Record<Severity, string> = {
  High:   "text-error font-semibold",
  Medium: "text-warning font-semibold",
  Low:    "text-info font-semibold",
};

// ── Alert Card ─────────────────────────────────────────────────────────────
const AlertCard: React.FC<{ alert: Alert }> = ({ alert }) => {
  const cfg = severityConfig[alert.severity];

  return (
    <div
      className={`flex items-start gap-4 rounded-xl border ${cfg.borderColor} ${cfg.bgColor} px-5 py-4 transition-shadow hover:shadow-sm`}
    >
      {/* Icon */}
      <span className={`mt-0.5 flex-shrink-0 ${cfg.iconColor}`}>{cfg.icon}</span>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-base-content leading-snug">{alert.title}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-base-content/55">
          <span>
            Source: <span className="font-semibold text-base-content/80">{alert.source}</span>
          </span>
          <span>
            Severity:{" "}
            <span className={severityBadge[alert.severity]}>{alert.severity}</span>
          </span>
          <span>
            Time to Impact:{" "}
            <span className="font-semibold text-base-content/80">{alert.timeToImpact}</span>
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className={`badge badge-sm ${statusBadge[alert.status]} capitalize`}>
          {alert.status}
        </span>
        <span className="text-xs text-base-content/40">{alert.timeAgo}</span>
      </div>
    </div>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────
const AlertManagement: React.FC = () => {
  const [severityFilter, setSeverityFilter] = useState<Severity | "All">("All");
  const [sourceFilter,   setSourceFilter]   = useState<Source   | "All">("All");

  const filtered = alerts.filter((a) => {
    const bySeverity = severityFilter === "All" || a.severity === severityFilter;
    const bySource   = sourceFilter   === "All" || a.source   === sourceFilter;
    return bySeverity && bySource;
  });

  return (
    <div className="min-h-screen bg-base-100 font-sans" data-theme="light">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content">Alert Management</h1>
          <p className="text-sm text-base-content/50 mt-1">
            Monitor and manage system alerts by severity and source
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-base-200 bg-base-100 px-4 py-3">
          {/* Filter icon + label */}
          <span className="flex items-center gap-2 text-sm text-base-content/60 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters:
          </span>

          {/* Severity */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-base-content/60">Severity:</label>
            <select
              className="select select-sm select-bordered"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as Severity | "All")}
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Source */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-base-content/60">Source:</label>
            <select
              className="select select-sm select-bordered"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value as Source | "All")}
            >
              <option value="All">All</option>
              <option value="Inventory">Inventory</option>
              <option value="Machine">Machine</option>
              <option value="Job">Job</option>
              <option value="Labour">Labour</option>
            </select>
          </div>

          {/* Count */}
          <span className="ml-auto text-sm text-base-content/45">
            Showing {filtered.length} of {alerts.length} alerts
          </span>
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((alert) => <AlertCard key={alert.id} alert={alert} />)
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-base-content/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium">No alerts match the selected filters</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AlertManagement;
