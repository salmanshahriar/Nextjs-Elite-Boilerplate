import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("applies variant and size via class", () => {
    const { container } = render(
      <Button variant="secondary" size="sm">
        Secondary
      </Button>
    );
    const button = container.querySelector("button");
    expect(button).toHaveClass("bg-secondary");
    expect(button).toHaveClass("h-8");
  });
});
