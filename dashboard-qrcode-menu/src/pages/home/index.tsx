import { TableCategory } from "@/components/table-categories";
import { TableProducts } from "@/components/table-products";

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-6">
        <h2>Tabela de Produtos</h2>
        <TableProducts />
      </div>
      <div className="flex flex-col gap-6">
        <h2>Tabela de Categorias</h2>
        <TableCategory />
      </div>
    </section>
  );
}
