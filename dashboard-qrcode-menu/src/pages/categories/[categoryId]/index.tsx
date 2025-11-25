import { FormCategories } from "@/components/form-categories";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { findCategoryById } from "@/api/category.fecth";

export default function UpdateCategory() {
    const navigate = useNavigate();
    const { categoryId } = useParams<{ categoryId: string }>();

    const { data: category, isLoading, isError } = useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => findCategoryById(categoryId!),
        enabled: !!categoryId,
    });

    if (isLoading) {
        return (
            <section className="space-y-6">
                <div className="text-center">Carregando categoria...</div>
            </section>
        );
    }

    if (isError || !category) {
        return (
            <section className="space-y-6">
                <div className="text-center text-red-500">
                    Erro ao carregar categoria.
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate("/dashboard/categories")}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Editar Categoria
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Atualize os dados da categoria "{category.name}".
                    </p>
                </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
                <FormCategories
                    selectedCategory={category}
                    onSuccess={() => navigate("/dashboard/categories")}
                />
            </div>
        </section>
    );
}
