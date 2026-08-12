interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

// Bold heading with the trailing orange-dot accent used across the site
// (hero heading lines, this teaser, etc.) — see PROJECT_PLAN.md §4.
export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={`text-3xl font-bold text-gray-900 sm:text-4xl ${className ?? ""}`}
    >
      {children}
      <span className="text-brand-orange">.</span>
    </h2>
  );
}
