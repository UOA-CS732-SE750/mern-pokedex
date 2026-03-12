import PokemonList from "./components/PokemonList";
import PokemonView from "./components/PokemonView";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="pokedex-container">
      {/* Left Panel - Pokemon List */}
      <nav className="sidebar">
        <h2>Pokédex</h2>

        {/* Search bar */}
        <SearchBar />

        {/* Pokemon list */}
        <PokemonList />
      </nav>

      {/* Right Panel - Pokemon Details */}
      <PokemonView />
    </div>
  );
}

export default App;
