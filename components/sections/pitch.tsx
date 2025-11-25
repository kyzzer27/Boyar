import type { UserRole } from "@/components/layout/app-shell";
import { UploadDownloadPanel } from "@/components/shared/upload-download-panel";

export interface PitchSectionProps {
  readonly role: UserRole;
}

export function PitchSection({ role }: PitchSectionProps) {
  return (
    <section id="pitch" className="flex flex-col gap-6">
      <UploadDownloadPanel
        role={role}
        title="Pitch Materials"
        description="Upload or download the latest pitch decks and market highlights."
      />
    </section>
  );
}

