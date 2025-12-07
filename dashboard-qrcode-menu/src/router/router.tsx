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
import UpdateProduct from "@/pages/products/[slug]";
import QrCodePage from "@/pages/qrcode";
import { createBrowserRouter } from "react-router";
import QrCodePageNew from "@/pages/qurcode-new";
import CreateCompany from "@/pages/companies/create-company";

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
    path: "/companies/new",
    element: <CreateCompany />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "products", element: <Products /> },
      { path: "products/new", element: <CreateProduct /> },
      { path: "products/:slug", element: <UpdateProduct /> },
      { path: "categories", element: <Categories /> },
      { path: "categories/new", element: <CreateCategory /> },
      { path: "categories/:slug", element: <UpdateCategory /> },
      { path: "ingredients", element: <Ingredients /> },
      { path: "qrcode", element: <QrCodePage /> },
      { path: "qrcode-new", element: <QrCodePageNew /> },
    ],
  },
]);
