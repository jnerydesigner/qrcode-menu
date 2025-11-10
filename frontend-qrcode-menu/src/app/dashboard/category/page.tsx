"use client";

import FormCategory from "@/components/FormCategory";
import TableCategories from "@/components/TableCategories";
import { useCallback, useState } from "react";
import { CategoryType } from "@/types/category.type";

export default function PageCategory() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  const handleSelectCategory = useCallback((category: CategoryType) => {
    setSelectedCategory(category);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Bem-vindo a Category
      </h3>
      <FormCategory
        selectedCategory={selectedCategory}
        onClearSelection={handleClearSelection}
      />
      <TableCategories
        onSelectCategory={handleSelectCategory}
        selectedCategoryId={selectedCategory?.id ?? null}
        onClearSelection={handleClearSelection}
      />
    </div>
  );
}
