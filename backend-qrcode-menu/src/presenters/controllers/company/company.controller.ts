import {
  type CreateCompanyInputUseCase,
  CreateCompanyUseCase,
} from '@application/use-case/company/create-company.usecase';
import { FindAllCompanyUseCase } from '@application/use-case/company/find-all-company.usecase';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly findAllCompanyUseCase: FindAllCompanyUseCase,
  ) {}

  @Post()
  createCompany(@Body() company: CreateCompanyInputUseCase) {
    return this.createCompanyUseCase.create(company);
  }

  @Get()
  findAll() {
    return this.findAllCompanyUseCase.findAll();
  }
}
