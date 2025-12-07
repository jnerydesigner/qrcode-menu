import React, { useState } from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";

interface FileUploadFieldProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    onChange?: (files: FileList | null) => void;
}

export function FileUploadField({
    label,
    name,
    register,
    error,
    onChange
}: FileUploadFieldProps) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        if (file) {
            // SVG → usar createObjectURL
            if (file.type === "image/svg+xml") {
                setPreview(URL.createObjectURL(file));
            } else {
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
            }
        }

        onChange?.(e.target.files);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                {...register(name)}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md file:mr-4 file:px-4 file:py-2 file:bg-blue-50 file:text-blue-700 file:rounded-md ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />

            {error && <p className="text-red-500 text-xs">{error.message}</p>}

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="h-24 w-24 object-contain border border-gray-200 mt-2 rounded-md"
                />
            )}
        </div>
    );
}
