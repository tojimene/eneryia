"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CHANNEL_SPLIT, PERFORMANCE_DATA, ROAS_TREND } from "@/lib/charts-data";

function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function ChartShell({ height = 256, children }) {
  const mounted = useIsMounted();
  if (!mounted) {
    return (
      <div
        className="w-full animate-pulse rounded-md bg-card/30"
        style={{ height }}
      />
    );
  }
  return <div style={{ height, width: "100%" }}>{children}</div>;
}

const tooltipStyles = {
  backgroundColor: "rgba(6, 11, 31, 0.95)",
  border: "1px solid rgba(0, 229, 255, 0.25)",
  borderRadius: 12,
  boxShadow: "0 12px 30px rgba(0, 229, 255, 0.15)",
  color: "#e6f1ff",
  padding: "10px 12px",
  fontSize: 12,
};

const axisProps = {
  stroke: "rgba(122, 147, 194, 0.7)",
  tick: { fill: "rgba(207, 232, 255, 0.7)", fontSize: 11 },
  tickLine: false,
  axisLine: { stroke: "rgba(0, 229, 255, 0.08)" },
};

export function ActivityChart() {
  return (
    <ChartShell height={260}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={PERFORMANCE_DATA}
          margin={{ top: 10, right: 12, left: -18, bottom: 0 }}
        >
          <defs>
            <linearGradient id="gradBriefs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradAds" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f8cff" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#4f8cff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradFunnels" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a5cff" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#8a5cff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(0, 229, 255, 0.06)" vertical={false} />
          <XAxis dataKey="day" {...axisProps} />
          <YAxis {...axisProps} width={32} />
          <Tooltip
            contentStyle={tooltipStyles}
            cursor={{ stroke: "rgba(0, 229, 255, 0.25)", strokeWidth: 1 }}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: "rgba(207, 232, 255, 0.8)" }}
          />
          <Area
            type="monotone"
            dataKey="briefs"
            stroke="#00e5ff"
            strokeWidth={2}
            fill="url(#gradBriefs)"
          />
          <Area
            type="monotone"
            dataKey="ads"
            stroke="#4f8cff"
            strokeWidth={2}
            fill="url(#gradAds)"
          />
          <Area
            type="monotone"
            dataKey="funnels"
            stroke="#8a5cff"
            strokeWidth={2}
            fill="url(#gradFunnels)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function ChannelSplitChart() {
  return (
    <ChartShell height={224}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip contentStyle={tooltipStyles} />
          <Pie
            data={CHANNEL_SPLIT}
            innerRadius={48}
            outerRadius={78}
            paddingAngle={3}
            dataKey="value"
            stroke="rgba(5, 8, 22, 0.9)"
          >
            {CHANNEL_SPLIT.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => (
              <span style={{ color: "rgba(207, 232, 255, 0.85)" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function RoasChart() {
  return (
    <ChartShell height={192}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={ROAS_TREND}
          margin={{ top: 10, right: 8, left: -22, bottom: 0 }}
        >
          <CartesianGrid stroke="rgba(0, 229, 255, 0.06)" vertical={false} />
          <XAxis dataKey="week" {...axisProps} />
          <YAxis {...axisProps} width={32} />
          <Tooltip
            contentStyle={tooltipStyles}
            cursor={{ fill: "rgba(0, 229, 255, 0.05)" }}
            formatter={(value) => [`${value}x`, "ROAS"]}
          />
          <defs>
            <linearGradient id="gradRoas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#4f8cff" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <Bar
            dataKey="roas"
            fill="url(#gradRoas)"
            radius={[6, 6, 2, 2]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}
