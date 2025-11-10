import type { ProductType } from "@/types/product.type";
import { api } from ".";

export const findAllProducts = async () => {
  const response = await api.get("/products");
  const data: ProductType[] = response.data;

  console.log(data);

  return data;
};
