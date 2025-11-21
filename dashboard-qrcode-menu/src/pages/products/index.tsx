import { FormProducts } from "@/components/form-products";
import { TableProducts } from "@/components/table-products";

export default function Products() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Lista de produtos
        </h1>
        <p className="text-muted-foreground text-sm">
          Consulte os itens cadastrados e realize ações rápidas.
        </p>
      </div>
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-6 space-y-1">
          <h2 className="text-lg font-semibold">Cadastrar produto</h2>
          <p className="text-sm text-muted-foreground">
            Informe os dados abaixo para adicionar um novo item ao cardápio.
          </p>
        </div>
        <FormProducts />
      </div>
      <TableProducts />
    </section>
  );
}
