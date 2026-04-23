import "../styles.css";
import PokedexEntry from "../components/PokedexEntry";

// Default export: Storybook configuration for this component
// This tells Storybook how to list and organize this component
export default {
  // The title determines where this appears in the Storybook sidebar
  title: "Components/PokedexEntry",
  
  // The component we're creating stories for
  component: PokedexEntry,
  
  // Optional parameters to configure how stories are displayed
  parameters: {
    layout: "centered", // Centers the component in the canvas
  },
  
  // Automatically generate documentation from component props
  tags: ["autodocs"],
  
  // Define controls for the component's props
  argTypes: {
    dexEntry: {
      control: "text", // Use a text input control in Storybook
      description: "The Pokédex entry text to display",
    },
  },
};

// Each named export is a "story" - a specific state/variation of the component
// Stories use the "Component Story Format" (CSF)

// Short entry example
export const ShortEntry = {
  args: {
    dexEntry: "A gentle soul that can read the minds of people.",
  },
};

// Medium length entry
export const MediumEntry = {
  args: {
    dexEntry:
      "It flies over its wide territory in search of prey, downing it with its highly developed claws.",
  },
};

// Long, detailed entry
export const LongEntry = {
  args: {
    dexEntry:
      "When several of these Pokémon gather, their electricity can build and cause lightning storms. They live in meadows where they roast berries with their lightning strikes. The electricity stored in their electric sacs is enough to shock a Donphan, but not enough to kill. When thunderclouds fill the sky, they come looking for a specific type of tree. They fight over who will be struck by lightning.",
  },
};

// Example with Dragonite's classic entry
export const DragoniteEntry = {
  args: {
    dexEntry:
      "An extremely rarely seen marine Pokémon. Its intelligence is said to match that of humans.",
  },
};

// Example with Charizard's entry
export const CharizardEntry = {
  args: {
    dexEntry:
      "It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.",
  },
};
