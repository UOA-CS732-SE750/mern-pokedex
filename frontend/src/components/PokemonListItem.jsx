import clsx from "clsx";
import StarCheckbox from "./StarCheckbox";
import { useUpdateFavouriteStatus } from "../hooks/useUpdateFavouriteStatus";

/**
 * PokemonListItem displays a single Pokémon in the sidebar list.
 * 
 * Each item shows the Pokémon's name, number, and a star checkbox for marking favourites.
 * The item can be selected (highlighted) and supports click interactions.
 * Additional props are passed through to the container div (e.g., onClick handlers).
 * 
 * @param {Object} props - Component props
 * @param {Object} props.pokemon - The Pokémon object containing name, dexNumber, and isFavourite
 * @param {boolean} props.isSelected - Whether this Pokémon is currently selected
 * @param {Object} props.props - Additional props passed through to the container div
 */
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
