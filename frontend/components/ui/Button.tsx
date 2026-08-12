import Link from "next/link";
import { ArrowUpRightIcon } from "./icons";

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function CtaButton({ href, children, className }: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${className ?? ""}`}
    >
      {children}
      <ArrowUpRightIcon className="h-4 w-4" />
    </Link>
  );
}
