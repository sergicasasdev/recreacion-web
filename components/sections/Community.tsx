import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SocialButton from "@/components/ui/SocialButton";
import { socialLinks } from "@/lib/data/social";

export default function Community() {
  return (
    <section id="comunidad" className="bg-background py-24 sm:py-32">
      <Container className="text-center">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
            Forma parte de Recreación
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            Descubre el proyecto, juega con otros jugadores y mantente al día de
            las novedades.
          </p>
        </Reveal>
        <Reveal delayMs={120}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <SocialButton key={social.id} social={social} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
