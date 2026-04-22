"use client";

import React, { useState } from "react";
import { 
  AlertCircle, 
  X, 
  Zap, 
  CheckCircle2, 
  MessageCircle, 
  Phone,
  Calendar
} from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────
const MONTH_DAYS = 30;

// ── Helpers ────────────────────────────────────────────────────────────────
function calcReliabilityScore(emp: any) {
  const attendanceScore = (emp.attendance.filter((d: any) => d.type !== "absent").length / MONTH_DAYS) * 40;
  const productivityScore = (emp.productivity.efficiencyActual / 100) * 30;
  const errorScore = (1 - emp.productivity.defectRate / 10) * 20;
  const overtimeScore = (emp.attendance.filter((d: any) => d.type === "overtime").length / 10) * 10;
  
  return Math.min(100, Math.round(attendanceScore + productivityScore + errorScore + overtimeScore));
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-1.5">
      <div 
        className="h-1.5 rounded-full transition-all duration-500" 
        style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
      />
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 85 ? "text-green-500" : score >= 65 ? "text-yellow-500" : "text-red-500";
  return (
    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-xl ${color} border-current opacity-80`}>
      {score}
    </div>
  );
}

function AttendanceCalendar({ attendance }: { attendance: any[] }) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: MONTH_DAYS }).map((_, i) => {
        const day = attendance.find(d => d.day === i + 1);
        const color = day?.type === "present" ? "bg-green-500" : day?.type === "absent" ? "bg-red-500" : day?.type === "overtime" ? "bg-yellow-500" : "bg-slate-100";
        return (
          <div key={i} className={`h-6 rounded-sm ${color} transition-colors hover:opacity-80`} title={`Day ${i + 1}`} />
        );
      })}
    </div>
  );
}

export default function EmployeeSidebar({ emp, onClose }: { emp: any; onClose: () => void }) {
  const [tab, setTab] = useState(1);
  const score = calcReliabilityScore(emp);
  const presentDays  = emp.attendance.filter((d: any) => d.type === "present" || d.type === "overtime").length;
  const absentDays   = emp.attendance.filter((d: any) => d.type === "absent").length;
  const overtimeDays = emp.attendance.filter((d: any) => d.type === "overtime").length;

  const tabs = [
    { id: 1, label: "Attendance" },
    { id: 2, label: "Involvement" },
    { id: 3, label: "Productivity" },
    { id: 4, label: "Cost" },
    { id: 5, label: "Reliability" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[460px] max-w-full bg-white z-50 shadow-2xl flex flex-col"
        style={{ animation: "slideInRight 0.25s ease" }}>

        {/* HEADER */}
        <div className="flex items-center gap-3 p-5 border-b bg-slate-50 shrink-0">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
            style={{ backgroundColor: emp.avatarColor }}>
            {emp.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-slate-900 truncate">{emp.name}</h2>
            <p className="text-xs text-slate-500">{emp.role} · {emp.id}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${emp.status === "active" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>
                {emp.status}
              </span>
              {emp.alerts.length > 0 && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {emp.alerts.length} Alert{emp.alerts.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-200 text-slate-500 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ALERT BANNER */}
        {emp.alerts.length > 0 && (
          <div className="px-5 pt-3">
            {emp.alerts.map((a: string, i: number) => (
              <div key={i} className="flex items-start gap-2 bg-red-100 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700 mb-1">
                <AlertCircle className="mt-0.5 shrink-0 w-3 h-3" />{a}
              </div>
            ))}
          </div>
        )}

        {/* TABS */}
        <div className="flex border-b px-5 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`shrink-0 text-xs font-semibold px-3 py-3 border-b-2 transition-colors
                ${tab === t.id ? "border-green-500 text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5" style={{ scrollbarWidth: "none" }}>

          {/* ATTENDANCE */}
          {tab === 1 && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800 mb-3">April 2026 — Attendance Calendar</p>
              <AttendanceCalendar attendance={emp.attendance} />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: "Present",  value: presentDays,  color: "#22c55e", bg: "#f0fdf4" },
                  { label: "Absent",   value: absentDays,   color: "#ef4444", bg: "#fef2f2" },
                  { label: "Overtime", value: overtimeDays, color: "#eab308", bg: "#fefce8" },
                ].map(s => (
                  <div key={s.label} className="rounded-lg p-3 text-center border border-slate-100" style={{ backgroundColor: s.bg }}>
                    <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INVOLVEMENT */}
          {tab === 2 && (
            <div className="space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800 mb-3">Orders Worked On</p>
                <div className="space-y-2">
                  {emp.orders.map((o: any) => (
                    <div key={o.id} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{o.id} — {o.client}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Role: {o.role}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${o.status === "Completed" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                        {o.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800 mb-3">Today's Activity Log</p>
                <div className="space-y-2">
                  {emp.activityLog.map((a: any, i: number) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                        {i < emp.activityLog.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" style={{ minHeight: 16 }} />}
                      </div>
                      <div className="pb-2">
                        <p className="text-xs text-slate-400">{a.time}</p>
                        <p className="text-sm text-slate-700">{a.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTIVITY */}
          {tab === 3 && (
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800 mb-3">Productivity Signal</p>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-xs text-slate-500">Output Per Day</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{emp.productivity.outputPerDay} <span className="text-base font-normal text-slate-500">units</span></p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Efficiency vs Target</span>
                  <span className={`font-bold ${emp.productivity.efficiencyActual >= emp.productivity.efficiencyTarget ? "text-green-500" : "text-red-500"}`}>
                    {emp.productivity.efficiencyActual}% / {emp.productivity.efficiencyTarget}%
                  </span>
                </div>
                <MiniBar value={emp.productivity.efficiencyActual} max={100} color={emp.productivity.efficiencyActual >= emp.productivity.efficiencyTarget ? "#22c55e" : "#ef4444"} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Defect Rate", value: emp.productivity.defectRate, high: emp.productivity.defectRate > 2, suffix: "%" },
                  { label: "Rework Rate", value: emp.productivity.reworkRate, high: emp.productivity.reworkRate > 1.5, suffix: "%" },
                ].map(m => (
                  <div key={m.label} className="border border-slate-200 rounded-lg p-3">
                    <p className="text-xs text-slate-500">{m.label}</p>
                    <p className={`text-xl font-bold mt-1 ${m.high ? "text-red-500" : "text-green-600"}`}>{m.value}{m.suffix}</p>
                    <MiniBar value={m.value} max={10} color={m.high ? "#ef4444" : "#22c55e"} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COST */}
          {tab === 4 && (
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800 mb-3">Cost Layer</p>
              <div className="bg-slate-800 rounded-lg p-4 text-white">
                <p className="text-3xl font-bold mt-1">
                  ₹{emp.salary / 1000}k
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Per annum: ₹{(emp.salary * 12) / 1000}k
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800 mb-3">Specialist Status</p>
              <div className={`rounded-lg p-4 border-2 flex items-center gap-4 ${emp.isSpecialist ? "border-green-300 bg-green-50" : "border-slate-200 bg-slate-50"}`}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: emp.isSpecialist ? "#22c55e" : "#9ca3af" }}>
                  {emp.isSpecialist ? "Y" : "N"}
                </div>
                <div>
                  <p className="font-semibold">{emp.isSpecialist ? "Specialist" : "Non-Specialist"}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{emp.isSpecialist ? "Has unique skills critical to operations." : "Role can be covered by others."}</p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-yellow-700 mb-1 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Impact if Absent
                </p>
                <p className="text-sm text-slate-700">{emp.impactIfAbsent}</p>
              </div>
            </div>
          )}

          {/* RELIABILITY */}
          {tab === 5 && (
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-800 mb-3">Reliability Score</p>
              <div className="flex items-center gap-5 bg-slate-50 rounded-lg p-4 border border-slate-200">
                <ScoreRing score={score} />
                <div>
                  <p className={`text-4xl font-black ${score >= 85 ? "text-green-600" : score >= 65 ? "text-yellow-500" : "text-red-500"}`}>{score}</p>
                  <p className="text-sm text-slate-500">
                    {score >= 85 ? <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="w-3.5 h-3.5" /> Highly Reliable</span>
                      : score >= 65 ? <span className="text-yellow-500">Moderate</span>
                      : <span className="flex items-center gap-1 text-red-500"><AlertCircle className="w-3.5 h-3.5" /> Needs Attention</span>}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Auto-generated from 4 signals</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "1. Attendance Consistency", value: Math.round((emp.attendance.filter((d: any) => d.type !== "absent").length / MONTH_DAYS) * 100), max: 100, suffix: "%" },
                  { label: "2. Output Consistency",     value: Math.min(100, Math.round((emp.productivity.efficiencyActual / emp.productivity.efficiencyTarget) * 100)), max: 100, suffix: "%" },
                  { label: "3. Error Rate (inverse)",   value: Math.max(0, Math.round(100 - emp.productivity.defectRate * 10)), max: 100, suffix: "%" },
                  { label: "4. Overtime Days",          value: emp.attendance.filter((d: any) => d.type === "overtime").length, max: 30, suffix: " days" },
                ].map(m => (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 text-xs">{m.label}</span>
                      <span className="font-semibold text-slate-800 text-xs">{m.value}{m.suffix}</span>
                    </div>
                    <MiniBar value={m.value} max={m.max} color="#22c55e" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-4 border-t px-5 pb-6 shrink-0 bg-white">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.open(`https://wa.me/${emp.phone?.replace(/\D/g, '')}`, '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </button>
            <button
              onClick={() => window.location.href = `tel:${emp.phone}`}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </>
  );
}
