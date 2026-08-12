import Image from "next/image";
import type { TrustLogo } from "../../content/home";

interface TrustBarProps {
  badges: TrustLogo[];
  className?: string;
}

// Blue gradient sampled from Figma: linear-gradient(90deg, #083656 0%, #1276BC 52%, #083656 100%).
export function TrustBar({ badges, className }: TrustBarProps) {
  if (badges.length === 0) return null;

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-4 bg-[linear-gradient(90deg,#083656_0%,#1276BC_52%,#083656_100%)] px-6 py-5 sm:gap-x-12 ${className ?? ""}`}
    >
      {badges.map((logo) => (
        <div
          key={logo.name}
          className="flex h-10 items-center rounded-md bg-white px-4 py-2 shadow-sm"
        >
          <Image
            src={logo.src}
            alt={logo.name}
            width={120}
            height={28}
            unoptimized
            className="h-5 w-auto object-contain sm:h-6"
          />
        </div>
      ))}
    </div>
  );
}
