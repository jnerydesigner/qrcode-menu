import { findCompany } from "@/api/companies.fetch";
import { useQuery } from "@tanstack/react-query";
import { QrCodeDownloadCard } from "@/components/qr-code-download-card";

export default function QrCodePage() {

    const { data: company, isLoading, isError } = useQuery({
        queryKey: ["company"],
        queryFn: () => findCompany("hamburgueria-da-vila"),
    });

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
                <QrCodeDownloadCard
                    company={company}
                    url={url}
                    size="large"
                    showTitle={false}
                    className="border-none shadow-none"
                    variant="original"
                />
            </div>
        </div>
    );
}
