import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

router.get("/:dexNumber", (req, res) => {
  const dexNumber = req.params.dexNumber;
  res.json({ message: `You requested the Pokémon with dex number ${dexNumber}.` });
});

export default router;
