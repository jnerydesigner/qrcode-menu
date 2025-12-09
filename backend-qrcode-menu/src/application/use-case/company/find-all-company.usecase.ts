import { Company } from '@domain/entities/company.entity';
import {
  COMPANY_REPOSITORY,
  type CompanyRepository,
} from '@domain/repositories/company.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository,
  ) { }
  async execute(): Promise<Company[]> {
    const response = await this.companyRepository.findAll();

    if (!response) {
      throw new Error('Nenhuma empresa encontrada');
    }
    return response;
  }
}
