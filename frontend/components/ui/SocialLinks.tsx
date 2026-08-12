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
}

export function SocialLinks({
  links,
  className,
  linkClassName,
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
              className={
                linkClassName ??
                "flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-brand-orange hover:text-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
              }
            >
              <Icon className="h-4 w-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
