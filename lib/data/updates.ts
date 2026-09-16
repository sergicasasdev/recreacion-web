export type GameUpdate = {
  version: string;
  date: string;
  title: string;
  description: string;
};

/**
 * El primer elemento del array es siempre la actualización más reciente
 * y se muestra destacada. Para añadir una nueva, insértala al principio.
 */
export const gameUpdates: GameUpdate[] = [
  {
    version: "1.0",
    date: "19/09/2026",
    title: "Apertura del Juego",
    description: "Se abre la opción de jugar al juego por primera vez.",
  },
];
