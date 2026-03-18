import clsx from "clsx";

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
