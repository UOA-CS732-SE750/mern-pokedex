import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateFavouriteStatus } from "../useUpdateFavouriteStatus.js";

/**
 * Tests for the useUpdateFavouriteStatus hook
 * This hook uses TanStack Query's useMutation to update Pokemon favourite status
 */

/**
 * Helper function to create a wrapper component with QueryClientProvider
 * This is required for testing hooks that use TanStack Query
 */
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0
      },
      mutations: {
        retry: false // Disable retries for mutations in tests
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

describe("useUpdateFavouriteStatus", () => {
  describe("Mutation Execution", () => {
    test("should successfully update favourite status to true", async () => {
      const mockUpdatedPokemon = {
        _id: "123",
        dexNumber: 25,
        name: "Pikachu",
        gen: 1,
        isFavourite: true,
        types: ["Electric"]
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUpdatedPokemon
      });

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      // Execute the mutation
      result.current.mutate({ dexNumber: 25, isFavourite: true });

      // Wait for mutation to complete
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockUpdatedPokemon);
      expect(result.current.data.isFavourite).toBe(true);
    });

    test("should successfully update favourite status to false", async () => {
      const mockUpdatedPokemon = {
        _id: "123",
        dexNumber: 25,
        name: "Pikachu",
        gen: 1,
        isFavourite: false,
        types: ["Electric"]
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUpdatedPokemon
      });

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result.current.mutate({ dexNumber: 25, isFavourite: false });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data.isFavourite).toBe(false);
    });

    test("should send PATCH request to correct URL", async () => {
      const mockUpdatedPokemon = {
        dexNumber: 150,
        name: "Mewtwo",
        isFavourite: true
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUpdatedPokemon
      });

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result.current.mutate({ dexNumber: 150, isFavourite: true });

      await waitFor(() => expect(global.fetch).toHaveBeenCalled());

      expect(global.fetch).toHaveBeenCalledWith(
        `${BACKEND_BASE_URL}/api/pokedex/150/is-favourite`,
        expect.objectContaining({
          method: "PATCH"
        })
      );
    });

    test("should send request with correct headers and body", async () => {
      const mockUpdatedPokemon = { dexNumber: 1, isFavourite: true };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUpdatedPokemon
      });

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result.current.mutate({ dexNumber: 1, isFavourite: true });

      await waitFor(() => expect(global.fetch).toHaveBeenCalled());

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ isFavourite: true })
        })
      );
    });

    test("should return updated Pokemon data on success", async () => {
      const mockUpdatedPokemon = {
        _id: "abc123",
        dexNumber: 6,
        name: "Charizard",
        gen: 1,
        normalImage: "charizard.png",
        types: ["Fire", "Flying"],
        isFavourite: true
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUpdatedPokemon
      });

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result.current.mutate({ dexNumber: 6, isFavourite: true });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockUpdatedPokemon);
      expect(result.current.data).toHaveProperty("_id");
      expect(result.current.data).toHaveProperty("name");
      expect(result.current.data).toHaveProperty("types");
    });
  });

  describe("Error Handling", () => {
    test("should handle HTTP 404 error", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result.current.mutate({ dexNumber: 999, isFavourite: true });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
      expect(result.current.error.message).toBe("Failed to update favourite status");
      expect(result.current.data).toBeUndefined();
    });

    test("should handle HTTP 500 error", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result.current.mutate({ dexNumber: 25, isFavourite: true });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error.message).toBe("Failed to update favourite status");
    });

    test("should handle network errors", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result.current.mutate({ dexNumber: 25, isFavourite: true });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error.message).toBe("Network error");
    });

    test("should handle JSON parsing errors", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        }
      });

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result.current.mutate({ dexNumber: 25, isFavourite: true });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error.message).toBe("Invalid JSON");
    });
  });

  describe("Query Invalidation", () => {
    test("should invalidate specific Pokemon query on success", async () => {
      const mockUpdatedPokemon = {
        dexNumber: 25,
        name: "Pikachu",
        isFavourite: true
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUpdatedPokemon
      });

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false }
        }
      });

      const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

      const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      const { result } = renderHook(() => useUpdateFavouriteStatus(), { wrapper });

      result.current.mutate({ dexNumber: 25, isFavourite: true });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // Should invalidate the specific Pokemon query
      expect(invalidateQueriesSpy).toHaveBeenCalledWith(["pokemon", 25]);
    });

    test("should invalidate pokedex list query on success", async () => {
      const mockUpdatedPokemon = {
        dexNumber: 25,
        name: "Pikachu",
        isFavourite: true
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUpdatedPokemon
      });

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false }
        }
      });

      const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

      const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      const { result } = renderHook(() => useUpdateFavouriteStatus(), { wrapper });

      result.current.mutate({ dexNumber: 25, isFavourite: true });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // Should invalidate the pokedex list query
      expect(invalidateQueriesSpy).toHaveBeenCalledWith(["pokedex"]);
    });

    test("should not invalidate queries on error", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false }
        }
      });

      const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

      const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      const { result } = renderHook(() => useUpdateFavouriteStatus(), { wrapper });

      result.current.mutate({ dexNumber: 25, isFavourite: true });

      await waitFor(() => expect(result.current.isError).toBe(true));

      // invalidateQueries should not have been called on error
      expect(invalidateQueriesSpy).not.toHaveBeenCalled();
    });
  });

  describe("Mutation States", () => {
    test("should start in idle state", () => {
      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      // In TanStack Query v5, mutations start with isIdle = true
      expect(result.current.isIdle).toBe(true);
      expect(result.current.isPending).toBe(false);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeNull();
    });

    test("should transition to pending state during mutation", async () => {
      let resolveFetch;
      const fetchPromise = new Promise((resolve) => {
        resolveFetch = resolve;
      });

      global.fetch.mockReturnValueOnce(fetchPromise);

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      // Start mutation
      result.current.mutate({ dexNumber: 25, isFavourite: true });

      // Should be in pending state (TanStack Query v5 uses isPending instead of isLoading)
      await waitFor(() => expect(result.current.isPending).toBe(true));

      expect(result.current.isIdle).toBe(false);
      expect(result.current.isSuccess).toBe(false);

      // Resolve the fetch
      resolveFetch({
        ok: true,
        json: async () => ({ dexNumber: 25, isFavourite: true })
      });
    });

    test("should transition to success state on successful mutation", async () => {
      const mockData = { dexNumber: 25, isFavourite: true };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result.current.mutate({ dexNumber: 25, isFavourite: true });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.isIdle).toBe(false);
      expect(result.current.isPending).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
    });

    test("should transition to error state on failed mutation", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      const { result } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result.current.mutate({ dexNumber: 25, isFavourite: true });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.isIdle).toBe(false);
      expect(result.current.isPending).toBe(false);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.error).toBeTruthy();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("Parameter Handling", () => {
    test("should accept different dexNumber values", async () => {
      const testCases = [1, 25, 150, 500, 906];

      for (const dexNumber of testCases) {
        global.fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ dexNumber, isFavourite: true })
        });

        const { result } = renderHook(() => useUpdateFavouriteStatus(), {
          wrapper: createWrapper()
        });

        result.current.mutate({ dexNumber, isFavourite: true });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(global.fetch).toHaveBeenCalledWith(
          `${BACKEND_BASE_URL}/api/pokedex/${dexNumber}/is-favourite`,
          expect.any(Object)
        );
      }
    });

    test("should handle both true and false isFavourite values", async () => {
      // Test with true
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ dexNumber: 25, isFavourite: true })
      });

      const { result: result1 } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result1.current.mutate({ dexNumber: 25, isFavourite: true });

      await waitFor(() => expect(result1.current.isSuccess).toBe(true));

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({ isFavourite: true })
        })
      );

      // Test with false
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ dexNumber: 25, isFavourite: false })
      });

      const { result: result2 } = renderHook(() => useUpdateFavouriteStatus(), {
        wrapper: createWrapper()
      });

      result2.current.mutate({ dexNumber: 25, isFavourite: false });

      await waitFor(() => expect(result2.current.isSuccess).toBe(true));

      expect(global.fetch).toHaveBeenLastCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({ isFavourite: false })
        })
      );
    });
  });
});
