import { createSocialMedia } from "@/api/social-media.fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import type { CreateSocialMediaDto } from "@/types/social-media.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddSocialMediaSheetProps {
    companyId: string;
    children: React.ReactNode;
}

export function AddSocialMediaSheet({
    companyId,
    children,
}: AddSocialMediaSheetProps) {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<Omit<CreateSocialMediaDto, "companyId">>({
        name: "",
        link: "",
        svgPath: "",
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateSocialMediaDto) => createSocialMedia(data),
        onSuccess: () => {
            toast.success("Rede social adicionada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["social-media", companyId] });
            setIsOpen(false);
            setFormData({ name: "", link: "", svgPath: "" });
        },
        onError: () => {
            toast.error("Erro ao adicionar rede social.");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.link || !formData.svgPath) {
            toast.error("Preencha todos os campos.");
            return;
        }
        createMutation.mutate({ ...formData, companyId });
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Adicionar Rede Social</SheetTitle>
                    <SheetDescription>
                        Adicione uma nova rede social para sua empresa.
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome da Rede Social</Label>
                        <Input
                            id="name"
                            placeholder="Ex: Facebook, Instagram, Twitter"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            disabled={createMutation.isPending}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="link">Link</Label>
                        <Input
                            id="link"
                            type="url"
                            placeholder="https://..."
                            value={formData.link}
                            onChange={(e) =>
                                setFormData({ ...formData, link: e.target.value })
                            }
                            disabled={createMutation.isPending}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="svgPath">SVG Path</Label>
                        <Input
                            id="svgPath"
                            placeholder="Cole o caminho SVG do ícone"
                            value={formData.svgPath}
                            onChange={(e) =>
                                setFormData({ ...formData, svgPath: e.target.value })
                            }
                            disabled={createMutation.isPending}
                        />
                        <p className="text-xs text-muted-foreground">
                            Você pode obter ícones SVG em sites como{" "}
                            <a
                                href="https://simpleicons.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                Simple Icons
                            </a>
                        </p>
                    </div>

                    <SheetFooter>
                        <Button
                            type="submit"
                            disabled={createMutation.isPending}
                            className="cursor-pointer"
                        >
                            {createMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Adicionando...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Adicionar
                                </>
                            )}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
