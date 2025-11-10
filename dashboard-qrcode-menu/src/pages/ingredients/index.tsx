import { TableIngredients } from "@/components/table-ingredients";

export default function Ingredients() {
  return (
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
  );
}
