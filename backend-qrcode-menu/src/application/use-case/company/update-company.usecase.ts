import { Company } from "@domain/entities/company.entity";
import { COMPANY_REPOSITORY, type CompanyRepository } from "@domain/repositories/company.repository";
import { SlugEntity } from "@domain/value-objects/slug-entity.value";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UpdateCompanyUseCase {
    constructor(
        @Inject(COMPANY_REPOSITORY)
        private readonly companyRepository: CompanyRepository,
    ) { }

    async execute(companyId: string, input: CompanyUpdateType) {
        const company = await this.companyRepository.findCompanyById(companyId);

        if (!company) {
            throw new Error('Company not found');
        }

        company.name = input?.name;
        company.slug = SlugEntity.create(input?.name).toString();


        return this.companyRepository.updateCompany(companyId, company);
    }

}

export interface CompanyUpdateType {
    name: string;
}