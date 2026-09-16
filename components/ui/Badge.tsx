import type { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent-soft px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-wider text-accent">
      {children}
    </span>
  );
}
