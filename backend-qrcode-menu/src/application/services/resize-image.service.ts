import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

export interface OutputFile {
    buffer: Buffer;
    filename: string;
    mimetype: string;
    originalname: string;
}

@Injectable()
export class ResizeImageService {

    async processImage(
        fileBuffer: Buffer,
        originalName: string,
    ): Promise<{
        file_full: OutputFile;
        file_medium: OutputFile;
        file_small: OutputFile;
    }> {

        const baseName = originalName.replace(/\.[^/.]+$/, '');
        const format = 'png';
        const mimetype = 'image/png';

        const full = await sharp(fileBuffer)
            .rotate()
            .resize(1200)
            .png({ compressionLevel: 6 })
            .withMetadata()
            .toBuffer();

        const medium = await sharp(fileBuffer)
            .rotate()
            .resize(600)
            .png({ compressionLevel: 7 })
            .withMetadata()
            .toBuffer();

        const small = await sharp(fileBuffer)
            .rotate()
            .resize(200)
            .png({ compressionLevel: 9 })
            .withMetadata()
            .toBuffer();

        return {
            file_full: {
                buffer: full,
                filename: `${baseName}_full`,
                mimetype,
                originalname: `${originalName}.${format}`,
            },
            file_medium: {
                buffer: medium,
                filename: `${baseName}_medium`,
                mimetype,
                originalname: `${originalName}.${format}`,
            },
            file_small: {
                buffer: small,
                filename: `${baseName}_small`,
                mimetype,
                originalname: `${originalName}.${format}`,
            },
        };
    }
}
