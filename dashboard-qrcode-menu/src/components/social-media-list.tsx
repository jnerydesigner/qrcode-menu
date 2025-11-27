import { DeleteSocialMediaDialog } from "@/components/delete-social-media-dialog";
import { EditSocialMediaSheet } from "@/components/edit-social-media-sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { svgStringToComponent } from "@/lib/svg-to-component";
import type { SocialMediaType } from "@/types/social-media.type";
import { Edit, ExternalLink, Plus, Trash2 } from "lucide-react";

interface SocialMediaListProps {
    socialMedias: SocialMediaType[];
}

export function SocialMediaList({ socialMedias }: SocialMediaListProps) {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Redes Sociais</CardTitle>

            </CardHeader>
            <CardContent>
                {socialMedias && socialMedias.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {socialMedias.map((socialMedia) => (
                            <div
                                key={socialMedia.id}
                                className="flex flex-col items-center justify-between rounded-lg border p-4 gap-4 hover:shadow-md transition-shadow"
                            >
                                <div className="w-full flex flex-col justify-center items-center gap-2">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 p-2">
                                        {svgStringToComponent(socialMedia.svgPath)}
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold">{socialMedia.name}</p>
                                        <a
                                            href={socialMedia.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary mt-1"
                                        >
                                            Acessar
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full justify-center pt-2 border-t">
                                    <EditSocialMediaSheet socialMedia={socialMedia}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 cursor-pointer"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </EditSocialMediaSheet>
                                    <DeleteSocialMediaDialog socialMedia={socialMedia}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </DeleteSocialMediaDialog>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-sm text-muted-foreground py-4">
                        Nenhuma rede social cadastrada.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
