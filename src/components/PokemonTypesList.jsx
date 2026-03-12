import TypeBadge from "./TypeBadge";

export default function PokemonTypesList({ types }) {
  return (
    <div className="pokemon-types-container">
      {types.map((type) => (
        <TypeBadge key={type} type={type} />
      ))}
    </div>
  );
}
