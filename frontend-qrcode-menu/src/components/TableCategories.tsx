"use client";

import {
  deleteCategory,
  findAllCategories,
  updateCategory,
} from "@/api/categories";
import { getColumnsCategory } from "@/app/dashboard/category/columns";

import { DataTable } from "@/app/dashboard/category/data-table";
import { CategoryType } from "@/types/category.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export default function TableCategories() {
  const queryClient = useQueryClient();
  const {
    data,
    error: errorQuery,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: findAllCategories<CategoryType[]>,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Erro desconhecido ao excluir categoria";
      toast(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      categoryId,
      data,
    }: {
      categoryId: string;
      data: { name: string };
    }) => updateCategory(categoryId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleEdit = (categoryId: string, data: { name: string }) => {
    updateMutation.mutate({ categoryId, data });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <span>Carregando categorias...</span>;
  }

  if (errorQuery) {
    return <span>Erro ao carregar: {String(errorQuery)}</span>;
  }

  return (
    <DataTable
      columns={getColumnsCategory(handleEdit, handleDelete)}
      data={data ?? []}
    />
  );
}
