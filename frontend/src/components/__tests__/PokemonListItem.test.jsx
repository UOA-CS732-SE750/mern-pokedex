import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import PokemonListItem from "../PokemonListItem.jsx";
import * as useUpdateFavouriteStatusModule from "../../hooks/useUpdateFavouriteStatus.js";

/**
 * Tests for the PokemonListItem component
 * A list item that displays pokemon info and allows toggling favourite status
 */

describe("PokemonListItem", () => {
  let mockMutateAsync;

  beforeEach(() => {
    // Create a fresh mock function for each test
    mockMutateAsync = vi.fn();

    // Mock the useUpdateFavouriteStatus hook
    vi.spyOn(useUpdateFavouriteStatusModule, "useUpdateFavouriteStatus").mockReturnValue({
      mutateAsync: mockMutateAsync
    });
  });

  afterEach(() => {
    // Restore all mocks to their original implementations
    vi.restoreAllMocks();
  });

  const mockPokemon = {
    dexNumber: 149,
    name: "Dragonite",
    isFavourite: false
  };

  test("should render pokemon dex number and name correctly", () => {
    render(<PokemonListItem pokemon={mockPokemon} isSelected={false} />);

    expect(screen.getByText("#149")).toBeInTheDocument();
    expect(screen.getByText("Dragonite")).toBeInTheDocument();
  });

  test("should render StarCheckbox component", () => {
    render(<PokemonListItem pokemon={mockPokemon} isSelected={false} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  test("should pass isFavourite to StarCheckbox as checked prop", () => {
    const favouritePokemon = { ...mockPokemon, isFavourite: true };

    render(<PokemonListItem pokemon={favouritePokemon} isSelected={false} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  test("should pass correct checked prop when isFavourite is false", () => {
    render(<PokemonListItem pokemon={mockPokemon} isSelected={false} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  test("should apply 'active' class when isSelected is true", () => {
    const { container } = render(<PokemonListItem pokemon={mockPokemon} isSelected={true} />);

    const listItem = container.querySelector(".pokemon-list-item");
    expect(listItem).toHaveClass("active");
  });

  test("should not have 'active' class when isSelected is false", () => {
    const { container } = render(<PokemonListItem pokemon={mockPokemon} isSelected={false} />);

    const listItem = container.querySelector(".pokemon-list-item");
    expect(listItem).toHaveClass("pokemon-list-item");
    expect(listItem).not.toHaveClass("active");
  });

  test("should call updateFavouriteStatus with correct params when checkbox is checked", async () => {
    const user = userEvent.setup();

    render(<PokemonListItem pokemon={mockPokemon} isSelected={false} />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockMutateAsync).toHaveBeenCalledTimes(1);
    expect(mockMutateAsync).toHaveBeenCalledWith({
      dexNumber: 149,
      isFavourite: true
    });
  });

  test("should call updateFavouriteStatus with correct params when checkbox is unchecked", async () => {
    const user = userEvent.setup();
    const favouritePokemon = { ...mockPokemon, isFavourite: true };

    render(<PokemonListItem pokemon={favouritePokemon} isSelected={false} />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockMutateAsync).toHaveBeenCalledTimes(1);
    expect(mockMutateAsync).toHaveBeenCalledWith({
      dexNumber: 149,
      isFavourite: false
    });
  });

  test("should pass through additional props to the container div", () => {
    const mockOnClick = vi.fn();

    const { container } = render(
      <PokemonListItem
        pokemon={mockPokemon}
        isSelected={false}
        onClick={mockOnClick}
        data-testid="custom-prop"
      />
    );

    const listItem = container.querySelector(".pokemon-list-item");
    expect(listItem).toHaveAttribute("data-testid", "custom-prop");
  });

  test("should call onClick handler when container is clicked", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    const { container } = render(
      <PokemonListItem pokemon={mockPokemon} isSelected={false} onClick={mockOnClick} />
    );

    const listItem = container.querySelector(".pokemon-list-item");
    await user.click(listItem);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("should have list-item-star className on StarCheckbox", () => {
    const { container } = render(<PokemonListItem pokemon={mockPokemon} isSelected={false} />);

    const starCheckbox = container.querySelector(".list-item-star");
    expect(starCheckbox).toBeInTheDocument();
    expect(starCheckbox).toHaveClass("star-checkbox");
    expect(starCheckbox).toHaveClass("list-item-star");
  });
});
