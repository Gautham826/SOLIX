"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle, FileText, AlertCircle, Loader2 } from "lucide-react";

const expectedColumns = ["timestamp", "consumption_kwh", "solar_generation_kwh"];

export default function IngestionPage() {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<any[]>([]);
  const [fileName, setFileName] = useState("");

  async function handleFile(file: File) {
    if (!file.name.endsWith(".csv")) {
      setError("Please upload a CSV file only.");
      return;
    }

    setFileName(file.name);
    setError("");
    setResult(null);

    // Preview first 6 rows
    const text = await file.text();
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",").map(h => h.trim());
    const rows = lines.slice(1, 7).map(line => {
      const values = line.split(",");
      return headers.reduce((obj: any, h, i) => {
        obj[h] = values[i]?.trim();
        return obj;
      }, {});
    });
    setPreview(rows);

    // Upload to backend
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://127.0.0.1:8000/meter/upload-csv", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.detail || "Upload failed");
      }
    } catch {
      setError("Could not connect to server");
    }
    setUploading(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Data Ingestion</h1>
        <p className="text-slate-500 mt-1">Upload meter data CSVs to power your energy intelligence</p>
      </div>

      {/* Format Guide */}
      <Card className="border-0 shadow-sm bg-slate-50">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-slate-700 mb-2">Expected CSV Format:</p>
          <code className="text-xs text-slate-600 bg-white px-3 py-2 rounded-lg block">
            timestamp, consumption_kwh, solar_generation_kwh
          </code>
          <p className="text-xs text-slate-400 mt-2">
            Example: 2026-06-15 09:00:00, 4.8, 9.4
          </p>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              dragging
                ? "border-yellow-400 bg-yellow-50"
                : "border-slate-200 hover:border-yellow-300 hover:bg-slate-50"
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
                <p className="text-lg font-semibold text-slate-700">Uploading {fileName}...</p>
                <p className="text-sm text-slate-500">Validating and storing in database</p>
              </div>
            ) : result ? (
              <div className="flex flex-col items-center gap-3">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <p className="text-lg font-semibold text-green-700">{fileName} uploaded successfully!</p>
                <p className="text-sm text-slate-500">{result.message}</p>
                <button
                  onClick={() => { setResult(null); setPreview([]); setFileName(""); }}
                  className="mt-2 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-700"
                >
                  Upload Another
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-3">
                <Upload className="w-12 h-12 text-slate-400" />
                <p className="text-lg font-semibold text-slate-700">Drop your CSV file here</p>
                <p className="text-sm text-slate-500">or click to browse</p>
                <div className="mt-2 bg-slate-100 rounded-lg px-4 py-2">
                  <p className="text-xs text-slate-500 font-mono">
                    timestamp, consumption_kwh, solar_generation_kwh
                  </p>
                </div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Table */}
      {preview.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Data Preview
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 ml-2">
                First 6 rows
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    {expectedColumns.map(col => (
                      <th key={col} className="text-left py-3 px-4 text-slate-500 font-medium">
                        {col}
                      </th>
                    ))}
                    <th className="text-left py-3 px-4 text-slate-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono text-xs text-slate-600">
                        {row.timestamp}
                      </td>
                      <td className="py-3 px-4 text-slate-700">{row.consumption_kwh}</td>
                      <td className="py-3 px-4 text-slate-700">{row.solar_generation_kwh}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" /> Valid
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

