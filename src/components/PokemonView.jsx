import PokemonImageView from "./PokemonImageView";
import PokemonTypesList from "./PokemonTypesList";
import PokedexEntry from "./PokedexEntry";

export default function PokemonView() {
  return (
    <main className="main-content">
      {/* Pokemon header */}
      <div className="pokemon-header">
        <h1 className="pokemon-name">Dragonite</h1>
        <span className="pokemon-number">#149</span>
      </div>

      {/* Pokemon image */}
      <PokemonImageView />

      {/* Pokemon types */}
      <PokemonTypesList />

      {/* Pokedex entry */}
      <PokedexEntry />
    </main>
  );
}
