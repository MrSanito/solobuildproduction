import { Bell, Search, Menu, Clock, User, Calendar, FileText, AlertCircle, CheckCircle2, Circle, ChevronRight } from "lucide-react";

const pipeline = [
  { label: "Queued", count: 8, delayed: null, color: "border-slate-300 text-slate-600", countColor: "text-slate-900" },
  { label: "Material Ready", count: 5, delayed: "1 delayed", color: "border-blue-300 text-blue-600", countColor: "text-blue-700" },
  { label: "In Progress", count: 12, delayed: "3 delayed", color: "border-purple-300 text-purple-600", countColor: "text-purple-700" },
  { label: "QC", count: 4, delayed: null, color: "border-amber-300 text-amber-600", countColor: "text-amber-700" },
  { label: "Completed", count: 18, delayed: null, color: "border-emerald-300 text-emerald-600", countColor: "text-emerald-700" },
];

const timelineSteps = [
  { id: 1, label: "Queued", status: "done" },
  { id: 2, label: "Material Ready", status: "done" },
  { id: 3, label: "In Progress", status: "active" },
  { id: 4, label: "QC", status: "pending" },
  { id: 5, label: "Completed", status: "pending" },
];

const machines = [
  {
    id: "CNC-01",
    job: "JOB-0845",
    stage: "In Progress",
    start: "08:30 AM",
    finish: "02:45 PM",
    utilization: 92,
    status: "active",
    statusColor: "bg-emerald-500",
    cardBorder: "border-slate-100",
    barColor: "bg-emerald-500",
  },
  {
    id: "CNC-02",
    job: "JOB-0839",
    stage: "QC",
    start: "07:15 AM",
    finish: "12:30 PM",
    utilization: 87,
    status: "active",
    statusColor: "bg-emerald-500",
    cardBorder: "border-slate-100",
    barColor: "bg-emerald-500",
  },
  {
    id: "CNC-03",
    job: "JOB-0847",
    stage: "In Progress",
    start: "09:00 AM",
    finish: "03:15 PM",
    utilization: 45,
    status: "error",
    statusColor: "bg-rose-500",
    cardBorder: "border-rose-100 bg-rose-50/40",
    barColor: "bg-rose-500",
  },
  {
    id: "LATHE-01",
    job: "JOB-0842",
    stage: "In Progress",
    start: "06:00 AM",
    finish: "01:00 PM",
    utilization: 95,
    status: "active",
    statusColor: "bg-emerald-500",
    cardBorder: "border-slate-100",
    barColor: "bg-emerald-500",
  },
  {
    id: "LATHE-02",
    job: "—",
    stage: "Idle",
    start: "—",
    finish: "—",
    utilization: 0,
    status: "idle",
    statusColor: "bg-amber-400",
    cardBorder: "border-amber-100 bg-amber-50/40",
    barColor: "bg-amber-400",
  },
  {
    id: "MILL-01",
    job: "JOB-0851",
    stage: "Material Ready",
    start: "10:15 AM",
    finish: "04:00 PM",
    utilization: 78,
    status: "active",
    statusColor: "bg-emerald-500",
    cardBorder: "border-slate-100",
    barColor: "bg-amber-400",
  },
];

function StageIndicator({ status }: { status: string }) {
  if (status === "done")
    return (
      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
        <CheckCircle2 className="w-4 h-4 text-white" />
      </div>
    );
  if (status === "active")
    return (
      <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center shadow ring-4 ring-blue-100">
        <span className="text-white text-xs font-bold">3</span>
      </div>
    );
  return (
    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
      <Circle className="w-4 h-4 text-slate-400" />
    </div>
  );
}

export default function ProductionManagement() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      

      {/* Page Content */}
      <div className="p-4 max-w-2xl mx-auto space-y-5">
        {/* Page Header */}
        <div className="pt-2">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Production Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Monitor and manage your production operations in real-time</p>
        </div>

        {/* Production Pipeline */}
        <div className="card bg-white shadow-sm border border-slate-100">
          <div className="card-body p-5">
            <h2 className="text-base font-bold text-slate-900 mb-3">Production Pipeline</h2>
            <div className="grid grid-cols-5 gap-2">
              {pipeline.map((stage, i) => (
                <div
                  key={i}
                  className={`rounded-xl border-2 p-2.5 text-center ${stage.color} bg-white hover:shadow-sm transition-shadow cursor-pointer`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide opacity-70 leading-tight mb-1">{stage.label}</p>
                  <p className={`text-2xl font-bold ${stage.countColor} leading-none`}>{stage.count}</p>
                  {stage.delayed && (
                    <p className="text-[9px] text-rose-500 font-medium mt-1">{stage.delayed}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Detail Card */}
        <div className="card bg-white shadow-sm border border-slate-100">
          <div className="card-body p-5">
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">JOB-2024-0847</h3>
                  <span className="badge badge-sm border border-amber-300 bg-amber-50 text-amber-700 font-semibold gap-1">
                    <AlertCircle className="w-3 h-3" /> Delayed
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700 mt-0.5">Precision Gear Housing - Type B</p>
                <p className="text-xs text-slate-400">Client: Acme Manufacturing Co.</p>
              </div>
            </div>

            <div className="divider my-2" />

            {/* Job Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide">Assigned Machine</p>
                  <p className="text-sm font-bold text-slate-800">CNC-03</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide">Assigned Labour</p>
                  <p className="text-sm font-bold text-slate-800">Mike Chen</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide">Start Date</p>
                  <p className="text-sm font-bold text-slate-800">Apr 18, 2026</p>
                </div>
              </div>
              <div className="bg-rose-50 rounded-xl p-3 flex items-start gap-2.5 border border-rose-100">
                <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs text-rose-400 uppercase font-semibold tracking-wide">ETA Completion</p>
                  <p className="text-sm font-bold text-rose-600">Apr 21, 2026</p>
                </div>
              </div>
            </div>

            {/* Attached Files */}
            <div className="mt-3">
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide mb-2">Attached Files</p>
              <div className="flex gap-2">
                {["design_specs.pdf", "cad_model.dwg"].map((file, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-100 transition-colors">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-600 font-medium">{file}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="mt-4">
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide mb-3">Progress Timeline</p>
              <div className="flex items-center">
                {timelineSteps.map((step, i) => (
                  <div key={i} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1">
                      <StageIndicator status={step.status} />
                      <span
                        className={`text-[9px] font-medium text-center leading-tight ${
                          step.status === "done"
                            ? "text-emerald-600"
                            : step.status === "active"
                            ? "text-blue-600"
                            : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < timelineSteps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-1 mb-3 rounded ${
                          timelineSteps[i + 1].status !== "pending" ? "bg-emerald-400" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Machine Status */}
        <div className="card bg-white shadow-sm border border-slate-100">
          <div className="card-body p-5">
            <h2 className="text-base font-bold text-slate-900 mb-4">Live Machine Status</h2>
            <div className="grid grid-cols-2 gap-3">
              {machines.map((machine, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-3.5 hover:shadow-sm transition-shadow ${machine.cardBorder}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900">{machine.id}</span>
                    <span className={`w-2.5 h-2.5 rounded-full ${machine.statusColor} shadow-sm`} />
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{machine.job}</p>
                  <div className="mb-2">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wide">Current Stage</p>
                    <p className="text-sm font-bold text-slate-800">{machine.stage}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1 mb-2.5">
                    <div>
                      <p className="text-[9px] text-slate-400 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" /> Start
                      </p>
                      <p className="text-xs font-medium text-slate-700">{machine.start}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" /> Finish
                      </p>
                      <p className="text-xs font-medium text-slate-700">{machine.finish}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[9px] text-slate-400 uppercase font-semibold tracking-wide">Utilization</p>
                      <span className="text-xs font-bold text-slate-700">{machine.utilization}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div
                        className={`${machine.barColor} h-1.5 rounded-full transition-all duration-700`}
                        style={{ width: `${machine.utilization}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}