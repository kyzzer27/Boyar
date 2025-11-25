import Link from "next/link";
import { TabNav, type TabNavItem } from "@/components/navigation/tab-nav";

export type UserRole = "investor" | "team";

export interface AppShellProps {
  readonly children: React.ReactNode;
  readonly role?: UserRole;
}

const tabs: TabNavItem[] = [
  { id: "pitch", label: "Pitch", description: "Mission, deck, market intel" },
  { id: "products", label: "Products", description: "Services + collateral" },
  { id: "pricing", label: "Pricing", description: "Guides and models" },
  { id: "cac", label: "CAC", description: "Acquisition metrics" },
];

export function AppShell({ children, role = "investor" }: AppShellProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 lg:py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-xl font-semibold text-white">
                BP
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Boyar Partners
                </p>
                <p className="text-2xl font-semibold text-white">Investor Intelligence</p>
              </div>
            </Link>
            <div className="flex items-center gap-3 self-start rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-200 lg:self-auto">
              <span className="h-2 w-2 rounded-full bg-white" />
              {role === "team" ? "Team Access · edit + upload enabled" : "Investor Access · read only"}
            </div>
          </div>
          <TabNav items={tabs} activeId="pitch" />
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10 lg:py-14">
        {children}
      </main>
      <footer className="border-t border-white/10 bg-black/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-gray-400 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} Boyar Partners. All rights reserved.</p>
          <p>Questions? Contact investor-relations@boyarpartners.com · FINRA compliant.</p>
        </div>
      </footer>
    </div>
  );
}

