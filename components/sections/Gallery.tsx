import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "./GalleryGrid";

export default function Gallery() {
  return (
    <section id="galeria" className="bg-background py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Galería"
            title="Capturas del juego"
            description="Un vistazo al mapa de Recreación. Las imágenes se irán añadiendo a medida que el desarrollo avance."
          />
        </Reveal>
        <Reveal delayMs={120}>
          <GalleryGrid />
        </Reveal>
      </Container>
    </section>
  );
}
