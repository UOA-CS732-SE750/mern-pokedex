import { useMutation, useQueryClient } from "@tanstack/react-query";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || "";

export function useUpdateFavouriteStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ dexNumber, isFavourite }) => {
      const response = await fetch(`${BACKEND_BASE_URL}/api/pokedex/${dexNumber}/is-favourite`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isFavourite })
      });
      if (!response.ok) {
        throw new Error("Failed to update favourite status");
      }
      return await response.json();
    },
    onSuccess: (updatedPokemon) => {
      // Invalidate the query for this specific Pokémon to refetch the updated data
      queryClient.invalidateQueries(["pokemon", updatedPokemon.dexNumber]);
      queryClient.invalidateQueries(["pokedex"]);
    }
  });
}
