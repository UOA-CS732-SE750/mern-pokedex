import { useState } from "react";
import clsx from "clsx";
import StarCheckbox from "./StarCheckbox";

export default function PokemonImageView({ normalImage, shinyImage }) {
  // State to track whether to display the shiny image or not
  const [displayShiny, setDisplayShiny] = useState(false);
  // Track which image URLs have loaded (not just boolean)
  const [loadedNormalUrl, setLoadedNormalUrl] = useState(null);
  const [loadedShinyUrl, setLoadedShinyUrl] = useState(null);

  // Check if the current images have loaded by comparing URLs
  const normalLoaded = loadedNormalUrl === normalImage;
  const shinyLoaded = loadedShinyUrl === shinyImage;

  // Determine if the currently displayed image has loaded
  const isCurrentImageLoaded = displayShiny ? shinyLoaded : normalLoaded;

  return (
    <div className="pokemon-image-container">
      {/* Star checkbox */}
      <StarCheckbox
        checked={displayShiny}
        onChange={() => setDisplayShiny(!displayShiny)}
        tooltip="show / hide shiny image"
        className="star-checkbox-positioned"
      />

      {/* Show placeholder while current image is loading */}
      {!isCurrentImageLoaded && (
        <img
          src="/assets/images/pokeball-placeholder.svg"
          alt="Loading..."
          className="pokemon-image visible"
          style={{ opacity: 0.3 }}
        />
      )}

      {/* Conditionally apply the "visible" CSS class if displayShiny is false AND image is loaded */}
      <img
        key={`normal-${normalImage}`}
        src={normalImage}
        alt="Normal form"
        className={clsx("pokemon-image", { visible: !displayShiny && normalLoaded })}
        onLoad={() => setLoadedNormalUrl(normalImage)}
        id="pokemon-image"
      />

      {/* Conditionally apply the "visible" CSS class if displayShiny is true AND image is loaded */}
      <img
        key={`shiny-${shinyImage}`}
        src={shinyImage}
        alt="Shiny form"
        className={clsx("pokemon-image", { visible: displayShiny && shinyLoaded })}
        onLoad={() => setLoadedShinyUrl(shinyImage)}
      />
    </div>
  );
}
