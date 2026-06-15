"use client";
import { type ElementType } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, TrendingDown, DollarSign, Battery, Sun, AlertTriangle, CheckCircle } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";

const energyData = [
  { time: "00:00", solar: 0, consumption: 2.1, surplus: 0 },
  { time: "03:00", solar: 0, consumption: 1.8, surplus: 0 },
  { time: "06:00", solar: 1.2, consumption: 2.5, surplus: 0 },
  { time: "09:00", solar: 8.4, consumption: 4.2, surplus: 4.2 },
  { time: "12:00", solar: 12.6, consumption: 5.1, surplus: 7.5 },
  { time: "15:00", solar: 10.2, consumption: 6.3, surplus: 3.9 },
  { time: "18:00", solar: 3.1, consumption: 7.8, surplus: 0 },
  { time: "21:00", solar: 0, consumption: 4.2, surplus: 0 },
];

const weeklyData = [
  { day: "Mon", generated: 42, consumed: 31, exported: 11 },
  { day: "Tue", generated: 38, consumed: 29, exported: 9 },
  { day: "Wed", generated: 51, consumed: 34, exported: 17 },
  { day: "Thu", generated: 45, consumed: 32, exported: 13 },
  { day: "Fri", generated: 39, consumed: 35, exported: 4 },
  { day: "Sat", generated: 55, consumed: 28, exported: 27 },
  { day: "Sun", generated: 48, consumed: 25, exported: 23 },
];

const kpis = [
  {
    title: "Solar Generated",
    value: "18.4 kWh",
    change: "+12% vs yesterday",
    trend: "up",
    icon: Sun,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    title: "Current Consumption",
    value: "5.2 kWh",
    change: "-8% vs yesterday",
    trend: "down",
    icon: Zap,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "Surplus Available",
    value: "7.6 kWh",
    change: "Ready to export",
    trend: "up",
    icon: Battery,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    title: "Est. Revenue",
    value: "₹ 342",
    change: "From IEX export",
    trend: "up",
    icon: DollarSign,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

const alerts = [
  {
    type: "warning",
    title: "Smart Recommendation",
    message: "Export 7.6 kWh to IEX DAM at 14:00 — Expected revenue: ₹342",
    badge: "Act Now",
    badgeColor: "bg-yellow-400 text-yellow-900",
    bg: "bg-yellow-50 border-yellow-200",
    icon: AlertTriangle,
    iconColor: "text-yellow-600",
  },
  {
    type: "success",
    title: "Forecast Update",
    message: "Tomorrow's solar forecast: 46.8 kWh — 94.2% confidence (Prophet + LSTM)",
    badge: "AI Forecast",
    badgeColor: "bg-green-500 text-white",
    bg: "bg-green-50 border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Energy Overview</h1>
          <p className="text-slate-500 mt-1">
            Today's real-time energy intelligence • June 15, 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-600 font-medium">Live</span>
        </div>
      </div>

      {/* Alert Banners */}
      <div className="space-y-3">
        {alerts.map((alert, i) => {
          const Icon = alert.icon as ElementType;
          return (
            <div key={i} className={`border rounded-lg p-4 flex items-center gap-3 ${alert.bg}`}>
              <Icon className={`w-5 h-5 shrink-0 ${alert.iconColor}`} />
              <div>
                <p className="text-sm font-medium text-slate-800">{alert.title}</p>
                <p className="text-sm text-slate-600">{alert.message}</p>
              </div>
              <Badge className={`ml-auto shrink-0 ${alert.badgeColor} hover:${alert.badgeColor}`}>
                {alert.badge}
              </Badge>
            </div>
          );
        })}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon as ElementType;
          return (
            <Card key={kpi.title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 ${kpi.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  {kpi.trend === "up"
                    ? <TrendingUp className="w-4 h-4 text-green-500" />
                    : <TrendingDown className="w-4 h-4 text-red-500" />}
                </div>
                <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
                <p className="text-sm text-slate-500 mt-1">{kpi.title}</p>
                <p className="text-xs text-green-600 mt-2 font-medium">{kpi.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-800">
                Today's Energy Flow
              </CardTitle>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={energyData}>
                <defs>
                  <linearGradient id="solar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="consumption" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="solar" stroke="#facc15"
                  fill="url(#solar)" name="Solar (kWh)" strokeWidth={2} />
                <Area type="monotone" dataKey="consumption" stroke="#3b82f6"
                  fill="url(#consumption)" name="Consumption (kWh)" strokeWidth={2} />
                <Area type="monotone" dataKey="surplus" stroke="#22c55e"
                  fill="none" name="Surplus (kWh)" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-800">
                Weekly Energy Summary
              </CardTitle>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">7 Days</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="generated" fill="#facc15" name="Generated (kWh)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="consumed" fill="#3b82f6" name="Consumed (kWh)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="exported" fill="#22c55e" name="Exported (kWh)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "CO₂ Saved", value: "24.6 kg", sub: "Today" },
          { label: "Trees Equivalent", value: "1.2", sub: "Trees saved" },
          { label: "Grid Independence", value: "78%", sub: "Self-sufficient" },
          { label: "Monthly Savings", value: "₹8,240", sub: "This month" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm bg-slate-900 text-white">
            <CardContent className="p-4">
              <p className="text-xl font-bold text-yellow-400">{stat.value}</p>
              <p className="text-sm text-slate-300 mt-1">{stat.label}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

