import clsx from "clsx";

// The ...props syntax allows us to pass through any additional props from the parent component to this one
export default function PokemonListItem({ pokemon, isSelected, ...props }) {

  // Destructure the properties we need from the pokemon object
  const { dexNumber, name } = pokemon;

  // TODO Give "active" CSS class when active/selected
  // With ...props, we can pass through an onClick handler from the parent component
  return (
    <div className={clsx("pokemon-list-item", { active: isSelected })} {...props}>
      <span className="pokemon-number">#{dexNumber}</span>
      <span className="pokemon-name">{name}</span>
    </div>
  );
}
