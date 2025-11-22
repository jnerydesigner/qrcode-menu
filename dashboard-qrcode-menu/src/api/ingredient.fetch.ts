import { api } from ".";
import type { IngredientType } from "@/types/ingredients.type";

export const findAllIngredients = async () => {
  const response = await api.get("/ingredients");
  const data: IngredientType[] = response.data;


  return data;
};
