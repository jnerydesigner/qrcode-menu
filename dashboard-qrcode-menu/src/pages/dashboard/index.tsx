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

export default function Dashboard() {
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
      default:
        return "Tela Inicial";
    }
  }, [currentPath]);

  return (
    <SidebarProvider>
      <AppSidebar
        activeSection={(currentPath === "home" ? "/" : currentPath) as "/" | "products" | "categories" | "ingredients"}
        onSelectSection={() => { }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
