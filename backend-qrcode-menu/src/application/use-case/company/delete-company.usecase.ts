import { COMPANY_REPOSITORY, type CompanyRepository } from "@domain/repositories/company.repository";
import { Inject } from "@nestjs/common";

export class DeleteCompanyUseCase {
    constructor(
        @Inject(COMPANY_REPOSITORY)
        private readonly companyRepository: CompanyRepository,
    ) { }

    async execute(companyId: string) {
        await this.companyRepository.deleteCompany(companyId);
    }
}