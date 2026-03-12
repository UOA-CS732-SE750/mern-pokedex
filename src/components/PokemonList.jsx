import PokemonListItem from "./PokemonListItem";

export default function PokemonList({ pokemon }) {
  return (
    <div className="pokemon-list">
      {pokemon.map((mon) => (
        <PokemonListItem key={mon.id} pokemon={mon} />
      ))}
    </div>
  );
}
