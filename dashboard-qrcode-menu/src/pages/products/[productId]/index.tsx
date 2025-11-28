import { findOneProduct, updateProductImage } from "@/api/products.fetch";
import { ProductIngredientsSheet } from "@/components/product-ingredients-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploadDropzone } from "@/components/image-upload-dropzone";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Edit, Upload, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function ProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isUploadMode, setIsUploadMode] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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

    // Cleanup preview URL on unmount
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleImageChange = (file: File | null) => {
        if (file) {
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setSelectedFile(file);
        } else {
            // Clear preview
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
            setImagePreview(null);
            setSelectedFile(null);
        }
    };

    const uploadMutation = useMutation({
        mutationFn: ({ productId, file }: { productId: string; file: File }) =>
            updateProductImage(productId, file),
        onSuccess: () => {
            toast.success("Imagem atualizada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["product", productId] });
            setSelectedFile(null);
            setImagePreview(null);
            setIsUploadMode(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Erro ao atualizar imagem.");
        },
    });

    const handleUpload = () => {
        if (!productId || !selectedFile) return;
        uploadMutation.mutate({ productId, file: selectedFile });
    };

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (isError || !product) {
        return <div>Erro ao carregar produto.</div>;
    }


    return (
        <section className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/products')}>
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
                {!isUploadMode ? (
                    <div className="flex w-full items-center justify-center bg-muted/20 py-4 rounded-lg">
                        {product.image ? (
                            <img
                                src={product.images?.image_small}
                                alt={product.name}
                                className="h-[250px] w-auto object-contain rounded-md"
                            />
                        ) : (
                            <div className="flex h-[250px] w-full items-center justify-center text-muted-foreground">
                                Sem imagem
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full max-w-2xl">
                        <ImageUploadDropzone
                            value={product.images?.image_full}
                            preview={imagePreview || undefined}
                            onChange={handleImageChange}
                            disabled={uploadMutation.isPending}
                        />
                    </div>
                )}

                {!isUploadMode ? (
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => setIsUploadMode(true)}
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Alterar Imagem
                    </Button>
                ) : (
                    <div className="flex gap-3">
                        <Button
                            onClick={handleUpload}
                            disabled={uploadMutation.isPending || !selectedFile}
                            className="cursor-pointer"
                        >
                            {uploadMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Enviar
                                </>
                            )}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setIsUploadMode(false);
                                setSelectedFile(null);
                                setImagePreview(null);
                            }}
                            disabled={uploadMutation.isPending}
                            className="cursor-pointer"
                        >
                            Cancelar
                        </Button>
                    </div>
                )}
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
                        <CardTitle className="text-center">Ingredientes</CardTitle>
                        <ProductIngredientsSheet product={product}>
                            <Button variant="outline" className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                Gerenciar Ingredientes
                            </Button>
                        </ProductIngredientsSheet>
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