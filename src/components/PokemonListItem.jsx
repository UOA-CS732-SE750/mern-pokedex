export default function PokemonListItem({ pokemon }) {

  // Destructure the properties we need from the pokemon object
  const { dexNumber, name } = pokemon;

  // TODO Give "active" CSS class when active/selected
  return (
    <div className="pokemon-list-item">
      <span className="pokemon-number">#{dexNumber}</span>
      <span className="pokemon-name">{name}</span>
    </div>
  );
}
