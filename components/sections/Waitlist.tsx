import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WaitlistPanel from "./WaitlistPanel";

export default function Waitlist() {
  return (
    <section
      id="lista-de-espera"
      className="relative overflow-hidden bg-surface/40 py-24 sm:py-32"
    >
      <div aria-hidden="true" className="waitlist-halo absolute inset-0" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Lista de espera"
            title="Entra antes que nadie"
            description="Únete a la lista de espera de RECREACIÓN y consigue acceso a contenido y ventajas exclusivas del juego."
          />
        </Reveal>
        <Reveal delayMs={120} className="mt-12">
          <WaitlistPanel />
        </Reveal>
      </Container>
    </section>
  );
}
