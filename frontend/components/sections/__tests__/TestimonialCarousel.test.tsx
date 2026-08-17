import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TestimonialCarousel } from "../TestimonialCarousel";
import type { HomeContent } from "../../../content/home";

function makeContent(count: number): HomeContent["testimonials"] {
  return {
    heading: "Testimonials",
    subhead: "Subhead",
    items: Array.from({ length: count }, (_, index) => ({
      quote: `Quote ${index + 1}`,
      author: `Author ${index + 1}`,
      role: "Our Customer",
      avatar: "/images/.gitkeep",
      avatarAlt: `Portrait of Author ${index + 1}`,
    })),
  };
}

describe("TestimonialCarousel", () => {
  it("shows the first three testimonials and hides nav when there's nothing more to page through", () => {
    render(<TestimonialCarousel content={makeContent(3)} />);

    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByText("Author 3")).toBeInTheDocument();
    expect(screen.queryByLabelText("Next testimonial")).not.toBeInTheDocument();
  });

  it("advances the visible window and wraps around on next", () => {
    render(<TestimonialCarousel content={makeContent(5)} />);

    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.queryByText("Author 4")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Next testimonial"));

    expect(screen.getByText("Author 4")).toBeInTheDocument();
    expect(screen.queryByText("Author 1")).not.toBeInTheDocument();
  });

  it("pages backward and wraps to the end on prev", () => {
    render(<TestimonialCarousel content={makeContent(5)} />);

    fireEvent.click(screen.getByLabelText("Previous testimonial"));

    expect(screen.getByText("Author 5")).toBeInTheDocument();
  });
});
