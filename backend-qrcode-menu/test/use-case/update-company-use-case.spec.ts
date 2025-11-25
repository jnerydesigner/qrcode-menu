import {
  CreateCompanyInputUseCase,
  CreateCompanyUseCase,
} from '@application/use-case/company/create-company.usecase';
import { CompanyUpdateType, UpdateCompanyUseCase } from '@application/use-case/company/update-company.usecase';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from '@domain/repositories/company.repository';
import { SlugEntity } from '@domain/value-objects/slug-entity.value';
import { Test, TestingModule } from '@nestjs/testing';

describe('UpdateCompanyUseCase', () => {
  let updateCompanyUseCase: UpdateCompanyUseCase;
  let companyRepository: jest.Mocked<CompanyRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCompanyUseCase,
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

    updateCompanyUseCase =
      module.get<UpdateCompanyUseCase>(UpdateCompanyUseCase);
    companyRepository = module.get(COMPANY_REPOSITORY);
  });

  it('deve atualizar uma empresa existente', async () => {
    const companyId = '123';
    const updateName = 'Restaurante Sacola Vazia';
    const slugValueObject = SlugEntity.create(updateName).toString();

    const input: CompanyUpdateType = {
      name: updateName,
    };

    const existingCompany = {
      id: companyId,
      name: 'Restaurante Comida no Bucho',
      slug: 'restaurante-comida-no-bucho',
      createdAt: new Date(),
      image: '',
      image_small: '',
      products: [],
    };

    companyRepository.findCompanyById.mockResolvedValue(existingCompany);

    const updatedCompany = {
      ...existingCompany,
      name: updateName,
      slug: slugValueObject,
    };

    companyRepository.updateCompany.mockResolvedValue(updatedCompany);

    const result = await updateCompanyUseCase.execute(companyId, input);

    expect(result.slug).toBe(slugValueObject);
    expect(result.name).toBe(updateName);
    expect(result.createdAt).toBeInstanceOf(Date);

    expect(companyRepository.updateCompany).toHaveBeenCalledWith(
      companyId,
      updatedCompany
    );
  });

});
