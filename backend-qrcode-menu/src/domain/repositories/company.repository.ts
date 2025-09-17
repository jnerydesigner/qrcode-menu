import { Company } from '@domain/entities/company.entity';

export interface CompanyRepository {
  create(data: Partial<Company>): Promise<Company>;
  findAll(): Promise<Company[]>;
}

export const COMPANY_REPOSITORY = Symbol('COMPANY_REPOSITORY');
