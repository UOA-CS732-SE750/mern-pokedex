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
