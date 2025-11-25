// src/pages/QrCodePage.tsx
import { findCompany } from "@/api/companies.fetch";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Download } from "lucide-react";

import { useRef } from "react";
import { toast } from "sonner";
import { useExport } from "@/hooks/use-export";

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
                    <div
                        ref={folderRef}
                        className="w-[400px] h-[600px] bg-white text-black shadow-2xl flex flex-col relative p-2"
                        style={{
                            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
                        }}
                    >
                        {/* IMAGEM */}
                        <div className="h-48 w-full overflow-hidden">
                            {company.image || company.image_small ? (
                                <img
                                    src={company.image || company.image_small}
                                    alt={company.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-500">Sem imagem</span>
                                </div>
                            )}
                        </div>

                        {/* NOME DO COMÉRCIO */}
                        <div className="py-3 text-center bg-white/90">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {company.name}
                            </h2>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 space-y-6 bg-white/80 backdrop-blur-sm mx-4 my-4 rounded-xl shadow-sm">
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-semibold text-gray-800">Acesse nosso Menu</h3>
                                <p className="text-sm text-gray-600">Escaneie o QR Code abaixo</p>
                            </div>

                            <div className="p-4 bg-white rounded-xl shadow-md">
                                {url ? (
                                    <QRCodeSVG value={url} size={150} level="H" includeMargin={false} />
                                ) : (
                                    <div className="w-[150px] h-[150px] bg-gray-100 flex items-center justify-center rounded-md">
                                        <QrCode className="h-12 w-12 text-gray-400" />
                                    </div>
                                )}
                            </div>

                            <div className="text-center">
                                <p className="text-xs text-gray-500 font-medium">Bom apetite!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
