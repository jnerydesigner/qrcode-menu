import { UploadImageCompanyService } from '@application/services/upload-image-company.service';
import { Company } from '@domain/entities/company.entity';
import {
  COMPANY_REPOSITORY,
  type CompanyRepository,
} from '@domain/repositories/company.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository,
    private readonly uploadImageCompanyService: UploadImageCompanyService,
  ) { }
  async create(input: CreateCompanyInputUseCase, file: Express.Multer.File): Promise<Company> {
    const company = Company.create(input?.name);

    const imageCompany = await this.uploadImageCompanyService.createImageCompany(file, company.slug);

    if (!imageCompany.fullUrl || !imageCompany.mediumUrl || !imageCompany.smallUrl) {
      throw new Error('Error uploading image company');
    }

    await this.companyRepository.createImagesCompany(imageCompany.fullUrl, imageCompany.mediumUrl, imageCompany.smallUrl, company.id);

    return await this.companyRepository.create(company, { fullUrl: imageCompany.fullUrl, mediumUrl: imageCompany.mediumUrl, smallUrl: imageCompany.smallUrl });
  }
}

export interface CreateCompanyInputUseCase {
  name: string;
}
