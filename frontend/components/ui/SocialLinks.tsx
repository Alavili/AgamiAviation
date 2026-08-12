import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from "./icons";

const ICON_BY_PLATFORM = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
} as const;

export type SocialPlatform = keyof typeof ICON_BY_PLATFORM;

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  linkClassName?: string;
  variant?: "glass" | "solid" | "glassSm";
  gapClassName?: string;
}

const VARIANT_CLASSNAMES = {
  glass:
    "flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[rgba(105,105,105,0.2)] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_8px_24px_rgba(8,20,35,0.35)] backdrop-blur-lg backdrop-saturate-150 transition hover:bg-white/20 hover:text-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange",
  glassSm:
    "flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(105,105,105,0.2)] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_8px_24px_rgba(8,20,35,0.35)] backdrop-blur-lg backdrop-saturate-150 transition hover:bg-white/20 hover:text-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange",
  solid:
    "flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white transition hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
} as const;

export function SocialLinks({
  links,
  className,
  linkClassName,
  variant = "glass",
  gapClassName,
}: SocialLinksProps) {
  return (
    <ul
      className={`flex items-center ${gapClassName ?? "gap-3"} ${className ?? ""}`}
    >
      {links.map((link) => {
        const Icon = ICON_BY_PLATFORM[link.platform];
        return (
          <li key={link.platform}>
            <a
              href={link.href}
              aria-label={`AGAMI Aviation on ${link.platform}`}
              className={linkClassName ?? VARIANT_CLASSNAMES[variant]}
            >
              <Icon className="h-4 w-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
