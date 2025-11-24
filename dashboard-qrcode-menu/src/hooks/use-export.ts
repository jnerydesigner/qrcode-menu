// src/hooks/useExport.ts
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export function useExport() {
    async function exportAsImage(ref: HTMLDivElement | null, fileName = "export.png") {
        if (!ref) return;

        // garante que todas as fontes foram carregadas
        await document.fonts.ready;

        const dataUrl = await toPng(ref, { cacheBust: true, pixelRatio: 2 });

        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();
    }

    async function exportAsPDF(ref: HTMLDivElement | null, fileName = "export.pdf") {
        if (!ref) return;

        await document.fonts.ready;

        const dataUrl = await toPng(ref, { cacheBust: true, pixelRatio: 2 });

        // Formato A6: 105mm x 148mm
        const a6Width = 105; // mm
        const a6Height = 148; // mm

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a6", // Formato A6 fixo
        });

        pdf.addImage(dataUrl, "PNG", 0, 0, a6Width, a6Height);
        pdf.save(fileName);
    }

    return { exportAsImage, exportAsPDF };
}
