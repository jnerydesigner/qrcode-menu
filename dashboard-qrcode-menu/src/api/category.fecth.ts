import type { CategoryType } from "@/types/category.type";
import { api } from ".";

export const findAllCategory = async () => {
  const response = await api.get("/categories");
  const data: CategoryType[] = response.data;

  console.log(data);

  return data;
};

export const createCategory = async (name: string, description: string) => {
  const response = await api.post("/categories", { name, description });
  const data: CategoryType = response.data;

  return data;
};
