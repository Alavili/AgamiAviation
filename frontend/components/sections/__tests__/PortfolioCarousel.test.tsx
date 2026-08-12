import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PortfolioCarousel } from "../PortfolioCarousel";
import type { HomeContent } from "../../../content/home";

function makeContent(count: number): HomeContent["portfolio"] {
  return {
    heading: "Portfolio",
    subhead: "Subhead",
    items: Array.from({ length: count }, (_, index) => ({
      eyebrow: "Eyebrow",
      title: `Item ${index + 1}`,
      image: "/images/.gitkeep",
      imageAlt: `Item ${index + 1} image`,
      href: "/portfolio",
    })),
  };
}

// Titles render as `{title}<span>.</span>`, so query the title text alone —
// the trailing orange dot lives in a separate element.
describe("PortfolioCarousel", () => {
  it("shows the first three items and hides nav when there's nothing more to page through", () => {
    render(<PortfolioCarousel content={makeContent(3)} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
    expect(
      screen.queryByLabelText("Next portfolio item"),
    ).not.toBeInTheDocument();
  });

  it("advances the visible window and wraps around on next", () => {
    render(<PortfolioCarousel content={makeContent(5)} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Item 4")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Next portfolio item"));

    expect(screen.getByText("Item 4")).toBeInTheDocument();
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });

  it("pages backward and wraps to the end on prev", () => {
    render(<PortfolioCarousel content={makeContent(5)} />);

    fireEvent.click(screen.getByLabelText("Previous portfolio item"));

    expect(screen.getByText("Item 5")).toBeInTheDocument();
  });
});
