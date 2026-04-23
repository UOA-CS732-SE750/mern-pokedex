import PokemonList from "./components/PokemonList";
import PokemonView from "./components/PokemonView";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { useQueryPokedex } from "./hooks/useQueryPokedex";

/**
 * App is the main Pokédex application component.
 * 
 * This component orchestrates the entire Pokédex interface, managing:
 * - Selected Pokémon state
 * - Search and filter options
 * - Data fetching from the API
 * - Layout with sidebar (list) and main content (detail view)
 * 
 * The app uses TanStack Query for data fetching and caching.
 */
function App() {

  // Keep track of selected pokemon
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Keep track of search options
  const [searchOptions, setSearchOptions] = useState({
    searchTerm: "",
    gen: "1",
    favouritesOnly: false
  });

  const { data: pokemon, isLoading, error } = useQueryPokedex(searchOptions.gen, searchOptions.favouritesOnly);

  // Filtered list based on searchTerm
  const filteredPokemon = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchOptions.searchTerm.toLowerCase())
  );

  return (
    <div className="pokedex-container">
      {/* Left Panel - Pokemon List */}
      <nav className="sidebar">
        <h2>Pokédex</h2>

        {/* Search bar */}
        <SearchBar
          searchOptions={searchOptions}
          onSearchOptionsChange={(opts) => setSearchOptions({ ...searchOptions, ...opts })}
        />

        {/* Pokemon list */}
        <PokemonList
          pokemon={filteredPokemon}
          selectedId={selectedPokemon?._id}
          onSelectPokemon={setSelectedPokemon}
        />
      </nav>

      {/* Right Panel - Pokemon Details */}
      <PokemonView dexNumber={selectedPokemon?.dexNumber} />
    </div>
  );
}

export default App;
