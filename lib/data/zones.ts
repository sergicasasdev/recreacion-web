export type CityZone = {
  slug: string;
  name: string;
  status: "EN DESARROLLO";
  description: string;
  /** Ruta en public/images/city cuando exista una imagen real de la zona. */
  image?: string;
};

export const cityZones: CityZone[] = [
  {
    slug: "avinguda-remolar",
    name: "Avinguda Remolar",
    status: "EN DESARROLLO",
    description:
      "Una de las vías que se están construyendo actualmente en el mapa de Recreación.",
    image: "/images/city/avinguda-remolar.png",
  },
  {
    slug: "carrer-del-ripolles",
    name: "Carrer del Ripollès",
    status: "EN DESARROLLO",
    description:
      "Zona en desarrollo dentro de la expansión del mapa de la ciudad.",
    image: "/images/city/carrer-ripolles.png",
  },
  {
    slug: "carrer-de-la-vall-daran",
    name: "Carrer de la Vall d'Aran",
    status: "EN DESARROLLO",
    description:
      "Calle en proceso de construcción como parte del trazado urbano de Recreación.",
    image: "/images/city/carrer-vall-daran.png",
  },
  {
    slug: "carrer-del-valles",
    name: "Carrer del Vallès",
    status: "EN DESARROLLO",
    description:
      "Actualmente en desarrollo dentro del mapa de El Prat de Llobregat recreado.",
    image: "/images/city/carrer-valles.png",
  },
  {
    slug: "placa-xavier-ruiz-millan",
    name: "Plaça Xavier Ruiz Millán",
    status: "EN DESARROLLO",
    description:
      "Espacio en desarrollo dentro de la recreación virtual de la ciudad.",
    image: "/images/city/placa-xavier-ruiz-millan.png",
  },
  {
    slug: "el-prat-estacio",
    name: "El Prat Estació",
    status: "EN DESARROLLO",
    description:
      "Zona de la recreación correspondiente a la estación de El Prat, actualmente en desarrollo.",
    image: "/images/city/el-prat-estacio.png",
  },
];
