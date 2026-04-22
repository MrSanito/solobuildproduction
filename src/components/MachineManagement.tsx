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
    dot:    "bg-green-500",
    border: "border-green-200",
    bg:     "bg-green-50/50",
    label:  "Online",
    badge:  "bg-green-50 text-green-700",
  },
  fault: {
    dot:    "bg-red-500",
    border: "border-red-200",
    bg:     "bg-red-50/50",
    label:  "Fault",
    badge:  "bg-red-50 text-red-600",
  },
  idle: {
    dot:    "bg-amber-500",
    border: "border-amber-200",
    bg:     "bg-amber-50/50",
    label:  "Idle",
    badge:  "bg-amber-50 text-amber-700",
  },
};

const utilizationBarColor = (pct: number): string => {
  if (pct >= 80) return "#22c55e";
  if (pct >= 50) return "#f59e0b";
  return "#ef4444";
};

const formatRuntime = (h: number): string =>
  h === 0 ? "0h" : `${h}h`;



// ── Machine Card ───────────────────────────────────────────────────────────
const MachineCard: React.FC<{ machine: Machine }> = ({ machine }) => {
  const cfg = statusConfig[machine.status];

  return (
    <div
      className={`bg-white rounded-xl border ${cfg.border} shadow-sm shadow-slate-100 hover:shadow-md transition-shadow duration-200 cursor-pointer`}
    >
      <div className="p-5 space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">
              {machine.id}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {machine.jobId ?? <span className="italic">No active job</span>}
            </p>
          </div>
          <span
            className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ring-4 ${
              machine.status === "online"
                ? "bg-green-500 ring-green-100"
                : machine.status === "fault"
                ? "bg-red-500 ring-red-100"
                : "bg-amber-500 ring-amber-100"
            }`}
          />
        </div>

        {/* Utilization */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Utilization
            </span>
            <span className="text-sm font-bold text-slate-800">
              {machine.utilization}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full transition-all"
              style={{ width: `${machine.utilization}%`, backgroundColor: utilizationBarColor(machine.utilization) }}
            />
          </div>
        </div>

        {/* Runtime */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Runtime Today
          </span>
          <span className="text-sm font-bold text-slate-800">
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
        { label: "Online",      value: online,        cls: "text-green-600" },
        { label: "Fault",       value: fault,         cls: "text-red-500"   },
        { label: "Idle",        value: idle,          cls: "text-amber-600" },
        { label: "Avg Util.",   value: `${avgUtil}%`, cls: "text-blue-600"  },
      ].map(({ label, value, cls }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-4">
          <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">{label}</p>
          <p className={`text-2xl font-bold ${cls}`}>{value}</p>
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
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Page Header */}
      <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
        <div>
          <div className="text-xl font-bold text-slate-900 tracking-tight mb-0.5">
            Machine Management
          </div>
          <p className="text-xs text-slate-500">
            Monitor machine status, utilization, and maintenance schedules
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1">
          {(["all", "online", "fault", "idle"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                filter === f ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-5">
        <SummaryBar />
      </div>

      {/* Machine Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>

      {visible.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-slate-400">No machines match this filter</p>
        </div>
      )}
    </div>
  );
};

export default MachineManagement;
