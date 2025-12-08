import { Module } from '@nestjs/common';
import { CompanyService } from '@application/services/company.service';
import { CreateCompanyUseCase } from '@application/use-case/company/create-company.usecase';
import { CompanyController } from '@presenters/controllers/company/company.controller';
import { FindAllCompanyUseCase } from '@application/use-case/company/find-all-company.usecase';
import { FindCompanyBySlugUseCase } from '@application/use-case/company/find-company-by-slug.use-case';
import { UploadImageCompanyService } from '@application/services/upload-image-company.service';
import { ResizeImageService } from '@application/services/resize-image.service';
import { S3UploadService } from '@application/services/s3-upload.service';
import { S3ConfigService } from '@infra/config/s3.config';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [CompanyService, CreateCompanyUseCase, FindAllCompanyUseCase, FindCompanyBySlugUseCase, UploadImageCompanyService, ResizeImageService, S3UploadService, S3ConfigService],
})
export class CompanyModule { }
