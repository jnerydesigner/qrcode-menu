import { SlugEntity } from './../../src/domain/value-objects/slug-entity.value';
import {
  CreateCompanyInputUseCase,
  CreateCompanyUseCase,
} from '@application/use-case/company/create-company.usecase';
import { Company } from '@domain/entities/company.entity';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from '@domain/repositories/company.repository';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id.value';
import { Test, TestingModule } from '@nestjs/testing';

describe('CreateCompanyUseCase', () => {
  let createCompanyUseCase: CreateCompanyUseCase;
  let companyRepository: jest.Mocked<CompanyRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCompanyUseCase,
        {
          provide: COMPANY_REPOSITORY,
          useValue: {
            create: jest.fn(),
          } as jest.Mocked<CompanyRepository>,
        },
      ],
    }).compile();

    createCompanyUseCase =
      module.get<CreateCompanyUseCase>(CreateCompanyUseCase);
    companyRepository = module.get(COMPANY_REPOSITORY);
  });

  it('deve criar uma nova empresa', async () => {
    const input: CreateCompanyInputUseCase = {
      name: 'Restaurante Copilot',
    };

    const companyCreate = createCompanyUseCase.create(input);
  });
});
