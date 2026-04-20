"use client"
import React from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";

// ── Data ───────────────────────────────────────────────────────────────────
const productionEfficiencyData = [
  { month: "Oct", efficiency: 81  },
  { month: "Nov", efficiency: 85  },
  { month: "Dec", efficiency: 83  },
  { month: "Jan", efficiency: 88  },
  { month: "Feb", efficiency: 85  },
  { month: "Mar", efficiency: 91  },
  { month: "Apr", efficiency: 90  },
];

const machineUtilizationData = [
  { machine: "CNC-01",   utilization: 92 },
  { machine: "CNC-02",   utilization: 87 },
  { machine: "CNC-03",   utilization: 45 },
  { machine: "LATHE-01", utilization: 95 },
  { machine: "LATHE-02", utilization: 12 },
  { machine: "MILL-01",  utilization: 78 },
];

const delayTrendsData = [
  { week: "Week 1", onTime: 0, delayed: 18 },
  { week: "Week 2", onTime: 0, delayed: 16 },
  { week: "Week 3", onTime: 0, delayed: 17 },
  { week: "Week 4", onTime: 0, delayed: 20 },
];

const outputOverTimeData = [
  { day: "Mon", units: 46 },
  { day: "Tue", units: 52 },
  { day: "Wed", units: 48 },
  { day: "Thu", units: 61 },
  { day: "Fri", units: 57 },
  { day: "Sat", units: 39 },
  { day: "Sun", units: 25 },
];

// ── Shared chart style tokens ──────────────────────────────────────────────
const GRID_COLOR   = "#e5e7eb";   // tailwind gray-200
const AXIS_COLOR   = "#9ca3af";   // tailwind gray-400
const BLUE         = "#4a7cf7";   // matches image line/bar blue
const RED          = "#ef4444";   // tailwind red-500
const GREEN_TEAL   = "#10b981";   // tailwind emerald-500

const axisStyle = { fontSize: 12, fill: AXIS_COLOR };

const tooltipStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  fontSize: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

// ── Chart Card wrapper ─────────────────────────────────────────────────────
const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="card bg-base-100 border border-base-200 shadow-sm rounded-2xl">
    <div className="card-body p-5 gap-4">
      <h2 className="text-sm font-bold text-base-content tracking-tight">{title}</h2>
      {children}
    </div>
  </div>
);

// ── Charts ─────────────────────────────────────────────────────────────────

const ProductionEfficiencyChart: React.FC = () => (
  <ChartCard title="Production Efficiency">
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={productionEfficiencyData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ stroke: BLUE, strokeWidth: 1, strokeDasharray: "4 4" }}
          formatter={(v: any) => [`${v}%`, "Efficiency"]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={() => "Efficiency %"}
        />
        <Line
          type="monotone"
          dataKey="efficiency"
          stroke={BLUE}
          strokeWidth={2}
          dot={{ fill: BLUE, r: 4, strokeWidth: 0 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>
);

const MachineUtilizationChart: React.FC = () => (
  <ChartCard title="Machine Utilization">
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={machineUtilizationData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }} barCategoryGap="35%">
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="machine" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ fill: "rgba(74,124,247,0.06)" }}
          formatter={(v: any) => [`${v}%`, "Utilization"]}
        />
        <Legend
          iconType="square"
          iconSize={10}
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={() => "Utilization %"}
        />
        <Bar dataKey="utilization" fill={BLUE} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>
);

const DelayTrendsChart: React.FC = () => (
  <ChartCard title="Delay Trends">
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={delayTrendsData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }} barCategoryGap="35%">
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="week" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ fill: "rgba(239,68,68,0.06)" }}
        />
        <Legend
          iconType="square"
          iconSize={10}
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
        />
        <Bar dataKey="onTime"  name="On Time" fill={GREEN_TEAL} radius={[4, 4, 0, 0]} />
        <Bar dataKey="delayed" name="Delayed"  fill={RED}       radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>
);

const OutputOverTimeChart: React.FC = () => (
  <ChartCard title="Output Over Time">
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={outputOverTimeData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 80]} tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ stroke: GREEN_TEAL, strokeWidth: 1, strokeDasharray: "4 4" }}
          formatter={(v: any) => [v, "Units Produced"]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={() => "Units Produced"}
        />
        <Line
          type="monotone"
          dataKey="units"
          stroke={GREEN_TEAL}
          strokeWidth={2}
          dot={{ fill: GREEN_TEAL, r: 4, strokeWidth: 0 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>
);

// ── Page ───────────────────────────────────────────────────────────────────
const ReportsAnalytics: React.FC = () => (
  <div className="min-h-screen bg-base-100 font-sans" data-theme="light">
    <div className="w-[80%] mx-auto py-4 space-y-3">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-base-content">
          Reports &amp; Analytics
        </h1>
        <p className="text-sm text-base-content/50 mt-0">
          Insights and trends across production operations
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductionEfficiencyChart />
        <MachineUtilizationChart />
        <DelayTrendsChart />
        <OutputOverTimeChart />
      </div>

    </div>
  </div>
);

export default ReportsAnalytics;
