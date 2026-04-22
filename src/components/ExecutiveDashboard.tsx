"use client";

import React from "react";
import {
  ClipboardList,
  Settings2,
  Activity,
  Clock,
  AlertTriangle,
  ArrowRight,
  Plus,
  Users,
  Package,
  Bell,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

// ── Mock Data ──────────────────────────────────────────────
const statCards = [
  { label: "Active Orders",        value: "68",      Icon: ClipboardList, iconBg: "bg-blue-50",   iconColor: "text-blue-600",   change: "▲ 12% vs yesterday", cc: "text-green-500" },
  { label: "Orders in Production", value: "32",      Icon: Settings2,     iconBg: "bg-green-50",  iconColor: "text-green-600",  change: "▲ 8% vs yesterday",  cc: "text-green-500" },
  { label: "Machines Running",     value: "38 / 60", Icon: Activity,      iconBg: "bg-blue-50",   iconColor: "text-blue-500",   change: "63% utilization",     cc: "text-blue-500"  },
  { label: "Delayed Orders",       value: "7",       Icon: Clock,         iconBg: "bg-red-50",    iconColor: "text-red-500",    change: "▼ 2 vs yesterday",    cc: "text-red-500"   },
  { label: "Inventory at Risk",    value: "14",      Icon: AlertTriangle, iconBg: "bg-orange-50", iconColor: "text-orange-500", change: "▼ 3 vs yesterday",    cc: "text-red-500"   },
];

const pipeline = [
  { step: 1, label: "Queued",        value: 12, color: "bg-slate-100 border-slate-200 text-slate-600",       dot: "bg-gray-400" },
  { step: 2, label: "Running",       value: 32, color: "bg-green-50 border-green-400 text-green-700",     dot: "bg-green-500", active: true },
  { step: 3, label: "Quality Check", value: 8,  color: "bg-slate-100 border-slate-200 text-slate-600",       dot: "bg-gray-400" },
  { step: 4, label: "QC Approved",   value: 16, color: "bg-slate-100 border-slate-200 text-slate-600",       dot: "bg-gray-400" },
  { step: 5, label: "Completed",     value: 42, color: "bg-slate-100 border-slate-200 text-slate-600",       dot: "bg-gray-400" },
];

const activeOrders = [
  { id: "PRJ-2505-009", name: "Gear Box Assembly",    stage: "Stage 3 of 5", pct: 65, eta: "16 May, 2025", sc: "text-blue-600 bg-blue-50",   status: "In Production" },
  { id: "PRJ-2505-007", name: "Spindle Assembly",     stage: "Stage 4 of 5", pct: 80, eta: "14 May, 2025", sc: "text-purple-600 bg-purple-50",status: "Quality Check" },
  { id: "PRJ-2505-003", name: "Gear Housing Unit",    stage: "Stage 3 of 5", pct: 58, eta: "16 May, 2025", sc: "text-blue-600 bg-blue-50",   status: "In Production" },
  { id: "PRJ-2505-001", name: "Valve Control Module", stage: "Stage 2 of 5", pct: 30, eta: "18 May, 2025", sc: "text-orange-600 bg-orange-50",status: "Material Ready" },
  { id: "PRJ-2505-010", name: "Motor Shaft",          stage: "Stage 1 of 5", pct: 10, eta: "20 May, 2025", sc: "text-slate-600 bg-slate-100",   status: "Planned" },
];

const upcomingOrders = [
  { id: "PRJ-2505-011", name: "Gear Box Assembly",   start: "16 May, 2025", priority: "High",   pc: "text-red-500 bg-red-50" },
  { id: "PRJ-2505-012", name: "Coupling Housing",    start: "17 May, 2025", priority: "Medium", pc: "text-orange-600 bg-orange-50" },
  { id: "PRJ-2505-013", name: "Spindle Assembly",    start: "18 May, 2025", priority: "High",   pc: "text-red-500 bg-red-50" },
  { id: "PRJ-2505-014", name: "Base Frame",          start: "19 May, 2025", priority: "Medium", pc: "text-orange-600 bg-orange-50" },
  { id: "PRJ-2505-015", name: "End Cover Plate",     start: "20 May, 2025", priority: "Low",    pc: "text-green-600 bg-green-50" },
];

const recentlyCompleted = [
  { id: "PRJ-2505-004", name: "Control Panel Box", date: "12 May, 2025", dur: "3d 6h", status: "Completed" },
  { id: "PRJ-2505-002", name: "Drive Shaft",       date: "11 May, 2025", dur: "2d 4h", status: "Completed" },
  { id: "PRJ-2505-005", name: "Piston Rod",        date: "10 May, 2025", dur: "2d 8h", status: "Completed" },
  { id: "PRJ-2505-006", name: "Pump Housing",      date: "09 May, 2025", dur: "4d 2h", status: "Completed" },
  { id: "PRJ-2505-008", name: "Bearing Housing",   date: "08 May, 2025", dur: "3d 1h", status: "Completed" },
];

// Inventory Risk numbers
const inventoryRisk = {
  outOfStock: 5,
  runningLow: 9,
  reorderSoon: 12,
};
const inventoryItems = [
  { name: "Hydraulic Seal Kit", available: 0,  status: "Out of Stock",  sc: "text-red-600 bg-red-50",    days: "–"   },
  { name: "Bearing 6205",       available: 5,  status: "Running Low",   sc: "text-orange-600 bg-orange-50", days: "1 Day" },
  { name: "Steel Rod 20mm",     available: 15, status: "Running Low",   sc: "text-orange-600 bg-orange-50", days: "2 Days" },
  { name: "Aluminum Block",     available: 8,  status: "Reorder Soon",  sc: "text-yellow-700 bg-yellow-50", days: "4 Days" },
  { name: "Gear Blank",         available: 20, status: "Reorder Soon",  sc: "text-yellow-700 bg-yellow-50", days: "5 Days" },
];

// Machines Utilization donut data
const utilSegments = [
  { label: "Running",     pct: 63, count: 38, color: "#3b82f6" },
  { label: "Idle",        pct: 27, count: 16, color: "#d1d5db" },
  { label: "Down",        pct: 7,  count: 4,  color: "#ef4444" },
  { label: "Maintenance", pct: 3,  count: 2,  color: "#facc15" },
];

function DonutChart() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0" style={{ width: 140, height: 140 }}>
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie
              data={utilSegments}
              cx="50%"
              cy="50%"
              innerRadius={44}
              outerRadius={62}
              paddingAngle={2}
              dataKey="count"
              stroke="none"
            >
              {utilSegments.map((s, i) => (
                <Cell key={i} fill={s.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any, name: any) => [`${value} machines`, name]}
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 11, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
              wrapperStyle={{ zIndex: 1000 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
          <span className="text-xl font-bold text-slate-900">63%</span>
          <span className="text-[9px] text-slate-400 mt-0.5">Utilization</span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {utilSegments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="size-2.5 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-xs text-slate-600 w-24">{s.label}</span>
            <span className="text-xs font-bold text-slate-800">{s.count}</span>
            <span className="text-xs text-slate-400">({s.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────
export default function ExecutiveDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-5 gap-4 mb-5">
        {statCards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-slate-500 leading-tight">{c.label}</p>
              <div className={`p-2 rounded-lg ${c.iconBg}`}>
                <c.Icon size={15} className={c.iconColor} />
              </div>
            </div>
            <p className="text-[1.6rem] font-bold text-slate-900 leading-none">{c.value}</p>
            <p className={`text-xs mt-1.5 ${c.cc}`}>{c.change}</p>
          </div>
        ))}
      </div>

      {/* ── Production Pipeline ── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5 mb-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Production Pipeline</h2>
          <a href="#" className="text-xs text-blue-600 flex items-center gap-1">
            View All Orders <ArrowRight size={11} />
          </a>
        </div>
        <div className="flex items-center gap-3">
          {pipeline.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className={`flex flex-col items-center border-2 rounded-2xl px-6 py-4 flex-1 text-center transition-all ${s.color}`}>
                <div className={`size-7 rounded-full ${s.active ? "bg-green-500" : "bg-gray-300"} text-white text-xs font-bold flex items-center justify-center mb-2`}>
                  {s.step}
                </div>
                <p className="text-xs font-medium mb-1 opacity-80">{s.label}</p>
                <p className={`text-3xl font-bold leading-none ${s.active ? "text-green-700" : "text-slate-800"}`}>{s.value}</p>
                <p className="text-[10px] mt-1 opacity-60">Orders</p>
              </div>
              {i < pipeline.length - 1 && (
                <ArrowRight size={16} className="text-gray-300 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── 3-column middle ── */}
      <div className="grid grid-cols-3 gap-4 mb-4">

        {/* Active Orders */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Active Orders <span className="text-slate-400 font-normal">(Top 5)</span></h2>
            <a href="#" className="text-xs text-blue-600 flex items-center gap-1">View All <ArrowRight size={11} /></a>
          </div>
          <div className="mb-2">
            <div className="grid grid-cols-4 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] pb-1 border-b border-slate-100">
              <span className="col-span-1">ORDER / PROJECT</span>
              <span className="col-span-1 text-center">STAGE</span>
              <span className="col-span-1 text-center">PROGRESS</span>
              <span className="col-span-1 text-right">ETA</span>
            </div>
          </div>
          <div className="flex flex-col divide-y divide-gray-50">
            {activeOrders.map((o) => (
              <div key={o.id} className="py-2.5 grid grid-cols-4 items-center gap-1">
                <div className="col-span-1">
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">{o.id}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{o.name}</p>
                  <span className={`mt-1 inline-block px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${o.sc}`}>{o.status}</span>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-[10px] text-slate-500">{o.stage}</p>
                </div>
                <div className="col-span-1">
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${o.pct}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 text-center">{o.pct}%</p>
                </div>
                <div className="col-span-1 text-right">
                  <p className="text-[10px] text-slate-600">{o.eta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Orders */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Upcoming Orders</h2>
            <a href="#" className="text-xs text-blue-600 flex items-center gap-1">View All <ArrowRight size={11} /></a>
          </div>
          <div className="mb-2">
            <div className="grid grid-cols-3 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] pb-1 border-b border-slate-100">
              <span className="col-span-1">ORDER / PROJECT</span>
              <span className="col-span-1 text-center">START DATE</span>
              <span className="col-span-1 text-right">PRIORITY</span>
            </div>
          </div>
          <div className="flex flex-col divide-y divide-gray-50">
            {upcomingOrders.map((o) => (
              <div key={o.id} className="py-2.5 grid grid-cols-3 items-center">
                <div className="col-span-1">
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">{o.id}</p>
                  <p className="text-[10px] text-slate-400">{o.name}</p>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-[10px] text-slate-600">{o.start}</p>
                </div>
                <div className="col-span-1 text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${o.pc}`}>{o.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Risk Overview */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Inventory Risk Overview</h2>
            <a href="#" className="text-xs text-blue-600 flex items-center gap-1">View All <ArrowRight size={11} /></a>
          </div>
          {/* Summary pills */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-red-600">{inventoryRisk.outOfStock}</p>
              <p className="text-[10px] text-red-500 font-medium mt-0.5">Out of Stock</p>
              <p className="text-[10px] text-slate-400">Items</p>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-orange-500">{inventoryRisk.runningLow}</p>
              <p className="text-[10px] text-orange-500 font-medium mt-0.5">Running Low</p>
              <p className="text-[10px] text-slate-400">Items</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-yellow-600">{inventoryRisk.reorderSoon}</p>
              <p className="text-[10px] text-yellow-600 font-medium mt-0.5">Reorder Soon</p>
              <p className="text-[10px] text-slate-400">Items</p>
            </div>
          </div>
          {/* Table */}
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] grid grid-cols-4 pb-1 border-b border-slate-100">
            <span className="col-span-1">ITEM</span>
            <span className="col-span-1 text-center">AVAILABLE</span>
            <span className="col-span-1 text-center">STATUS</span>
            <span className="col-span-1 text-right">TIME TO STOCKOUT</span>
          </div>
          {inventoryItems.map((it) => (
            <div key={it.name} className="grid grid-cols-4 items-center py-2 border-b border-slate-50 last:border-0">
              <p className="col-span-1 text-[11px] font-medium text-slate-700">{it.name}</p>
              <p className="col-span-1 text-center text-[11px] text-slate-600">{it.available}</p>
              <div className="col-span-1 flex justify-center">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${it.sc}`}>{it.status}</span>
              </div>
              <p className="col-span-1 text-right text-[11px] text-slate-600">{it.days}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-3 gap-4">

        {/* Recently Completed */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Recently Completed <span className="text-slate-400 font-normal">(Last 5)</span></h2>
            <a href="#" className="text-xs text-blue-600 flex items-center gap-1">View All <ArrowRight size={11} /></a>
          </div>
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] grid grid-cols-4 pb-1 border-b border-slate-100">
            <span className="col-span-1">ORDER / PROJECT</span>
            <span className="col-span-1 text-center">COMPLETED ON</span>
            <span className="col-span-1 text-center">DURATION</span>
            <span className="col-span-1 text-right">STATUS</span>
          </div>
          {recentlyCompleted.map((o) => (
            <div key={o.id} className="grid grid-cols-4 items-center py-2.5 border-b border-slate-50 last:border-0">
              <div className="col-span-1">
                <p className="text-[11px] font-bold text-slate-800">{o.id}</p>
                <p className="text-[10px] text-slate-400">{o.name}</p>
              </div>
              <p className="col-span-1 text-center text-[10px] text-slate-600">{o.date}</p>
              <p className="col-span-1 text-center text-[10px] text-slate-600">{o.dur}</p>
              <div className="col-span-1 flex justify-end">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold text-green-600 bg-green-50">{o.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Machines Utilization */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Machines Utilization</h2>
            <a href="#" className="text-xs text-blue-600 flex items-center gap-1">View All <ArrowRight size={11} /></a>
          </div>
          <div className="mt-2">
            <DonutChart />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "New Order",       Icon: Plus,     bg: "bg-blue-50",   tc: "text-blue-600"   },
              { label: "Machine Status",  Icon: Settings2,bg: "bg-green-50",  tc: "text-green-600"  },
              { label: "Assign Labour",   Icon: Users,    bg: "bg-purple-50", tc: "text-purple-600" },
              { label: "Material Request",Icon: Package,  bg: "bg-orange-50", tc: "text-orange-600" },
              { label: "View Alerts",     Icon: Bell,     bg: "bg-red-50",    tc: "text-red-600"    },
            ].map(({ label, Icon, bg, tc }) => (
              <button
                key={label}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm shadow-slate-100 transition-all ${bg}`}
              >
                <Icon size={18} className={tc} />
                <span className={`text-xs font-medium ${tc}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}