import type { GameUpdate } from "@/lib/data/updates";
import Badge from "./Badge";

export default function UpdateCard({ update }: { update: GameUpdate }) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Versión {update.version}</Badge>
        <time className="text-xs font-medium text-muted">{update.date}</time>
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
        {update.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{update.description}</p>
    </article>
  );
}
