"use client";

import React, { useState } from "react";
import {
  Package,
  AlertTriangle,
  Upload,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

// ── Types ──────────────────────────────────────────────────
type Tab = "all" | "instock" | "runninglow" | "outofstock";
type ItemStatus = "In Stock" | "Running Low" | "Out of Stock" | "Reorder Soon";

interface InventoryItem {
  icon: string;
  name: string;
  sku: string;
  category: string;
  location: string;
  available: number;
  reserved: number;
  incoming: string;
  status: ItemStatus;
  timeToStockout: string;
  value: string;
}

// ── Mock Data ──────────────────────────────────────────────
const items: InventoryItem[] = [
  { icon: "🔧", name: "Hydraulic Seal Kit",    sku: "HSK-001",   category: "Hydraulic",  location: "Main Store",        available: 25,  reserved: 10, incoming: "50 (20 May)", status: "Running Low",  timeToStockout: "1 Day",   value: "₹ 12,500"  },
  { icon: "⚙️", name: "Bearing 6205",           sku: "BRG-6205",  category: "Mechanical", location: "Main Store",        available: 120, reserved: 20, incoming: "100 (18 May)",status: "In Stock",     timeToStockout: "12 Days", value: "₹ 24,000"  },
  { icon: "📏", name: "Steel Rod 20mm",         sku: "SR-20MM",   category: "Raw Material",location: "Raw Materials Yard",available: 80,  reserved: 20, incoming: "50 (22 May)", status: "Running Low",  timeToStockout: "2 Days",  value: "₹ 18,400"  },
  { icon: "🧱", name: "Aluminum Block",         sku: "AL-BLK",    category: "Raw Material",location: "Raw Materials Yard",available: 35,  reserved: 5,  incoming: "40 (21 May)", status: "Reorder Soon", timeToStockout: "4 Days",  value: "₹ 15,750"  },
  { icon: "🔩", name: "Gear Blank",             sku: "GB-001",    category: "Mechanical", location: "Main Store",        available: 60,  reserved: 10, incoming: "30 (19 May)", status: "In Stock",     timeToStockout: "8 Days",  value: "₹ 30,600"  },
  { icon: "🔪", name: "CNC Tool Bit",           sku: "CTB-10",    category: "Tools",      location: "Tool Room",         available: 18,  reserved: 7,  incoming: "20 (17 May)", status: "Running Low",  timeToStockout: "1 Day",   value: "₹ 8,640"   },
  { icon: "🛢️", name: "Lubricant Oil 5L",       sku: "LUB-5L",   category: "Consumables",location: "Main Store",        available: 42,  reserved: 8,  incoming: "0",           status: "Out of Stock", timeToStockout: "–",       value: "₹ 6,720"   },
  { icon: "💨", name: "Pneumatic Cylinder",     sku: "PNC-32",    category: "Pneumatic",  location: "Main Store",        available: 15,  reserved: 5,  incoming: "10 (20 May)", status: "Running Low",  timeToStockout: "2 Days",  value: "₹ 11,250"  },
  { icon: "⚡", name: "Electrical Cable 2.5mm", sku: "CAB-2.5",   category: "Electrical", location: "Electrical Store",  available: 200, reserved: 50, incoming: "100 (25 May)",status: "In Stock",     timeToStockout: "15 Days", value: "₹ 22,000"  },
  { icon: "🔩", name: "Drill Bit Set",          sku: "DBS-SET",   category: "Tools",      location: "Tool Room",         available: 0,   reserved: 0,  incoming: "15 (18 May)", status: "Out of Stock", timeToStockout: "–",       value: "₹ 4,500"   },
];

const statusStyle: Record<ItemStatus, string> = {
  "In Stock":     "text-green-700 bg-green-50",
  "Running Low":  "text-orange-600 bg-orange-50",
  "Out of Stock": "text-red-600 bg-red-50",
  "Reorder Soon": "text-yellow-700 bg-yellow-50",
};

const categoryColors: Record<string, string> = {
  "Raw Material": "#f97316",
  "Mechanical":   "#8b5cf6",
  "Electrical":   "#3b82f6",
  "Tools":        "#10b981",
  "Others":       "#6b7280",
};

const predictedStockouts = [
  { name: "Hydraulic Seal Kit", sku: "SKU: HSK-001", days: "1 Day",  date: "May 16, 2025", dc: "text-red-500" },
  { name: "CNC Tool Bit",       sku: "SKU: CTB-10",  days: "1 Day",  date: "May 16, 2025", dc: "text-red-500" },
  { name: "Steel Rod 20mm",     sku: "SKU: SR-20MM", days: "2 Days", date: "May 17, 2025", dc: "text-orange-500" },
  { name: "Pneumatic Cylinder", sku: "SKU: PNC-32",  days: "2 Days", date: "May 17, 2025", dc: "text-orange-500" },
  { name: "Lubricant Oil 5L",   sku: "SKU: LUB-5L",  days: "Out of Stock", date: "",       dc: "text-red-500" },
];

const topConsumed = [
  { name: "Steel Rod 20mm",     qty: "1,250 Kg", pct: 100 },
  { name: "Bearing 6205",       qty: "950 Pcs",  pct: 76  },
  { name: "Hydraulic Seal Kit", qty: "620 Pcs",  pct: 50  },
  { name: "Aluminum Block",     qty: "540 Pcs",  pct: 43  },
  { name: "CNC Tool Bit",       qty: "410 Pcs",  pct: 33  },
];

// Mock line chart points for "Inventory Value Over Time"
const linePoints = [
  { x: 0,   y: 180 }, { x: 40,  y: 210 }, { x: 80,  y: 190 },
  { x: 120, y: 220 }, { x: 160, y: 240 }, { x: 200, y: 280 },
  { x: 240, y: 260 }, { x: 280, y: 300 }, { x: 320, y: 340 },
];

function toSvgPath(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${350 - p.y}`).join(" ");
}

function InventoryDonut() {
  const total = 1248;
  const segments = [
    { label: "Running Low",  count: 156, color: "#f97316" },
    { label: "Out of Stock", count: 58,  color: "#ef4444" },
    { label: "In Stock",     count: 982, color: "#22c55e" },
  ];
  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: 150, height: 150 }}>
        <ResponsiveContainer width={150} height={150}>
          <PieChart>
            <Pie data={segments} cx="50%" cy="50%" innerRadius={48} outerRadius={68} paddingAngle={2} dataKey="count" stroke="none">
              {segments.map((_, i) => <Cell key={i} fill={segments[i].color} />)}
            </Pie>
            <Tooltip
              formatter={(v: any, n: any) => [`${v?.toLocaleString() ?? 0} items`, n]}
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 11, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
              wrapperStyle={{ zIndex: 1000 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
          <span className="text-lg font-bold text-slate-900">{total.toLocaleString()}</span>
          <span className="text-[9px] text-slate-400 mt-0.5">Total Items</span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="size-2.5 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-xs text-slate-600 w-24">{s.label}</span>
            <span className="text-xs font-bold text-slate-800">{s.count.toLocaleString()}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
          <div className="size-2.5 shrink-0" />
          <span className="text-xs text-slate-400 w-24">Total Items</span>
          <span className="text-xs font-bold text-slate-800">{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function CategoryDonut() {
  const cats = [
    { label: "Raw Material", pct: 36.6, count: 455, value: "₹ 1,25,40,000", color: "#f97316" },
    { label: "Mechanical",   pct: 28.7, count: 358, value: "₹ 98,20,000",   color: "#8b5cf6" },
    { label: "Electrical",   pct: 13.8, count: 172, value: "₹ 47,30,000",   color: "#3b82f6" },
    { label: "Tools",        pct: 11.1, count: 139, value: "₹ 38,10,000",   color: "#10b981" },
    { label: "Others",       pct: 10.3, count: 124, value: "₹ 34,88,750",   color: "#6b7280" },
  ];
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0" style={{ width: 140, height: 140 }}>
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie data={cats} cx="50%" cy="50%" innerRadius={42} outerRadius={60} paddingAngle={2} dataKey="count" stroke="none">
              {cats.map((_, i) => <Cell key={i} fill={cats[i].color} />)}
            </Pie>
            <Tooltip
              formatter={(v: any, n: any) => [`${v} items`, n]}
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 11, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
              wrapperStyle={{ zIndex: 1000 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
          <span className="text-[11px] font-bold text-slate-900">₹3.42 Cr</span>
          <span className="text-[8px] text-slate-400 mt-0.5">Total Value</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        {cats.map((c) => (
          <div key={c.label} className="flex items-center gap-2">
            <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
            <span className="text-[10px] text-slate-600 flex-1 truncate">{c.label}</span>
            <span className="text-[10px] text-slate-400 shrink-0">{c.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────
export default function InventoryManagement() {
  const [tab, setTab] = useState<Tab>("all");
  const [page] = useState(1);

  const filtered = items.filter((it) => {
    if (tab === "instock")    return it.status === "In Stock";
    if (tab === "runninglow") return it.status === "Running Low" || it.status === "Reorder Soon";
    if (tab === "outofstock") return it.status === "Out of Stock";
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="text-xl font-bold text-slate-900 tracking-tight mb-0.5">Inventory Management</div>
      <p className="text-xs text-slate-500">Real-time inventory overview and intelligent stock management</p>
      {/* ── Page Header ── */}
      <div className="flex justify-end gap-2 mb-5">
        <button className="btn btn-sm btn-outline border-slate-200 text-slate-600 text-xs gap-1">
          <Upload size={13} /> Import
        </button>
        <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1 border-0">
          <Plus size={13} /> Add New Item
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-5">
        {[
          { label: "Total Items",          value: "1,248",         sub: "Across all categories", Icon: Package,       iconBg: "bg-blue-50",   iconColor: "text-blue-600"   },
          { label: "In Stock Items",        value: "982",           sub: "78.7% of total items",  Icon: Package,       iconBg: "bg-green-50",  iconColor: "text-green-600"  },
          { label: "Running Low",          value: "156",           sub: "12.5% of total items",  Icon: AlertTriangle, iconBg: "bg-orange-50", iconColor: "text-orange-500" },
          { label: "Out of Stock",         value: "58",            sub: "4.6% of total items",   Icon: AlertTriangle, iconBg: "bg-red-50",    iconColor: "text-red-500"    },
          { label: "Total Inventory Value",value: "₹ 3,42,18,750", sub: "Across all locations",  Icon: TrendingUp,    iconBg: "bg-blue-50",   iconColor: "text-blue-600"   },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-slate-500">{c.label}</p>
              <div className={`p-2 rounded-lg ${c.iconBg}`}>
                <c.Icon size={14} className={c.iconColor} />
              </div>
            </div>
            <p className="text-[1.4rem] font-bold text-slate-900 leading-tight">{c.value}</p>
            <p className="text-[10px] text-slate-400 mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">

        {/* ── Left: Inventory Table ── */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100">
            {/* Header */}
            <div className="p-5 border-b border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Inventory List</h2>
                <div className="flex items-center gap-2">
                  <button className="btn btn-xs h-7 min-h-0 px-3 bg-white border-blue-100 text-slate-600 font-semibold text-[10px] hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm flex items-center gap-1.5">
                    <Filter size={10} className="text-blue-500" /> Filters
                  </button>
                  <select className="select select-xs h-7 min-h-0 pl-2 pr-6 bg-white border-blue-100 text-slate-700 font-medium text-[10px] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all cursor-pointer appearance-none">
                    <option>Category</option>
                    <option>Hydraulic</option>
                    <option>Mechanical</option>
                    <option>Electrical</option>
                  </select>
                  <select className="select select-xs h-7 min-h-0 pl-2 pr-6 bg-white border-blue-100 text-slate-700 font-medium text-[10px] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all cursor-pointer appearance-none">
                    <option>Location</option>
                    <option>Main Store</option>
                    <option>Tool Room</option>
                  </select>
                  <button className="btn btn-xs h-7 min-h-0 px-3 bg-white border-blue-100 text-slate-600 font-semibold text-[10px] hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm flex items-center gap-1.5">
                    <Download size={10} className="text-blue-500" /> Export
                  </button>
                </div>
              </div>
              {/* Tabs */}
              <div className="flex gap-1">
                {([
                  ["all",         "All Items"],
                  ["instock",     "In Stock"],
                  ["runninglow",  "Running Low"],
                  ["outofstock",  "Out of Stock"],
                ] as [Tab, string][]).map(([val, lbl]) => (
                  <button
                    key={val}
                    onClick={() => setTab(val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      tab === val
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="border-b border-slate-100">
                  <tr className="text-slate-400 text-[10px] font-medium uppercase tracking-wide">
                    {["Item Name","SKU","Category","Location","Available","Reserved","Incoming","Status","Time to Stockout",""].map((h) => (
                      <th key={h} className="text-left px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((it) => (
                    <tr key={it.sku} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{it.icon}</span>
                          <span className="font-semibold text-slate-800 whitespace-nowrap">{it.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{it.sku}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{it.category}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{it.location}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800 text-center">{it.available}</td>
                      <td className="px-4 py-3 text-slate-600 text-center">{it.reserved}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{it.incoming}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold whitespace-nowrap ${statusStyle[it.status]}`}>
                          {it.status}
                        </span>
                      </td>
                      <td className={`px-4 py-3 font-semibold whitespace-nowrap ${
                        it.timeToStockout === "–" ? "text-slate-400" :
                        it.timeToStockout.includes("1") ? "text-red-500" : "text-orange-500"
                      }`}>
                        {it.timeToStockout}
                      </td>
                      <td className="px-4 py-3">
                        <button className="p-1 hover:bg-slate-100 rounded-md transition-colors">
                          <MoreVertical size={13} className="text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400">Showing 1 to 10 of 1,248 items</p>
              <div className="flex items-center gap-1">
                <button className="btn btn-xs btn-outline border-slate-200 text-slate-500 h-7 min-h-0 px-2">
                  <ChevronLeft size={12} />
                </button>
                {[1,2,3,4,5].map((n) => (
                  <button
                    key={n}
                    className={`btn btn-xs h-7 min-h-0 px-2.5 ${n === page ? "bg-blue-600 text-white border-blue-600" : "btn-outline border-slate-200 text-slate-600"}`}
                  >
                    {n}
                  </button>
                ))}
                <span className="text-slate-400 text-xs px-1">...</span>
                <button className="btn btn-xs btn-outline border-slate-200 text-slate-600 h-7 min-h-0 px-2.5">125</button>
                <button className="btn btn-xs btn-outline border-slate-200 text-slate-500 h-7 min-h-0 px-2">
                  <ChevronRight size={12} />
                </button>
                <select className="select select-bordered select-xs text-[10px] border-slate-200 h-7 min-h-0 ml-2">
                  <option>10 / page</option>
                  <option>25 / page</option>
                  <option>50 / page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Risk + Stockouts + Insights ── */}
        <div className="lg:col-span-4 flex flex-col gap-4">

          {/* Inventory Risk Overview */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Inventory Risk Overview</h2>
              <a href="#" className="text-xs text-blue-600 flex items-center gap-1">View All <ArrowRight size={11} /></a>
            </div>
            <InventoryDonut />
          </div>

          {/* Predicted Stockouts */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Predicted Stockouts <span className="text-slate-400 font-normal">(Next 7 Days)</span></h2>
              <a href="#" className="text-xs text-blue-600">View All</a>
            </div>
            <div className="flex flex-col gap-2">
              {predictedStockouts.map((s) => (
                <div key={s.sku} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{s.name}</p>
                    <p className="text-[10px] text-slate-400">{s.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${s.dc}`}>{s.days}</p>
                    {s.date && <p className="text-[10px] text-slate-400">{s.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Insights */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Inventory Insights</h2>
              <a href="#" className="text-xs text-blue-600">View Report</a>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-orange-50">
                <AlertTriangle size={13} className="text-orange-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-slate-700">156 items are running low and need attention.</p>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-red-50">
                <AlertTriangle size={13} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-slate-700">₹ 45,30,000 worth of inventory is at risk.</p>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-green-50">
                <Package size={13} className="text-green-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-slate-700">Order suggested for 23 items.</p>
              </div>
              <button className="btn btn-sm border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 text-xs w-full mt-1">
                View AI Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Inventory Value by Category */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800 mb-4">Inventory Value by Category</h2>
          <CategoryDonut />
        </div>

        {/* Inventory Value Over Time */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Inventory Value Over Time</h2>
            <span className="text-[10px] text-slate-400 border border-slate-200 px-2 py-0.5 rounded-lg cursor-pointer">Last 30 Days ▾</span>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { date: "Apr 20", value: 1.8 },
                { date: "Apr 24", value: 2.1 },
                { date: "Apr 28", value: 1.9 },
                { date: "May 02", value: 2.2 },
                { date: "May 06", value: 2.4 },
                { date: "May 10", value: 2.8 },
                { date: "May 14", value: 2.6 },
                { date: "May 18", value: 3.0 },
                { date: "May 21", value: 3.42 },
              ]}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  tickFormatter={(v) => `₹${v}Cr`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 11, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  formatter={(v: any) => [`₹ ${v} Cr`, "Value"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorVal)" 
                  dot={{ r: 3, fill: "#fff", stroke: "#3b82f6", strokeWidth: 2 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Consumed Items */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">Top Consumed Items <span className="text-slate-400 font-normal">(This Month)</span></h2>
            <a href="#" className="text-xs text-blue-600">View All</a>
          </div>
          <div className="flex flex-col gap-3">
            {topConsumed.map((it) => (
              <div key={it.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-700 font-medium">{it.name}</span>
                  <span className="text-xs text-slate-500">{it.qty}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500 transition-all"
                    style={{ width: `${it.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
