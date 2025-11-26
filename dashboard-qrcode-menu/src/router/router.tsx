import Categories from "@/pages/categories";
import CreateCategory from "@/pages/categories/create";
import UpdateCategory from "@/pages/categories/[categoryId]";
import { ProtectedRoute } from "@/components/protected-route";
import Dashboard from "@/pages/dashboard";
import DashboardHome from "@/pages/dashboard/home";
import Ingredients from "@/pages/ingredients";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Products from "@/pages/products";
import CreateProduct from "@/pages/products/create";
import UpdateProduct from "@/pages/products/[productId]";
import QrCodePage from "@/pages/qrcode";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "products", element: <Products /> },
      { path: "products/new", element: <CreateProduct /> },
      { path: "products/:productId", element: <UpdateProduct /> },
      { path: "categories", element: <Categories /> },
      { path: "categories/new", element: <CreateCategory /> },
      { path: "categories/:categoryId", element: <UpdateCategory /> },
      { path: "ingredients", element: <Ingredients /> },
      { path: "qrcode", element: <QrCodePage /> },
    ],
  },
]);
