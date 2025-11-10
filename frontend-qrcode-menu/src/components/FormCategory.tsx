"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory, updateCategory } from "@/api/categories";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CategoryType } from "@/types/category.type";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome não pode passar de 50 caracteres"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

interface FormCategoryProps {
  selectedCategory: CategoryType | null;
  onClearSelection: () => void;
}

export default function FormCategory({
  selectedCategory,
  onClearSelection,
}: FormCategoryProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (selectedCategory) {
      reset({ name: selectedCategory.name });
    } else {
      reset({ name: "" });
    }
  }, [selectedCategory, reset]);

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      categoryId,
      data,
    }: {
      categoryId: string;
      data: CategoryFormData;
    }) => updateCategory(categoryId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onClearSelection();
      reset();
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    if (selectedCategory) {
      updateMutation.mutate({ categoryId: selectedCategory.id, data });
      return;
    }

    createMutation.mutate(data);
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const buttonLabel = selectedCategory
    ? updateMutation.isPending
      ? "Atualizando..."
      : "Atualizar"
    : createMutation.isPending
    ? "Salvando..."
    : "Adicionar";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 bg-white border rounded-lg shadow-sm p-6"
    >
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Digite o nome da Categoria"
          {...register("name")}
          className="w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-pink-500 text-white hover:bg-pink-600 disabled:bg-gray-400 cursor-pointer"
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
