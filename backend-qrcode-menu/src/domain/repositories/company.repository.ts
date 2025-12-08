import { Company } from '@domain/entities/company.entity';

export interface CompanyRepository {
  create(data: Partial<Company>, imageCompany: { fullUrl: string, mediumUrl: string, smallUrl: string }): Promise<Company>;
  findAll(): Promise<Company[]>;
  findCompanyBySlug(slug: string): Promise<Company>;
  findCompanyById(companyId: string): Promise<Company>;
  updateCompany(companyId: string, data: Company): Promise<Company>;
  deleteCompany(companyId: string): Promise<void>;
  createImagesCompany(image_full: string, image_medium: string, image_small: string, companyId: string): Promise<void>;
}

export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY';
