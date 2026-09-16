"use client";

import { useCallback, useRef, useState } from "react";
import Lightbox from "@/components/ui/Lightbox";
import Reveal from "@/components/ui/Reveal";
import ZoneCard from "@/components/ui/ZoneCard";
import { cityZones } from "@/lib/data/zones";

export default function CityZonesGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback((index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
    previousFocusRef.current?.focus();
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + cityZones.length) % cityZones.length
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % cityZones.length
    );
  }, []);

  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cityZones.map((zone, index) => (
          <Reveal key={zone.slug} delayMs={index * 80}>
            <ZoneCard
              zone={zone}
              onImageClick={zone.image ? () => open(index) : undefined}
            />
          </Reveal>
        ))}
      </div>

      <Lightbox
        items={cityZones.map((zone) => ({
          src: zone.image,
          alt: `Vista de ${zone.name} en Recreación`,
        }))}
        activeIndex={activeIndex}
        onClose={close}
        onPrev={showPrev}
        onNext={showNext}
      />
    </>
  );
}
