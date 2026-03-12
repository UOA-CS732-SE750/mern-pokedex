
function App() {
  return (
    <div className="pokedex-container">
      
      {/* Left Panel - Pokemon List */}
      <nav className="sidebar">
        <h2>Pokédex</h2>

        {/* Search bar */}
        <div className="search-container">
          <select className="search-input generation-filter">
            <option value="all">All Generations</option>
            <option value="1">Gen 1 (Kanto)</option>
            <option value="2">Gen 2 (Johto)</option>
            <option value="3">Gen 3 (Hoenn)</option>
            <option value="4">Gen 4 (Sinnoh)</option>
            <option value="5">Gen 5 (Unova)</option>
            <option value="6">Gen 6 (Kalos)</option>
            <option value="7">Gen 7 (Alola)</option>
            <option value="8">Gen 8 (Galar & Hisui)</option>
            <option value="9">Gen 9 (Paldea)</option>
          </select>
          <input type="text" className="search-input" placeholder="Search Pokémon..." />
        </div>

        {/* Pokemon list */}
        <div className="pokemon-list">

          {/* Individual Pokemon list item */}
          <div className="pokemon-list-item">
            <span className="pokemon-number">#003</span>
            <span className="pokemon-name">Venusaur</span>
          </div>

          <div className="pokemon-list-item">
            <span className="pokemon-number">#006</span>
            <span className="pokemon-name">Charizard</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#009</span>
            <span className="pokemon-name">Blastoise</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#025</span>
            <span className="pokemon-name">Pikachu</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#059</span>
            <span className="pokemon-name">Arcanine</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#094</span>
            <span className="pokemon-name">Gengar</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#130</span>
            <span className="pokemon-name">Gyarados</span>
          </div>
          <div className="pokemon-list-item active">
            <span className="pokemon-number">#149</span>
            <span className="pokemon-name">Dragonite</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#150</span>
            <span className="pokemon-name">Mewtwo</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#151</span>
            <span className="pokemon-name">Mew</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#155</span>
            <span className="pokemon-name">Cyndaquil</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#157</span>
            <span className="pokemon-name">Typhlosion</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#181</span>
            <span className="pokemon-name">Ampharos</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#196</span>
            <span className="pokemon-name">Espeon</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#248</span>
            <span className="pokemon-name">Tyranitar</span>
          </div>
        </div>
      </nav>

      {/* Right Panel - Pokemon Details */}
      <main className="main-content">

        {/* Pokemon header */}
        <div className="pokemon-header">
          <h1 className="pokemon-name">Dragonite</h1>
          <span className="pokemon-number">#149</span>
        </div>

        {/* Pokemon image */}
        <div className="pokemon-image-container">

          {/* Star checkbox */}
          <label className="star-checkbox">
            <input type="checkbox" />
            <img src="/assets/images/star-64.png" alt="Star" />
            <span className="tooltip">show / hide shiny image</span>
          </label>

          <img src="/assets/images/pokemon/149.png" alt="Dragonite" className="pokemon-image visible" id="pokemon-image" />
          <img src="/assets/images/pokemon/149-shiny.png" alt="Shiny Dragonite" className="pokemon-image" />
        </div>
        
        {/* Pokemon types */}
        <div className="pokemon-types-container">

          {/* Single type badge */}
          <span className="type-badge dragon">
            <img src="/assets/images/type-icons/type-icon-dragon.png" alt="Dragon" />
            Dragon
          </span>
          
          <span className="type-badge flying">
            <img src="/assets/images/type-icons/type-icon-flying.png" alt="Flying" />
            Flying
          </span>
        </div>
        
        {/* Pokedex entry */}
        <div className="pokemon-description">
          <h3>Pokédex Entry</h3>
          <p>An extremely rarely seen marine Pokémon. Its intelligence is said to match that of humans. It is able to freely control the weather, and is said to live in the sea.</p>
        </div>
      </main>
    </div>
  );
}

export default App;