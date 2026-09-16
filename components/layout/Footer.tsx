import Image from "next/image";
import Container from "@/components/ui/Container";
import { navLinks } from "@/lib/data/nav";
import { LOGO_IMAGE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40 py-12">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src={LOGO_IMAGE}
              alt=""
              width={160}
              height={107}
              className="h-8 w-auto rounded-md object-contain"
            />
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
              Recreación — El Prat de Llobregat
            </p>
          </div>
          <nav aria-label="Enlaces de pie de página">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-border pt-6 text-xs leading-relaxed text-muted">
          <p>© 2026 RECREACIÓN</p>
          <p className="mt-2 max-w-2xl">
            Este proyecto es una experiencia independiente de Roblox y no está
            afiliado oficialmente con el Ayuntamiento de El Prat de Llobregat.
          </p>
        </div>
      </Container>
    </footer>
  );
}
