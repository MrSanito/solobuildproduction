"use client"
import React, { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface InventoryItem {
  id: number;
  name: string;
  category: "Raw Material" | "Components" | "Consumables" | "Tools" | "Safety";
  available: number;
  reserved: number;
  incoming: number;
  reorderLevel: number;
  status: "good" | "low" | "critical";
}

interface AlertItem {
  name: string;
  available: number;
  unit: string;
}

interface DeadStockItem {
  name: string;
  daysSinceMovement: number;
}

// ── Static Data ────────────────────────────────────────────────────────────
const inventoryData: InventoryItem[] = [
  { id: 1, name: "Steel Plates 10mm",       category: "Raw Material",  available: 450, reserved: 120, incoming: 200, reorderLevel: 300, status: "good"     },
  { id: 2, name: "Aluminum Rods 50mm",      category: "Raw Material",  available: 85,  reserved: 60,  incoming: 0,   reorderLevel: 100, status: "low"      },
  { id: 3, name: "Precision Bearings A-Series", category: "Components",available: 320, reserved: 45,  incoming: 150, reorderLevel: 200, status: "good"     },
  { id: 4, name: "Hydraulic Oil Grade 68",  category: "Consumables",   available: 28,  reserved: 15,  incoming: 50,  reorderLevel: 50,  status: "critical" },
  { id: 5, name: "Cutting Tools - Carbide", category: "Tools",         available: 145, reserved: 30,  incoming: 0,   reorderLevel: 80,  status: "good"     },
  { id: 6, name: "Copper Wire 2.5mm",       category: "Raw Material",  available: 65,  reserved: 40,  incoming: 100, reorderLevel: 80,  status: "low"      },
  { id: 7, name: "Safety Gloves",           category: "Safety",        available: 210, reserved: 0,   incoming: 0,   reorderLevel: 100, status: "good"     },
  { id: 8, name: "Titanium Sheets 5mm",     category: "Raw Material",  available: 12,  reserved: 10,  incoming: 0,   reorderLevel: 20,  status: "critical" },
];

const lowStockAlerts: AlertItem[] = [
  { name: "Aluminum Rods 50mm",    available: 85, unit: "units"  },
  { name: "Hydraulic Oil Grade 68",available: 28, unit: "units"  },
  { name: "Copper Wire 2.5mm",     available: 65, unit: "units"  },
  { name: "Titanium Sheets 5mm",   available: 12, unit: "sheets" },
];

const deadStockItems: DeadStockItem[] = [
  { name: "Legacy Bearings B-Series", daysSinceMovement: 90  },
  { name: "Old Safety Goggles",       daysSinceMovement: 120 },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const categoryColors: Record<InventoryItem["category"], string> = {
  "Raw Material": "badge-ghost",
  Components:     "badge-info",
  Consumables:    "badge-warning",
  Tools:          "badge-accent",
  Safety:         "badge-success",
};

const statusConfig = {
  good:     { cls: "badge-success",  label: "good"     },
  low:      { cls: "badge-warning",  label: "low"      },
  critical: { cls: "badge-error",    label: "critical" },
};

// ── Sub-components ─────────────────────────────────────────────────────────


const LowStockAlerts: React.FC = () => (
  <section className="card bg-base-100 shadow-sm border border-base-200">
    <div className="card-body p-5 gap-4">
      <h2 className="card-title text-base font-semibold text-error flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Low Stock Alerts
      </h2>
      <div className="grid gap-3">
        {lowStockAlerts.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-lg bg-error/5 border border-error/15 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-base-content">{item.name}</p>
              <p className="text-xs text-base-content/60 mt-0.5">
                Available: {item.available} {item.unit}
              </p>
            </div>
            <span className="badge badge-error badge-sm font-medium">Below reorder level</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DeadStock: React.FC = () => (
  <section className="card bg-base-100 shadow-sm border border-base-200">
    <div className="card-body p-5 gap-4">
      <h2 className="card-title text-base font-semibold text-warning flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
        Dead Stock
      </h2>
      <div className="grid gap-3">
        {deadStockItems.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-lg bg-warning/5 border border-warning/15 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-base-content">{item.name}</p>
              <p className="text-xs text-base-content/60 mt-0.5">
                No movement in {item.daysSinceMovement} days
              </p>
            </div>
            <span className="badge badge-warning badge-sm font-medium">{item.daysSinceMovement}d idle</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const InventoryTable: React.FC<{ search: string }> = ({ search }) => {
  const filtered = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead className="bg-base-200/60">
            <tr>
              {["Item Name", "Category", "Available", "Reserved", "Incoming", "Reorder Level", "Status"].map((col) => (
                <th key={col} className="text-xs font-semibold tracking-wide text-base-content/60 uppercase">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const s = statusConfig[item.status];
              return (
                <tr key={item.id} className="hover:bg-base-50 transition-colors">
                  <td className="font-semibold text-sm text-base-content">{item.name}</td>
                  <td>
                    <span className={`badge badge-sm badge-ghost font-medium ${categoryColors[item.category]}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="font-bold text-base-content">{item.available}</td>
                  <td className="text-base-content/70">{item.reserved}</td>
                  <td className="text-base-content/70">{item.incoming}</td>
                  <td className="text-base-content/70">{item.reorderLevel}</td>
                  <td>
                    <span className={`badge badge-sm ${s.cls} font-semibold capitalize`}>
                      {s.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────
const InventoryManagement: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-base-200 font-sans" data-theme="light">
 
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content">
            Inventory Management
          </h1>
          <p className="text-sm text-base-content/50 mt-1">
            Track and manage stock levels across all materials
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-3">
          <label className="input input-bordered flex items-center gap-2 flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-40" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.38-1.42 1.42-4.37-4.39zm-4.9.68a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Search inventory items..."
              className="grow text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button className="btn btn-outline gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filter
          </button>
        </div>

        {/* Alerts Row */}
        <div className="grid md:grid-cols-2 gap-5">
          <LowStockAlerts />
          <DeadStock />
        </div>

        {/* Table */}
        <InventoryTable search={search} />
      </main>
    </div>
  );
};

export default InventoryManagement;