import { useState } from "react";

export default function SearchBar({ searchOptions, onSearchOptionsChange }) {
  const { searchTerm, gen } = searchOptions;
  return (
    <div className="search-container">
      <select
        className="search-input generation-filter"
        value={gen}
        onChange={(e) => onSearchOptionsChange({ gen: e.target.value })}
      >
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
      <input
        type="text"
        className="search-input"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => onSearchOptionsChange({ searchTerm: e.target.value })}
      />
    </div>
  );
}
