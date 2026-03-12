import { useState } from "react";
import clsx from "clsx";

export default function PokemonImageView({ normalImage, shinyImage }) {
  // State to track whether to display the shiny image or not
  const [displayShiny, setDisplayShiny] = useState(false);

  return (
    <div className="pokemon-image-container">
      {/* Star checkbox */}
      <label className="star-checkbox">
        {/* This checkbox is bound to the displayShiny state through its checked
            prop and its onChange event */}
        <input
          type="checkbox"
          checked={displayShiny}
          onChange={() => setDisplayShiny(!displayShiny)}
        />
        <img src="/assets/images/star-64.png" alt="Star" />
        <span className="tooltip">show / hide shiny image</span>
      </label>

      {/* Conditionally apply the "visible" CSS class if displayShiny is false */}
      <img
        src={normalImage}
        alt="Normal form"
        className={clsx("pokemon-image", { visible: !displayShiny })}
        id="pokemon-image"
      />

      {/* Conditionally apply the "visible" CSS class if displayShiny is true */}
      <img
        src={shinyImage}
        alt="Shiny form"
        className={clsx("pokemon-image", { visible: displayShiny })}
      />
    </div>
  );
}
