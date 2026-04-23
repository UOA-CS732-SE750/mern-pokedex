import "../styles.css";
import PokemonTypesList from "../components/PokemonTypesList";

// Default export: Storybook configuration
// This component demonstrates composition - PokemonTypesList uses TypeBadge internally
export default {
  title: "Components/PokemonTypesList",
  component: PokemonTypesList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    types: {
      control: "object", // Use object control for array input
      description: "Array of Pokémon type names to display as badges",
    },
  },
};

// Single type Pokémon (like Pikachu - Electric only)
export const SingleType = {
  args: {
    types: ["Electric"],
  },
};

// Dual type Pokémon (like Charizard - Fire/Flying)
export const DualType = {
  args: {
    types: ["Fire", "Flying"],
  },
};

// Another dual type example (Dragonite - Dragon/Flying)
export const DragoniteTypes = {
  args: {
    types: ["Dragon", "Flying"],
  },
};

// Grass/Poison combination (like Bulbasaur)
export const GrassPoison = {
  args: {
    types: ["Grass", "Poison"],
  },
};

// Water/Psychic (like Starmie)
export const WaterPsychic = {
  args: {
    types: ["Water", "Psychic"],
  },
};

// Steel/Fairy (like Mawile)
export const SteelFairy = {
  args: {
    types: ["Steel", "Fairy"],
  },
};

// Demo showing all possible types (not realistic for a real Pokémon!)
// This is useful for testing and seeing all type badges at once
export const AllTypes = {
  args: {
    types: [
      "Normal",
      "Fire",
      "Water",
      "Electric",
      "Grass",
      "Ice",
      "Fighting",
      "Poison",
      "Ground",
      "Flying",
      "Psychic",
      "Bug",
      "Rock",
      "Ghost",
      "Dragon",
      "Dark",
      "Steel",
      "Fairy",
    ],
  },
};
