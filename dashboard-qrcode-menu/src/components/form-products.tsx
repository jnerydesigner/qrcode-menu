import { findAllCategory } from "@/api/category.fecth";
import { createProduct } from "@/api/products.fetch";
import { SelectApp } from "@/components/select";
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
import type { CreateProductType } from "@/types/product.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Informe o nome do produto."),
  description: z.string().min(1, "Descreva o produto."),
  categoryId: z.string().min(1, "Selecione uma categoria."),
  price: z
    .string()
    .min(1, "Defina um preço válido.")
    .refine(
      (value) => !Number.isNaN(Number(value.replace(",", "."))),
      "Defina um preço válido."
    ),
});

type ProductFormValues = z.infer<typeof productSchema> & FieldValues;

export const FormProducts = () => {
  const queryClient = useQueryClient();

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: findAllCategory,
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      price: "",
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (values: CreateProductType) => {
      const response = await createProduct({
        name: values.name,
        description: values.description,
        categoryId: values.categoryId,
        price: values.price,
      });
      return response;
    },
    onSuccess: () => {
      /*       form.reset({
        name: "",
        description: "",
        categoryId: "",
        price: "",
      }); */
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = (values) => {
    const newProduct = {
      ...values,
      price: Number(values.price.replace(",", ".")),
    };
    createProductMutation.mutate(newProduct);
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
            <FormItem className="md:col-span-1">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o nome do produto"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="decimal"
                  placeholder="0,00"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <textarea
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Descreva o produto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="categoryId"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <SelectApp
                  title="Selecione a Categoria"
                  placeholder="Selecione a categoria"
                  categories={categories}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoadingCategories || !categories?.length}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            Complete os campos obrigatórios para cadastrar um novo produto.
          </div>

          <Button
            className="cursor-pointer"
            type="submit"
            disabled={
              createProductMutation.isPending ||
              isLoadingCategories ||
              !categories?.length
            }
          >
            {createProductMutation.isPending ? "Salvando..." : "Salvar produto"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
