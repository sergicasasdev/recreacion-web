"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data/nav";
import { LOGO_IMAGE, SITE_NAME } from "@/lib/constants";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a
          href="#inicio"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 font-heading text-lg font-bold tracking-wide text-foreground"
        >
          <Image
            src={LOGO_IMAGE}
            alt=""
            width={160}
            height={107}
            loading="eager"
            className="h-9 w-auto rounded-md object-contain"
          />
          {SITE_NAME}
        </a>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:text-accent md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
      >
        <ul className="flex flex-col gap-1 px-5 py-4 text-base font-medium text-foreground">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 transition-colors hover:bg-surface hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
