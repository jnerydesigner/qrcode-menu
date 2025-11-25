// src/pages/QrCodePage.tsx
import { findCompany } from "@/api/companies.fetch";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";

import { useRef } from "react";
import { toast } from "sonner";
import { useExport } from "@/hooks/use-export";
import { QrCodeFolder } from "@/components/qrcode-folder";

export default function QrCodePage() {

    const folderRef = useRef<HTMLDivElement>(null);
    const { exportAsImage, exportAsPDF } = useExport();

    const { data: company, isLoading, isError } = useQuery({
        queryKey: ["company"],
        queryFn: () => findCompany("hamburgueria-da-vila"),
    });

    const handleDownload = async () => {
        try {
            await exportAsPDF(folderRef.current, `${company?.name || "qrcode"}-folder.pdf`);
            // await exportAsImage(folderRef.current, `${company?.name || "qrcode"}-folder.png`);
            toast.success("Folder baixado com sucesso!");
        } catch (error) {
            console.error("Erro ao baixar folder:", error);
            toast.error("Erro ao gerar o folder. Tente novamente.");
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center">Carregando dados da empresa...</div>;
    }

    if (isError || !company) {
        return (
            <div className="p-8 text-center text-red-500">
                Erro ao carregar dados da empresa.
            </div>
        );
    }

    const url = `${import.meta.env.VITE_URL_SITE}/${company.slug}`;
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">QR Code do Menu</h1>
                <p className="text-muted-foreground">
                    Gere e baixe o QR Code para as mesas do seu restaurante.
                </p>
            </div>

            <div className="flex flex-col items-center gap-6">
                <Button onClick={handleDownload} className="cursor-pointer">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar Folder
                </Button>

                <div className="flex justify-center">
                    <QrCodeFolder ref={folderRef} company={company} url={url} size="large" />
                </div>
            </div>
        </div>
    );
}
