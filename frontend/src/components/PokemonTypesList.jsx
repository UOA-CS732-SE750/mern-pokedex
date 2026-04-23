import TypeBadge from "./TypeBadge";

/**
 * PokemonTypesList displays a list of Pokémon types as colored badges.
 * 
 * This component renders multiple TypeBadge components for Pokémon that have
 * one or more types (e.g., Fire/Flying for Charizard).
 * 
 * @param {Object} props - Component props
 * @param {string[]} props.types - Array of Pokémon type names to display
 */
export default function PokemonTypesList({ types }) {
  return (
    <div className="pokemon-types-container">
      {types.map((type) => (
        <TypeBadge key={type} type={type} />
      ))}
    </div>
  );
}
