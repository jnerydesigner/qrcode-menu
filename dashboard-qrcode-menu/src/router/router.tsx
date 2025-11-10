import Categories from "@/pages/categories";
import Dashboard from "@/pages/dashboard";
import Ingredients from "@/pages/ingredients";
import Products from "@/pages/products";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "ingredients", element: <Ingredients /> },
    ],
  },
]);
