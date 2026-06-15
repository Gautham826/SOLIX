"use client";
import React from "react";
import { Zap, TrendingUp, Battery, BarChart3, ArrowRight, Sun, Shield, Globe } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: TrendingUp, title: "AI Forecasting", desc: "Prophet + LSTM models predict solar generation and demand with 94%+ accuracy", color: "text-yellow-500", bg: "bg-yellow-50" },
  { icon: Battery, title: "Surplus Optimization", desc: "Automatically identify and monetize excess solar energy via IEX DAM/RTM markets", color: "text-green-500", bg: "bg-green-50" },
  { icon: BarChart3, title: "OR-Tools Scheduling", desc: "Linear programming optimizes appliance scheduling to minimize grid import costs", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Shield, title: "TNEB Integration", desc: "Works with existing TNEB/TANGEDCO meter data — no new hardware required", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: Globe, title: "IEX Market Access", desc: "Enables small prosumers to participate in energy markets through aggregators", color: "text-red-500", bg: "bg-red-50" },
  { icon: Sun, title: "Weather Intelligence", desc: "Real-time weather data adjusts forecasts for cloud cover, temperature, and rain", color: "text-orange-500", bg: "bg-orange-50" },
];

const stats = [
  { value: "15–25%", label: "Cost Reduction" },
  { value: "94.2%", label: "Forecast Accuracy" },
  { value: "₹342", label: "Daily Revenue Potential" },
  { value: "0", label: "Hardware Changes Needed" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-slate-900" />
          </div>
          <span className="text-xl font-bold text-yellow-400">SOLIX</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-slate-300 hover:text-white text-sm transition-colors">
            Login
          </Link>
          <Link href="/register"
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-24 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-1.5 mb-6">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <span className="text-yellow-400 text-sm font-medium">AI for Social Impact • CHEMOVATE 2.0</span>
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Transform Rooftop Solar Into{" "}
          <span className="text-yellow-400">Intelligent Energy Revenue</span>
        </h1>
        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
          SOLIX is an AI-powered retrofit layer that integrates with existing TNEB/TANGEDCO systems
          to forecast, optimise, and automate energy decisions for households, MSMEs, and factories.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/register"
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold px-6 py-3 rounded-xl transition-colors">
            Start Optimizing <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard"
            className="flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 px-6 py-3 rounded-xl transition-colors">
            View Demo
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800 py-12 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-yellow-400">{stat.value}</p>
              <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Everything You Need</h2>
        <p className="text-slate-400 text-center mb-12">
          A complete energy intelligence stack built for Tamil Nadu's prosumers
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-yellow-400/30 transition-colors">
                <div className={`w-10 h-10 ${f.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 text-center border-t border-slate-800">
        <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Energy?</h2>
        <p className="text-slate-400 mb-8">Join SOLIX and start turning surplus solar into revenue</p>
        <Link href="/register"
          className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold px-8 py-3 rounded-xl transition-colors">
          Create Free Account <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-8 py-6 text-center">
        <p className="text-slate-500 text-sm">
          SOLIX v1.0 • Built by NexaGrid • CHEMOVATE 2.0 — AI for Social Impact
        </p>
      </footer>
    </div>
  );
}