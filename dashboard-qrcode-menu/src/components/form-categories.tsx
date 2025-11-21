import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/api";
import { useEffect } from "react";
import type { CategoryType } from "@/types/category.type";
import { SelectApp } from "./select";

const Categories: CategoryType[] = [
  {
    id: "1",
    name: "Bebidas",
    slug: "bebidas",
  },
  {
    id: "2",
    name: "Comidas",
    slug: "comidas",
  },
];

const categorySchema = z.object({
  name: z.string().min(1, "Informe o nome da categoria."),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

type FormCategoriesProps = {
  selectedCategory?: CategoryType | null;
  onClearSelection?: () => void;
};

export const FormCategories = ({
  selectedCategory,
  onClearSelection,
}: FormCategoriesProps) => {
  const queryClient = useQueryClient();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  // 🔄 Atualiza o form quando receber uma categoria
  useEffect(() => {
    if (selectedCategory) {
      form.reset({
        name: selectedCategory.name,
      });
    }
  }, [selectedCategory, form]);

  const createCategoryMutation = useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      if (selectedCategory) {
        // 🧩 Modo edição
        const response = await api.put(
          `/categories/${selectedCategory.id}`,
          values
        );
        return response.data;
      } else {
        // 🆕 Modo criação
        const response = await api.post("/categories", values);
        return response.data;
      }
    },
    onSuccess: () => {
      form.reset();
      if (onClearSelection) onClearSelection();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit = (values: CategoryFormValues) => {
    createCategoryMutation.mutate(values);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2"
        >
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o nome da categoria"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 📌 Botões */}
          <div className="md:col-span-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 text-sm text-muted-foreground">
              {selectedCategory
                ? "Modo de edição: altere e salve para atualizar."
                : "Campos marcados são obrigatórios."}
            </div>

            <div className="flex gap-2">
              {selectedCategory && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    if (onClearSelection) onClearSelection();
                  }}
                >
                  Cancelar
                </Button>
              )}

              <Button
                className="cursor-pointer"
                type="submit"
                disabled={createCategoryMutation.isPending}
              >
                {createCategoryMutation.isPending
                  ? "Salvando..."
                  : selectedCategory
                  ? "Atualizar categoria"
                  : "Salvar categoria"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
