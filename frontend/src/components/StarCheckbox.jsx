import clsx from "clsx";

/**
 * StarCheckbox is a custom checkbox component with a star icon and optional tooltip.
 * 
 * Commonly used for marking Pokémon as favourites or toggling special states.
 * The checkbox is styled with a star image that can be customized.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {Function} props.onChange - Callback function when checkbox state changes
 * @param {string} [props.tooltip] - Optional tooltip text to display
 * @param {string} [props.iconSrc="/assets/images/star-64.png"] - Path to the star icon image
 * @param {string} [props.iconAlt="Star"] - Alt text for the star icon
 * @param {string} [props.className=""] - Additional CSS class names to apply
 */
export default function StarCheckbox({ 
  checked, 
  onChange, 
  tooltip,
  iconSrc = "/assets/images/star-64.png",
  iconAlt = "Star",
  className = ""
}) {
  return (
    <label className={clsx("star-checkbox", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <img src={iconSrc} alt={iconAlt} />
      {tooltip && <span className="tooltip">{tooltip}</span>}
    </label>
  );
}
