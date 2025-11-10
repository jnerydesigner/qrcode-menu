import { useMutation } from "@tanstack/react-query";
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

const categorySchema = z.object({
  name: z.string().min(1, "Informe o nome da categoria."),
  description: z
    .string()
    .min(1, "Informe uma descrição para a categoria.")
    .max(200, "A descrição deve conter no máximo 200 caracteres."),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export const FormCategories = () => {
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

        <FormField
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
          <Button
            className="cursor-pointer"
            type="submit"
            disabled={createCategoryMutation.isPending}
          >
            {createCategoryMutation.isPending
              ? "Salvando..."
              : "Salvar categoria"}
          </Button>
        </div>

        {createCategoryMutation.isError && (
          <p className="md:col-span-2 text-sm text-destructive">
            Não foi possível criar a categoria. Tente novamente.
          </p>
        )}

        {createCategoryMutation.isSuccess && (
          <p className="md:col-span-2 text-sm text-emerald-600">
            Categoria criada com sucesso!
          </p>
        )}
      </form>
    </Form>
  );
};
