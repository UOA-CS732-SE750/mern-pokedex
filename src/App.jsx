import PokemonList from "./components/PokemonList";
import PokemonView from "./components/PokemonView";
import SearchBar from "./components/SearchBar";
import { dummyData } from "./js/dummy-data";
import { useState } from "react";

function App() {
  // Keep track of selected pokemon
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Keep track of search options
  const [searchOptions, setSearchOptions] = useState({
    searchTerm: "",
    gen: "all"
  });

  // Filtered list based on searchTerm
  const filteredPokemon = dummyData.filter((pokemon) =>
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
      <PokemonView pokemon={selectedPokemon} />
    </div>
  );
}

export default App;
