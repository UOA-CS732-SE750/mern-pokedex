import PokemonList from "./components/PokemonList";
import PokemonView from "./components/PokemonView";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";

function App() {
  // All pokemon (start with empty array)
  const [pokemon, setPokemon] = useState([]);

  // Keep track of selected pokemon
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Keep track of search options
  const [searchOptions, setSearchOptions] = useState({
    searchTerm: "",
    gen: "1"
  });

  // Filtered list based on searchTerm
  const filteredPokemon = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchOptions.searchTerm.toLowerCase())
  );

  // Function to fetch pokemon based on search gen
  async function fetchPokemonByGen(gen) {
    const url = `https://pkserve.ocean.anhydrous.dev/api/pokedex?gen=${gen}`;
    const response = await fetch(url);
    const data = await response.json();
    setPokemon(data);
  }

  // Effect to fetch pokemon when gen changes
  useEffect(() => {
    fetchPokemonByGen(searchOptions.gen);
  }, [searchOptions.gen]);

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
