import "../styles.css";
import { useState } from "react";
import StarCheckbox from "../components/StarCheckbox";
import { fn } from "storybook/test";

// Default export: Storybook configuration
// This component demonstrates user interactions and the Actions addon
export default {
  title: "Components/StarCheckbox",
  component: StarCheckbox,
  parameters: {
    layout: "padded", // Use "padded" instead of "centered" to preserve tooltip positioning
  },
  tags: ["autodocs"],
  // Decorators wrap each story with additional markup
  // This creates a centered container with proper positioning context for tooltips
  decorators: [
    (Story) => (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        position: 'relative' // This is key - creates positioning context for tooltip
      }}>
        <Story />
      </div>
    ),
  ],
  // Define controls for each prop
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    onChange: {
      description: "Callback function when checkbox state changes",
    },
    tooltip: {
      control: "text",
      description: "Optional tooltip text to display on hover",
    },
    iconSrc: {
      control: "text",
      description: "Path to the star icon image",
    },
    iconAlt: {
      control: "text",
      description: "Alt text for the star icon",
    },
    className: {
      control: "text",
      description: "Additional CSS class names to apply",
    },
  },
  // Create a mock function using Storybook's fn() helper
  // This will show up in the Actions panel when the checkbox is clicked
  args: {
    onChange: fn(),
  },
};

// Unchecked state (default)
export const Unchecked = {
  args: {
    checked: false,
  },
};

// Checked state
export const Checked = {
  args: {
    checked: true,
  },
};

// With tooltip visible on hover
export const WithTooltip = {
  args: {
    checked: false,
    tooltip: "Mark as favourite",
  },
};

// Checked with tooltip
export const CheckedWithTooltip = {
  args: {
    checked: true,
    tooltip: "Remove from favourites",
  },
};

// With custom icon (demonstrating icon customization)
export const CustomIcon = {
  args: {
    checked: false,
    iconSrc: "/assets/images/star-64.png",
    iconAlt: "Custom Star",
    tooltip: "Custom star icon",
  },
};

// With custom CSS class for styling
export const WithCustomClass = {
  args: {
    checked: false,
    className: "custom-star-style",
    tooltip: "Custom styled checkbox",
  },
};

// Interactive playground story with REAL state management
// This demonstrates a fully functional checkbox that toggles when clicked
// The render function creates a wrapper component with useState
export const Playground = {
  args: {
    tooltip: "Click to toggle",
    iconSrc: "/assets/images/star-64.png",
    iconAlt: "Star",
    className: "",
  },
  render: (args) => {
    // Create a wrapper component with state
    const [checked, setChecked] = useState(false);
    
    return (
      <StarCheckbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          // Call the onChange from args to log to Actions panel
          args.onChange?.(e);
        }}
      />
    );
  },
};
