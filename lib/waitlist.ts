const WAITLIST_TIME_ZONE = "Europe/Madrid";

const WAITLIST_DEADLINE_WALL_CLOCK = {
  year: 2026,
  month: 9,
  day: 19,
  hour: 16,
  minute: 0,
  second: 0,
} as const;

/**
 * Desplazamiento (en ms) de `timeZone` respecto a UTC en el instante `date`,
 * calculado con la base de datos de zonas horarias del propio entorno
 * (funciona igual en Node y en el navegador, y respeta el horario de verano).
 */
function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const value: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") value[part.type] = part.value;
  }

  const asUtc = Date.UTC(
    Number(value.year),
    Number(value.month) - 1,
    Number(value.day),
    Number(value.hour),
    Number(value.minute),
    Number(value.second)
  );

  return asUtc - date.getTime();
}

/** Convierte una hora de pared en `timeZone` al instante UTC exacto que representa. */
function zonedWallClockToUtcMs(
  wallClock: typeof WAITLIST_DEADLINE_WALL_CLOCK,
  timeZone: string
): number {
  const utcGuess = Date.UTC(
    wallClock.year,
    wallClock.month - 1,
    wallClock.day,
    wallClock.hour,
    wallClock.minute,
    wallClock.second
  );
  const offsetMs = getTimeZoneOffsetMs(new Date(utcGuess), timeZone);
  return utcGuess - offsetMs;
}

/**
 * Instante UTC exacto (en ms desde epoch) del cierre de la lista de espera:
 * 19/09/2026 16:00:00 hora peninsular española (Europe/Madrid). Se calcula
 * una sola vez a partir de la zona horaria IANA, por lo que el horario de
 * verano queda resuelto correctamente sin depender de la hora local del
 * dispositivo que evalúa esta constante.
 */
export const WAITLIST_DEADLINE_MS = zonedWallClockToUtcMs(
  WAITLIST_DEADLINE_WALL_CLOCK,
  WAITLIST_TIME_ZONE
);

export const WAITLIST_DEADLINE_LABEL = "19 de septiembre de 2026 a las 16:00";

export function isWaitlistOpen(nowMs: number = Date.now()): boolean {
  return nowMs < WAITLIST_DEADLINE_MS;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidRobloxUsername(username: string): boolean {
  if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) return false;
  if (username.startsWith("_") || username.endsWith("_")) return false;
  if (username.includes("__")) return false;
  return true;
}
