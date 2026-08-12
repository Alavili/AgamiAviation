import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  wordmarkClassName?: string;
}

export function Logo({ className, wordmarkClassName }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="AGAMI Aviation home"
      className={`flex items-center gap-2 ${className ?? ""}`}
    >
      <Image
        src="/images/agami-logo.png"
        alt=""
        width={36}
        height={36}
        priority
        className="h-9 w-9"
      />
      <span
        className={
          wordmarkClassName ??
          "text-lg font-semibold uppercase tracking-wide text-white"
        }
      >
        AGAMI AVIATION
      </span>
    </Link>
  );
}
