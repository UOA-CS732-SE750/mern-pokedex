import PokemonImageView from "./PokemonImageView";
import PokemonTypesList from "./PokemonTypesList";
import PokedexEntry from "./PokedexEntry";
import { placeholderPokemon } from "../js/dummy-data";
import { useEffect, useState } from "react";

export default function PokemonView({ dexNumber }) {
  const [pokemon, setPokemon] = useState(null);

  // Function to fetch pokemon details by dex number
  async function fetchPokemonDetails(dexNumber) {
    if (!dexNumber) return setPokemon(null); // Clear pokemon if no dex number
    const url = `https://pkserve.ocean.anhydrous.dev/api/pokedex/${dexNumber}`;
    const response = await fetch(url);
    const data = await response.json();
    setPokemon(data);
  }

  // Effect to fetch pokemon details when dex number changes
  useEffect(() => {
    fetchPokemonDetails(dexNumber);
  }, [dexNumber]);

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
