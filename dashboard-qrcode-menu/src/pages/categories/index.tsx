import { TableCategory } from "@/components/table-categories";

export default function Categories() {
  return (
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
  );
}
