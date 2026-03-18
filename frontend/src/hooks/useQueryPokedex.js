import { useQuery } from "@tanstack/react-query";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || "";

export function useQueryPokedex(gen, favouritesOnly) {
  return useQuery({
    queryKey: ["pokedex", gen, favouritesOnly],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_BASE_URL}/api/pokedex?gen=${gen}&favouritesOnly=${favouritesOnly}`);
      if (!response.ok) {
        throw new Error("Failed to fetch pokedex data");
      }
      return await response.json();
    },
    initialData: []
  });
}
