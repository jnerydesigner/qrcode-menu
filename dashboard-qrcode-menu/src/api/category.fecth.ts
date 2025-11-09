import type { CategoryType } from "@/types/category.type";
import { api } from ".";

export const findAllCategory = async () => {
  const response = await api.get("/categories");
  const data: CategoryType[] = response.data;

  console.log(data);

  return data;
};
