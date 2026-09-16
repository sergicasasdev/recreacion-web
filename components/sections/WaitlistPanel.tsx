"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  WAITLIST_DEADLINE_LABEL,
  WAITLIST_DEADLINE_MS,
  isValidEmail,
  isValidRobloxUsername,
} from "@/lib/waitlist";

type FormState = "idle" | "submitting" | "success" | "error";
type FieldErrors = { robloxUsername?: string; email?: string };

function getCountdownParts(remainingMs: number) {
  const totalSeconds = Math.floor(remainingMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function formatUnit(value: number | undefined) {
  return value === undefined ? "--" : String(value).padStart(2, "0");
}

export default function WaitlistPanel() {
  const [now, setNow] = useState<number | null>(null);
  const [robloxUsername, setRobloxUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const tick = () => {
      const current = Date.now();
      setNow(current);
      if (current >= WAITLIST_DEADLINE_MS && intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  const isMounted = now !== null;
  const remainingMs = now === null ? null : Math.max(WAITLIST_DEADLINE_MS - now, 0);
  const isOpen = remainingMs === null ? true : remainingMs > 0;
  const parts = remainingMs === null ? null : getCountdownParts(remainingMs);

  const countdownUnits = [
    { label: "Días", value: parts?.days },
    { label: "Horas", value: parts?.hours },
    { label: "Minutos", value: parts?.minutes },
    { label: "Segundos", value: parts?.seconds },
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isMounted || !isOpen || formState === "submitting") return;

    const trimmedUsername = robloxUsername.trim();
    const trimmedEmail = email.trim();
    const nextErrors: FieldErrors = {};

    if (!isValidRobloxUsername(trimmedUsername)) {
      nextErrors.robloxUsername =
        "Introduce un usuario de Roblox válido (3-20 caracteres: letras, números o guiones bajos).";
    }
    if (!isValidEmail(trimmedEmail)) {
      nextErrors.email = "Introduce un correo electrónico válido.";
    }

    setFieldErrors(nextErrors);

    if (nextErrors.robloxUsername) {
      usernameInputRef.current?.focus();
      return;
    }
    if (nextErrors.email) {
      emailInputRef.current?.focus();
      return;
    }

    setFormState("submitting");
    setSubmitError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ robloxUsername: trimmedUsername, email: trimmedEmail }),
      });

      const data: { ok?: boolean; error?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        setFormState("error");
        setSubmitError(data.error ?? "No se ha podido completar el registro. Inténtalo de nuevo.");
        return;
      }

      setFormState("success");
      setRobloxUsername("");
      setEmail("");
    } catch {
      setFormState("error");
      setSubmitError(
        "No se ha podido completar el registro. Comprueba tu conexión e inténtalo de nuevo."
      );
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated/60 shadow-[0_30px_70px_-40px_var(--accent-soft)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />

      <div className="p-6 sm:p-10">
        <div aria-live="polite" className="flex flex-wrap items-center gap-3">
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full ${isOpen ? "animate-pulse bg-accent" : "bg-muted"}`}
          />
          <Badge>{isOpen ? "Lista de espera abierta" : "Lista de espera cerrada"}</Badge>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          {isOpen
            ? `Disponible hasta el ${WAITLIST_DEADLINE_LABEL}.`
            : "El plazo para unirse a la lista de espera ha finalizado."}
        </p>

        {isOpen && (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
            <div>
              <div
                aria-hidden="true"
                className="grid grid-cols-4 gap-2 sm:gap-3"
              >
                {countdownUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="rounded-xl border border-border bg-surface px-2 py-3 text-center sm:px-3 sm:py-4"
                  >
                    <span className="block font-heading text-2xl font-bold tabular-nums text-foreground sm:text-3xl lg:text-4xl">
                      {formatUnit(unit.value)}
                    </span>
                    <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-muted sm:text-[11px]">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor="waitlist-roblox-username"
                    className="block text-sm font-medium text-foreground"
                  >
                    Usuario de Roblox
                  </label>
                  <input
                    ref={usernameInputRef}
                    id="waitlist-roblox-username"
                    name="robloxUsername"
                    type="text"
                    autoComplete="off"
                    required
                    value={robloxUsername}
                    onChange={(event) => setRobloxUsername(event.target.value)}
                    aria-invalid={Boolean(fieldErrors.robloxUsername)}
                    aria-describedby={
                      fieldErrors.robloxUsername ? "waitlist-roblox-username-error" : undefined
                    }
                    disabled={!isMounted || formState === "submitting" || formState === "success"}
                    className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-60"
                  />
                  {fieldErrors.robloxUsername && (
                    <p
                      id="waitlist-roblox-username-error"
                      role="alert"
                      className="mt-2 text-sm text-red-400"
                    >
                      {fieldErrors.robloxUsername}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="waitlist-email"
                    className="block text-sm font-medium text-foreground"
                  >
                    Correo electrónico
                  </label>
                  <input
                    ref={emailInputRef}
                    id="waitlist-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "waitlist-email-error" : undefined}
                    disabled={!isMounted || formState === "submitting" || formState === "success"}
                    className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-60"
                  />
                  {fieldErrors.email && (
                    <p id="waitlist-email-error" role="alert" className="mt-2 text-sm text-red-400">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={!isMounted || formState === "submitting" || formState === "success"}
                  className="w-full sm:w-auto"
                >
                  {formState === "submitting" ? "Enviando…" : "Unirme a la lista de espera"}
                </Button>

                <div aria-live="polite" role="status" className="min-h-[1.25rem] text-sm">
                  {formState === "success" && (
                    <p className="text-accent">
                      ¡Listo! Te has unido a la lista de espera.
                    </p>
                  )}
                  {formState === "error" && submitError && (
                    <p className="text-red-400">{submitError}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
