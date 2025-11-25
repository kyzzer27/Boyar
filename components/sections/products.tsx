import type { UserRole } from "@/components/layout/app-shell";
import { UploadDownloadPanel } from "@/components/shared/upload-download-panel";

export interface ProductsSectionProps {
  readonly role: UserRole;
}

export function ProductsSection({ role }: ProductsSectionProps) {
  return (
    <section id="products" className="flex flex-col gap-6">
      <UploadDownloadPanel
        role={role}
        title="Product Collateral"
        description="Upload or download the latest brochures, service sheets, and adoption summaries."
      />
    </section>
  );
}

