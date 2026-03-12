import PokemonImageView from "./PokemonImageView";
import PokemonTypesList from "./PokemonTypesList";
import PokedexEntry from "./PokedexEntry";
import { placeholderPokemon } from "../js/dummy-data";

export default function PokemonView({ pokemon }) {

  // Destructure the necessary properties from the pokemon object, or use placeholder data if pokemon is null
  const { name, dexNumber, dexEntry, normalImage, shinyImage, types } =
    pokemon || placeholderPokemon;

  return (
    <main className="main-content">
      {/* Pokemon header */}
      <div className="pokemon-header">
        <h1 className="pokemon-name">{name}</h1>
        <span className="pokemon-number">#{dexNumber.toString().padStart(3, "0")}</span>
      </div>

      {/* Pokemon image */}
      <PokemonImageView normalImage={normalImage} shinyImage={shinyImage} />

      {/* Pokemon types */}
      <PokemonTypesList types={types} />

      {/* Pokedex entry */}
      <PokedexEntry dexEntry={dexEntry} />
    </main>
  );
}
