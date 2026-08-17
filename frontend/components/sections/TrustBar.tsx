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
      className={`flex flex-wrap items-center justify-center gap-x-12 gap-y-6 bg-[linear-gradient(90deg,#083656_0%,#1276BC_52%,#083656_100%)] px-6 py-5 sm:gap-x-20 ${className ?? ""}`}
    >
      {badges.map((logo) => (
        <Image
          key={logo.name}
          src={logo.src}
          alt={logo.name}
          width={120}
          height={28}
          unoptimized
          className={
            logo.className ?? "h-6 w-auto object-contain opacity-90 sm:h-7"
          }
        />
      ))}
    </div>
  );
}
