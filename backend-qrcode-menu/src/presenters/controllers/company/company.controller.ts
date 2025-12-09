import { CreateCompanyInputDto } from '@application/dtos/create-company.input.dto';
import {
  type CreateCompanyInputUseCase,
  CreateCompanyUseCase,
} from '@application/use-case/company/create-company.usecase';
import { FindAllCompanyUseCase } from '@application/use-case/company/find-all-company.usecase';
import { FindCompanyBySlugUseCase } from '@application/use-case/company/find-company-by-slug.use-case';
import { IsPublic } from '@infra/decorators/is-public.decorator';
import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('company')
@ApiTags('Company')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly findAllCompanyUseCase: FindAllCompanyUseCase,
    private readonly findCompanyBySlugUseCase: FindCompanyBySlugUseCase,
  ) { }

  @Post()
  @ApiTags('Create Company')
  @ApiBody({ type: CreateCompanyInputDto })
  @IsPublic()
  @UseInterceptors(FileInterceptor('image'))
  createCompany(@Body() company: CreateCompanyInputDto, @UploadedFile() file: Express.Multer.File) {
    return this.createCompanyUseCase.create(company, file);
  }

  @Get()
  @IsPublic()
  findAll() {
    return this.findAllCompanyUseCase.execute();
  }

  @Get("/:companySlug")
  findCompanyBySlug(@Param("companySlug") companySlug: string) {
    return this.findCompanyBySlugUseCase.execute(companySlug);
  }
}
