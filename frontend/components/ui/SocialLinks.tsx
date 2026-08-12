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
  variant?: "glass" | "solid";
}

const VARIANT_CLASSNAMES = {
  glass:
    "flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:border-brand-orange hover:bg-white/20 hover:text-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange",
  solid:
    "flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white transition hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
} as const;

export function SocialLinks({
  links,
  className,
  linkClassName,
  variant = "glass",
}: SocialLinksProps) {
  return (
    <ul className={`flex items-center gap-3 ${className ?? ""}`}>
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
