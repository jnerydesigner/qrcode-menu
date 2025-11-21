import { findOneProduct, updateProductImage } from "@/api/products.fetch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Edit, Upload, Loader2, CloudUpload } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const imageUploadSchema = z.object({
    file: z
        .instanceof(FileList)
        .refine((files) => files.length > 0, "Por favor, selecione uma imagem.")
        .refine(
            (files) => files[0]?.size <= MAX_FILE_SIZE,
            "A imagem deve ter no máximo 5MB."
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
            "Apenas arquivos .jpg, .jpeg, .png e .webp são aceitos."
        ),
});

type ImageUploadFormData = z.infer<typeof imageUploadSchema>;

export default function ProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isUploadMode, setIsUploadMode] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ImageUploadFormData>({
        resolver: zodResolver(imageUploadSchema),
    });

    const uploadMutation = useMutation({
        mutationFn: ({ productId, file }: { productId: string; file: File }) =>
            updateProductImage(productId, file),
        onSuccess: () => {
            toast.success("Imagem atualizada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["product", productId] });
            reset();
            setSelectedFile(null);
            setIsUploadMode(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Erro ao atualizar imagem.");
        },
    });

    const onSubmit = (data: ImageUploadFormData) => {
        if (!productId || !selectedFile) return;
        uploadMutation.mutate({ productId, file: selectedFile });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
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
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl">
                        <div className="flex justify-center items-center gap-3">
                            <Label
                                htmlFor="file"
                                className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                <input
                                    id="file"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    {...register("file")}
                                    onChange={(e) => {
                                        register("file").onChange(e);
                                        handleFileChange(e);
                                    }}
                                    disabled={uploadMutation.isPending}
                                    className="hidden"
                                />
                                <CloudUpload className="h-5 w-5" />
                                <span className="text-sm font-medium">
                                    {selectedFile ? selectedFile.name : "Escolher arquivo"}
                                </span>
                            </Label>

                            <Button
                                type="submit"
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
                                    reset();
                                }}
                                disabled={uploadMutation.isPending}
                                className="cursor-pointer"
                            >
                                Cancelar
                            </Button>
                        </div>
                        {errors.file && (
                            <p className="text-sm text-red-500 mt-2">
                                {errors.file.message?.toString()}
                            </p>
                        )}
                    </form>
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