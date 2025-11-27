import type { UserRole } from "@/components/layout/app-shell";

export interface ProductsSectionProps {
  readonly role: UserRole;
}

export function ProductsSection({ role }: ProductsSectionProps) {
  return (
    <section id="products" className="rounded-3xl border border-dashed border-white/15 bg-black/30 p-8 text-center text-sm text-gray-400">
      Products workspace for role <span className="text-white">{role}</span> is blank for now.
    </section>
  );
}








