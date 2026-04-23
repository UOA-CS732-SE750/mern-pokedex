import PokemonImageView from "./PokemonImageView";
import PokemonTypesList from "./PokemonTypesList";
import PokedexEntry from "./PokedexEntry";
import { placeholderPokemon } from "../js/dummy-data";
import { useQueryPokemon } from "../hooks/useQueryPokemon";

/**
 * PokemonView displays detailed information about a selected Pokémon.
 * 
 * This is the main detail panel that shows the Pokémon's name, number, image,
 * types, and Pokédex entry. It fetches Pokémon data using the useQueryPokemon hook
 * and displays placeholder data while loading.
 * 
 * @param {Object} props - Component props
 * @param {number} props.dexNumber - The National Pokédex number of the Pokémon to display
 */
export default function PokemonView({ dexNumber }) {
  const { data: pokemon, isLoading, error } = useQueryPokemon(dexNumber);

  // Destructure the necessary properties from the pokemon object, or use placeholder data if pokemon is null
  const { name, dexEntry, normalImage, shinyImage, types } = pokemon || placeholderPokemon;

  return (
    <main className="main-content">
      {/* Pokemon header */}
      <div className="pokemon-header">
        <h1 className="pokemon-name">{name}</h1>
        <span className="pokemon-number">#{dexNumber?.toString().padStart(3, "0") || "---"}</span>
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
