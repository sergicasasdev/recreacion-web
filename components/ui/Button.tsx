import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  external?: boolean;
  variant?: "primary" | "outline";
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-wide transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-accent-strong text-white hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_16px_36px_-16px_var(--accent-soft)]",
  outline:
    "border border-border text-foreground hover:-translate-y-0.5 hover:border-accent hover:text-accent",
};

export default function Button({
  href,
  external,
  variant = "primary",
  disabled,
  children,
  className = "",
}: ButtonProps) {
  const isDisabled = disabled || !href;
  const classes = `${base} ${variants[variant]} ${
    isDisabled ? "pointer-events-none opacity-40 hover:translate-y-0" : ""
  } ${className}`;

  if (isDisabled) {
    return (
      <span className={classes} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
