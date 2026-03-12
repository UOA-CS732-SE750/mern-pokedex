export default function PokemonImageView() {
  return (
    <div className="pokemon-image-container">
      {/* Star checkbox */}
      <label className="star-checkbox">
        <input type="checkbox" />
        <img src="/assets/images/star-64.png" alt="Star" />
        <span className="tooltip">show / hide shiny image</span>
      </label>

      <img
        src="/assets/images/pokemon/149.png"
        alt="Dragonite"
        className="pokemon-image visible"
        id="pokemon-image"
      />
      <img
        src="/assets/images/pokemon/149-shiny.png"
        alt="Shiny Dragonite"
        className="pokemon-image"
      />
    </div>
  );
}
