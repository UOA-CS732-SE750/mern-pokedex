/**
 * PokedexEntry displays a Pokémon's Pokédex entry description.
 * 
 * This component renders the flavor text or description from the Pokédex,
 * providing background information about the Pokémon's behavior, habitat,
 * or characteristics.
 * 
 * @param {Object} props - Component props
 * @param {string} props.dexEntry - The Pokédex entry text to display
 */
export default function PokedexEntry({ dexEntry }) {
  return (
    <div className="pokemon-description">
      <h3>Pokédex Entry</h3>
      <p>{dexEntry}</p>
    </div>
  );
}
