import type { CompanyType } from "@/types/company.type";
import { forwardRef } from "react";
import { QrCodeGenerate } from "./qr-code-generate";

interface QrCodeFolderProps {
    company: CompanyType;
    url: string;
    size?: "small" | "large";
}

export const QrCodeFolderNew = forwardRef<HTMLDivElement, QrCodeFolderProps>(
    ({ company, url, size = "large" }, ref) => {
        const dimensions = size === "small"
            ? { width: 300, height: 450, imageHeight: 36, qrSize: 150 }
            : { width: 400, height: 600, imageHeight: 48, qrSize: 210 };

        return (
            <div
                ref={ref}
                className="bg-white text-black shadow-2xl flex flex-col relative overflow-hidden"
                style={{
                    width: `${dimensions.width}px`,
                    height: `${dimensions.height}px`,
                    background: "linear-gradient(135deg, #4fd1c5 0%, #38b2ac 100%)"
                }}
            >
                <div
                    className="w-full relative"
                    style={{ height: size === "small" ? "200px" : "280px" }}
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

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h3 className={`${size === "small" ? "text-2xl" : "text-4xl"} font-bold tracking-wide [text-shadow:_2px_2px_4px_rgb(0_0_0_/_0.8)]`}>
                                {company.name}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center flex-1 p-2 relative">
                    <h3 className={`${size === "small" ? "text-sm absolute top-32" : "text-2xl absolute top-60"} font-bold text-white uppercase tracking-wide mb-2 z-20 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_0.8)]`}>
                        SCANEIE O QR CODE
                    </h3>
                    <QrCodeGenerate
                        url={url}
                        size={size}
                        dimensions={dimensions}
                        className={`${size === "small" ? "w-[180px]" : "w-[220px]"} bg-white p-2 flex justify-center items-center z-20 absolute -top-12`}
                    />

                    <div className="w-full h-full z-10 flex items-center justify-center absolute">
                        <img
                            src="https://qr-code-menu-seligadev.s3.us-east-1.amazonaws.com/hamburguer-frango-crispy/hamburguer-frango-crispy_medium-7ec1c971-749b-444f-a08a-403a9272f6cc-1763909050396.png"
                            alt={company.name}
                            className="w-full h-full object-cover border-4 border-white"
                        />
                    </div>
                </div>
            </div>
        );
    }
);

QrCodeFolderNew.displayName = "QrCodeFolderNew";
