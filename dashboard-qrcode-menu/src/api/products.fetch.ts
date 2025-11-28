import type { CreateProductType, ProductType } from "@/types/product.type";
import { api } from ".";

export const findAllProducts = async () => {
  const response = await api.get("/products");
  const data: ProductType[] = response.data;



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

export const updateProductImage = async (productId: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.patch(`/products/upload/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const data: ProductType = response.data;


  return data;
};

export const updateProduct = async (
  productId: string,
  product: Partial<CreateProductType> & { productIngredient?: { ingredientId: string }[] }
) => {
  const response = await api.patch(`/products/${productId}`, product);
  const data: ProductType = response.data;

  return data;
};
