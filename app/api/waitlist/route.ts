import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import {
  WAITLIST_DEADLINE_MS,
  isValidEmail,
  isValidRobloxUsername,
} from "@/lib/waitlist";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "waitlist.json");

type WaitlistEntry = {
  robloxUsername: string;
  email: string;
  registeredAt: string;
};

async function readEntries(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeEntries(entries: WaitlistEntry[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

export async function POST(request: Request) {
  if (Date.now() >= WAITLIST_DEADLINE_MS) {
    return NextResponse.json(
      { error: "La lista de espera está cerrada." },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const robloxUsername =
    typeof payload?.robloxUsername === "string" ? payload.robloxUsername.trim() : "";
  const email =
    typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";

  if (!isValidRobloxUsername(robloxUsername)) {
    return NextResponse.json(
      { error: "Introduce un usuario de Roblox válido." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Introduce un correo electrónico válido." },
      { status: 400 }
    );
  }

  const entries = await readEntries();
  const alreadyRegistered = entries.some((entry) => entry.email === email);

  if (!alreadyRegistered) {
    entries.push({
      robloxUsername,
      email,
      registeredAt: new Date().toISOString(),
    });
    await writeEntries(entries);
  }

  return NextResponse.json({ ok: true });
}
