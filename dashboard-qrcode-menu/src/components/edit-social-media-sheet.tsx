import { updateSocialMedia } from "@/api/social-media.fetch";
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
import type { SocialMediaType, UpdateSocialMediaDto } from "@/types/social-media.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EditSocialMediaSheetProps {
    socialMedia: SocialMediaType;
    children: React.ReactNode;
}

export function EditSocialMediaSheet({
    socialMedia,
    children,
}: EditSocialMediaSheetProps) {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<UpdateSocialMediaDto>({
        name: socialMedia.name,
        link: socialMedia.link,
        svgPath: socialMedia.svgPath,
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: socialMedia.name,
                link: socialMedia.link,
                svgPath: socialMedia.svgPath,
            });
        }
    }, [isOpen, socialMedia]);

    const updateMutation = useMutation({
        mutationFn: (data: UpdateSocialMediaDto) =>
            updateSocialMedia(socialMedia.id, data),
        onSuccess: () => {
            toast.success("Rede social atualizada com sucesso!");
            queryClient.invalidateQueries({
                queryKey: ["social-media", socialMedia.companyId],
            });
            setIsOpen(false);
        },
        onError: () => {
            toast.error("Erro ao atualizar rede social.");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.link || !formData.svgPath) {
            toast.error("Preencha todos os campos.");
            return;
        }
        updateMutation.mutate(formData);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Editar Rede Social</SheetTitle>
                    <SheetDescription>
                        Atualize as informações da rede social.
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
                            disabled={updateMutation.isPending}
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
                            disabled={updateMutation.isPending}
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
                            disabled={updateMutation.isPending}
                        />
                    </div>

                    <SheetFooter>
                        <Button
                            type="submit"
                            disabled={updateMutation.isPending}
                            className="cursor-pointer"
                        >
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
                </form>
            </SheetContent>
        </Sheet>
    );
}
