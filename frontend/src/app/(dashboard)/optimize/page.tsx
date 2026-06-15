"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Battery, TrendingDown } from "lucide-react";

const schedule = [
  { time: "06:00 – 08:00", action: "Morning baseline load", load: "2.1 kW", source: "Grid", cost: "₹27", status: "Completed" },
  { time: "10:00 – 13:00", action: "Heavy machinery run", load: "8.4 kW", source: "Solar", cost: "₹0", status: "Scheduled" },
  { time: "13:00 – 15:00", action: "Battery charging", load: "3.0 kW", source: "Solar", cost: "₹0", status: "Scheduled" },
  { time: "14:00 – 15:00", action: "IEX DAM export", load: "7.6 kW", source: "Solar", cost: "-₹342", status: "Pending" },
  { time: "19:00 – 21:00", action: "Evening load from battery", load: "4.2 kW", source: "Battery", cost: "₹0", status: "Planned" },
];

export default function OptimizePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Optimization Engine</h1>
        <p className="text-slate-500 mt-1">OR-Tools powered load scheduling and cost minimization</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Today's Savings", value: "₹342", icon: TrendingDown, color: "text-green-500", bg: "bg-green-50" },
          { label: "Solar Utilization", value: "94%", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
          { label: "Battery Level", value: "78%", icon: Battery, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Peak Shifted", value: "3.2 kW", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-800">Optimized Daily Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Time Slot", "Action", "Load", "Source", "Cost/Revenue", "Status"].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-slate-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-xs text-slate-600">{row.time}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{row.action}</td>
                    <td className="py-3 px-4 text-slate-600">{row.load}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={
                        row.source === "Solar" ? "border-yellow-300 text-yellow-700" :
                        row.source === "Battery" ? "border-blue-300 text-blue-700" :
                        "border-slate-300 text-slate-700"
                      }>{row.source}</Badge>
                    </td>
                    <td className={`py-3 px-4 font-semibold ${row.cost.startsWith("-") ? "text-green-600" : "text-slate-700"}`}>
                      {row.cost}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        row.status === "Completed" ? "bg-slate-100 text-slate-600 hover:bg-slate-100" :
                        row.status === "Scheduled" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                        row.status === "Pending" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" :
                        "bg-purple-100 text-purple-700 hover:bg-purple-100"
                      }>{row.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="bg-slate-900 rounded-xl p-6 text-white">
        <h3 className="font-semibold text-lg mb-2">OR-Tools Optimization Result</h3>
        <p className="text-slate-400 text-sm mb-4">Linear programming solution for today's energy schedule</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Grid Import Cost", value: "₹27", sub: "Minimized from ₹312" },
            { label: "Solar Self-Consumption", value: "94%", sub: "Up from 67% baseline" },
            { label: "Net Revenue Today", value: "+₹315", sub: "After all costs" },
          ].map((item) => (
            <div key={item.label} className="bg-slate-800 rounded-lg p-4">
              <p className="text-2xl font-bold text-yellow-400">{item.value}</p>
              <p className="text-sm text-slate-300 mt-1">{item.label}</p>
              <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}