"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Upload, Trash2, Database, Loader2, Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import { TruckLoader } from "@/components/ui/truck-loader";
import rocketAnim from "@/assets/rocket.json";

interface DatasetColumn {
  id: string;
  name: string;
  key: string;
  type: string;
}

interface Dataset {
  id: string;
  name: string;
  rowCount: number;
  createdAt: string;
  columns: DatasetColumn[];
}

export default function CustomersPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingRows, setLoadingRows] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [showLaunch, setShowLaunch] = useState(false);
  const [page, setPage] = useState(1);
  const [rowMeta, setRowMeta] = useState({ total: 0, totalPages: 1 });

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const d = await api.get<Dataset[]>("/datasets");
        if (cancelled) return;
        setDatasets(d);
        if (d.length > 0) setActiveId((prev) => prev ?? d[0].id);
        else setActiveId(null);
      } catch {
        if (!cancelled) toast.error("Couldn't load datasets");
      } finally {
        if (!cancelled) setLoadingList(false);
      }
    }
    init();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!activeId) return;
    let cancelled = false;
    async function fetchRows(id: string, p: number) {
      try {
        setLoadingRows(true);
        const res = await api.get<{
          rows: Record<string, unknown>[];
          total: number;
          totalPages: number;
        }>(`/datasets/${id}/rows?page=${p}&pageSize=50`);
        if (!cancelled) {
          setRows(res.rows);
          setRowMeta({ total: res.total, totalPages: res.totalPages });
        }
      } catch {
        if (!cancelled) {
          toast.error("Couldn't load rows");
          setRows([]);
        }
      } finally {
        if (!cancelled) setLoadingRows(false);
      }
    }
    fetchRows(activeId, page);
    return () => {
      cancelled = true;
    };
  }, [activeId, page]);

  async function refreshDatasets() {
    try {
      const d = await api.get<Dataset[]>("/datasets");
      setDatasets(d);
      return d;
    } catch {
      toast.error("Couldn't load datasets");
      return [];
    }
  }

  async function handleFile(file: File) {
    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a .csv file");
      return;
    }
    setUploading(true);
    try {
      const csv = await file.text();
      const name = file.name.replace(/\.csv$/i, "");
      const created = await api.post<Dataset>("/datasets/upload", {
        name,
        csv,
      });
      toast.success(`Uploaded "${created.name}" — ${created.rowCount} rows`);
      setShowLaunch(true);
      setTimeout(() => setShowLaunch(false), 2500);
      await refreshDatasets();
      setActiveId(created.id);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      await api.delete(`/datasets/${id}`);
      toast.success("Dataset deleted");
      const remaining = datasets.filter((d) => d.id !== id);
      setDatasets(remaining);
      if (activeId === id) setActiveId(remaining[0]?.id ?? null);
      if (remaining.length === 0) setRows([]);
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  const active = datasets.find((d) => d.id === activeId);
  const columns =
    rows.length > 0
      ? Object.keys(rows[0])
      : (active?.columns.map((c) => c.key) ?? []);

  const formatCell = (v: unknown): string => {
    if (v === null || v === undefined) return "—";
    if (typeof v === "number") return v.toLocaleString("en-IN");
    return String(v);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {showLaunch && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
          <Lottie
            animationData={rocketAnim}
            loop={false}
            className="w-72 h-72"
          />
          <p className="text-lg font-semibold text-slate-700 -mt-6">
            Dataset launched! 🚀
          </p>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Your Data
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload a CSV — the AI adapts to whatever columns you bring.
          </p>
        </div>
        {datasets.length > 0 && (
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 shadow-sm"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? "Uploading…" : "Upload CSV"}
          </button>
        )}
      </div>

      {loadingList ? (
        <div className="flex min-h-[400px] w-full items-center justify-center text-slate-400">
          <TruckLoader />
        </div>
      ) : datasets.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div
            onClick={() => !uploading && fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files?.[0];
              if (f) handleFile(f);
            }}
            className={`group relative w-full max-w-md cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all ${
              dragging
                ? "border-blue-500 bg-blue-50 scale-[1.02]"
                : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
            }`}
          >
            {/* subtle decorative grid */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.03] [background-image:radial-gradient(circle,_#1e293b_1px,_transparent_1px)] [background-size:16px_16px]" />

            <div className="relative flex flex-col items-center">
              <div
                className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-5 transition-all ${
                  uploading
                    ? "bg-blue-600"
                    : "bg-gradient-to-br from-blue-500 to-blue-600 group-hover:scale-105 group-hover:rotate-3"
                } shadow-lg shadow-blue-600/20`}
              >
                {uploading ? (
                  <Loader2 className="h-7 w-7 text-white animate-spin" />
                ) : (
                  <Upload className="h-7 w-7 text-white" />
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                {uploading
                  ? "Uploading your data…"
                  : "Upload your first dataset"}
              </h2>
              <p className="text-sm text-slate-500 mt-2 max-w-xs leading-relaxed">
                {uploading
                  ? "Parsing rows and detecting column types — one moment."
                  : "Drop a CSV here or click to browse. The AI adapts to whatever columns you bring — customers, products, anything."}
              </p>

              {!uploading && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-2.5 text-sm font-medium shadow-sm group-hover:bg-blue-700 transition-colors">
                  <Upload className="h-4 w-4" />
                  Choose a CSV file
                </div>
              )}
            </div>
          </div>

          {/* tiny helper row */}
          {!uploading && (
            <div className="mt-6 flex items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5" /> Any schema
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> AI-ready instantly
              </span>
              <span>· CSV up to 5,000 rows</span>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {datasets.map((d) => (
              <div
                key={d.id}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm cursor-pointer transition-colors ${
                  d.id === activeId
                    ? "border-blue-300 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => {
                  setActiveId(d.id);
                  setPage(1);
                }}
              >
                <Database className="h-4 w-4" />
                <span className="font-medium">{d.name}</span>
                <span className="text-xs opacity-60">{d.rowCount}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(d.id, d.name);
                  }}
                  disabled={deletingId === d.id}
                  className="ml-1 text-slate-400 hover:text-red-600"
                >
                  {deletingId === d.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-x-auto shadow-sm">
            {loadingRows ? (
              <div className="flex justify-center py-16 text-slate-400">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : rows.length === 0 ? (
              <div className="py-16 text-center text-sm text-slate-400">
                No rows in this dataset.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-xs">
                    {columns.map((c) => (
                      <th key={c} className="px-4 py-3 text-left font-medium">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      {columns.map((c) => (
                        <td key={c} className="px-4 py-2.5 text-slate-700">
                          {formatCell(row[c])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {rowMeta.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-500">
                Page {page} of {rowMeta.totalPages} · {rowMeta.total} rows
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1 || loadingRows}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(rowMeta.totalPages, p + 1))
                  }
                  disabled={page >= rowMeta.totalPages || loadingRows}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
