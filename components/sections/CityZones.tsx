import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CityZonesGrid from "./CityZonesGrid";

export default function CityZones() {
  return (
    <section id="la-ciudad" className="bg-surface/40 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="La ciudad"
            title="Zonas en desarrollo"
            description="El mapa de Recreación se construye por fases. Estas son las zonas en las que se está trabajando actualmente."
          />
        </Reveal>
        <CityZonesGrid />
      </Container>
    </section>
  );
}
