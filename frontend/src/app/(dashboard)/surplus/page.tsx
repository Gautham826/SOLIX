"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Battery, TrendingUp, Zap, Loader2 } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import { fetchSurplus } from "@/lib/api";

const COLORS = ["#3b82f6", "#22c55e", "#facc15"];

const surplusHistory = [
  { date: "Jun 9", surplus: 5.2 },
  { date: "Jun 10", surplus: 8.1 },
  { date: "Jun 11", surplus: 3.4 },
  { date: "Jun 12", surplus: 9.7 },
  { date: "Jun 13", surplus: 6.3 },
  { date: "Jun 14", surplus: 7.6 },
  { date: "Jun 15", surplus: 0 },
];

export default function SurplusPage() {
  const [surplus, setSurplus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurplus().then((data) => {
      setSurplus(data);
      setLoading(false);
      // Update today's surplus in history
      surplusHistory[6].surplus = data.surplus;
    });
  }, []);

  const pieData = surplus ? [
    { name: "Consumed", value: surplus.consumed },
    { name: "Surplus", value: surplus.surplus },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Surplus Analysis</h1>
        <p className="text-slate-500 mt-1">Track and monetise your excess solar energy</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Solar Generated",
            value: loading ? "..." : `${surplus?.solar_generated} kWh`,
            icon: Zap,
            color: "text-yellow-500",
            bg: "bg-yellow-50"
          },
          {
            label: "Energy Consumed",
            value: loading ? "..." : `${surplus?.consumed} kWh`,
            icon: Battery,
            color: "text-blue-500",
            bg: "bg-blue-50"
          },
          {
            label: "Surplus Available",
            value: loading ? "..." : `${surplus?.surplus} kWh`,
            icon: TrendingUp,
            color: "text-green-500",
            bg: "bg-green-50"
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                ) : (
                  <p className="text-2xl font-bold text-slate-800">{item.value}</p>
                )}
                <p className="text-sm text-slate-500 mt-1">{item.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Formula Banner */}
      {surplus && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-green-800">
              Surplus = Solar Generated − Energy Consumed
            </p>
            <p className="text-green-700 text-sm mt-1">
              {surplus.solar_generated} kWh − {surplus.consumed} kWh ={" "}
              <span className="font-bold">{surplus.surplus} kWh surplus</span> •
              Est. Revenue:{" "}
              <span className="font-bold">₹{surplus.export_revenue_estimate}</span>
            </p>
          </div>
          <Badge className="bg-green-500 hover:bg-green-500 text-white">
            Live from DB
          </Badge>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-800">
              Today's Energy Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value} kWh`}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-800">
              7-Day Surplus Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={surplusHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="surplus" fill="#22c55e" name="Surplus (kWh)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

