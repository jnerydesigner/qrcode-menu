import { FormIngredients } from "@/components/form-ingredients";
import { TableIngredients } from "@/components/table-ingredients";

export default function Ingredients() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Lista de ingredientes
        </h1>
        <p className="text-muted-foreground text-sm">
          Acompanhe os ingredientes e faça o controle de estoque.
        </p>
      </div>
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-6 space-y-1">
          <h2 className="text-lg font-semibold">Cadastrar ingrediente</h2>
          <p className="text-sm text-muted-foreground">
            Preencha os campos para adicionar um novo ingrediente ao cardápio.
          </p>
        </div>
        <FormIngredients />
      </div>
      <TableIngredients />
    </section>
  );
}
