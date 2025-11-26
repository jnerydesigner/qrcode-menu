import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadDropzoneProps {
    value?: string; // Existing image URL
    onChange: (file: File | null) => void;
    preview?: string; // Preview URL for selected file
    disabled?: boolean;
    maxSize?: number; // in bytes
    accept?: Record<string, string[]>;
}

export function ImageUploadDropzone({
    value,
    onChange,
    preview,
    disabled = false,
    maxSize = 5 * 1024 * 1024, // 5MB default
    accept = {
        "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
}: ImageUploadDropzoneProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (file) {
                onChange(file);
            }
        },
        [onChange]
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            accept,
            maxSize,
            multiple: false,
            onDrop,
            disabled,
        });

    const displayImage = preview || value;
    const hasImage = !!displayImage;

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
    };

    return (
        <div className="space-y-2">
            <div
                {...getRootProps()}
                className={`
          relative border-2 border-dashed rounded-lg p-6 transition-colors
          ${isDragActive ? "border-primary bg-primary/5" : "border-border"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50"}
          ${hasImage ? "p-2" : ""}
        `}
            >
                <input {...getInputProps()} />

                {hasImage ? (
                    <div className="relative group">
                        <img
                            src={displayImage}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={handleRemove}
                                disabled={disabled}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Remover
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="p-3 rounded-full bg-muted">
                            {isDragActive ? (
                                <Upload className="h-6 w-6 text-primary" />
                            ) : (
                                <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            )}
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                {isDragActive
                                    ? "Solte a imagem aqui"
                                    : "Arraste uma imagem ou clique para selecionar"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                PNG, JPG, JPEG ou WEBP (máx. {maxSize / 1024 / 1024}MB)
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {fileRejections.length > 0 && (
                <div className="text-sm text-destructive">
                    {fileRejections[0].errors[0].code === "file-too-large"
                        ? `Arquivo muito grande. Tamanho máximo: ${maxSize / 1024 / 1024}MB`
                        : "Tipo de arquivo inválido. Use PNG, JPG, JPEG ou WEBP."}
                </div>
            )}
        </div>
    );
}
