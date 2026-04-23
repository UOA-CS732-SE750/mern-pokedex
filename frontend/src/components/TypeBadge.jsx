/**
 * TypeBadge displays a Pokémon type with color-coded styling.
 * 
 * Each type has its own distinct color scheme and icon matching the Pokémon games.
 * The badge includes both an icon and the type name.
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - The Pokémon type to display (e.g., "Fire", "Water", "Dragon")
 */
export default function TypeBadge({ type }) {

  // Image and CSS class names are based on the lowercase type.
  const lowerCase = type.toLowerCase();
  
  return (
    <span className={`type-badge ${lowerCase}`}>
      <img src={`/assets/images/type-icons/type-icon-${lowerCase}.png`} alt={type} />
      {type}
    </span>
  );
}
