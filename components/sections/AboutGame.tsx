import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const capabilities = ["Conducir coches", "Explorar el mapa", "Caminar por sus calles"];

export default function AboutGame() {
  return (
    <section id="el-juego" className="relative bg-background py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="El juego"
            title="Una ciudad para recorrer"
            description="Recreación es una experiencia de Roblox basada en la recreación virtual de El Prat de Llobregat. Actualmente permite conducir coches, explorar el mapa y caminar por sus calles. El mapa se encuentra en constante desarrollo."
          />
        </Reveal>
        <Reveal delayMs={120}>
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {capabilities.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-border bg-surface px-6 py-5 text-center font-heading text-sm font-semibold uppercase tracking-wide text-foreground transition-colors duration-300 hover:border-accent/40"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
