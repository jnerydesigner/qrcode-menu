"use client";

import { findAllCategories } from "@/api/categories";
import { columnsCategory } from "@/app/dashboard/category/columns";
import { DataTable } from "@/app/dashboard/category/data-table";
import { CategoryType } from "@/types/category.type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function TableCategories() {
  const {
    data,
    error: errorQuery,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: findAllCategories<CategoryType[]>,
  });

  if (isLoading) {
    return <span>Carregando categorias...</span>;
  }

  if (errorQuery) {
    return <span>Erro ao carregar: {String(errorQuery)}</span>;
  }

  return (
    <div>
      <DataTable columns={columnsCategory} data={data ?? []} />
    </div>
  );
}
