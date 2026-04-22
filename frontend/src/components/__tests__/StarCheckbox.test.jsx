import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import StarCheckbox from "../StarCheckbox.jsx";

/**
 * Tests for the StarCheckbox component
 * A checkbox component with a star icon and optional tooltip
 */

describe("StarCheckbox", () => {
  test("should render checkbox, image, and tooltip correctly", () => {
    const mockOnChange = vi.fn();

    const { container } = render(
      <StarCheckbox
        checked={false}
        onChange={mockOnChange}
        tooltip="Mark as favourite"
        iconSrc="/test-star.png"
        iconAlt="Star icon"
      />
    );

    // Check for checkbox input
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // Check for star image
    const image = screen.getByAltText("Star icon");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-star.png");

    // Check for tooltip
    const tooltip = screen.getByText("Mark as favourite");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass("tooltip");
  });

  test("should apply correct className to the label", () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <StarCheckbox checked={false} onChange={mockOnChange} className="custom-class" />
    );

    // Label should have both "star-checkbox" and the custom className
    const label = container.querySelector("label");
    expect(label).toHaveClass("star-checkbox");
    expect(label).toHaveClass("custom-class");
  });

  test("should call onChange when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    render(<StarCheckbox checked={false} onChange={mockOnChange} />);

    const checkbox = screen.getByRole("checkbox");

    // Click the checkbox
    await user.click(checkbox);

    // onChange should have been called once
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test("should reflect checked state correctly", () => {
    const mockOnChange = vi.fn();

    // Render with checked=true
    const { rerender } = render(<StarCheckbox checked={true} onChange={mockOnChange} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();

    // Rerender with checked=false
    rerender(<StarCheckbox checked={false} onChange={mockOnChange} />);

    expect(checkbox).not.toBeChecked();
  });

  test("should use default icon props when not provided", () => {
    const mockOnChange = vi.fn();

    render(<StarCheckbox checked={false} onChange={mockOnChange} />);

    const image = screen.getByAltText("Star");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/assets/images/star-64.png");
  });

  test("should not render tooltip when not provided", () => {
    const mockOnChange = vi.fn();

    const { container } = render(<StarCheckbox checked={false} onChange={mockOnChange} />);

    // Tooltip span should not be in the document
    const tooltip = container.querySelector(".tooltip");
    expect(tooltip).not.toBeInTheDocument();
  });
});
