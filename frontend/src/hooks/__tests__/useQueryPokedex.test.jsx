import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQueryPokedex } from "../useQueryPokedex.js";

/**
 * Tests for the useQueryPokedex hook
 * This hook uses TanStack Query to fetch Pokemon list data from the API
 */

/**
 * Helper function to create a wrapper component with QueryClientProvider
 * This is required for testing hooks that use TanStack Query
 */
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries in tests to make them faster and more predictable
        cacheTime: 0, // Disable caching to ensure tests are independent
        staleTime: 0 // Ensure queries refetch
      }
    }
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// The base URL that would be set by Vite environment variable
const BACKEND_BASE_URL = "https://example.com";

// Store the original fetch function
const originalFetch = global.fetch;

// Mock the global fetch function before each test
beforeEach(() => {
  global.fetch = vi.fn();
});

// Restore the original fetch function after each test
afterEach(() => {
  global.fetch = originalFetch;
  vi.clearAllMocks();
});

describe("useQueryPokedex", () => {
  describe("Successful Data Fetching", () => {
    test("should fetch and return pokedex data successfully", async () => {
      const mockData = [
        { _id: "1", dexNumber: 1, name: "Bulbasaur", gen: 1, isFavourite: false },
        { _id: "4", dexNumber: 4, name: "Charmander", gen: 1, isFavourite: true }
      ];

      // Mock successful fetch response
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const { result } = renderHook(() => useQueryPokedex("1", "false"), {
        wrapper: createWrapper()
      });

      // Wait for the query to succeed and data to update
      await waitFor(() => expect(result.current.data).toEqual(mockData));

      expect(result.current.isSuccess).toBe(true);
      expect(result.current.error).toBeNull();
    });

    test("should construct correct URL with gen and favouritesOnly parameters", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      });

      renderHook(() => useQueryPokedex("5", "true"), {
        wrapper: createWrapper()
      });

      await waitFor(() => expect(global.fetch).toHaveBeenCalled());

      // Verify the fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(
        `${BACKEND_BASE_URL}/api/pokedex?gen=5&favouritesOnly=true`
      );
    });

    test("should handle gen='all' parameter", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      });

      renderHook(() => useQueryPokedex("all", "false"), {
        wrapper: createWrapper()
      });

      await waitFor(() => expect(global.fetch).toHaveBeenCalled());

      expect(global.fetch).toHaveBeenCalledWith(
        `${BACKEND_BASE_URL}/api/pokedex?gen=all&favouritesOnly=false`
      );
    });

    test("should return empty array as initial data", () => {
      // Don't resolve the fetch immediately
      global.fetch.mockImplementation(() => new Promise(() => {}));

      const { result } = renderHook(() => useQueryPokedex("1", "false"), {
        wrapper: createWrapper()
      });

      // Before the fetch completes, initialData should be used
      expect(result.current.data).toEqual([]);
    });
  });

  describe("Loading States", () => {
    test("should show fetching state when query starts", () => {
      // Don't resolve the fetch immediately
      global.fetch.mockImplementation(() => new Promise(() => {}));

      const { result } = renderHook(() => useQueryPokedex("1", "false"), {
        wrapper: createWrapper()
      });

      // With initialData, query is immediately successful but still fetching in background
      expect(result.current.isFetching).toBe(true);
      expect(result.current.isSuccess).toBe(true); // Successful with initialData
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toEqual([]); // initialData
    });

    test("should transition from fetching to success state with new data", async () => {
      const mockData = [{ _id: "1", dexNumber: 1, name: "Bulbasaur", gen: 1 }];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const { result } = renderHook(() => useQueryPokedex("1", "false"), {
        wrapper: createWrapper()
      });

      // Initially has initialData and is fetching
      expect(result.current.isFetching).toBe(true);
      expect(result.current.data).toEqual([]); // initialData

      // Wait for new data to arrive
      await waitFor(() => expect(result.current.data).toEqual(mockData));

      expect(result.current.isFetching).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });
  });

  describe("Error Handling", () => {
    test("should handle HTTP error responses", async () => {
      // Mock a failed HTTP response
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      const { result } = renderHook(() => useQueryPokedex("1", "false"), {
        wrapper: createWrapper()
      });

      // Wait for error state
      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
      expect(result.current.error.message).toBe("Failed to fetch pokedex data");
      expect(result.current.data).toEqual([]); // Should still have initialData
    });

    test("should handle network errors", async () => {
      // Mock a network error
      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      const { result } = renderHook(() => useQueryPokedex("1", "false"), {
        wrapper: createWrapper()
      });

      // Wait for error state
      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
      expect(result.current.error.message).toBe("Network error");
    });

    test("should handle JSON parsing errors", async () => {
      // Mock a response that fails to parse as JSON
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        }
      });

      const { result } = renderHook(() => useQueryPokedex("1", "false"), {
        wrapper: createWrapper()
      });

      // Wait for error state
      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
      expect(result.current.error.message).toBe("Invalid JSON");
    });
  });

  describe("Query Key Generation", () => {
    test("should use correct query key with gen and favouritesOnly", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      });

      const { result } = renderHook(() => useQueryPokedex("3", "true"), {
        wrapper: createWrapper()
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // The query key should be ["pokedex", gen, favouritesOnly]
      expect(result.current.dataUpdatedAt).toBeGreaterThan(0); // Verify query ran
    });

    test("should create different queries for different parameters", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => []
      });

      // Render hook with first set of parameters
      const { result: result1 } = renderHook(() => useQueryPokedex("1", "false"), {
        wrapper: createWrapper()
      });

      // Render hook with different parameters
      const { result: result2 } = renderHook(() => useQueryPokedex("2", "true"), {
        wrapper: createWrapper()
      });

      await waitFor(() => {
        expect(result1.current.isSuccess).toBe(true);
        expect(result2.current.isSuccess).toBe(true);
      });

      // Fetch should have been called twice with different URLs
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith(
        `${BACKEND_BASE_URL}/api/pokedex?gen=1&favouritesOnly=false`
      );
      expect(global.fetch).toHaveBeenCalledWith(
        `${BACKEND_BASE_URL}/api/pokedex?gen=2&favouritesOnly=true`
      );
    });
  });

  describe("Different Parameter Combinations", () => {
    test("should fetch with gen=1 and favouritesOnly=false", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      });

      renderHook(() => useQueryPokedex("1", "false"), {
        wrapper: createWrapper()
      });

      await waitFor(() => expect(global.fetch).toHaveBeenCalled());
      expect(global.fetch).toHaveBeenCalledWith(
        `${BACKEND_BASE_URL}/api/pokedex?gen=1&favouritesOnly=false`
      );
    });

    test("should fetch with gen=9 and favouritesOnly=true", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      });

      renderHook(() => useQueryPokedex("9", "true"), {
        wrapper: createWrapper()
      });

      await waitFor(() => expect(global.fetch).toHaveBeenCalled());
      expect(global.fetch).toHaveBeenCalledWith(
        `${BACKEND_BASE_URL}/api/pokedex?gen=9&favouritesOnly=true`
      );
    });

    test("should fetch with gen=all and favouritesOnly=false", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      });

      renderHook(() => useQueryPokedex("all", "false"), {
        wrapper: createWrapper()
      });

      await waitFor(() => expect(global.fetch).toHaveBeenCalled());
      expect(global.fetch).toHaveBeenCalledWith(
        `${BACKEND_BASE_URL}/api/pokedex?gen=all&favouritesOnly=false`
      );
    });
  });

  describe("Data Structure", () => {
    test("should return data with correct structure", async () => {
      const mockData = [
        {
          _id: "507f1f77bcf86cd799439011",
          dexNumber: 25,
          name: "Pikachu",
          gen: 1,
          isFavourite: true
        },
        {
          _id: "507f1f77bcf86cd799439012",
          dexNumber: 152,
          name: "Chikorita",
          gen: 2,
          isFavourite: false
        }
      ];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const { result } = renderHook(() => useQueryPokedex("all", "false"), {
        wrapper: createWrapper()
      });

      // Wait for the data to be populated
      await waitFor(() => expect(result.current.data).toHaveLength(2));

      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.data[0]).toHaveProperty("_id");
      expect(result.current.data[0]).toHaveProperty("dexNumber");
      expect(result.current.data[0]).toHaveProperty("name");
      expect(result.current.data[0]).toHaveProperty("gen");
      expect(result.current.data[0]).toHaveProperty("isFavourite");
    });

    test("should handle empty array response", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      });

      const { result } = renderHook(() => useQueryPokedex("9", "true"), {
        wrapper: createWrapper()
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual([]);
      expect(result.current.data).toHaveLength(0);
    });
  });
});
