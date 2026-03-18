import { Router } from "express";
import { Species } from "../db/schema.js";
const router = Router();

/**
 * GET /api/pokedex
 * Optional query parameters:
 * - gen: number (1-9) or "all" (default: "all")
 * - favouritesOnly: boolean ("true" or "false", default: "false")
 *
 * Returns a list of Pokémon species with their dexNumber, gen, name, and isFavourite status.
 */
router.get("/", async (req, res) => {
  try {
    const filter = {};
    const { gen, favouritesOnly } = req.query;

    // Validate and apply generation filter
    if (gen && gen !== "all") {
      const genNumber = parseInt(gen);
      if (isNaN(genNumber) || genNumber < 1 || genNumber > 9) {
        return res.status(400).json({ error: "Invalid generation number" });
      }
      filter.gen = genNumber;
    }

    // Apply favourites filter if specified
    if (favouritesOnly === "true") {
      filter.isFavourite = true;
    }

    const species = await Species.find(filter, "_id dexNumber gen name isFavourite");
    return res.json(species);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/pokedex/:dexNumber
 *
 * Returns detailed information about a specific Pokémon species
 */
router.get("/:dexNumber", async (req, res) => {
  try {
    const dexNumber = parseInt(req.params.dexNumber);

    if (isNaN(dexNumber)) {
      return res.status(400).json({ error: "Invalid dex number" });
    }

    const species = await Species.findOne({ dexNumber });
    if (!species) {
      return res.status(404).json({ error: `Pokémon with dex number ${dexNumber} not found` });
    }
    return res.json(species);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/pokedex/:dexNumber/is-favourite
 *
 * Request body should be JSON with a boolean property "isFavourite", e.g. { "isFavourite": true }
 *
 * Updates the isFavourite status of the specified Pokémon species and returns the updated species data.
 */
router.patch("/:dexNumber/is-favourite", async (req, res) => {
  try {
    const dexNumber = parseInt(req.params.dexNumber);

    const { isFavourite } = req.body;
    if (typeof isFavourite !== "boolean") {
      return res.status(400).json({ error: "isFavourite must be a boolean" });
    }

    if (isNaN(dexNumber)) {
      return res.status(400).json({ error: "Invalid dex number" });
    }

    const species = await Species.findOneAndUpdate(
      { dexNumber },
      { isFavourite },
      { new: true } // Return the updated document
    );

    if (!species) {
      return res.status(404).json({ error: `Pokémon with dex number ${dexNumber} not found` });
    }

    return res.json(species);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
