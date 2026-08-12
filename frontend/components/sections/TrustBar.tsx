import {
  ClockIcon,
  GlobeIcon,
  PlaneIcon,
  ShieldCheckIcon,
  WrenchIcon,
} from "../ui/icons";
import type { TrustBadge } from "../../content/home";

const ICON_BY_KEY = {
  globe: GlobeIcon,
  wrench: WrenchIcon,
  clock: ClockIcon,
  shield: ShieldCheckIcon,
  plane: PlaneIcon,
} as const;

interface TrustBarProps {
  badges: TrustBadge[];
  className?: string;
}

// Blue gradient sampled from Figma: linear-gradient(90deg, #083656 0%, #1276BC 52%, #083656 100%).
export function TrustBar({ badges, className }: TrustBarProps) {
  if (badges.length === 0) return null;

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-3 bg-[linear-gradient(90deg,#083656_0%,#1276BC_52%,#083656_100%)] px-6 py-5 ${className ?? ""}`}
    >
      {badges.map((badge) => {
        const Icon = ICON_BY_KEY[badge.icon];
        return (
          <span
            key={badge.label}
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/90"
          >
            <Icon className="h-4 w-4" />
            {badge.label}
          </span>
        );
      })}
    </div>
  );
}
