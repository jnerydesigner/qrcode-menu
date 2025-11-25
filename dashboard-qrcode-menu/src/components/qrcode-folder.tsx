import { QRCodeSVG } from "qrcode.react";
import { QrCode } from "lucide-react";
import type { CompanyType } from "@/types/company.type";
import { forwardRef } from "react";

interface QrCodeFolderProps {
    company: CompanyType;
    url: string;
    size?: "small" | "large";
}

export const QrCodeFolder = forwardRef<HTMLDivElement, QrCodeFolderProps>(
    ({ company, url, size = "large" }, ref) => {
        const dimensions = size === "small"
            ? { width: 300, height: 450, imageHeight: 36, qrSize: 120 }
            : { width: 400, height: 600, imageHeight: 48, qrSize: 150 };

        return (
            <div
                ref={ref}
                className="bg-white text-black shadow-2xl flex flex-col relative p-2"
                style={{
                    width: `${dimensions.width}px`,
                    height: `${dimensions.height}px`,
                    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
                }}
            >
                {/* IMAGEM */}
                <div
                    className="w-full overflow-hidden"
                    style={{ height: size === "small" ? "144px" : "192px" }}
                >
                    {company.image || company.image_small ? (
                        <img
                            src={company.image || company.image_small || ""}
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
                <div className={`${size === "small" ? "py-2" : "py-3"} text-center bg-white/90`}>
                    <h2 className={`${size === "small" ? "text-lg" : "text-2xl"} font-bold text-gray-800`}>
                        {company.name}
                    </h2>
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div className={`flex-1 flex flex-col items-center justify-center ${size === "small" ? "px-4 py-6 space-y-4 mx-3 my-3" : "px-6 py-8 space-y-6 mx-4 my-4"} bg-white/80 backdrop-blur-sm rounded-xl shadow-sm`}>
                    <div className="text-center space-y-2">
                        <h3 className={`${size === "small" ? "text-base" : "text-xl"} font-semibold text-gray-800`}>
                            Acesse nosso Menu
                        </h3>
                        <p className={`${size === "small" ? "text-xs" : "text-sm"} text-gray-600`}>
                            Escaneie o QR Code abaixo
                        </p>
                    </div>

                    <div className={`${size === "small" ? "p-3" : "p-4"} bg-white rounded-xl shadow-md`}>
                        {url ? (
                            <QRCodeSVG value={url} size={dimensions.qrSize} level="H" includeMargin={false} />
                        ) : (
                            <div
                                className="bg-gray-100 flex items-center justify-center rounded-md"
                                style={{ width: `${dimensions.qrSize}px`, height: `${dimensions.qrSize}px` }}
                            >
                                <QrCode className={`${size === "small" ? "h-10 w-10" : "h-12 w-12"} text-gray-400`} />
                            </div>
                        )}
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-gray-500 font-medium">Bom apetite!</p>
                    </div>
                </div>
            </div>
        );
    }
);

QrCodeFolder.displayName = "QrCodeFolder";
