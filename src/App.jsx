import PokemonList from "./components/PokemonList";
import PokemonView from "./components/PokemonView";
import SearchBar from "./components/SearchBar";
import { dummyData } from "./js/dummy-data";
import { useState } from "react";

function App() {
  // Keep track of selected pokemon
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="pokedex-container">
      {/* Left Panel - Pokemon List */}
      <nav className="sidebar">
        <h2>Pokédex</h2>

        {/* Search bar */}
        <SearchBar />

        {/* Pokemon list */}
        <PokemonList
          pokemon={dummyData}
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
