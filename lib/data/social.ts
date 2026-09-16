export type SocialLink = {
  id: "roblox" | "tiktok" | "discord";
  label: string;
  href: string | null;
  disabled?: boolean;
};

export const socialLinks: SocialLink[] = [
  {
    id: "roblox",
    label: "Roblox",
    href: "https://www.roblox.com/es/games/102607015417884/RECREACI-N",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@Recreacin.el.prat",
  },
  {
    id: "discord",
    label: "Discord",
    href: null,
    disabled: true,
  },
];
