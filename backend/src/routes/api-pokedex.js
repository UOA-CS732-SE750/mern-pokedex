import { Router } from "express";
import { Species } from "../db/schema.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const filter = {};
    const { gen } = req.query;

    if (gen && gen !== "all") {
      const genNumber = parseInt(gen);
      if (isNaN(genNumber) || genNumber < 1 || genNumber > 9) {
        return res.status(400).json({ error: "Invalid generation number" });
      }
      filter.gen = genNumber;
    }

    const species = await Species.find(filter, "_id dexNumber gen name");
    return res.json(species);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

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

export default router;
