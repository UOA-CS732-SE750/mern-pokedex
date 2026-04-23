import PokemonListItem from "./PokemonListItem";

/**
 * PokemonList renders a scrollable list of Pokémon.
 * 
 * Each Pokémon is rendered as a PokemonListItem with selection highlighting.
 * The list handles user selection and displays the currently selected Pokémon.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.pokemon - Array of Pokémon objects to display
 * @param {string} props.selectedId - ID of the currently selected Pokémon
 * @param {Function} props.onSelectPokemon - Callback function when a Pokémon is selected
 */
export default function PokemonList({ pokemon, selectedId, onSelectPokemon }) {
  return (
    <div className="pokemon-list">
      {pokemon.map((mon) => (
        <PokemonListItem
          key={mon._id}
          pokemon={mon}
          isSelected={mon._id === selectedId}
          onClick={() => onSelectPokemon(mon)}
        />
      ))}
    </div>
  );
}
