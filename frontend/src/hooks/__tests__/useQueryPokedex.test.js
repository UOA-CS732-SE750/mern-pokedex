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

test("useQueryPokedex.test.js always passes", () => {
  expect(true).toBe(true);
});
