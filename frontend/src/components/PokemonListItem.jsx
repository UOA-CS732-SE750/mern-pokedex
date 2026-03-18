import clsx from "clsx";
import StarCheckbox from "./StarCheckbox";
import { useUpdateFavouriteStatus } from "../hooks/useUpdateFavouriteStatus";

// The ...props syntax allows us to pass through any additional props from the parent component to this one
export default function PokemonListItem({ pokemon, isSelected, ...props }) {
  const { mutateAsync: updateFavouriteStatus } = useUpdateFavouriteStatus();

  // Destructure the properties we need from the pokemon object
  const { dexNumber, name } = pokemon;

  // Handler for when the star checkbox is toggled
  function handleCheckboxChange(e) {
    const newStatus = e.target.checked;
    updateFavouriteStatus({ dexNumber, isFavourite: newStatus });
  }

  // TODO Give "active" CSS class when active/selected
  // With ...props, we can pass through an onClick handler from the parent component
  return (
    <div className={clsx("pokemon-list-item", { active: isSelected })} {...props}>
      <StarCheckbox
        className="list-item-star"
        checked={pokemon.isFavourite}
        onChange={handleCheckboxChange}
      />
      <span className="pokemon-number">#{dexNumber}</span>
      <span className="pokemon-name">{name}</span>
    </div>
  );
}
