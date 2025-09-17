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
  ) {}
  async create(input: CreateCompanyInputUseCase): Promise<Company> {
    const company = new Company(input?.name, null);
    return await this.companyRepository.create(company);
  }
}

export interface CreateCompanyInputUseCase {
  name: string;
}
