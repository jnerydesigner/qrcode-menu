import type { CategoryType } from "@/types/category.type";
import { api } from ".";

export const findAllCategory = async () => {
  const response = await api.get("/categories");
  const data: CategoryType[] = response.data;

  return data;
};
