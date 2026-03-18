import fs from "fs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DATA_FILE_PATH = "./src/data/species.json";
if (!fs.existsSync(DATA_FILE_PATH)) {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify([], null, 2));
  console.log("Created new species.json file.");
}

const speciesFile = JSON.parse(fs.readFileSync(DATA_FILE_PATH, { encoding: "utf-8" }));
console.log(speciesFile);

let dexNumber = 1;
while (true) {
  console.log(`Fetching data for dexNumber ${dexNumber}...`);
  try {
    const species = await fetchPokemon(dexNumber);
    speciesFile.push(species);
    await sleep(500);
  } catch (error) {
    console.error("Error fetching from PokeAPI:", error.message);
    break;
  }

  dexNumber++;
}

fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(speciesFile, null, 2));
console.log("Updated species.json with data from PokeAPI.");

/**
 * Fetches Pokémon data from PokeAPI for a given dexNumber.
 * @param {*} dexNumber the Pokédex number of the Pokémon to fetch
 * @returns {Object} species object with data fetched from PokeAPI
 * @throws {Error} if the Pokémon is not found in PokeAPI
 */
export async function fetchPokemon(dexNumber) {
  // Not found, or no dexEntry, so load from PokeAPI.co
  console.log(`Loading data for dexNumber ${dexNumber} from PokeAPI.co...`);

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
  if (!response.ok)
    throw new Error(
      ` Pokémon not found in PokeAPI pokemon endpoint: Status code ${response.status}`
    );

  const pokeApiData = await response.json();
  //   console.log("PokeAPI data:", pokeApiData);

  // Create species object with fields from PokeAPI data
  const species = {
    dexNumber,
    name: pokeApiData.name.charAt(0).toUpperCase() + pokeApiData.name.slice(1),
    gen: getGen(dexNumber),
    normalImage: pokeApiData.sprites.other.home.front_default,
    shinyImage: pokeApiData.sprites.other.home.front_shiny,
    types: pokeApiData.types.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
    crySound: pokeApiData.cries.legacy || pokeApiData.cries.latest || null,
    dexEntry: "" // To be filled in below
  };

  // Fetch dex entry from species endpoint
  const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNumber}`);
  if (!speciesResponse.ok)
    throw new Error(
      `Species not found in PokeAPI pokemon-species endpoint: Status code ${speciesResponse.status}`
    );
  const speciesData = await speciesResponse.json();
  const englishEntry = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );
  species.dexEntry = englishEntry ? englishEntry.flavor_text.replace(/[\f\n]/g, " ") : "";

  // Find species' English name - use this if it exists, opposed to the name from the pokemon endpoint.
  const englishNameData = speciesData.names.find((name) => name.language.name === "en");
  if (englishNameData) species.name = englishNameData.name;
  return species;
}

export function getGen(dexNumber) {
  if (dexNumber >= 1 && dexNumber <= 151) return 1;
  if (dexNumber >= 152 && dexNumber <= 251) return 2;
  if (dexNumber >= 252 && dexNumber <= 386) return 3;
  if (dexNumber >= 387 && dexNumber <= 493) return 4;
  if (dexNumber >= 494 && dexNumber <= 649) return 5;
  if (dexNumber >= 650 && dexNumber <= 721) return 6;
  if (dexNumber >= 722 && dexNumber <= 809) return 7;
  if (dexNumber >= 810 && dexNumber <= 905) return 8;
  if (dexNumber >= 906 && dexNumber <= 1025) return 9;
  throw new Error("Invalid dexNumber");
}