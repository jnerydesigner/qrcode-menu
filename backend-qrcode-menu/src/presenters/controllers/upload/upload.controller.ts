import { S3UploadService } from "@application/services/s3-upload.service";
import { Controller, Get, Query, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { Readable } from "stream";

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
    constructor(private readonly s3UploadService: S3UploadService) { }

    @Get('proxy')
    async proxyImage(@Query('url') url: string, @Res() res: Response) {
        if (!url) {
            return res.status(400).send('URL is required');
        }

        try {
            const { stream, contentType } = await this.s3UploadService.getFile(url);

            res.set({
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=31536000',
            });

            if (stream instanceof Readable) {
                stream.pipe(res);
            } else {
                // Handle other stream types if necessary (e.g. Blob, WebStream)
                // For AWS SDK v3 Node.js, it's usually a Readable
                (stream as any).pipe(res);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching image');
        }
    }
}
