import type { CreateProductType, ProductType } from "@/types/product.type";
import { api } from ".";

export const findAllProducts = async () => {
  const response = await api.get("/products");
  const data: ProductType[] = response.data;

  console.log(data);

  return data;
};

export const createProduct = async (product: CreateProductType) => {
  const response = await api.post("/products", product);
  const data: ProductType = response.data;

  return data;
};

export const findOneProduct = async (productId: string) => {
  const response = await api.get(`/products/${productId}`);
  const data: ProductType = response.data;

  return data;
};
