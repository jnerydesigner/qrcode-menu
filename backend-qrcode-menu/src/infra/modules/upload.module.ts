import { S3UploadService } from "@application/services/s3-upload.service";
import { S3ConfigService } from "@infra/config/s3.config";
import { Module } from "@nestjs/common";

import { UploadController } from "@presenters/controllers/upload/upload.controller";

@Module({
    imports: [],
    controllers: [UploadController],
    providers: [S3UploadService, S3ConfigService],
    exports: [S3UploadService]
})
export class UploadModule { }