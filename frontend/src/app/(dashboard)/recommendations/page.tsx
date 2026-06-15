"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Clock, TrendingUp, Zap, Battery } from "lucide-react";
import { fetchRecommendations } from "@/lib/api";

const iconMap: Record<string, any> = {
  high: TrendingUp,
  medium: Zap,
  low: Battery,
};

export default function RecommendationsPage() {
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations().then((data) => {
      setRecs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Smart Recommendations</h1>
        <p className="text-slate-500 mt-1">AI-generated actions to maximise savings and revenue</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Potential Savings", value: `₹${recs.reduce((a, r) => a + (r.saving_amount || 0), 0)}`, sub: "Today" },
          { label: "Actions Available", value: recs.length.toString(), sub: "Pending review" },
          { label: "Implemented This Week", value: "12", sub: "Actions taken" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm font-medium text-slate-600 mt-1">{stat.label}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading recommendations...</p>
      ) : (
        <div className="space-y-4">
          {recs.map((rec) => {
            const Icon = iconMap[rec.priority] || Lightbulb;
            return (
              <Card key={rec.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-800">{rec.recommendation}</h3>
                        <Badge className={
                          rec.priority === "high"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        }>{rec.priority}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {rec.action_time}
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          Expected Saving: ₹{rec.saving_amount}
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors">
                      Apply
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

