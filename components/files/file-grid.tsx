interface FileAsset {
  readonly name: string;
  readonly type: "pdf" | "excel";
  readonly size: string;
  readonly updated: string;
}

interface FileGridProps {
  readonly title: string;
  readonly files: FileAsset[];
  readonly canManage?: boolean;
}

const typeStyles: Record<FileAsset["type"], string> = {
  pdf: "text-white border-white/40",
  excel: "text-gray-300 border-gray-500/40",
};

export function FileGrid({ title, files, canManage }: FileGridProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Files</p>
          <p className="text-xl font-semibold text-white">{title}</p>
        </div>
        {canManage ? (
          <button className="ml-auto rounded-full border border-white/15 px-4 py-1.5 text-sm text-white transition hover:border-white/40">
            Upload
          </button>
        ) : null}
      </div>
      {files.length ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/50 px-4 py-3"
            >
              <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em] ${typeStyles[file.type]}`}>
                {file.type}
              </span>
              <div className="flex flex-1 flex-col">
                <p className="font-medium text-white">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {file.size} · Updated {file.updated}
                </p>
              </div>
              <button className="rounded-full border border-white/15 px-4 py-1 text-sm text-white transition hover:border-white/40">
                Download
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-black/30 p-6 text-sm text-gray-400">
          No files uploaded yet. {canManage ? "Add PDFs or Excel workbooks to share with investors." : "Check back once the team publishes supporting documents."}
        </div>
      )}
    </div>
  );
}

