/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from "react";
import { useLocation, Outlet } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { findCompany } from "@/api/companies.fetch";
import { useQuery } from "@tanstack/react-query";
import { MenuBar } from "@/components/menu-bar";

export default function Dashboard() {
  const { data: company, isLoading, isError } = useQuery({
    queryKey: ["company"],
    queryFn: () => findCompany("hamburgueria-da-vila"),
  });

  console.log("Company Principal", company)
  const location = useLocation();

  const currentPath =
    location.pathname.split("/").filter(Boolean).pop() ?? "home"; // Changed default to "home"

  const breadcrumbLabel = useMemo(() => {
    switch (currentPath) {
      case "home":
        return "Tela Inicial";
      case "products":
        return "Lista de produtos";
      case "categories":
        return "Lista de categorias";
      case "ingredients":
        return "Lista de ingredientes";
      case "qrcode":
        return "QR Code do Menu";
      default:
        return "Tela Inicial";
    }
  }, [currentPath]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar categorias.</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar
        company={company}
        activeSection={(currentPath === "home" ? "/" : currentPath) as "/" | "products" | "categories" | "ingredients" | "qrcode" | 'qrcode-new'}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 w-full">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumbLabel}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>



          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
