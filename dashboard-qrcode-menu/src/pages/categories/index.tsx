import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/api";
import { TableCategory } from "@/components/table-categories";
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

const categorySchema = z.object({
  name: z.string().min(1, "Informe o nome da categoria."),
  description: z
    .string()
    .min(1, "Informe uma descrição para a categoria.")
    .max(200, "A descrição deve conter no máximo 200 caracteres."),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function Categories() {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      const response = await api.post("/categories", values);
      return response.data;
    },
    onSuccess: () => {
      form.reset();
    },
  });

  const onSubmit = (values: CategoryFormValues) => {
    createCategoryMutation.mutate(values);
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bebidas"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Descrição da categoria"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 text-sm text-muted-foreground">
                Campos marcados são obrigatórios.
              </div>
              <Button type="submit" disabled={createCategoryMutation.isPending}>
                {createCategoryMutation.isPending ? "Salvando..." : "Salvar categoria"}
              </Button>
            </div>
            {createCategoryMutation.isError ? (
              <p className="md:col-span-2 text-sm text-destructive">
                Não foi possível criar a categoria. Tente novamente.
              </p>
            ) : null}
            {createCategoryMutation.isSuccess ? (
              <p className="md:col-span-2 text-sm text-emerald-600">
                Categoria criada com sucesso!
              </p>
            ) : null}
          </form>
        </Form>
      </div>
      <TableCategory />
    </section>
  );
}
