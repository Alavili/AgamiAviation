export interface IconProps {
  className?: string;
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={className}
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" strokeLinecap="round" />
      <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
      <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={className}
      aria-hidden="true"
    >
      <line x1="5" y1="5" x2="19" y2="19" strokeLinecap="round" />
      <line x1="19" y1="5" x2="5" y2="19" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
      aria-hidden="true"
    >
      <line x1="6" y1="18" x2="18" y2="6" strokeLinecap="round" />
      <polyline
        points="9 6 18 6 18 15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={className}
      aria-hidden="true"
    >
      <rect
        x="2.25"
        y="4.5"
        width="19.5"
        height="15"
        rx="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.4 6.4l8.13 6.13a2.25 2.25 0 0 0 2.94 0L21.6 6.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="10"
        fontWeight={700}
        fill="currentColor"
        fontFamily="sans-serif"
      >
        in
      </text>
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="11"
        fontWeight={700}
        fill="currentColor"
        fontFamily="sans-serif"
      >
        f
      </text>
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17" cy="7" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <line
        x1="8"
        y1="8"
        x2="16"
        y2="16"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="8"
        x2="8"
        y2="16"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
