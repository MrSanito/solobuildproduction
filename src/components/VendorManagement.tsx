"use client"
import React, { useState } from "react";
import { Star, TrendingUp, AlertTriangle, Truck, Sparkles } from "lucide-react";
import VendorSidebar from "./VendorManagementSidebar";

const vendorsData = [
  { 
    id: "VEN-001",
    name: "SteelCo Industries", 
    materials: "Steel, Aluminum", 
    leadTime: "5-7 days", 
    reliability: 95, 
    lastOrder: "Apr 18, 2026",
    availability: "available",
    specialty: "High-grade alloy manufacturing",
    rating: 4.8,
    contact: { phone: "+91 9900112233", email: "sales@steelco.in", address: "Plot 45, Phase III, Okhla Industrial Estate, Delhi" },
    orders: [
      { id: "ORD-STEEL-44", due: "Apr 25", status: "In Progress" },
      { id: "ORD-STEEL-42", due: "Apr 18", status: "Ready" }
    ],
    costBreakdown: { labour: "₹12,400", materials: "₹85,000", overhead: "₹4,200" },
    paymentSummary: { totalPaid: "₹2,45,000", pending: "₹18,500" },
    paymentHistory: [
      { amount: "₹45,000", date: "Apr 15, 2026", status: "Paid" },
      { amount: "₹82,000", date: "Mar 28, 2026", status: "Paid" }
    ],
    review: { rating: 4.5, text: "Excellent material quality, but recently had a slight delay in documentation." }
  },
  { 
    id: "VEN-002",
    name: "Precision Parts Ltd", 
    materials: "Bearings, Components", 
    leadTime: "3-5 days", 
    reliability: 92, 
    lastOrder: "Apr 17, 2026",
    availability: "available",
    specialty: "Precision micro-machining",
    rating: 4.5,
    contact: { phone: "+91 9911223344", email: "info@ppltd.com", address: "Sector 18, Gurugram, Haryana" },
    orders: [{ id: "ORD-PPL-12", due: "Apr 22", status: "In Progress" }],
    costBreakdown: { labour: "₹8,500", materials: "₹22,000", overhead: "₹2,100" },
    paymentSummary: { totalPaid: "₹1,20,000", pending: "₹0" },
    paymentHistory: [{ amount: "₹30,000", date: "Apr 10, 2026", status: "Paid" }],
    review: { rating: 5.0, text: "The most reliable bearing supplier we've ever worked with." }
  },
  { 
    id: "VEN-003",
    name: "ChemTech Supplies", 
    materials: "Oils, Lubricants", 
    leadTime: "2-3 days", 
    reliability: 88, 
    lastOrder: "Apr 15, 2026",
    availability: "limited",
    specialty: "Industrial chemical solutions",
    rating: 4.2,
    contact: { phone: "+91 9922334455", email: "procurement@chemtech.in", address: "MIDC Industrial Area, Pune" },
    orders: [],
    costBreakdown: { labour: "₹4,200", materials: "₹12,000", overhead: "₹1,500" },
    paymentSummary: { totalPaid: "₹65,000", pending: "₹5,200" },
    paymentHistory: [],
    review: { rating: 3.8, text: "Good range but lead times vary unexpectedly during monsoon." }
  },
  { 
    id: "VEN-004",
    name: "ToolMaster Inc", 
    materials: "Cutting Tools, Bits", 
    leadTime: "4-6 days", 
    reliability: 78, 
    lastOrder: "Apr 12, 2026",
    availability: "available",
    specialty: "Custom tooling & bits",
    rating: 3.5,
    contact: { phone: "+91 9933445566", email: "service@toolmaster.com", address: "Peenya Industrial Area, Bengaluru" },
    orders: [{ id: "ORD-TOOL-88", due: "Apr 28", status: "In Progress" }],
    costBreakdown: { labour: "₹6,000", materials: "₹15,000", overhead: "₹1,800" },
    paymentSummary: { totalPaid: "₹80,000", pending: "₹12,000" },
    paymentHistory: [],
    review: { rating: 3.0, text: "Tools are fine but customer service is unresponsive." }
  },
  { 
    id: "VEN-005",
    name: "MetalWorks Co", 
    materials: "Copper, Titanium", 
    leadTime: "7-10 days", 
    reliability: 85, 
    lastOrder: "Apr 10, 2026",
    availability: "busy",
    specialty: "Rare earth metals sourcing",
    rating: 4.0,
    contact: { phone: "+91 9944556677", email: "metalworks@icloud.com", address: "GIDC Estate, Ahmedabad" },
    orders: [],
    costBreakdown: { labour: "₹15,000", materials: "₹1,20,000", overhead: "₹5,000" },
    paymentSummary: { totalPaid: "₹5,00,000", pending: "₹45,000" },
    paymentHistory: [],
    review: { rating: 4.2, text: "Only supplier for titanium in the region, expect long queues." }
  },
  { 
    id: "VEN-006",
    name: "SafetyFirst Supply", 
    materials: "PPE, Safety Gear", 
    leadTime: "1-2 days", 
    reliability: 98, 
    lastOrder: "Apr 19, 2026",
    availability: "available",
    specialty: "OSHA compliant safety gear",
    rating: 4.9,
    contact: { phone: "+91 9955667788", email: "safety@first.com", address: "SIPCOT Industrial Park, Chennai" },
    orders: [{ id: "ORD-SAFE-01", due: "Apr 21", status: "Ready" }],
    costBreakdown: { labour: "₹2,000", materials: "₹8,000", overhead: "₹500" },
    paymentSummary: { totalPaid: "₹45,000", pending: "₹0" },
    paymentHistory: [],
    review: { rating: 5.0, text: "Lightning fast delivery and consistent pricing." }
  },
];

const suggested = [
  { name: "Global Metal Solutions", reason: "Better pricing on aluminum", saving: "Save 15%" },
  { name: "Express Parts Depot", reason: "Faster delivery for bearings", saving: "Save 2 days" },
];

const riskFlags = [
  { vendor: "ToolMaster Inc", reason: "Reliability below 80%" },
  { vendor: "MetalWorks Co", reason: "No orders in 10 days" },
];

function ReliabilityBadge({ value }: { value: number }) {
  const isHigh = value >= 90;
  const isMid = value >= 80 && value < 90;
  const color = isHigh ? "text-emerald-600" : isMid ? "text-amber-600" : "text-rose-600";
  const starColor = isHigh ? "text-emerald-500" : isMid ? "text-amber-500" : "text-rose-400";

  return (
    <div className={`flex items-center gap-1 font-bold text-sm ${color}`}>
      <Star className={`w-3.5 h-3.5 fill-current ${starColor}`} />
      {value}%
    </div>
  );
}

export default function VendorManagement() {
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="space-y-5">
        {/* Page Header */}
        <div>
          <div className="text-xl font-bold text-slate-900 tracking-tight mb-0.5">Vendor Management</div>
          <p className="text-xs text-slate-500">Manage supplier relationships and performance</p>
        </div>

        {/* Vendors Table */}
        <div className="card bg-white shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-sm w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-3 pl-4">Vendor Name</th>
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-3">Materials Supplied</th>
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-3">Lead Time</th>
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-3">Reliability</th>
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-3 pr-4">Last Order</th>
                </tr>
              </thead>
              <tbody>
                {vendorsData.map((vendor, i) => {
                  const isRisk = vendor.reliability < 80;
                  return (
                    <tr
                      key={i}
                      className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors cursor-pointer ${isRisk ? "bg-rose-50/30" : ""}`}
                      onClick={() => setSelectedVendor(vendor)}
                    >
                      <td className="py-3.5 pl-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                            <Truck className="w-4 h-4 text-slate-400" />
                          </div>
                          <span className="text-sm font-semibold text-slate-800">{vendor.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className="text-sm text-slate-500">{vendor.materials}</span>
                      </td>
                      <td className="py-3.5">
                        <span className={`text-sm font-medium ${vendor.leadTime.startsWith("7") ? "text-amber-600" : "text-slate-600"}`}>
                          {vendor.leadTime}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <ReliabilityBadge value={vendor.reliability} />
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="text-sm text-slate-500">{vendor.lastOrder}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Suggested Vendors */}
          <div className="card bg-white shadow-sm border border-slate-100 h-full">
            <div className="card-body p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                </div>
                <h2 className="text-base font-bold text-slate-900">Suggested Vendors</h2>
              </div>
              <div className="space-y-2.5">
                {suggested.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 hover:bg-emerald-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.reason}</p>
                      </div>
                      <span className="badge badge-sm bg-emerald-100 text-emerald-700 border-0 font-bold text-[11px] shrink-0 ml-2">
                        {item.saving}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Flags */}
          <div className="card bg-white shadow-sm border border-slate-100 h-full">
            <div className="card-body p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <h2 className="text-base font-bold text-slate-900">Risk Flags</h2>
              </div>
              <div className="space-y-2.5">
                {riskFlags.map((flag, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-3 hover:bg-amber-50 transition-colors"
                  >
                    <p className="text-sm font-bold text-slate-800">{flag.vendor}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{flag.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Sidebar */}
      {selectedVendor && (
        <VendorSidebar 
          vendor={selectedVendor} 
          onClose={() => setSelectedVendor(null)} 
        />
      )}
    </div>
  );
}
