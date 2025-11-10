import { TableProducts } from "@/components/table-products";

export default function Products() {
  return (
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
  );
}
