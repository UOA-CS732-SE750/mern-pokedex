import { Router } from "express";

const router = Router();

import pokedexRoutes from "./api-pokedex.js";
router.use("/pokedex", pokedexRoutes);

export default router;
