import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import PokedexEntry from "../PokedexEntry.jsx";

/**
 * Tests for the PokedexEntry component
 * A simple presentational component that displays Pokemon dex entry text
 */

describe("PokedexEntry", () => {
  test("should render heading, dex entry text, and correct CSS class", () => {
    const dexEntry = "A strange seed was planted on its back at birth.";

    const { container } = render(<PokedexEntry dexEntry={dexEntry} />);

    // Check for heading
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Pokédex Entry");

    // Check for dex entry text
    expect(screen.getByText(dexEntry)).toBeInTheDocument();

    // Check for correct CSS class
    const descriptionDiv = container.querySelector(".pokemon-description");
    expect(descriptionDiv).toBeInTheDocument();
  });

  test("should render long and complex dex entry text correctly", () => {
    const longDexEntry =
      "When several of these Pokémon gather, their electricity could build and cause lightning storms. It keeps its tail raised to monitor its surroundings. If you yank its tail, it will try to bite you.";

    render(<PokedexEntry dexEntry={longDexEntry} />);

    // Verify the entire long text is rendered
    expect(screen.getByText(longDexEntry)).toBeInTheDocument();

    // Verify heading is still present
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Pokédex Entry");
  });
});
