import "../styles.css";
import TypeBadge from "../components/TypeBadge";

export default {
  title: "Components/TypeBadge",
  component: TypeBadge,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
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
        "Fairy"
      ],
      description: "The Pokémon type to display"
    }
  }
};

export const Normal = {
  args: {
    type: "Normal"
  }
};

export const Dragon = {
  args: {
    type: "Dragon"
  }
};
