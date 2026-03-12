export default function PokemonImageView({ normalImage, shinyImage }) {
  return (
    <div className="pokemon-image-container">
      {/* Star checkbox */}
      <label className="star-checkbox">
        <input type="checkbox" />
        <img src="/assets/images/star-64.png" alt="Star" />
        <span className="tooltip">show / hide shiny image</span>
      </label>

      <img
        src={normalImage}
        alt="Normal form"
        className="pokemon-image visible"
        id="pokemon-image"
      />
      <img src={shinyImage} alt="Shiny form" className="pokemon-image" />
    </div>
  );
}
