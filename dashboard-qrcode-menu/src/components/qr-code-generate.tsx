import { QRCodeSVG } from "qrcode.react";
import { QrCode } from "lucide-react";
import { twMerge } from "tailwind-merge";


interface QrCodeGenerateProps {
    url: string;
    size?: "small" | "large";
    dimensions?: {
        qrSize: number;
    };
    className?: string;
}

export const QrCodeGenerate = ({ url, size = "large", dimensions, className }: QrCodeGenerateProps) => {
    const mergedClassName = twMerge(
        `${size === "small" ? "p-3" : "p-4"} shadow-md`,
        className
    );
    return (
        <div className={mergedClassName}>
            {url ? (
                <QRCodeSVG value={url} size={dimensions?.qrSize} level="H" includeMargin={false} />
            ) : (
                <div
                    className="bg-gray-100 flex items-center justify-center"
                    style={{ width: `${dimensions?.qrSize}px`, height: `${dimensions?.qrSize}px` }}
                >
                    <QrCode className={`${size === "small" ? "h-10 w-10" : "h-12 w-12"} text-gray-400`} />
                </div>
            )}
        </div>
    );
};