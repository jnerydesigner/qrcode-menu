import { TableCategory } from "@/components/table-categories";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Lista de categorias
          </h1>
          <p className="text-muted-foreground text-sm">
            Visualize as categorias disponíveis no cardápio.
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard/categories/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Categoria
        </Button>
      </div>
      <TableCategory />
    </section>
  );
}
