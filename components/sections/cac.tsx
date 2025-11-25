import type { UserRole } from "@/components/layout/app-shell";

export interface CacSectionProps {
  readonly role: UserRole;
}

export function CacSection({ role }: CacSectionProps) {
  return (
    <section id="cac" className="rounded-3xl border border-dashed border-white/15 bg-black/30 p-8 text-center text-sm text-gray-400">
      CAC workspace for role <span className="text-white">{role}</span> is blank for now.
    </section>
  );
}

