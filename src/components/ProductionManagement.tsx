"use client";

import React, { useState } from "react";
import {
  ClipboardList,
  Settings2,
  Activity,
  Clock,
  AlertTriangle,
  ArrowRight,
  Plus,
  Cpu,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────
type MachineStatus = "in use" | "empty" | "broken";

// ── Mock Data ──────────────────────────────────────────────
const statCards = [
  {
    label: "Active Orders",
    value: "68",
    Icon: ClipboardList,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    change: "▲ 12% vs yesterday",
    changeColor: "text-green-500",
  },
  {
    label: "Orders in Production",
    value: "32",
    Icon: Settings2,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    change: "▲ 8% vs yesterday",
    changeColor: "text-green-500",
  },
  {
    label: "Machines Running",
    value: "38 / 60",
    Icon: Activity,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sub: "63% utilization",
    subColor: "text-blue-500",
    change: null,
  },
  {
    label: "Delayed Orders",
    value: "7",
    Icon: Clock,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    change: "▼ 2 vs yesterday",
    changeColor: "text-red-500",
  },
  {
    label: "At Risk (Inventory)",
    value: "14",
    Icon: AlertTriangle,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    change: "▼ 3 vs yesterday",
    changeColor: "text-red-500",
  },
];

const pipeline = [
  { label: "Planned", value: 12 },
  { label: "Material Ready", value: 9 },
  { label: "In Production", value: 32, active: true },
  { label: "Quality Check", value: 8 },
  { label: "Completed", value: 42 },
];

const rawStatuses: MachineStatus[] = [
  "in use","in use","empty","in use","broken","in use","in use","empty","in use","in use",
  "in use","empty","in use","in use","in use","broken","in use","in use","in use","in use",
  "in use","empty","in use","empty","broken","in use","in use","in use","in use","in use",
  "in use","empty","empty","in use","in use","empty","in use","in use","broken","in use",
  "in use","in use","in use","empty","in use","in use","in use","in use","in use","in use",
  "in use","in use","in use","in use","in use","broken","in use","in use","broken","in use",
];

const machines = Array.from({ length: 60 }, (_, i) => ({
  id: `M${String(i + 1).padStart(2, "0")}`,
  status: rawStatuses[i] ?? "empty",
}));

const statusColor: Record<MachineStatus, string> = {
  "in use": "bg-blue-500",
  empty: "bg-slate-300",
  broken: "bg-red-500",
};

const activeOrders = [
  { id: "PRJ-2505-009", name: "Auto Bracket Assembly",    status: "In Production",  stage: "Stage 3 of 5", pct: 65,  due: "16 May 2025", sc: "text-blue-600 bg-blue-50" },
  { id: "PRJ-2505-007", name: "Hydraulic Cylinder Body",  status: "Quality Check",  stage: "Stage 4 of 5", pct: 80,  due: "14 May 2025", sc: "text-purple-600 bg-purple-50" },
  { id: "PRJ-2505-003", name: "Gear Housing Unit",        status: "In Production",  stage: "Stage 3 of 5", pct: 58,  due: "15 May 2025", sc: "text-blue-600 bg-blue-50" },
  { id: "PRJ-2505-001", name: "Valve Control Module",     status: "Material Ready", stage: "Stage 2 of 5", pct: 30,  due: "18 May 2025", sc: "text-orange-600 bg-orange-50" },
  { id: "PRJ-2505-010", name: "Motor Shaft",              status: "Planned",        stage: "Stage 1 of 5", pct: 10,  due: "20 May 2025", sc: "text-slate-600 bg-slate-100" },
];

const aiInsights = [
  { type: "danger",  title: "High Delay Risk",   desc: "7 orders at risk of delay in next 3 days", link: "View Orders" },
  { type: "warning", title: "Inventory Alert",   desc: "14 items running low",                       link: "View Inventory" },
  { type: "danger",  title: "Machine Alert",     desc: "3 machines down",                            link: "View Machines" },
  { type: "warning", title: "Labour Alert",      desc: "5 absenteeism issues detected",              link: "View Labour" },
];

const maintenance = [
  { machine: "M12 - Lathe Machine",    date: "13 May 2025, 09:00 AM" },
  { machine: "M18 - Drill Press",      date: "13 May 2025, 11:00 AM" },
  { machine: "M45 - Welding Station",  date: "14 May 2025, 10:00 AM" },
];

const attentionOrders = [
  { id: "PRJ-2505-006", project: "Pump Housing",     status: "In Production", delay: "2 Days", reason: "Machine M22 Overload", action: "Reschedule / Reassign", sc: "text-blue-600 bg-blue-50",   dc: "text-red-500" },
  { id: "PRJ-2505-002", project: "Control Panel Box",status: "Quality Check", delay: "1 Day",  reason: "QC Hold",              action: "Review QC Report",      sc: "text-purple-600 bg-purple-50", dc: "text-orange-500" },
  { id: "PRJ-2505-008", project: "Drive Shaft",      status: "In Production", delay: "1 Day",  reason: "Material Delay",       action: "Expedite Material",     sc: "text-blue-600 bg-blue-50",   dc: "text-orange-500" },
];

// ── Component ──────────────────────────────────────────────
export default function ProductionManagement() {
  const [selected, setSelected] = useState(machines[5]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="text-xl font-bold text-slate-900 tracking-tight mb-0.5">Production Management</div>
      <p className="text-xs text-slate-500">Monitor production pipeline, factory layout, and order status</p>
      {/* ── Toolbar ── */}
      <div className="flex justify-end gap-2 mb-5">
        <button className="btn btn-sm btn-outline text-xs gap-1 border-slate-200 text-slate-600">
          <Cpu size={13} /> Factory Layout
        </button>
        <button className="btn btn-sm btn-outline text-xs border-slate-200 text-slate-600">
          Filters
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-5">
        {statCards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-slate-500 leading-tight">{c.label}</p>
              <div className={`p-2 rounded-lg ${c.iconBg}`}>
                <c.Icon size={15} className={c.iconColor} />
              </div>
            </div>
            <p className="text-[1.4rem] font-bold text-slate-900 leading-tight">{c.value}</p>
            {"sub" in c && c.sub && <p className={`text-xs mt-1 font-semibold ${c.subColor}`}>{c.sub}</p>}
            {c.change && <p className={`text-xs mt-1 ${c.changeColor}`}>{c.change}</p>}
          </div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* ── Left: Pipeline + Factory + Attention ── */}
        <div className="lg:col-span-7 flex flex-col gap-4">

          {/* Production Pipeline */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Production Pipeline (By Stage)</h2>
              <a href="#" className="text-xs text-blue-600 flex items-center gap-1">
                View All Orders <ArrowRight size={11} />
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {pipeline.map((s, i) => (
                <React.Fragment key={s.label}>
                  <div
                    className={`flex flex-col items-center px-4 py-3 rounded-xl border-2 flex-1 text-center transition-all
                      ${s.active
                        ? "border-blue-500 bg-blue-50 shadow-sm shadow-slate-100 shadow-blue-100"
                        : "border-slate-100 bg-slate-50"
                      }`}
                  >
                    <p className={`text-[11px] font-medium mb-1 ${s.active ? "text-blue-600" : "text-slate-400"}`}>
                      {s.label}
                    </p>
                    <p className={`text-3xl font-bold leading-none ${s.active ? "text-blue-600" : "text-slate-800"}`}>
                      {s.value}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">Orders</p>
                  </div>
                  {i < pipeline.length - 1 && <ArrowRight size={14} className="text-slate-300 shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Factory Layout */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Factory Layout (60 Machines)</h2>
              <a href="#" className="text-xs text-blue-600 flex items-center gap-1">
                View All Machines <ArrowRight size={11} />
              </a>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-5 mb-3">
              {(["broken","in use","empty"] as MachineStatus[]).map((s) => (
                <div key={s} className="flex items-center gap-1.5">
                  <div className={`size-2.5 rounded-sm ${statusColor[s]}`} />
                  <span className="text-[11px] text-slate-500 capitalize">{s}</span>
                </div>
              ))}
            </div>
            {/* Grid */}
            <div className="grid grid-cols-10 gap-1 mb-3">
              {machines.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m)}
                  title={`${m.id} – ${m.status}`}
                  className={`
                    text-[9px] font-semibold text-white rounded py-1.5 leading-none transition-all
                    ${statusColor[m.status as MachineStatus]}
                    ${selected.id === m.id ? "ring-2 ring-offset-1 ring-blue-800 scale-110 z-10" : "hover:opacity-80"}
                  `}
                >
                  {m.id}
                </button>
              ))}
            </div>
            {/* Selected machine detail */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2.5 min-w-[170px]">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm shadow-slate-100">
                  <Settings2 size={15} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">M06 – CNC Milling Center</p>
                  <span className="text-[10px] font-semibold text-red-500">● Broken</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Breakdown since 10:20 AM</p>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-3 text-xs border-l border-slate-200 pl-4">
                <div>
                  <p className="text-[10px] text-slate-400 mb-1">Current Job</p>
                  <p className="font-semibold text-slate-800">PRJ-2505-005</p>
                  <p className="text-slate-500 text-[10px]">Gear Housing Unit</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 mb-1">Assigned Labour</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3].map((n) => (
                      <div
                        key={n}
                        className="size-5 rounded-full bg-blue-100 border-2 border-white text-[8px] font-bold text-blue-700 flex items-center justify-center -ml-1 first:ml-0"
                      >
                        {n}
                      </div>
                    ))}
                    <span className="text-[10px] text-slate-400 ml-1">+2</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-xs border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 text-[10px] shrink-0">
                View Details
              </button>
            </div>
          </div>

          {/* Orders Requiring Attention */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Orders Requiring Attention</h2>
              <a href="#" className="text-xs text-blue-600">View All</a>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400">
                  {["ORDER ID","PROJECT","STATUS","DELAY","REASON","ACTION REQUIRED"].map((h) => (
                    <th key={h} className="text-left pb-2 pr-3 font-medium text-[10px] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {attentionOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 pr-3 font-semibold text-slate-700">{o.id}</td>
                    <td className="py-2.5 pr-3 text-slate-600">{o.project}</td>
                    <td className="py-2.5 pr-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${o.sc}`}>{o.status}</span>
                    </td>
                    <td className={`py-2.5 pr-3 font-bold ${o.dc}`}>{o.delay}</td>
                    <td className="py-2.5 pr-3 text-slate-500">{o.reason}</td>
                    <td className="py-2.5 text-blue-600 cursor-pointer hover:underline">{o.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Middle: Active Orders ── */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Active Orders</h2>
              <a href="#" className="text-xs text-blue-600 flex items-center gap-1">
                View All <ArrowRight size={11} />
              </a>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {activeOrders.map((o) => (
                <div key={o.id} className="pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{o.id}</p>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{o.name}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${o.sc} shrink-0 ml-2`}>
                      {o.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-1.5">{o.stage}</p>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${o.pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{o.pct}%</span>
                    <span>Due: {o.due}</span>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="mt-4 flex items-center justify-center gap-1 text-xs text-blue-600 py-2 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors"
            >
              View All Orders <ArrowRight size={12} />
            </a>
          </div>
        </div>

        {/* ── Right: AI Insights + Maintenance + Quick Actions ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* AI Insights */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">AI Insights</h2>
              <a href="#" className="text-xs text-blue-600">View All</a>
            </div>
            <div className="flex flex-col gap-2.5">
              {aiInsights.map((ins) => (
                <div
                  key={ins.title}
                  className={`p-3 rounded-xl ${ins.type === "danger" ? "bg-red-50" : "bg-orange-50"}`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      size={13}
                      className={`mt-0.5 shrink-0 ${ins.type === "danger" ? "text-red-500" : "text-orange-400"}`}
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{ins.title}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 mb-1 leading-snug">{ins.desc}</p>
                      <a href="#" className="text-[10px] text-blue-600 hover:underline">{ins.link}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Maintenance */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Upcoming Maintenance</h2>
              <a href="#" className="text-xs text-blue-600">View All</a>
            </div>
            <div className="flex flex-col gap-2">
              {maintenance.map((m) => (
                <div key={m.machine} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="p-1.5 bg-white rounded-md border border-slate-200 shrink-0">
                    <Settings2 size={11} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-700 leading-tight">{m.machine}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{m.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-4">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "+ New Order" },
                { label: "Machine Status" },
                { label: "Assign Labour" },
                { label: "Material Request" },
              ].map(({ label }) => (
                <button
                  key={label}
                  className="border border-slate-200 rounded-lg text-[10px] text-slate-600 font-medium py-2 px-1 hover:bg-slate-50 hover:border-slate-300 transition-all text-center leading-tight"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
