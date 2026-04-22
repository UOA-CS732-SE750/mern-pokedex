import { describe, test, expect, beforeAll, beforeEach, afterAll } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { Species } from "../schema.js";
import { VALID_TYPES } from "../../data/pokemon-types.js";

/**
 * Unit tests for the Species Mongoose schema
 * Uses mongodb-memory-server to create an isolated in-memory database
 */

/** @type {MongoMemoryServer} */
let mongoServer;

// Set up MongoDB Memory Server once before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// Clear the database before each test to ensure test isolation
beforeEach(async () => {
  await Species.deleteMany({});
});

// Clean up and disconnect after all tests are complete
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Species Model - Basic Creation", () => {
  test("should create a valid Species document with all required fields", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu"
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies._id).toBeDefined();
    expect(savedSpecies.dexNumber).toBe(25);
    expect(savedSpecies.gen).toBe(1);
    expect(savedSpecies.name).toBe("Pikachu");
  });

  test("should create a Species document with all fields populated", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu",
      normalImage: "pikachu.png",
      shinyImage: "pikachu-shiny.png",
      dexEntry:
        "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
      types: ["Electric"],
      crySound: "pikachu.mp3",
      isFavourite: true
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.dexNumber).toBe(25);
    expect(savedSpecies.gen).toBe(1);
    expect(savedSpecies.name).toBe("Pikachu");
    expect(savedSpecies.normalImage).toBe("pikachu.png");
    expect(savedSpecies.shinyImage).toBe("pikachu-shiny.png");
    expect(savedSpecies.dexEntry).toBe(
      "When several of these Pokémon gather, their electricity could build and cause lightning storms."
    );
    expect(savedSpecies.types).toEqual(["Electric"]);
    expect(savedSpecies.crySound).toBe("pikachu.mp3");
    expect(savedSpecies.isFavourite).toBe(true);
  });
});

describe("Species Model - Required Field Validation", () => {
  test("should fail validation when dexNumber is missing", async () => {
    const speciesData = {
      gen: 1,
      name: "Pikachu"
    };

    const species = new Species(speciesData);

    await expect(species.save()).rejects.toThrow();
  });

  test("should fail validation when gen is missing", async () => {
    const speciesData = {
      dexNumber: 25,
      name: "Pikachu"
    };

    const species = new Species(speciesData);

    await expect(species.save()).rejects.toThrow();
  });

  test("should fail validation when name is missing", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1
    };

    const species = new Species(speciesData);

    await expect(species.save()).rejects.toThrow();
  });
});

describe("Species Model - Optional Fields", () => {
  test("should successfully save without optional fields", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu"
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.normalImage).toBeUndefined();
    expect(savedSpecies.shinyImage).toBeUndefined();
    expect(savedSpecies.dexEntry).toBeUndefined();
    expect(savedSpecies.types).toEqual([]);
    expect(savedSpecies.crySound).toBeUndefined();
    // isFavourite should have default value
    expect(savedSpecies.isFavourite).toBe(false);
  });
});

describe("Species Model - Default Values", () => {
  test("should default isFavourite to false when not provided", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu"
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.isFavourite).toBe(false);
  });

  test("should allow isFavourite to be explicitly set to true", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu",
      isFavourite: true
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.isFavourite).toBe(true);
  });

  test("should allow isFavourite to be explicitly set to false", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu",
      isFavourite: false
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.isFavourite).toBe(false);
  });
});

describe("Species Model - Type Validation", () => {
  test("should reject non-numeric dexNumber", async () => {
    const speciesData = {
      dexNumber: "twenty-five",
      gen: 1,
      name: "Pikachu"
    };

    const species = new Species(speciesData);

    await expect(species.save()).rejects.toThrow();
  });

  test("should reject non-numeric gen", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: "one",
      name: "Pikachu"
    };

    const species = new Species(speciesData);

    await expect(species.save()).rejects.toThrow();
  });
});

describe("Species Model - Types Array Enum Validation", () => {
  test("should accept a single valid Pokemon type", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu",
      types: ["Electric"]
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.types).toEqual(["Electric"]);
  });

  test("should accept multiple valid Pokemon types", async () => {
    const speciesData = {
      dexNumber: 6,
      gen: 1,
      name: "Charizard",
      types: ["Fire", "Flying"]
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.types).toEqual(["Fire", "Flying"]);
  });

  test("should accept all valid Pokemon types from VALID_TYPES", async () => {
    const speciesData = {
      dexNumber: 999,
      gen: 1,
      name: "TestMon",
      types: [...VALID_TYPES]
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.types).toEqual(VALID_TYPES);
  });

  test("should accept empty types array", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu",
      types: []
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.types).toEqual([]);
  });

  test("should reject invalid Pokemon type", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu",
      types: ["InvalidType"]
    };

    const species = new Species(speciesData);

    await expect(species.save()).rejects.toThrow();
  });

  test("should reject if any type in array is invalid", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu",
      types: ["Electric", "NotAType"]
    };

    const species = new Species(speciesData);

    await expect(species.save()).rejects.toThrow();
  });
});

describe("Species Model - Strict Mode", () => {
  test("should ignore extra fields not in schema due to strict mode", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu",
      extraField: "This should be ignored",
      anotherField: 123
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    // Extra fields should not be saved
    expect(savedSpecies.extraField).toBeUndefined();
    expect(savedSpecies.anotherField).toBeUndefined();
    // Required fields should still be present
    expect(savedSpecies.name).toBe("Pikachu");
  });
});

describe("Species Model - Edge Cases", () => {
  test("should accept very large dexNumber values", async () => {
    const speciesData = {
      dexNumber: 999999,
      gen: 1,
      name: "TestMon"
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.dexNumber).toBe(999999);
  });

  test("should accept negative dexNumber", async () => {
    // Note: While this might not make sense for Pokemon,
    // the schema doesn't explicitly prevent negative numbers
    const speciesData = {
      dexNumber: -1,
      gen: 1,
      name: "TestMon"
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.dexNumber).toBe(-1);
  });

  test("should accept negative gen", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: -1,
      name: "TestMon"
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.gen).toBe(-1);
  });

  test("should reject empty string for name (treated as missing required field)", async () => {
    // Note: Mongoose treats empty strings as invalid for required fields
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: ""
    };

    const species = new Species(speciesData);

    await expect(species.save()).rejects.toThrow(/Path `name` is required/);
  });

  test("should accept special characters in string fields", async () => {
    const speciesData = {
      dexNumber: 25,
      gen: 1,
      name: "Pikachu ⚡ <special>",
      dexEntry: "Special chars: @#$%^&*()"
    };

    const species = new Species(speciesData);
    const savedSpecies = await species.save();

    expect(savedSpecies.name).toBe("Pikachu ⚡ <special>");
    expect(savedSpecies.dexEntry).toBe("Special chars: @#$%^&*()");
  });
});
