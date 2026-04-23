import "../styles.css";
import PokemonListItem from "../components/PokemonListItem";
import { fn, mocked } from "storybook/test";
import { useUpdateFavouriteStatus } from "../hooks/useUpdateFavouriteStatus";

// Default export: Storybook configuration
// This component uses the useUpdateFavouriteStatus hook, which we mock below
export default {
  title: "Components/PokemonListItem",
  component: PokemonListItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  // beforeEach runs before each story to set up the mock behavior
  beforeEach: async () => {
    // Set up the mock return value for the useUpdateFavouriteStatus hook
    // The mock was registered in .storybook/preview.js using sb.mock()
    // Since we're mocking the entire hook, TanStack Query is never invoked
    mocked(useUpdateFavouriteStatus).mockReturnValue({
      mutateAsync: fn(), // fn() creates a Storybook action that logs to Actions panel
    });
  },
  // Decorators provide styling/layout context
  decorators: [
    (Story) => (
      // Add some width constraints so it looks like it's in a list
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    pokemon: {
      control: "object",
      description: "The Pokémon object with name, dexNumber, and isFavourite",
    },
    isSelected: {
      control: "boolean",
      description: "Whether this Pokémon is currently selected",
    },
    onClick: {
      description: "Callback when the list item is clicked",
    },
  },
  // Set up default args with action tracking
  args: {
    onClick: fn(), // This will show clicks in the Actions panel
  },
};

// Unselected Pokemon (not favourited)
export const Unselected = {
  args: {
    pokemon: {
      _id: "1",
      dexNumber: 149,
      name: "Dragonite",
      isFavourite: false,
    },
    isSelected: false,
  },
};

// Selected Pokemon (highlighted)
export const Selected = {
  args: {
    pokemon: {
      _id: "1",
      dexNumber: 149,
      name: "Dragonite",
      isFavourite: false,
    },
    isSelected: true, // This applies the "active" CSS class
  },
};

// Favourited Pokemon
export const Favourited = {
  args: {
    pokemon: {
      _id: "2",
      dexNumber: 25,
      name: "Pikachu",
      isFavourite: true, // Star checkbox will be checked
    },
    isSelected: false,
  },
};

// Selected AND Favourited
export const SelectedAndFavourited = {
  args: {
    pokemon: {
      _id: "3",
      dexNumber: 6,
      name: "Charizard",
      isFavourite: true,
    },
    isSelected: true,
  },
};

// Low dex number (single digit)
export const LowDexNumber = {
  args: {
    pokemon: {
      _id: "4",
      dexNumber: 1,
      name: "Bulbasaur",
      isFavourite: false,
    },
    isSelected: false,
  },
};

// High dex number (triple digits)
export const HighDexNumber = {
  args: {
    pokemon: {
      _id: "5",
      dexNumber: 898,
      name: "Calyrex",
      isFavourite: false,
    },
    isSelected: false,
  },
};

// Pokemon with long name
export const LongName = {
  args: {
    pokemon: {
      _id: "6",
      dexNumber: 772,
      name: "Type: Null",
      isFavourite: true,
    },
    isSelected: false,
  },
};

// Interactive list example showing multiple items
// This demonstrates how the component looks in context
export const InListContext = {
  render: () => {
    const pokemonList = [
      { _id: "1", dexNumber: 1, name: "Bulbasaur", isFavourite: false },
      { _id: "2", dexNumber: 4, name: "Charmander", isFavourite: true },
      { _id: "3", dexNumber: 7, name: "Squirtle", isFavourite: false },
      { _id: "4", dexNumber: 25, name: "Pikachu", isFavourite: true },
      { _id: "5", dexNumber: 149, name: "Dragonite", isFavourite: false },
    ];

    return (
      <div style={{ maxWidth: '300px', backgroundColor: '#f5f5f5', padding: '1rem' }}>
        {pokemonList.map((pokemon, index) => (
          <PokemonListItem
            key={pokemon._id}
            pokemon={pokemon}
            isSelected={index === 1} // Charmander is selected
            onClick={fn()}
          />
        ))}
      </div>
    );
  },
};
