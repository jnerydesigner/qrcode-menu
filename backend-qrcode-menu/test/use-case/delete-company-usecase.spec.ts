import { DeleteCompanyUseCase } from '@application/use-case/company/delete-company.usecase';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from '@domain/repositories/company.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('DeleteCompanyUseCase', () => {
  let deleteCompanyUseCase: DeleteCompanyUseCase;
  let companyRepository: jest.Mocked<CompanyRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCompanyUseCase,
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

    deleteCompanyUseCase =
      module.get<DeleteCompanyUseCase>(DeleteCompanyUseCase);
    companyRepository = module.get(COMPANY_REPOSITORY);
  });

  it('deve deletar uma empresa existente', async () => {
    const companyId = '123';


    const result = await deleteCompanyUseCase.execute(companyId);

    expect(result).toBeUndefined();

    expect(companyRepository.deleteCompany).toHaveBeenCalledWith(companyId);
  });

});
