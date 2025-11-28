import { Company } from '@domain/entities/company.entity';

export interface CompanyRepository {
  create(data: Partial<Company>): Promise<Company>;
  findAll(): Promise<Company[]>;
  findCompanyBySlug(slug: string): Promise<Company>;
  findCompanyById(companyId: string): Promise<Company>;
  updateCompany(companyId: string, data: Company): Promise<Company>;
  deleteCompany(companyId: string): Promise<void>;
}

export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY';
