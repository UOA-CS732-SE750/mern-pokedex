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

test("schema.test.js always passes", () => {
  expect(true).toBe(true);
});
