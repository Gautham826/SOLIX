"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, Sun, Zap, IndianRupee } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-1">Configure your energy profile and preferences</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-500" /> Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="Chennai" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" defaultValue="Tamil Nadu" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" defaultValue="600001" className="max-w-xs" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <Sun className="w-4 h-4 text-yellow-500" /> Solar Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Solar Capacity (kW)</Label>
              <Input id="capacity" defaultValue="5" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="panels">Number of Panels</Label>
              <Input id="panels" defaultValue="20" type="number" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="install">Installation Date</Label>
            <Input id="install" defaultValue="2024-01-15" type="date" className="max-w-xs" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-green-500" /> Energy Tariff
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="import">Import Tariff (₹/kWh)</Label>
              <Input id="import" defaultValue="6.50" type="number" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="export">Export Rate (₹/kWh)</Label>
              <Input id="export" defaultValue="4.50" type="number" step="0.01" />
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="discom">DISCOM Provider</Label>
            <Input id="discom" defaultValue="TANGEDCO" />
          </div>
        </CardContent>
      </Card>

      <button className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors">
        Save Settings
      </button>
    </div>
  );
}