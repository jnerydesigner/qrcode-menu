import { Api } from ".";

export const findAllCategories = async <T>() => {
  const response = await Api.get("/categories");

  if (response.status !== 200) {
    throw new Error("Not Found Exception");
  }

  const data: T = response.data;

  return data;
};

export const createCategory = async (data: { name: string }) => {
  const response = await Api.post("/categories", data);

  if (response.status !== 201) {
    throw new Error("Erro ao criar categoria");
  }

  return response.data;
};

export const deleteCategory = async (categoryId: string) => {
  const response = await Api.delete(`/categories/${categoryId}`);

  if (response.status !== 204 && response.status !== 200) {
    throw new Error("Erro ao excluir categoria");
  }

  return response.data;
};

export const updateCategory = async (
  categoryId: string,
  data: { name: string }
) => {
  const response = await Api.patch(`/categories/${categoryId}`, data);

  if (response.status !== 204 && response.status !== 200) {
    throw new Error("Erro ao atualizar categoria");
  }

  return response.data;
};
