import {
  CreateCompanyInputUseCase,
  CreateCompanyUseCase,
} from '@application/use-case/company/create-company.usecase';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from '@domain/repositories/company.repository';
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
            findAll: jest.fn(),
            findCompanyBySlug: jest.fn(),
            findCompanyById: jest.fn(),
            updateCompany: jest.fn(),
            deleteCompany: jest.fn(),
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
      name: 'Restaurante Comida no Bucho',
    };

    companyRepository.create.mockResolvedValue({
      id: '123',
      name: input.name,
      slug: 'restaurante-comida-no-bucho',
      createdAt: new Date(),
      image: '',
      image_small: '',
      products: [],
    });

    const companyCreate = await createCompanyUseCase.create(input);

    expect(companyCreate.slug).toEqual('restaurante-comida-no-bucho');
    expect(companyCreate.name).toEqual('Restaurante Comida no Bucho');
    expect(companyCreate.createdAt).toBeInstanceOf(Date);

  });
});
