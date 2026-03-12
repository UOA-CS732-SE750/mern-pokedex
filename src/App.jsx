import PokemonList from "./components/PokemonList";
import PokemonView from "./components/PokemonView";
import SearchBar from "./components/SearchBar";
import { dummyData } from "./js/dummy-data";

function App() {
  return (
    <div className="pokedex-container">
      {/* Left Panel - Pokemon List */}
      <nav className="sidebar">
        <h2>Pokédex</h2>

        {/* Search bar */}
        <SearchBar />

        {/* Pokemon list */}
        <PokemonList pokemon={dummyData} />
      </nav>

      {/* Right Panel - Pokemon Details */}
      <PokemonView pokemon={dummyData[5]} />
    </div>
  );
}

export default App;
