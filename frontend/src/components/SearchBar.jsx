import { useState } from "react";

/**
 * SearchBar provides filtering controls for the Pokédex list.
 * 
 * Users can filter Pokémon by:
 * - Generation (Gen 1-9 or all)
 * - Search term (name matching)
 * - Favourites only
 * 
 * The component manages multiple search options and notifies the parent
 * component when any filter changes.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.searchOptions - Current search filter options
 * @param {string} props.searchOptions.searchTerm - Text search query
 * @param {string} props.searchOptions.gen - Selected generation ("all" or "1"-"9")
 * @param {boolean} props.searchOptions.favouritesOnly - Whether to show only favourites
 * @param {Function} props.onSearchOptionsChange - Callback to update search options
 */
export default function SearchBar({ searchOptions, onSearchOptionsChange }) {
  const { searchTerm, gen, favouritesOnly } = searchOptions;
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
      <label className="favourites-checkbox">
        <input
          type="checkbox"
          checked={favouritesOnly || false}
          onChange={(e) => onSearchOptionsChange({ favouritesOnly: e.target.checked })}
        />
        <span>Show favourites only</span>
      </label>
    </div>
  );
}
