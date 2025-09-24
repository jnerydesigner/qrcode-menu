import { Api } from ".";

export const findAllCategories = async <T>() => {
  const response = await Api.get("/categories");

  if (response.status !== 200) {
    throw new Error("Not Found Exception");
  }

  const data: T = response.data;

  return data;
};
