import { useQuery } from "@tanstack/react-query";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || "";

export function useQueryPokemon(dexNumber) {
  return useQuery({
    queryKey: ["pokemon", dexNumber],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_BASE_URL}/api/pokedex/${dexNumber}`);
      if (!response.ok) {
        throw new Error("Failed to fetch pokemon data");
      }
      return await response.json();
    },
    enabled: !!dexNumber, // Only run this query if dexNumber is truthy
    initialData: null
  });
}
