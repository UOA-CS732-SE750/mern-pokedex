import PokemonListItem from "./PokemonListItem";

export default function PokemonList({ pokemon }) {
  return (
    <div className="pokemon-list">
      <PokemonListItem />
      <PokemonListItem />
      <PokemonListItem />
      <PokemonListItem />
      <PokemonListItem />
    </div>
  );
}
