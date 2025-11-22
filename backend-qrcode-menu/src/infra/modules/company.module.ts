import { Module } from '@nestjs/common';
import { CompanyService } from '@application/services/company.service';
import { CreateCompanyUseCase } from '@application/use-case/company/create-company.usecase';
import { CompanyController } from '@presenters/controllers/company/company.controller';
import { FindAllCompanyUseCase } from '@application/use-case/company/find-all-company.usecase';
import { FindCompanyBySlugUseCase } from '@application/use-case/company/find-company-by-slug.use-case';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [CompanyService, CreateCompanyUseCase, FindAllCompanyUseCase, FindCompanyBySlugUseCase],
})
export class CompanyModule { }
