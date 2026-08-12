import { IndiaOutlineIcon, MapPinIcon, UAEOutlineIcon } from "../ui/icons";
import type { HomeContent } from "../../content/home";

interface LocationsMapProps {
  locations: HomeContent["locations"];
}

const COUNTRY_ICON = {
  uae: UAEOutlineIcon,
  india: IndiaOutlineIcon,
};

// Card placement is fixed per index (not data-driven) since this is a
// two-pin layout matching one specific design — see the About teaser screenshot.
// Overlaid cards only make sense once there's room beside the pins, so they
// only appear from `sm` up; mobile falls back to a stacked list below the map.
const CARD_PLACEMENT = ["left-[18%] top-[8%]", "left-[54%] top-[58%]"];

function LocationCard({
  location,
  className,
}: {
  location: HomeContent["locations"][number];
  className?: string;
}) {
  const CountryIcon = COUNTRY_ICON[location.country];
  return (
    <div
      className={`flex items-start gap-3 rounded-lg bg-white p-3 shadow-lg ${className ?? ""}`}
    >
      <CountryIcon className="h-8 w-8 shrink-0 text-gray-800" />
      <p className="text-xs leading-relaxed text-gray-700">
        {location.address}
      </p>
    </div>
  );
}

export function LocationsMap({ locations }: LocationsMapProps) {
  return (
    <div>
      <div className="relative mx-auto aspect-[1000/460] w-full max-w-5xl">
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no next/image optimization needed */}
        <img
          src="/images/map%201.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain"
        />

        {locations.map((location) => (
          <MapPinIcon
            key={location.country}
            className="absolute h-6 w-6 -translate-x-1/2 -translate-y-full text-gray-800"
            style={{
              left: `${location.position.xPercent}%`,
              top: `${location.position.yPercent}%`,
            }}
          />
        ))}

        {locations.map((location, index) => (
          <LocationCard
            key={location.country}
            location={location}
            className={`absolute hidden w-64 sm:block ${CARD_PLACEMENT[index] ?? ""}`}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:hidden">
        {locations.map((location) => (
          <LocationCard key={location.country} location={location} />
        ))}
      </div>
    </div>
  );
}
