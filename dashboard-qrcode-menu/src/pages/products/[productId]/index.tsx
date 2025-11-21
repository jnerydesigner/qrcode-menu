import { findOneProduct } from "@/api/products.fetch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export default function ProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => findOneProduct(productId!),
        enabled: !!productId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (isError || !product) {
        return <div>Erro ao carregar produto.</div>;
    }

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Detalhes do Produto
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Visualize as informações completas do produto.
                    </p>
                </div>
                <Button className="ml-auto">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                </Button>
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="flex w-full items-center justify-center bg-muted/20 py-4 rounded-lg">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-[250px] w-auto object-contain rounded-md"
                        />
                    ) : (
                        <div className="flex h-[250px] w-full items-center justify-center text-muted-foreground">
                            Sem imagem
                        </div>
                    )}
                </div>
                <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => alert(`Editar imagem do produto: ${product.id}`)}
                >
                    <Edit className="mr-2 h-4 w-4" />
                    Alterar Imagem
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="flex">
                    <CardHeader>
                        <CardTitle>Informações Principais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">
                                Nome
                            </span>
                            <p className="text-lg font-medium">{product.name}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">
                                Descrição
                            </span>
                            <p>{product.description}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">
                                Preço
                            </span>
                            <p className="text-lg font-medium">
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(product.price)}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">
                                Categoria
                            </span>
                            <p>
                                <Badge className="w-[auto] px-4 py-2" variant="secondary">{product.category.name}</Badge>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Ingredientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {product.ingredients.map((ingredient) => (
                                <Badge
                                    key={ingredient.id}
                                    variant="outline"
                                    className="flex items-center gap-2 pl-1"
                                >
                                    <span
                                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${ingredient.color} text-white`}
                                    >
                                        {ingredient.emoji}
                                    </span>
                                    {ingredient.name}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}