import { findAllIngredients } from "@/api/ingredient.fetch";
import { updateProduct } from "@/api/products.fetch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { ProductType } from "@/types/product.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProductIngredientsSheetProps {
    product: ProductType;
    children: React.ReactNode;
}

export function ProductIngredientsSheet({
    product,
    children,
}: ProductIngredientsSheetProps) {
    const queryClient = useQueryClient();
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Fetch all ingredients
    const { data: allIngredients, isLoading } = useQuery({
        queryKey: ["ingredients"],
        queryFn: findAllIngredients,
    });

    // Initialize selected ingredients from product
    useEffect(() => {
        if (product.ingredients) {
            setSelectedIngredients(product.ingredients.map((ing) => ing.id));
        }
    }, [product, isOpen]);

    const updateMutation = useMutation({
        mutationFn: (ingredientIds: string[]) => {
            const productIngredient = ingredientIds.map((id) => ({ ingredientId: id }));
            return updateProduct(product.id, {
                productIngredient,
            });
        },
        onSuccess: () => {
            toast.success("Ingredientes atualizados com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["product", product.id] });
            setIsOpen(false);
        },
        onError: () => {
            toast.error("Erro ao atualizar ingredientes.");
        },
    });

    const handleToggleIngredient = (ingredientId: string) => {
        setSelectedIngredients((prev) =>
            prev.includes(ingredientId)
                ? prev.filter((id) => id !== ingredientId)
                : [...prev, ingredientId]
        );
    };

    const handleSave = () => {
        updateMutation.mutate(selectedIngredients);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Gerenciar Ingredientes</SheetTitle>
                    <SheetDescription>
                        Selecione os ingredientes que compõem este produto.
                    </SheetDescription>
                </SheetHeader>

                <div className="py-6">
                    {isLoading ? (
                        <div className="flex justify-center p-4">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                    ) : (
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">Seleção</TableHead>
                                        <TableHead>Ingrediente</TableHead>
                                        <TableHead>Emoji</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allIngredients?.map((ingredient) => (
                                        <TableRow key={ingredient.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedIngredients.includes(ingredient.id)}
                                                    onCheckedChange={() => handleToggleIngredient(ingredient.id)}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {ingredient.name}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${ingredient.color} text-white`}
                                                >
                                                    {ingredient.emoji}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>

                <SheetFooter>
                    <Button onClick={handleSave} disabled={updateMutation.isPending} className="cursor-pointer">
                        {updateMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Salvar Alterações
                            </>
                        )}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
