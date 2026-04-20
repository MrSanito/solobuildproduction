"use client"
import React, { useState } from "react";
import { Users, TrendingUp, Minus, Clock } from "lucide-react";
import EmployeeSidebar from "./LabourManagementSidebar";

const stats = [
  { value: 23, label: "Present Today", bg: "bg-emerald-500", icon: Users },
  { value: 18, label: "Assigned", bg: "bg-blue-500", icon: Users },
  { value: 5, label: "Idle", bg: "bg-amber-400", icon: Users },
];

const avatarColors = [
  "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7",
  "#ec4899", "#10b981", "#14b8a6", "#06b6d4",
  "#f43f5e", "#f59e0b",
];

// Rich mock data for Employee Sidebar
const workersData: any[] = [
  { 
    id: "EMP-101",
    initials: "MC", 
    name: "Mike Chen", 
    role: "CNC Operator", 
    skill: "CNC Operator",
    job: "JOB-0845", 
    status: "active",
    shift: "Morning", 
    productivity: { outputPerDay: 420, efficiencyActual: 95, efficiencyTarget: 90, defectRate: 0.8, reworkRate: 0.5 },
    idle: false,
    avatar: "MC",
    avatarColor: avatarColors[0],
    attendance: [
      { day: 1, type: "present" }, { day: 2, type: "present" }, { day: 3, type: "overtime" },
      { day: 4, type: "present" }, { day: 5, type: "present" }, { day: 6, type: "absent" },
    ],
    alerts: ["Expiring Safety Certification (3 days)"],
    orders: [{ id: "ORD-99", client: "Tesla India", role: "Lead Operator", status: "In Progress" }],
    activityLog: [{ time: "09:00 AM", action: "Clocked In" }, { time: "11:30 AM", action: "Completed Batch A" }],
    salary: 450000,
    isSpecialist: true,
    impactIfAbsent: "High impact on CNC line output throughput.",
    phone: "+91 9876543210"
  },
  { 
    id: "EMP-102",
    initials: "SJ", 
    name: "Sarah Johnson", 
    role: "QC Inspector", 
    skill: "QC Inspector",
    job: "JOB-0839", 
    status: "active",
    shift: "Morning", 
    productivity: { outputPerDay: 150, efficiencyActual: 92, efficiencyTarget: 90, defectRate: 0.2, reworkRate: 0.1 },
    idle: false,
    avatar: "SJ",
    avatarColor: avatarColors[1],
    attendance: Array.from({ length: 15 }).map((_, i) => ({ day: i + 1, type: "present" })),
    alerts: [],
    orders: [{ id: "ORD-102", client: "SpaceX Aerospace", role: "Final Verification", status: "Completed" }],
    activityLog: [{ time: "08:45 AM", action: "Clocked In" }],
    salary: 380000,
    isSpecialist: true,
    impactIfAbsent: "Critical bottleneck for shipping releases.",
    phone: "+91 9123456789"
  },
  { 
    id: "EMP-103",
    initials: "DK", 
    name: "David Kumar", 
    role: "Lathe Operator", 
    skill: "Lathe Operator",
    job: "JOB-0842", 
    status: "on_leave",
    shift: "Morning", 
    productivity: { outputPerDay: 280, efficiencyActual: 88, efficiencyTarget: 90, defectRate: 2.1, reworkRate: 1.8 },
    idle: false,
    avatar: "DK",
    avatarColor: avatarColors[2],
    attendance: [{ day: 1, type: "absent" }, { day: 2, type: "absent" }],
    alerts: ["High defect rate last week"],
    orders: [],
    activityLog: [],
    salary: 320000,
    isSpecialist: false,
    impactIfAbsent: "Moderate impact; can be replaced by buffer staff.",
    phone: "+91 9988776655"
  }
  // ... more workers can be added or procedurally generated
];

function ProductivityBadge({ value, idle }: { value: number; idle: boolean }) {
  if (idle) return (
    <div className="flex items-center gap-1">
      <Minus className="w-3.5 h-3.5 text-slate-400" />
      <span className="text-sm text-slate-400 font-medium">0%</span>
    </div>
  );
  return (
    <div className="flex items-center gap-1">
      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
      <span className="text-sm font-bold text-emerald-600">{value}%</span>
    </div>
  );
}

export default function LabourManagement() {
  const [selectedWorker, setSelectedWorker] = useState<any>(null);

  // Combine static and dynamic data for UI
  const workers = workersData.length > 0 ? workersData : [];

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="w-[80%] mx-auto space-y-3">
        {/* Page Header */}
        <div className="pt-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Labour Management</h1>
          <p className="text-sm text-slate-500 mt-0">Track workforce allocation and productivity</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="card bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="card-body p-4 flex-row items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 leading-none">{stat.value}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workers Table */}
        <div className="card bg-white shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-sm w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-3 pl-4">Worker Name</th>
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-3">Skill</th>
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-3">Assigned Job</th>
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-3">Shift</th>
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-3 pr-4 text-right">Productivity</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker, i) => (
                  <tr 
                    key={i} 
                    className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors cursor-pointer"
                    onClick={() => setSelectedWorker(worker)}
                  >
                    <td className="py-3 pl-4">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0"
                          style={{ backgroundColor: worker.avatarColor || "#94a3b8" }}
                        >
                          {worker.initials}
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{worker.name}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-slate-500">{worker.skill}</span>
                    </td>
                    <td className="py-3">
                      {worker.job ? (
                        <span className="badge badge-sm bg-blue-50 text-blue-600 border border-blue-100 font-semibold text-[11px]">
                          {worker.job}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400 italic">Idle</span>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span className="text-sm">{worker.shift}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <ProductivityBadge value={worker.productivity.efficiencyActual} idle={worker.idle} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slide-out Sidebar */}
      {selectedWorker && (
        <EmployeeSidebar 
          emp={selectedWorker} 
          onClose={() => setSelectedWorker(null)} 
        />
      )}
    </div>
  );
}
