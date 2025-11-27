import { deleteSocialMedia } from "@/api/social-media.fetch";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { SocialMediaType } from "@/types/social-media.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteSocialMediaDialogProps {
    socialMedia: SocialMediaType;
    children: React.ReactNode;
}

export function DeleteSocialMediaDialog({
    socialMedia,
    children,
}: DeleteSocialMediaDialogProps) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => deleteSocialMedia(socialMedia.id),
        onSuccess: () => {
            toast.success("Rede social removida com sucesso!");
            queryClient.invalidateQueries({
                queryKey: ["social-media", socialMedia.companyId],
            });
        },
        onError: () => {
            toast.error("Erro ao remover rede social.");
        },
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja remover <strong>{socialMedia.name}</strong>?
                        Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => deleteMutation.mutate()}
                        disabled={deleteMutation.isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {deleteMutation.isPending ? "Removendo..." : "Remover"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
