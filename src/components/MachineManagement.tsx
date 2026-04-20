"use client"
import React, { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type MachineStatus = "online" | "fault" | "idle";

interface Machine {
  id: string;
  jobId: string | null;
  utilization: number;    // 0–100
  runtimeHours: number;
  status: MachineStatus;
}

// ── Static Data ────────────────────────────────────────────────────────────
const machines: Machine[] = [
  { id: "CNC-01",   jobId: "JOB-0845", utilization: 92, runtimeHours: 7.5, status: "online" },
  { id: "CNC-02",   jobId: "JOB-0839", utilization: 87, runtimeHours: 6.8, status: "online" },
  { id: "CNC-03",   jobId: "JOB-0847", utilization: 45, runtimeHours: 3.2, status: "fault"  },
  { id: "LATHE-01", jobId: "JOB-0842", utilization: 95, runtimeHours: 8.1, status: "online" },
  { id: "LATHE-02", jobId: null,        utilization: 0,  runtimeHours: 0,   status: "idle"   },
  { id: "MILL-01",  jobId: "JOB-0851", utilization: 78, runtimeHours: 5.9, status: "online" },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const statusConfig: Record<MachineStatus, {
  dot:    string;
  border: string;
  bg:     string;
  label:  string;
  badge:  string;
}> = {
  online: {
    dot:    "bg-success",
    border: "border-success/30",
    bg:     "bg-success/5",
    label:  "Online",
    badge:  "badge-success",
  },
  fault: {
    dot:    "bg-error",
    border: "border-error/30",
    bg:     "bg-error/5",
    label:  "Fault",
    badge:  "badge-error",
  },
  idle: {
    dot:    "bg-warning",
    border: "border-warning/30",
    bg:     "bg-warning/5",
    label:  "Idle",
    badge:  "badge-warning",
  },
};

const utilizationBarColor = (pct: number): string => {
  if (pct >= 80) return "progress-success";
  if (pct >= 50) return "progress-warning";
  return "progress-error";
};

const formatRuntime = (h: number): string =>
  h === 0 ? "0h" : `${h}h`;



// ── Machine Card ───────────────────────────────────────────────────────────
const MachineCard: React.FC<{ machine: Machine }> = ({ machine }) => {
  const cfg = statusConfig[machine.status];

  return (
    <div
      className={`card border-2 ${cfg.border} ${cfg.bg} shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}
    >
      <div className="card-body p-5 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-base-content">
              {machine.id}
            </h3>
            <p className="text-sm text-base-content/50 mt-0.5">
              {machine.jobId ?? <span className="italic">No active job</span>}
            </p>
          </div>
          <span
            className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ring-4 ${
              machine.status === "online"
                ? "bg-success ring-success/20"
                : machine.status === "fault"
                ? "bg-error ring-error/20"
                : "bg-warning ring-warning/20"
            }`}
          />
        </div>

        {/* Utilization */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-base-content/60 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Utilization
            </span>
            <span className="text-sm font-bold text-base-content">
              {machine.utilization}%
            </span>
          </div>
          <progress
            className={`progress w-full h-2 ${utilizationBarColor(machine.utilization)}`}
            value={machine.utilization}
            max={100}
          />
        </div>

        {/* Runtime */}
        <div className="flex items-center justify-between pt-1 border-t border-base-200">
          <span className="text-xs text-base-content/50 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Runtime Today
          </span>
          <span className="text-sm font-bold text-base-content">
            {formatRuntime(machine.runtimeHours)}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Summary Bar ────────────────────────────────────────────────────────────
const SummaryBar: React.FC = () => {
  const online = machines.filter((m) => m.status === "online").length;
  const fault  = machines.filter((m) => m.status === "fault").length;
  const idle   = machines.filter((m) => m.status === "idle").length;
  const avgUtil = Math.round(
    machines.reduce((acc, m) => acc + m.utilization, 0) / machines.length
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: "Online",      value: online,      cls: "text-success" },
        { label: "Fault",       value: fault,       cls: "text-error"   },
        { label: "Idle",        value: idle,        cls: "text-warning" },
        { label: "Avg Util.",   value: `${avgUtil}%`, cls: "text-primary" },
      ].map(({ label, value, cls }) => (
        <div key={label} className="stat card bg-base-100 border border-base-200 shadow-sm p-4 rounded-xl">
          <div className="stat-title text-xs text-base-content/50">{label}</div>
          <div className={`stat-value text-2xl font-bold ${cls}`}>{value}</div>
        </div>
      ))}
    </div>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────
const MachineManagement: React.FC = () => {
  const [filter, setFilter] = useState<MachineStatus | "all">("all");

  const visible = filter === "all"
    ? machines
    : machines.filter((m) => m.status === filter);

  return (
    <div className="min-h-screen bg-base-200 font-sans" data-theme="light">

      <main className="w-[80%] mx-auto py-4 space-y-3">
        {/* Page Header */}
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-base-content">
              Machine Management
            </h1>
            <p className="text-sm text-base-content/50 mt-0">
              Monitor machine status, utilization, and maintenance schedules
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="join">
            {(["all", "online", "fault", "idle"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`join-item btn btn-sm capitalize ${
                  filter === f ? "btn-neutral" : "btn-outline"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <SummaryBar />

        {/* Machine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>

        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-base-content/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">No machines match this filter</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MachineManagement;