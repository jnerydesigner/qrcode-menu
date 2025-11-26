import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";
import { toast } from "sonner";
import { useExport } from "@/hooks/use-export";
import { QrCodeFolder } from "@/components/qrcode-folder";
import { QrCodeFolderNew } from "@/components/qrcode-folder-new";
import type { CompanyType } from "@/types/company.type";

interface QrCodeDownloadCardProps {
    company: CompanyType;
    url: string;
    size?: "small" | "large";
    className?: string;
    showTitle?: boolean;
    variant?: "original" | "new";
}

export function QrCodeDownloadCard({
    company,
    url,
    size = "small",
    className,
    showTitle = true,
    variant = "new"
}: QrCodeDownloadCardProps) {
    const folderRef = useRef<HTMLDivElement>(null);
    const { exportAsPDF } = useExport();

    const handleDownload = async () => {
        try {
            await exportAsPDF(folderRef.current, `${company?.name || "qrcode"}-folder.pdf`);
            toast.success("Folder baixado com sucesso!");
        } catch (error) {
            console.error("Erro ao baixar folder:", error);
            toast.error("Erro ao gerar o folder. Tente novamente.");
        }
    };

    const FolderComponent = variant === "original" ? QrCodeFolder : QrCodeFolderNew;

    return (
        <Card className={`hover:shadow-lg transition-shadow ${className}`}>
            {showTitle && (
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">
                        QR Code do Menu
                    </CardTitle>
                    <QrCode className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
            )}
            <CardContent>
                <div className="flex flex-col gap-4 mt-4">
                    <Button onClick={handleDownload} className="w-full cursor-pointer">
                        <Download className="mr-2 h-4 w-4" />
                        Baixar Folder
                    </Button>

                    <div className="flex justify-center">
                        <FolderComponent ref={folderRef} company={company} url={url} size={size} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
