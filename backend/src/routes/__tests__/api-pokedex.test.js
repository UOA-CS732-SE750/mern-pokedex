import { describe, test, expect, beforeAll, beforeEach, afterAll } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import express from "express";
import { Species } from "../../db/schema.js";
import apiPokedexRouter from "../api-pokedex.js";

/**
 * Integration tests for the Pokedex API routes
 * Tests the three main endpoints: GET /api/pokedex, GET /api/pokedex/:dexNumber, PATCH /api/pokedex/:dexNumber/is-favourite
 */

/** @type {MongoMemoryServer} */
let mongoServer;
/** @type {express.Application} */
let app;

// Test data - a subset of Pokemon covering multiple generations and different states
const testPokemon = [
  {
    dexNumber: 1,
    name: "Bulbasaur",
    gen: 1,
    normalImage: "https://example.com/bulbasaur.png",
    shinyImage: "https://example.com/bulbasaur-shiny.png",
    types: ["Grass", "Poison"],
    crySound: "https://example.com/bulbasaur.ogg",
    dexEntry: "A strange seed was planted on its back at birth.",
    isFavourite: false
  },
  {
    dexNumber: 4,
    name: "Charmander",
    gen: 1,
    normalImage: "https://example.com/charmander.png",
    shinyImage: "https://example.com/charmander-shiny.png",
    types: ["Fire"],
    crySound: "https://example.com/charmander.ogg",
    dexEntry: "Obviously prefers hot places.",
    isFavourite: true
  },
  {
    dexNumber: 7,
    name: "Squirtle",
    gen: 1,
    normalImage: "https://example.com/squirtle.png",
    shinyImage: "https://example.com/squirtle-shiny.png",
    types: ["Water"],
    crySound: "https://example.com/squirtle.ogg",
    dexEntry: "After birth, its back swells and hardens into a shell.",
    isFavourite: false
  },
  {
    dexNumber: 25,
    name: "Pikachu",
    gen: 1,
    normalImage: "https://example.com/pikachu.png",
    shinyImage: "https://example.com/pikachu-shiny.png",
    types: ["Electric"],
    crySound: "https://example.com/pikachu.ogg",
    dexEntry: "When several of these Pokémon gather, their electricity could build.",
    isFavourite: true
  },
  {
    dexNumber: 152,
    name: "Chikorita",
    gen: 2,
    normalImage: "https://example.com/chikorita.png",
    shinyImage: "https://example.com/chikorita-shiny.png",
    types: ["Grass"],
    crySound: "https://example.com/chikorita.ogg",
    dexEntry: "A sweet aroma gently wafts from the leaf on its head.",
    isFavourite: false
  },
  {
    dexNumber: 252,
    name: "Treecko",
    gen: 3,
    normalImage: "https://example.com/treecko.png",
    shinyImage: "https://example.com/treecko-shiny.png",
    types: ["Grass"],
    crySound: "https://example.com/treecko.ogg",
    dexEntry: "The soles of its feet have tiny spikes.",
    isFavourite: true
  },
  {
    dexNumber: 501,
    name: "Oshawott",
    gen: 5,
    normalImage: "https://example.com/oshawott.png",
    shinyImage: "https://example.com/oshawott-shiny.png",
    types: ["Water"],
    crySound: "https://example.com/oshawott.ogg",
    dexEntry: "It fights using the scalchop on its stomach.",
    isFavourite: false
  },
  {
    dexNumber: 906,
    name: "Sprigatito",
    gen: 9,
    normalImage: "https://example.com/sprigatito.png",
    shinyImage: "https://example.com/sprigatito-shiny.png",
    types: ["Grass"],
    crySound: "https://example.com/sprigatito.ogg",
    dexEntry: "Its fluffy fur is similar in composition to plants.",
    isFavourite: false
  }
];

// Set up Express app with the API router
beforeAll(async () => {
  // Start MongoDB Memory Server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Create Express app for testing
  app = express();
  app.use(express.json());
  app.use("/api/pokedex", apiPokedexRouter);
});

// Populate the database with test data before each test
beforeEach(async () => {
  await Species.deleteMany({});
  await Species.insertMany(testPokemon);
});

// Clean up after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("GET /api/pokedex - List Pokemon", () => {
  describe("Success Cases", () => {
    test("should return all Pokemon when no filters applied", async () => {
      const response = await request(app).get("/api/pokedex");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(testPokemon.length);
      expect(response.body[0]).toHaveProperty("dexNumber");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("gen");
      expect(response.body[0]).toHaveProperty("isFavourite");
    });

    test("should filter by generation 1", async () => {
      const response = await request(app).get("/api/pokedex?gen=1");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(4); // Bulbasaur, Charmander, Squirtle, Pikachu
      response.body.forEach(pokemon => {
        expect(pokemon.gen).toBe(1);
      });
    });

    test("should filter by generation 5", async () => {
      const response = await request(app).get("/api/pokedex?gen=5");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1); // Oshawott
      expect(response.body[0].name).toBe("Oshawott");
      expect(response.body[0].gen).toBe(5);
    });

    test("should return only favourites when favouritesOnly=true", async () => {
      const response = await request(app).get("/api/pokedex?favouritesOnly=true");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3); // Charmander, Pikachu, Treecko
      response.body.forEach(pokemon => {
        expect(pokemon.isFavourite).toBe(true);
      });
    });

    test("should combine filters (gen + favouritesOnly)", async () => {
      const response = await request(app).get("/api/pokedex?gen=1&favouritesOnly=true");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2); // Charmander, Pikachu
      response.body.forEach(pokemon => {
        expect(pokemon.gen).toBe(1);
        expect(pokemon.isFavourite).toBe(true);
      });
    });

    test("should handle gen='all' explicitly", async () => {
      const response = await request(app).get("/api/pokedex?gen=all");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(testPokemon.length);
    });

    test("should return empty array when no results match filters", async () => {
      const response = await request(app).get("/api/pokedex?gen=9&favouritesOnly=true");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });
  });

  describe("Error Cases", () => {
    test("should return 400 for invalid generation (gen=10)", async () => {
      const response = await request(app).get("/api/pokedex?gen=10");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Invalid generation number");
    });

    test("should return 400 for invalid generation (gen=0)", async () => {
      const response = await request(app).get("/api/pokedex?gen=0");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Invalid generation number");
    });

    test("should return 400 for non-numeric generation", async () => {
      const response = await request(app).get("/api/pokedex?gen=abc");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Invalid generation number");
    });
  });

  describe("Response Structure", () => {
    test("should return only specified fields (_id, dexNumber, gen, name, isFavourite)", async () => {
      const response = await request(app).get("/api/pokedex");

      expect(response.status).toBe(200);
      const pokemon = response.body[0];
      
      // Should have these fields
      expect(pokemon).toHaveProperty("_id");
      expect(pokemon).toHaveProperty("dexNumber");
      expect(pokemon).toHaveProperty("gen");
      expect(pokemon).toHaveProperty("name");
      expect(pokemon).toHaveProperty("isFavourite");
    });

    test("should not include detailed fields (normalImage, dexEntry, etc.)", async () => {
      const response = await request(app).get("/api/pokedex");

      expect(response.status).toBe(200);
      const pokemon = response.body[0];
      
      // Should NOT have detailed fields
      expect(pokemon).not.toHaveProperty("normalImage");
      expect(pokemon).not.toHaveProperty("shinyImage");
      expect(pokemon).not.toHaveProperty("dexEntry");
      expect(pokemon).not.toHaveProperty("types");
      expect(pokemon).not.toHaveProperty("crySound");
    });
  });
});

describe("GET /api/pokedex/:dexNumber - Get Pokemon Details", () => {
  describe("Success Cases", () => {
    test("should return full Pokemon details for valid dexNumber", async () => {
      const response = await request(app).get("/api/pokedex/25");

      expect(response.status).toBe(200);
      expect(response.body.dexNumber).toBe(25);
      expect(response.body.name).toBe("Pikachu");
      expect(response.body.gen).toBe(1);
    });

    test("should include all fields (images, types, crySound, dexEntry)", async () => {
      const response = await request(app).get("/api/pokedex/25");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("normalImage");
      expect(response.body).toHaveProperty("shinyImage");
      expect(response.body).toHaveProperty("types");
      expect(response.body).toHaveProperty("crySound");
      expect(response.body).toHaveProperty("dexEntry");
      expect(response.body).toHaveProperty("isFavourite");
      expect(response.body.types).toEqual(["Electric"]);
    });
  });

  describe("Error Cases", () => {
    test("should return 404 for non-existent dexNumber", async () => {
      const response = await request(app).get("/api/pokedex/999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toContain("not found");
    });

    test("should return 400 for invalid dexNumber (non-numeric)", async () => {
      const response = await request(app).get("/api/pokedex/abc");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Invalid dex number");
    });

    test("should return 404 for negative dexNumber (valid number but not found)", async () => {
      // Note: parseInt("-5") returns -5, which is a valid number, so the API doesn't return 400
      // Instead, it tries to find dexNumber -5 in the database and returns 404 when not found
      const response = await request(app).get("/api/pokedex/-5");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toContain("not found");
    });
  });
});

describe("PATCH /api/pokedex/:dexNumber/is-favourite - Update Favourite Status", () => {
  describe("Success Cases", () => {
    test("should set isFavourite to true", async () => {
      const response = await request(app)
        .patch("/api/pokedex/1/is-favourite")
        .send({ isFavourite: true });

      expect(response.status).toBe(200);
      expect(response.body.dexNumber).toBe(1);
      expect(response.body.isFavourite).toBe(true);
    });

    test("should set isFavourite to false", async () => {
      const response = await request(app)
        .patch("/api/pokedex/25/is-favourite")
        .send({ isFavourite: false });

      expect(response.status).toBe(200);
      expect(response.body.dexNumber).toBe(25);
      expect(response.body.isFavourite).toBe(false);
    });

    test("should return updated Pokemon data after patch", async () => {
      const response = await request(app)
        .patch("/api/pokedex/7/is-favourite")
        .send({ isFavourite: true });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("gen");
      expect(response.body).toHaveProperty("types");
      expect(response.body.name).toBe("Squirtle");
    });

    test("should persist the favourite status change", async () => {
      // Update the favourite status
      await request(app)
        .patch("/api/pokedex/1/is-favourite")
        .send({ isFavourite: true });

      // Verify it persisted by querying the database directly
      const updatedPokemon = await Species.findOne({ dexNumber: 1 });

      expect(updatedPokemon).not.toBeNull();
      expect(updatedPokemon.isFavourite).toBe(true);
    });
  });

  describe("Error Cases", () => {
    test("should return 400 when isFavourite is missing from body", async () => {
      const response = await request(app)
        .patch("/api/pokedex/1/is-favourite")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("isFavourite must be a boolean");
    });

    test("should return 400 when isFavourite is not a boolean (string)", async () => {
      const response = await request(app)
        .patch("/api/pokedex/1/is-favourite")
        .send({ isFavourite: "true" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("isFavourite must be a boolean");
    });

    test("should return 400 when isFavourite is not a boolean (number)", async () => {
      const response = await request(app)
        .patch("/api/pokedex/1/is-favourite")
        .send({ isFavourite: 1 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("isFavourite must be a boolean");
    });

    test("should return 404 for non-existent dexNumber", async () => {
      const response = await request(app)
        .patch("/api/pokedex/999/is-favourite")
        .send({ isFavourite: true });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toContain("not found");
    });

    test("should return 400 for invalid dexNumber (non-numeric)", async () => {
      const response = await request(app)
        .patch("/api/pokedex/abc/is-favourite")
        .send({ isFavourite: true });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Invalid dex number");
    });
  });
});
