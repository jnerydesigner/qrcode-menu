import { CreateCompanyInputDto } from '@application/dtos/create-company.input.dto';
import {
  type CreateCompanyInputUseCase,
  CreateCompanyUseCase,
} from '@application/use-case/company/create-company.usecase';
import { FindAllCompanyUseCase } from '@application/use-case/company/find-all-company.usecase';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('company')
@ApiTags('Company')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly findAllCompanyUseCase: FindAllCompanyUseCase,
  ) {}

  @Post()
  @ApiTags('Create Company')
  @ApiBody({ type: CreateCompanyInputDto })
  createCompany(@Body() company: CreateCompanyInputUseCase) {
    return this.createCompanyUseCase.create(company);
  }

  @Get()
  findAll() {
    return this.findAllCompanyUseCase.findAll();
  }
}
