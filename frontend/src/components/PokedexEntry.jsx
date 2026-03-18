export default function PokedexEntry({ dexEntry }) {
  return (
    <div className="pokemon-description">
      <h3>Pokédex Entry</h3>
      <p>{dexEntry}</p>
    </div>
  );
}
