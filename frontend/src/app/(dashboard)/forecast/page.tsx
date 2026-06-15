"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

export default function ForecastPage() {
  const [weekly, setWeekly] = useState<any[]>([]);
  const [hourly, setHourly] = useState<any[]>([]);
  const [accuracy, setAccuracy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://solix-swys.onrender.com/forecast/").then(r => r.json()),
      fetch("https://solix-swys.onrender.com/forecast/hourly").then(r => r.json()),
      fetch("https://solix-swys.onrender.com/forecast/accuracy").then(r => r.json()),
    ]).then(([w, h, a]) => {
      setWeekly(w);
      setHourly(h);
      setAccuracy(a);
      setLoading(false);
    });
  }, []);

  const totalSolar = weekly.reduce((a, r) => a + r.predicted_solar, 0).toFixed(1);
  const peakLoad = weekly.length ? Math.max(...weekly.map(r => r.predicted_load)).toFixed(1) : "—";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Forecasting Engine</h1>
        <p className="text-slate-500 mt-1">Prophet + LSTM powered predictions</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <p className="text-2xl font-bold text-slate-800">
              {loading ? "..." : `${accuracy?.accuracy}%`}
            </p>
            <p className="text-sm font-medium text-slate-600 mt-1">Forecast Accuracy</p>
            <p className="text-xs text-slate-400 mt-1">{accuracy?.model}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <p className="text-2xl font-bold text-slate-800">
              {loading ? "..." : `${totalSolar} kWh`}
            </p>
            <p className="text-sm font-medium text-slate-600 mt-1">7-Day Solar Forecast</p>
            <p className="text-xs text-slate-400 mt-1">High confidence</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <p className="text-2xl font-bold text-slate-800">
              {loading ? "..." : `${peakLoad} kWh`}
            </p>
            <p className="text-sm font-medium text-slate-600 mt-1">Peak Demand</p>
            <p className="text-xs text-slate-400 mt-1">Expected this week</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-slate-800">
              Energy Forecast
            </CardTitle>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              Live from API
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-slate-400 text-sm py-8 text-center">Loading forecast data...</p>
          ) : (
            <Tabs defaultValue="24h">
              <TabsList className="mb-4">
                <TabsTrigger value="24h">Next 24 Hours</TabsTrigger>
                <TabsTrigger value="7d">Next 7 Days</TabsTrigger>
              </TabsList>

              <TabsContent value="24h">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={hourly}>
                    <defs>
                      <linearGradient id="solar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="load" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="hour" tick={{ fontSize: 11 }} interval={2} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="predicted_solar" stroke="#facc15"
                      fill="url(#solar)" name="Solar (kWh)" strokeWidth={2} />
                    <Area type="monotone" dataKey="predicted_load" stroke="#3b82f6"
                      fill="url(#load)" name="Load (kWh)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="7d">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weekly}>
                    <defs>
                      <linearGradient id="solar7" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="forecast_date" tick={{ fontSize: 11 }}
                      tickFormatter={(v) => v.slice(5)} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="predicted_solar" stroke="#facc15"
                      fill="url(#solar7)" name="Solar (kWh)" strokeWidth={2} />
                    <Area type="monotone" dataKey="predicted_load" stroke="#3b82f6"
                      fill="none" name="Load (kWh)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>

                <div className="mt-4 grid grid-cols-7 gap-2">
                  {weekly.map((d, i) => (
                    <div key={i} className="text-center p-2 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-400">{d.forecast_date.slice(5)}</p>
                      <p className="text-sm font-bold text-yellow-600 mt-1">{d.predicted_solar}</p>
                      <p className="text-xs text-slate-500">kWh</p>
                      <p className="text-xs text-green-600 mt-1">{Math.round(d.confidence * 100)}%</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

