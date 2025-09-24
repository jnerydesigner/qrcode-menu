"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory } from "@/api/categories";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome não pode passar de 50 caracteres"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export default function FormCategory() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      reset();
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    mutation.mutate(data);
  };

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
        disabled={mutation.isPending}
        className="bg-pink-500 text-white hover:bg-pink-600 disabled:bg-gray-400 cursor-pointer"
      >
        {mutation.isPending ? "Salvando..." : "Adicionar"}
      </Button>
    </form>
  );
}
