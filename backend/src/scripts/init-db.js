import "dotenv/config";

import mongoose from "mongoose";
import fs from "fs";
import { Species } from "../db/schema.js";

await mongoose.connect(process.env.DB_URL);
console.log("Connected to database!");
console.log();

await clearDatabase();
console.log();

await addSpecies();
console.log();

// Disconnect when complete
await mongoose.disconnect();
console.log("Disconnected from database!");

/**
 * Clears all existing data from the database collections.
 */
async function clearDatabase() {
  await Species.deleteMany();
  console.log("Database cleared");
}

/**
 * Loads Pokemon species data from species.json file and saves it to the database.
 * Reads the JSON file, creates Species documents with dexNumber, name, and generation info.
 * @returns {Promise<Array>} Promise that resolves to an array of saved Species documents for use in creating Pokemon teams
 */
async function addSpecies() {
  const speciesData = JSON.parse(fs.readFileSync("./src/data/species.json", { encoding: "utf-8" }));
  console.log(`${speciesData.length} species read from species.json`);
  const species = speciesData.map((s) => new Species(s));
  await Species.bulkSave(species);
  console.log("Pokémon species written to DB");
}
