import { Bell, Box, AlertTriangle, Gauge, Activity, Users, Search, Menu, TrendingUp, TrendingDown, Minus } from "lucide-react";

const kpiCards = [
  {
    icon: Box,
    value: "24",
    label: "Active Jobs",
    change: "+12%",
    trend: "up",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: AlertTriangle,
    value: "3",
    label: "Delayed Jobs",
    change: "-8%",
    trend: "down",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Gauge,
    value: "87%",
    label: "Machine Utilization",
    change: "+5%",
    trend: "up",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Activity,
    value: "7",
    label: "Inventory Risk Count",
    change: "+2",
    trend: "neutral",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: Users,
    value: "92%",
    label: "Labour Availability",
    change: "+3%",
    trend: "up",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

const systemHealth = [
  { label: "Production On-Track", value: 88, color: "bg-emerald-500" },
  { label: "Machine Usage", value: 87, color: "bg-blue-500" },
  { label: "Inventory Health", value: 76, color: "bg-orange-500" },
];

const alerts = [
  {
    message: "Material shortage detected for JOB-0852",
    time: "5 min ago",
    severity: "error",
    bg: "bg-red-50 border-red-200",
    text: "text-red-700",
  },
  {
    message: "CNC-03 maintenance due in 2 days",
    time: "1 hour ago",
    severity: "warning",
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
  },
  {
    message: "Delayed delivery expected for Client: TechCorp",
    time: "2 hours ago",
    severity: "error",
    bg: "bg-red-50 border-red-200",
    text: "text-red-700",
  },
  {
    message: "Labour shortage on second shift",
    time: "3 hours ago",
    severity: "warning",
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
  },
  {
    message: "New production order received: JOB-0855",
    time: "4 hours ago",
    severity: "info",
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-700",
  },
];

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />;
  return <Minus className="w-3.5 h-3.5 text-rose-500" />;
}

export default function ExecutiveDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      

      {/* Page Content */}
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 space-y-3">
        {/* Page Header */}
        <div className="pt-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0">Overview of system performance and critical metrics</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {kpiCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className={`card bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${
                  i === 4 ? "col-span-1" : ""
                }`}
              >
                <div className="card-body p-4">
                  <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <p className="text-3xl font-bold text-slate-900 leading-none">{card.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{card.label}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendIcon trend={card.trend} />
                    <span
                      className={`text-xs font-medium ${
                        card.trend === "neutral" ? "text-rose-500" : "text-emerald-500"
                      }`}
                    >
                      {card.change}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Spacer for 5th card odd layout */}
          <div className="col-span-1 hidden" />
        </div>

        {/* System Health */}
        <div className="card bg-white shadow-sm border border-slate-100">
          <div className="card-body p-5">
            <h2 className="text-base font-bold text-slate-900 mb-4">System Health</h2>
            <div className="space-y-4">
              {systemHealth.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div
                      className={`${item.color} h-2.5 rounded-full transition-all duration-700`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="card bg-white shadow-sm border border-slate-100">
          <div className="card-body p-5">
            <h2 className="text-base font-bold text-slate-900 mb-4">Critical Alerts</h2>
            <div className="space-y-2">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border ${alert.bg} transition-opacity hover:opacity-90`}
                >
                  <span className={`text-sm font-medium ${alert.text}`}>{alert.message}</span>
                  <span className={`text-xs ${alert.text} opacity-70 ml-3 shrink-0`}>{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}