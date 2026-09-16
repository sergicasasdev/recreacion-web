export type GalleryImage = {
  id: string;
  alt: string;
  /** Ruta en public/images/gallery cuando exista la captura real. */
  src?: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "captura-1",
    alt: "Captura del mapa de Recreación — El Prat de Llobregat",
    src: "/images/gallery/galeria-1.jpeg",
  },
  {
    id: "captura-2",
    alt: "Captura del mapa de Recreación — El Prat de Llobregat",
    src: "/images/gallery/galeria-2.jpeg",
  },
  {
    id: "captura-3",
    alt: "Captura del mapa de Recreación — El Prat de Llobregat",
    src: "/images/gallery/galeria-3.jpeg",
  },
  { id: "captura-4", alt: "Captura del mapa de Recreación — próximamente" },
  { id: "captura-5", alt: "Captura del mapa de Recreación — próximamente" },
  { id: "captura-6", alt: "Captura del mapa de Recreación — próximamente" },
  { id: "captura-7", alt: "Captura del mapa de Recreación — próximamente" },
  { id: "captura-8", alt: "Captura del mapa de Recreación — próximamente" },
];
