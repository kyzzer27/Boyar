export interface TabNavItem {
  readonly id: string;
  readonly label: string;
  readonly description: string;
}

interface TabNavProps {
  readonly items: TabNavItem[];
  readonly activeId?: string;
}

export function TabNav({ items, activeId }: TabNavProps) {
  return (
    <nav className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-6">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`group flex flex-1 flex-col rounded-2xl border px-4 py-3 transition ${
              isActive
                ? "border-white/70 bg-white/10 text-white"
                : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:bg-white/10"
            }`}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-gray-300">
              {item.label}
            </span>
            <span className="text-base font-medium text-white/90">{item.description}</span>
          </a>
        );
      })}
    </nav>
  );
}

