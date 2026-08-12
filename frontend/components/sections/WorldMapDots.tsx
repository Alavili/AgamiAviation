interface WorldMapDotsProps {
  className?: string;
}

// Stylized dot-matrix world map — decorative background for LocationsMap.
// Continents are approximated as blobs of dots, not real geographic
// boundaries, matching the abstract "dotted map" look used in the design.
export function WorldMapDots({ className }: WorldMapDotsProps) {
  return (
    <svg
      viewBox="0 0 1000 460"
      preserveAspectRatio="none"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="world-map-dot"
          width="11"
          height="11"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.7" cy="1.7" r="1.7" className="fill-gray-300" />
        </pattern>
      </defs>
      {/* North America */}
      <path
        d="M40 65 C110 30 200 45 235 85 C270 122 248 158 216 174 C228 200 206 232 174 226 C142 220 142 188 110 178 C78 168 45 190 28 163 C12 136 18 95 40 65 Z"
        fill="url(#world-map-dot)"
      />
      {/* South America */}
      <path
        d="M205 245 C238 240 260 268 255 305 C250 348 233 396 205 424 C183 445 167 405 170 368 C172 336 156 320 167 288 C175 267 189 248 205 245 Z"
        fill="url(#world-map-dot)"
      />
      {/* Europe */}
      <path
        d="M450 55 C488 38 532 48 548 75 C558 96 536 112 514 107 C520 128 493 139 477 122 C456 127 440 106 446 85 C449 73 450 63 450 55 Z"
        fill="url(#world-map-dot)"
      />
      {/* Africa */}
      <path
        d="M460 135 C508 124 550 146 561 188 C572 225 556 262 551 304 C546 346 562 383 535 404 C509 425 487 388 482 351 C478 320 456 309 451 273 C446 236 462 199 451 173 C446 158 453 145 460 135 Z"
        fill="url(#world-map-dot)"
      />
      {/* Asia (with a peninsula reaching down toward India / SE Asia) */}
      <path
        d="M535 50 C615 22 720 34 790 62 C858 90 905 102 894 135 C883 168 838 156 815 178 C798 195 803 222 775 233 C753 242 741 217 719 222 C708 250 680 266 663 239 C647 213 663 191 641 175 C613 186 590 163 596 135 C567 130 550 90 535 50 Z"
        fill="url(#world-map-dot)"
      />
      {/* Australia */}
      <path
        d="M810 335 C855 324 900 340 906 372 C912 404 872 421 833 415 C800 410 788 383 793 361 C796 350 802 341 810 335 Z"
        fill="url(#world-map-dot)"
      />
    </svg>
  );
}
