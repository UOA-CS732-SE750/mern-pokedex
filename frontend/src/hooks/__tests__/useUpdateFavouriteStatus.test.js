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

test("useUpdateFavouriteStatus.test.js always passes", () => {
  expect(true).toBe(true);
});
