import type { SocialLink } from "@/lib/data/social";
import { DiscordIcon, RobloxIcon, TikTokIcon } from "./icons";

const iconMap = {
  roblox: RobloxIcon,
  tiktok: TikTokIcon,
  discord: DiscordIcon,
};

export default function SocialButton({ social }: { social: SocialLink }) {
  const Icon = iconMap[social.id];
  const isDisabled = social.disabled || !social.href;

  const classes =
    "inline-flex items-center gap-2.5 rounded-full border px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide transition-all duration-300";

  if (isDisabled) {
    return (
      <span
        className={`${classes} cursor-not-allowed border-border/60 text-muted opacity-70`}
        aria-disabled="true"
      >
        <Icon className="h-5 w-5" />
        <span>{social.label}</span>
        <span className="text-xs font-normal normal-case text-muted">
          Próximamente
        </span>
      </span>
    );
  }

  return (
    <a
      href={social.href as string}
      target="_blank"
      rel="noopener noreferrer"
      className={`${classes} border-border text-foreground hover:-translate-y-0.5 hover:border-accent hover:text-accent`}
      aria-label={`Abrir ${social.label} en una nueva pestaña`}
    >
      <Icon className="h-5 w-5" />
      <span>{social.label}</span>
    </a>
  );
}
