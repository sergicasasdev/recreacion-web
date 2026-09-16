import Image from "next/image";
import type { CityZone } from "@/lib/data/zones";
import Badge from "./Badge";

type ZoneCardProps = {
  zone: CityZone;
  onImageClick?: () => void;
};

export default function ZoneCard({ zone, onImageClick }: ZoneCardProps) {
  const media = zone.image ? (
    <Image
      src={zone.image}
      alt={`Vista de ${zone.name} en Recreación`}
      fill
      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
    />
  ) : (
    <div
      aria-hidden="true"
      className="media-placeholder h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
    />
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_45px_-28px_var(--accent-soft)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-elevated">
        {onImageClick ? (
          <button
            type="button"
            onClick={onImageClick}
            aria-label={`Ampliar vista de ${zone.name}`}
            className="absolute inset-0 h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {media}
          </button>
        ) : (
          media
        )}
        <span className="absolute left-3 top-3">
          <Badge>{zone.status}</Badge>
        </span>
      </div>
      <div className="space-y-2 p-5">
        <h3 className="font-heading text-lg font-semibold tracking-wide text-foreground">
          {zone.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{zone.description}</p>
      </div>
    </article>
  );
}
