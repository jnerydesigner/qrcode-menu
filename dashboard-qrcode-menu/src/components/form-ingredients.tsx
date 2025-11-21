import { api } from "@/api";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import type { IngredientType } from "@/types/ingredients.type";

const ingredientSchema = z.object({
  name: z.string().min(1, "Informe o nome do ingrediente."),
  emoji: z.string().min(1, "Informe um emoji."),
  color: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Selecione uma cor válida."),
});

type IngredientFormValues = z.infer<typeof ingredientSchema>;

export const FormIngredients = () => {
  const queryClient = useQueryClient();

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: "",
      emoji: "",
      color: "#f97316",
    },
  });

  const createIngredientMutation = useMutation({
    mutationFn: async (values: IngredientFormValues) => {
      const response = await api.post("/ingredients", values);
      return response.data;
    },
    onSuccess: (ingredientCreated: IngredientType) => {
      toast(
        <div className="flex flex-col">
          <strong>Ingrediente criado!</strong>
          <span>
            {`${ingredientCreated.name} - ${ingredientCreated.emoji}`}
          </span>
        </div>
      );
      form.reset({
        name: "",
        emoji: "",
        color: "#f97316",
      });
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });

  const onSubmit = (values: IngredientFormValues) => {
    createIngredientMutation.mutate(values);
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
                  placeholder="Insira o nome do ingrediente"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="emoji"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emoji</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: 🧀" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor</FormLabel>
              <FormControl>
                <Input type="color" className="h-10 p-1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            Todos os campos são obrigatórios.
          </div>

          <Button
            className="cursor-pointer"
            type="submit"
            disabled={createIngredientMutation.isPending}
          >
            {createIngredientMutation.isPending
              ? "Salvando..."
              : "Salvar ingrediente"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
