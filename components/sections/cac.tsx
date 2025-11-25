import type { UserRole } from "@/components/layout/app-shell";
import { UploadDownloadPanel } from "@/components/shared/upload-download-panel";

export interface CacSectionProps {
  readonly role: UserRole;
}

export function CacSection({ role }: CacSectionProps) {
  return (
    <section id="cac" className="flex flex-col gap-6">
      <UploadDownloadPanel
        role={role}
        title="CAC Documentation"
        description="Upload or download CAC reports, acquisition data, and LTV analyses."
      />
    </section>
  );
}

