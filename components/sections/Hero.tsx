import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { HERO_IMAGE, ROBLOX_PLAY_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-background pt-16"
    >
      {HERO_IMAGE ? (
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-70" />
      )}

      <div aria-hidden="true" className="hero-glow absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/85"
      />

      <Container className="relative">
        <div className="max-w-3xl">
          <h1 className="font-heading text-5xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Recreación
            <span className="mt-3 block text-2xl text-accent sm:text-3xl lg:text-4xl">
              El Prat de Llobregat
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Una recreación virtual de El Prat de Llobregat en Roblox. Explora la
            ciudad, recorre sus calles y conduce diferentes vehículos mientras
            descubres un mapa en constante desarrollo.
          </p>
          <div className="mt-10">
            <Button href={ROBLOX_PLAY_URL} external disabled={!ROBLOX_PLAY_URL}>
              Jugar ahora
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
