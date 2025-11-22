import Categories from "@/pages/categories";
import Dashboard from "@/pages/dashboard";
import DashboardHome from "@/pages/dashboard/home";
import Ingredients from "@/pages/ingredients";
import Products from "@/pages/products";
import ProductPage from "@/pages/products/[productId]";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "products", element: <Products /> },
      { path: "products/:productId", element: <ProductPage /> },
      { path: "categories", element: <Categories /> },
      { path: "ingredients", element: <Ingredients /> },
    ],
  },
]);
