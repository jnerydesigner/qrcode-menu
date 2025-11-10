import { useMemo, useState } from "react";

import { AppSidebar, type DashboardSection } from "@/components/app-sidebar";
import { TableCategory } from "@/components/table-categories";
import { TableProducts } from "@/components/table-products";
import { TableIngredients } from "@/components/table-ingredients";
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
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("products");

  const breadcrumbLabel = useMemo(() => {
    switch (activeSection) {
      case "categories":
        return "Lista de categorias";
      case "ingredients":
        return "Lista de ingredientes";
      default:
        return "Lista de produtos";
    }
  }, [activeSection]);

  return (
    <SidebarProvider>
      <AppSidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
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
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
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
          {activeSection === "products" && (
            <section className="space-y-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Lista de produtos
                </h1>
                <p className="text-muted-foreground text-sm">
                  Consulte os itens cadastrados e realize ações rápidas.
                </p>
              </div>
              <TableProducts />
            </section>
          )}

          {activeSection === "categories" && (
            <section className="space-y-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Lista de categorias
                </h1>
                <p className="text-muted-foreground text-sm">
                  Visualize as categorias disponíveis no cardápio.
                </p>
              </div>
              <TableCategory />
            </section>
          )}

          {activeSection === "ingredients" && (
            <section className="space-y-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Lista de ingredientes
                </h1>
                <p className="text-muted-foreground text-sm">
                  Acompanhe os ingredientes e faça o controle de estoque.
                </p>
              </div>
              <TableIngredients />
            </section>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
