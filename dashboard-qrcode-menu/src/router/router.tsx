import Categories from "@/pages/categories";
import { ProtectedRoute } from "@/components/protected-route";
import Dashboard from "@/pages/dashboard";
import DashboardHome from "@/pages/dashboard/home";
import Ingredients from "@/pages/ingredients";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Products from "@/pages/products";
import ProductPage from "@/pages/products/[productId]";
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
      { path: "products/:productId", element: <ProductPage /> },
      { path: "categories", element: <Categories /> },
      { path: "ingredients", element: <Ingredients /> },
      { path: "qrcode", element: <QrCodePage /> },
    ],
  },
]);
