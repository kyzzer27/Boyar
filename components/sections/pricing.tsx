import type { UserRole } from "@/components/layout/app-shell";
import { UploadDownloadPanel } from "@/components/shared/upload-download-panel";

export interface PricingSectionProps {
  readonly role: UserRole;
}

export function PricingSection({ role }: PricingSectionProps) {
  return (
    <section id="pricing" className="flex flex-col gap-6">
      <UploadDownloadPanel
        role={role}
        title="Pricing Documentation"
        description="Upload or download the latest pricing guides, models, and tier comparisons."
      />
    </section>
  );
}

