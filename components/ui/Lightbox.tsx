"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ImagePlaceholderIcon,
} from "./icons";

export type LightboxItem = {
  src?: string;
  alt: string;
};

type LightboxProps = {
  items: LightboxItem[];
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, onClose, onPrev, onNext]);

  if (activeIndex === null) return null;

  const active = items[activeIndex];
  if (!active) return null;

  const showArrows = items.length > 1;

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={active.alt}
        onClick={(event) => event.stopPropagation()}
        className="relative flex w-full max-w-4xl items-center justify-center"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar visor de imágenes"
          className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:-right-14 sm:top-0"
        >
          <CloseIcon />
        </button>

        {showArrows && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Imagen anterior"
            className="absolute left-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:-left-16"
          >
            <ChevronLeftIcon />
          </button>
        )}

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface">
          {active.src ? (
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          ) : (
            <div className="media-placeholder flex h-full w-full flex-col items-center justify-center gap-3 text-muted">
              <ImagePlaceholderIcon className="h-8 w-8" />
              <p className="px-6 text-center text-sm">{active.alt}</p>
            </div>
          )}
        </div>

        {showArrows && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Imagen siguiente"
            className="absolute right-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:-right-16"
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </div>
  );
}
