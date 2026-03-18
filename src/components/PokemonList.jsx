import PokemonListItem from "./PokemonListItem";

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
