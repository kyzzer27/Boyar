"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { UserRole } from "@/components/layout/app-shell";

interface FileMeta {
  readonly name: string;
  readonly size: number;
  readonly uploadedAt: string;
  readonly url: string;
}

export interface UploadDownloadPanelProps {
  readonly role: UserRole;
  readonly title: string;
  readonly description: string;
}

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const idx = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, idx);
  return `${value.toFixed(1)} ${units[idx]}`;
}

export function UploadDownloadPanel({ role, title, description }: UploadDownloadPanelProps) {
  const [fileMeta, setFileMeta] = useState<FileMeta | null>(null);
  const canUpload = role === "team";

  useEffect(() => {
    return () => {
      if (fileMeta?.url) URL.revokeObjectURL(fileMeta.url);
    };
  }, [fileMeta]);

  const handleUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const uploadedAt = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const url = URL.createObjectURL(file);
    setFileMeta({
      name: file.name,
      size: file.size,
      uploadedAt,
      url,
    });
    event.target.value = "";
  }, []);

  const handleDownload = useCallback(() => {
    if (!fileMeta) return;
    const link = document.createElement("a");
    link.href = fileMeta.url;
    link.download = fileMeta.name;
    link.click();
  }, [fileMeta]);

  const metaDescription = useMemo(() => {
    if (!fileMeta) return "No file uploaded yet.";
    return `${fileMeta.name} · ${formatBytes(fileMeta.size)} · Updated ${fileMeta.uploadedAt}`;
  }, [fileMeta]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">{title}</p>
          <p className="mt-1 text-base text-gray-300">{description}</p>
          <p className="mt-2 text-sm text-gray-500">{metaDescription}</p>
        </div>
        <div className="flex gap-3">
          {canUpload ? (
            <label className="inline-flex cursor-pointer items-center rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/50">
              Upload PDF
              <input
                type="file"
                accept="application/pdf"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          ) : null}
          <button
            onClick={handleDownload}
            disabled={!fileMeta}
            className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/50 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-gray-500"
          >
            Save PDF
          </button>
        </div>
      </div>
      {!canUpload ? (
        <p className="mt-4 text-xs text-gray-500">
          Investor view: waiting for the team to publish the latest document.
        </p>
      ) : (
        <p className="mt-4 text-xs text-gray-500">
          Team view: uploading replaces the current file for all investors.
        </p>
      )}
    </div>
  );
}

