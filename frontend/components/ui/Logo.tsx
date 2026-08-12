import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  wordmarkClassName?: string;
  imageClassName?: string;
  stacked?: boolean;
}

export function Logo({
  className,
  wordmarkClassName,
  imageClassName = "h-9 w-9",
  stacked = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="AGAMI Aviation home"
      className={`flex items-center gap-2 ${className ?? ""}`}
    >
      <Image
        src="/images/agami-logo.png"
        alt=""
        width={48}
        height={48}
        priority
        className={imageClassName}
      />
      {stacked ? (
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-bold uppercase tracking-wide text-white sm:text-lg">
            Agami
          </span>
          <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-white/70 sm:text-[11px] sm:tracking-[0.3em]">
            Aviation
          </span>
        </span>
      ) : (
        <span
          className={
            wordmarkClassName ??
            "text-lg font-semibold uppercase tracking-wide text-white"
          }
        >
          AGAMI AVIATION
        </span>
      )}
    </Link>
  );
}
