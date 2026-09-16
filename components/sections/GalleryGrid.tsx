"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { galleryImages } from "@/lib/data/gallery";
import Lightbox from "@/components/ui/Lightbox";
import { ImagePlaceholderIcon } from "@/components/ui/icons";

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setActiveIndex(null);
    previousFocusRef.current?.focus();
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % galleryImages.length
    );
  }, []);

  const open = useCallback((index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(index);
  }, []);

  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => open(index)}
            aria-label={`Ampliar ${image.alt}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {image.src ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
            ) : (
              <div className="media-placeholder flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.05]">
                <ImagePlaceholderIcon className="h-6 w-6 text-muted" />
              </div>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        items={galleryImages}
        activeIndex={activeIndex}
        onClose={close}
        onPrev={showPrev}
        onNext={showNext}
      />
    </>
  );
}
