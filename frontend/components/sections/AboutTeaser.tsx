import { CtaButton } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { PlayIcon } from "../ui/icons";
import { LocationsMap } from "./LocationsMap";
import type { HomeContent } from "../../content/home";

interface AboutTeaserProps {
  content: HomeContent["aboutTeaser"];
  locations: HomeContent["locations"];
}

export function AboutTeaser({ content, locations }: AboutTeaserProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading>{content.heading}</SectionHeading>
          <p className="mt-6 text-justify leading-relaxed text-gray-600">
            {content.body}
          </p>
          <CtaButton href={content.ctaHref} className="mt-8">
            {content.ctaLabel}
          </CtaButton>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gray-200">
          {content.videoUrl ? (
            <a
              href={content.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full w-full items-center justify-center"
              aria-label="Play company video"
            >
              <PlayButton />
            </a>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              aria-hidden="true"
            >
              <PlayButton />
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 sm:mt-24">
        <LocationsMap locations={locations} />
      </div>
    </section>
  );
}

function PlayButton() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-md transition group-hover:bg-brand-orange-dark">
      <PlayIcon className="h-5 w-5 translate-x-0.5" />
    </span>
  );
}
