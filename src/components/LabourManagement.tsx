"use client"
import React, { useState } from "react";
import {
  Users, TrendingUp, Clock, UserCheck, UserX, Activity,
  Filter, Download, Plus, ChevronLeft, ChevronRight,
  AlertCircle, AlertTriangle, Calendar, MoreVertical, Settings,
  Bell, MessageSquare, Search
} from "lucide-react";
import EmployeeSidebar from "./LabourManagementSidebar";

// ─── DATA ────────────────────────────────────────────────────────────────────

const kpiStats = [
  {
    label: "Total Labours",
    value: "326",
    sub: "Across all departments",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Present Today",
    value: "278",
    sub: "85.3% of total",
    subColor: "text-emerald-600",
    icon: UserCheck,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    label: "On Leave / Absent",
    value: "48",
    sub: "14.7% of total",
    subColor: "text-orange-500",
    icon: Clock,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    label: "On Shift Now",
    value: "186",
    sub: "57.0% of total",
    subColor: "text-slate-500",
    icon: Activity,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    label: "Avg. Productivity (Today)",
    value: "82.6%",
    sub: "▲ 5.4% vs yesterday",
    subColor: "text-emerald-600",
    icon: TrendingUp,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
];

const attendanceData = [
  { label: "Present",  value: 278, pct: 85.3, color: "#22c55e" },
  { label: "Absent",   value: 28,  pct: 8.6,  color: "#ef4444" },
  { label: "On Leave", value: 20,  pct: 6.1,  color: "#f59e0b" },
  { label: "Half Day", value: 0,   pct: 0,    color: "#cbd5e1" },
];

const departments = [
  { name: "Production",   count: 152, pct: 46.6 },
  { name: "Assembly",     count: 68,  pct: 20.9 },
  { name: "Welding",      count: 42,  pct: 12.9 },
  { name: "Maintenance",  count: 28,  pct: 8.6  },
  { name: "Quality",      count: 18,  pct: 5.5  },
  { name: "Packing",      count: 18,  pct: 5.5  },
];

const upcomingLeaves = [
  { name: "Sanjay Patel",   dept: "Welding Department",     date: "20 May 2025",      type: "Full Day" },
  { name: "Pawan Yadav",    dept: "Maintenance Department", date: "21 - 22 May 2025", type: "2 Days"   },
  { name: "Mahesh Jaiswal", dept: "Production Department",  date: "23 May 2025",      type: "Full Day" },
];

const labourAlerts = [
  { icon: AlertCircle, color: "text-red-500",    bg: "bg-red-50",    border: "border-red-100",    msg: "5 labours are absent today",       action: "View Details" },
  { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50",  border: "border-amber-100",  msg: "3 labours working overtime",        action: "Dismiss"      },
];

const labourList = [
  { id: "LBR-1001", name: "Rohit Sharma",  avatar: "RS", dept: "Production",   designation: "CNC Operator",      skills: "CNC, Milling",       machine: "CNC-05",         shift: "A (06:00 AM - 02:00 PM)", status: "Present",  attendance: "09:15 AM",  attendanceSub: "In Time",  productivity: 92, color: "#3b82f6" },
  { id: "LBR-1002", name: "Amit Kumar",    avatar: "AK", dept: "Production",   designation: "Lathe Operator",    skills: "Lathe, Drill",       machine: "LAT-03",         shift: "A (06:00 AM - 02:00 PM)", status: "Present",  attendance: "06:05 AM",  attendanceSub: "In Time",  productivity: 88, color: "#6366f1" },
  { id: "LBR-1003", name: "Vikas Singh",   avatar: "VS", dept: "Assembly",     designation: "Fitter",            skills: "Fitting, Assembly",  machine: "Assembly Line 2", shift: "B (02:00 PM - 10:00 PM)", status: "Present",  attendance: "02:02 PM",  attendanceSub: "In Time",  productivity: 84, color: "#8b5cf6" },
  { id: "LBR-1004", name: "Sanjay Patel",  avatar: "SP", dept: "Welding",      designation: "Welder",            skills: "Welding, Fabrication", machine: "WLD-02",       shift: "B (02:00 PM - 10:00 PM)", status: "Absent",   attendance: "—",         attendanceSub: "",         productivity: 0,  color: "#f43f5e" },
  { id: "LBR-1005", name: "Neha Verma",    avatar: "NV", dept: "Quality",      designation: "QC Inspector",      skills: "Inspection, QA",     machine: "QC Lab",         shift: "A (06:00 AM - 02:00 PM)", status: "Present",  attendance: "06:10 AM",  attendanceSub: "In Time",  productivity: 90, color: "#10b981" },
  { id: "LBR-1006", name: "Pawan Yadav",   avatar: "PY", dept: "Maintenance",  designation: "Technician",        skills: "Electrical, Mech.",  machine: "Maint. Dept.",    shift: "C (10:00 PM - 06:00 AM)", status: "On Leave", attendance: "—",         attendanceSub: "",         productivity: 0,  color: "#f59e0b" },
  { id: "LBR-1007", name: "Deepak Mehta",  avatar: "DM", dept: "Production",   designation: "CNC Operator",      skills: "CNC, Programming",   machine: "CNC-02",         shift: "A (06:00 AM - 02:00 PM)", status: "Present",  attendance: "06:02 AM",  attendanceSub: "In Time",  productivity: 95, color: "#06b6d4" },
  { id: "LBR-1008", name: "Rahul Gupta",   avatar: "RG", dept: "Packing",      designation: "Packing Operator",  skills: "Packing, Labeling",  machine: "Packing Area",   shift: "B (02:00 PM - 10:00 PM)", status: "Present",  attendance: "02:01 PM",  attendanceSub: "In Time",  productivity: 78, color: "#a855f7" },
];

const workersData: any[] = [
  { id: "LBR-1001", initials: "RS", name: "Rohit Sharma", role: "CNC Operator", skill: "CNC Operator", job: "JOB-0845", status: "active", shift: "Morning", productivity: { outputPerDay: 420, efficiencyActual: 92, efficiencyTarget: 90, defectRate: 0.8, reworkRate: 0.5 }, idle: false, avatar: "RS", avatarColor: "#3b82f6", attendance: [{ day: 1, type: "present" }, { day: 2, type: "present" }, { day: 3, type: "overtime" }], alerts: ["Expiring Safety Certification (3 days)"], orders: [{ id: "ORD-99", client: "Tesla India", role: "Lead Operator", status: "In Progress" }], activityLog: [{ time: "09:15 AM", action: "Clocked In" }], salary: 450000, isSpecialist: true, impactIfAbsent: "High impact on CNC line output throughput.", phone: "+91 9876543210" },
  { id: "LBR-1002", initials: "AK", name: "Amit Kumar", role: "Lathe Operator", skill: "Lathe Operator", job: "JOB-0839", status: "active", shift: "Morning", productivity: { outputPerDay: 150, efficiencyActual: 88, efficiencyTarget: 90, defectRate: 0.2, reworkRate: 0.1 }, idle: false, avatar: "AK", avatarColor: "#6366f1", attendance: Array.from({ length: 15 }).map((_, i) => ({ day: i + 1, type: "present" })), alerts: [], orders: [{ id: "ORD-102", client: "SpaceX Aerospace", role: "Final Verification", status: "Completed" }], activityLog: [{ time: "06:05 AM", action: "Clocked In" }], salary: 380000, isSpecialist: true, impactIfAbsent: "Critical bottleneck for shipping releases.", phone: "+91 9123456789" },
  { id: "LBR-1003", initials: "VS", name: "Vikas Singh", role: "Fitter", skill: "Fitter", job: "JOB-0842", status: "on_leave", shift: "Morning", productivity: { outputPerDay: 280, efficiencyActual: 84, efficiencyTarget: 90, defectRate: 2.1, reworkRate: 1.8 }, idle: false, avatar: "VS", avatarColor: "#8b5cf6", attendance: [{ day: 1, type: "absent" }, { day: 2, type: "absent" }], alerts: ["High defect rate last week"], orders: [], activityLog: [], salary: 320000, isSpecialist: false, impactIfAbsent: "Moderate impact; can be replaced by buffer staff.", phone: "+91 9988776655" },
];

// ─── DONUT CHART ─────────────────────────────────────────────────────────────

function DonutChart() {
  const total = 326;
  const radius = 70;
  const cx = 90, cy = 90;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  const segments = attendanceData.map((d) => {
    const pct = d.value / total;
    const dashArray = pct * circumference;
    const dashOffset = -cumulative * circumference;
    cumulative += pct;
    return { ...d, dashArray, dashOffset };
  });

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
      {segments.map((seg, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke={seg.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${seg.dashArray} ${circumference}`}
          strokeDashoffset={seg.dashOffset}
          strokeLinecap="butt"
          style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      <text x={cx} y={cy - 8} textAnchor="middle" className="font-bold" style={{ fontSize: 22, fontWeight: 700, fill: "#0f172a" }}>326</text>
      <text x={cx} y={cy + 12} textAnchor="middle" style={{ fontSize: 11, fill: "#94a3b8" }}>Total Labours</text>
    </svg>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    Present:  { cls: "bg-emerald-50 text-emerald-700 border border-emerald-200",  label: "Present"  },
    Absent:   { cls: "bg-red-50 text-red-600 border border-red-200",              label: "Absent"   },
    "On Leave": { cls: "bg-orange-50 text-orange-600 border border-orange-200",   label: "On Leave" },
  };
  const s = map[status] ?? { cls: "bg-slate-100 text-slate-500", label: status };
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.cls}`}>{s.label}</span>;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function LabourManagement() {
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 41;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── TOP HEADER BAR ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Labour Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage your workforce, attendance, skills and productivity</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search by name, ID, skill, department, or machine..."
              className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-white border border-slate-200 rounded px-1 py-0.5">⌘K</span>
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-slate-500 cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
          </div>
          <MessageSquare className="w-5 h-5 text-slate-500 cursor-pointer" />
          <div className="flex items-center gap-2 ml-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">AM</div>
            <div>
              <p className="text-xs font-semibold text-slate-800 leading-none">Arjun Mehta</p>
              <p className="text-[10px] text-slate-400">Admin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-5 space-y-5">

        {/* ── SECTION 1: KPI CARDS (full width) ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpiStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 leading-none mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 leading-none">{stat.value}</p>
                  <p className={`text-[11px] mt-1 ${stat.subColor ?? "text-slate-400"}`}>{stat.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── SECTION 2: ROW 1 Overview Grids ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Attendance Overview */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800">Attendance Overview</h2>
              <button className="text-xs font-medium text-blue-600 hover:underline">View Details</button>
            </div>
            <div className="flex items-center gap-6">
              <DonutChart />
              <div className="flex-1 space-y-2.5">
                {attendanceData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-sm text-slate-600">{d.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {d.value} <span className="text-slate-400 font-normal text-xs">({d.pct}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Distribution */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800">Department Distribution</h2>
              <button className="text-xs font-medium text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {departments.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm text-slate-600 w-24 shrink-0">{d.name}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="text-sm text-slate-500 w-20 text-right shrink-0">{d.count} ({d.pct}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 3: ROW 2 Alerts & Distribution (per user request) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Labour Alerts */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-800 mb-4">Labour Alerts</h2>
            <div className="space-y-3">
              {labourAlerts.map((alert, i) => {
                const Icon = alert.icon;
                return (
                  <div key={i} className={`rounded-xl border ${alert.border} ${alert.bg} p-4`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm`}>
                        <Icon className={`w-5 h-5 ${alert.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{alert.msg}</p>
                        <button className="text-xs text-blue-600 hover:underline mt-1">{alert.action}</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Leaves (acting as Dept Distribution in text or just the remaining one) */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800">Upcoming Leaves</h2>
              <button className="text-xs font-medium text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {upcomingLeaves.map((lv, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 leading-none">{lv.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{lv.dept}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-500">{lv.date}</p>
                    <p className="text-xs font-semibold text-orange-500 mt-0.5">{lv.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 4: LABOUR LIST (full width) ── */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Table Header / Filters */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-sm font-bold text-slate-800">Labour List</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <select className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>All Departments</option>
                <option>Production</option>
                <option>Assembly</option>
                <option>Welding</option>
                <option>Maintenance</option>
                <option>Quality</option>
                <option>Packing</option>
              </select>
              <select className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>All Shifts</option>
                <option>Shift A</option>
                <option>Shift B</option>
                <option>Shift C</option>
              </select>
              <select className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>All Status</option>
                <option>Present</option>
                <option>Absent</option>
                <option>On Leave</option>
              </select>
              <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Today
              </div>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                <Settings className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["LABOUR ID","NAME","DEPARTMENT","DESIGNATION","SKILLS","MACHINE / AREA","SHIFT","STATUS","ATTENDANCE","PRODUCTIVITY","ACTIONS"].map(h => (
                    <th key={h} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-3 px-3 text-left whitespace-nowrap first:pl-5 last:pr-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {labourList.map((worker, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors cursor-pointer"
                    onClick={() => {
                      const found = workersData.find(w => w.name === worker.name);
                      if (found) setSelectedWorker(found);
                    }}
                  >
                    <td className="py-3 px-3 pl-5">
                      <span className="text-blue-600 font-semibold text-xs">{worker.id}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0"
                          style={{ backgroundColor: worker.color }}
                        >
                          {worker.avatar}
                        </div>
                        <span className="font-semibold text-slate-800 whitespace-nowrap">{worker.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{worker.dept}</td>
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{worker.designation}</td>
                    <td className="py-3 px-3 text-slate-400 text-xs whitespace-nowrap">{worker.skills}</td>
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{worker.machine}</td>
                    <td className="py-3 px-3 text-slate-400 text-xs whitespace-nowrap">{worker.shift}</td>
                    <td className="py-3 px-3"><StatusBadge status={worker.status} /></td>
                    <td className="py-3 px-3">
                      {worker.attendance !== "—" ? (
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{worker.attendance}</p>
                          <p className="text-[10px] text-emerald-500 font-medium">{worker.attendanceSub}</p>
                        </div>
                      ) : (
                        <span className="text-slate-300 text-sm">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {worker.productivity > 0 ? (
                        <div className="flex items-center gap-2 min-w-[80px]">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${worker.productivity}%`,
                                backgroundColor: worker.productivity >= 90 ? "#22c55e" : worker.productivity >= 80 ? "#3b82f6" : "#f59e0b"
                              }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-600 w-8 shrink-0">{worker.productivity}%</span>
                        </div>
                      ) : (
                        <span className="text-slate-300 text-sm">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 pr-5">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">Showing 1 to 8 of 326 labours</p>
            <div className="flex items-center gap-1">
              <button
                className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
              </button>
              {[1, 2, 3, 4, 5].map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded border text-xs font-medium transition-colors ${
                    currentPage === p
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="px-1 text-slate-400 text-xs">...</span>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50">
                41
              </button>
              <button
                className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
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