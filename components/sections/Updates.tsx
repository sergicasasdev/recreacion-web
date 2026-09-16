import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import UpdateCard from "@/components/ui/UpdateCard";
import { gameUpdates } from "@/lib/data/updates";

export default function Updates() {
  const [latest, ...previous] = gameUpdates;

  return (
    <section id="actualizaciones" className="bg-surface/40 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Actualizaciones" title="Historial de desarrollo" />
        </Reveal>

        <Reveal delayMs={100}>
          <article className="relative mt-12 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-surface to-surface-elevated p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Versión {latest.version}</Badge>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Más reciente
              </span>
              <time className="ml-auto text-sm font-medium text-muted">{latest.date}</time>
            </div>
            <h3 className="mt-6 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              {latest.title}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              {latest.description}
            </p>
          </article>
        </Reveal>

        {previous.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previous.map((update, index) => (
              <Reveal key={update.version} delayMs={index * 80}>
                <UpdateCard update={update} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
