import { Injectable } from "@nestjs/common";
import { ResizeImageService } from "./resize-image.service";
import { S3UploadService } from "@application/services/s3-upload.service";

@Injectable()
export class UploadImageCompanyService {
    constructor(private readonly resizeImageService: ResizeImageService, private readonly uploadService: S3UploadService) { }

    async createImageCompany(file: Express.Multer.File, slugCompany: string) {
        const { file_full, file_medium, file_small } = await this.resizeImageService.processImage(file.buffer, file.originalname);

        const folder = `company`;

        const fullUrl = await this.uploadService.uploadFileWithFolder(file_full, folder, slugCompany, "full");
        const mediumUrl = await this.uploadService.uploadFileWithFolder(file_medium, folder, slugCompany, "medium");
        const smallUrl = await this.uploadService.uploadFileWithFolder(file_small, folder, slugCompany, "small");

        return {
            fullUrl: fullUrl?.url,
            mediumUrl: mediumUrl?.url,
            smallUrl: smallUrl?.url,
        }
    }
}