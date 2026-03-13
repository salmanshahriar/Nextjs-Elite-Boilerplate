import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

describe("Card", () => {
  it("renders children", () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
      </Card>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders header and title", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("applies data-slot for card", () => {
    const { container } = render(<Card>x</Card>);
    expect(container.querySelector("[data-slot='card']")).toBeInTheDocument();
  });
});
