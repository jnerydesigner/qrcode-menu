import { FormCategories } from "@/components/form-categories";
import { TableCategory } from "@/components/table-categories";
import type { CategoryType } from "@/types/category.type";
import { useState } from "react";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  const handleSelectCategory = (category: CategoryType | null) => {
    setSelectedCategory(category);
  };
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Lista de categorias
        </h1>
        <p className="text-muted-foreground text-sm">
          Visualize as categorias disponíveis no cardápio.
        </p>
      </div>
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-6 space-y-1">
          <h2 className="text-lg font-semibold">Cadastrar categoria</h2>
          <p className="text-sm text-muted-foreground">
            Informe os dados abaixo para criar uma nova categoria.
          </p>
        </div>
        <FormCategories
          selectedCategory={selectedCategory}
          onClearSelection={() => setSelectedCategory(null)}
        />
      </div>
      <TableCategory onSelectCategory={handleSelectCategory} />
    </section>
  );
}
