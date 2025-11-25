import { AppShell, type UserRole } from "@/components/layout/app-shell";
import { PitchSection } from "@/components/sections/pitch";
import { ProductsSection } from "@/components/sections/products";
import { PricingSection } from "@/components/sections/pricing";
import { CacSection } from "@/components/sections/cac";

export default function Home() {
  const role: UserRole = "team";
  return (
    <AppShell role={role}>
      <PitchSection role={role} />
      <ProductsSection role={role} />
      <PricingSection role={role} />
      <CacSection role={role} />
    </AppShell>
  );
}
