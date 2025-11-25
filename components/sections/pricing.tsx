import type { UserRole } from "@/components/layout/app-shell";

export interface PricingSectionProps {
  readonly role: UserRole;
}

export function PricingSection({ role }: PricingSectionProps) {
  return (
    <section id="pricing" className="rounded-3xl border border-dashed border-white/15 bg-black/30 p-8 text-center text-sm text-gray-400">
      Pricing workspace for role <span className="text-white">{role}</span> is blank for now.
    </section>
  );
}

