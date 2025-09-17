import { PrismaService } from '@application/services/prisma.service';
import { Company } from '@domain/entities/company.entity';
import { CompanyMapper } from '@domain/mappers/company.mapper';
import { CompanyRepository } from '@domain/repositories/company.repository';

export class CompanyPrismaRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Company): Promise<Company> {
    const company = CompanyMapper.toPrisma(data);
    const companySave = await this.prisma.company.create({
      data: company,
    });

    return CompanyMapper.toDomain(companySave);
  }

  async findAll(): Promise<Company[]> {
    const findCompanies = await this.prisma.company.findMany();
    const companyMapper = findCompanies.map((company) =>
      CompanyMapper.toDomain(company),
    );

    return companyMapper;
  }
}
