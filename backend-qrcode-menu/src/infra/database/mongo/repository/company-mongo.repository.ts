import { Company } from '@domain/entities/company.entity';
import { CompanyMapper } from '@domain/mappers/company.mapper';
import { CompanyRepository } from '@domain/repositories/company.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company as CompanyMongo } from '../schema/company.schema';
import { Product as ProductMongo } from '../schema/product.schema';

@Injectable()
export class CompanyMongoRepository implements CompanyRepository {
  constructor(
    @InjectModel(CompanyMongo.name)
    private readonly companyModel: Model<CompanyMongo>,
    @InjectModel(ProductMongo.name)
    private readonly productModel: Model<ProductMongo>,
  ) { }



  async create(data: Company): Promise<Company> {
    const companyMapper = CompanyMapper.toMongo(data);
    const created = new this.companyModel(companyMapper);
    const saved = await created.save();

    return CompanyMapper.fromMongo(saved.toObject());
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.companyModel
      .find()
      .populate({
        path: 'products',
        populate: [
          { path: 'category' },
          { path: 'ingredients' }
        ]
      })
      .lean();

    return companies.map((company) =>
      CompanyMapper.fromMongo(company as CompanyMongo & { created_at?: Date }),
    );
  }

  async findCompanyBySlug(slug: string): Promise<Company> {
    const company = await this.companyModel
      .findOne({ slug })
      .lean();



    if (!company) {
      throw new Error('Company not found');
    }

    console.log("Company:", company);

    const products = await this.productModel
      .find({ company: company._id })
      .populate({
        path: 'category',
        select: 'name slug created_at',
        options: { virtuals: false },
      })
      .populate({
        path: 'ingredients',
        select: 'name slug emoji color created_at',
        options: { virtuals: false },
      })
      .lean();




    const companyWithProducts = {
      ...company,
      products: products
    };

    console.log("Company with products:", companyWithProducts);

    return CompanyMapper.fromMongo(companyWithProducts as any as CompanyMongo & { created_at?: Date });
  }


  async findCompanyById(companyId: string): Promise<Company> {
    const findCompany = await this.companyModel.findById(companyId);
    if (!findCompany) {
      throw new Error('Company not found');
    }
    return CompanyMapper.fromMongo(findCompany.toObject());
  }
  async updateCompany(companyId: string, data: Company): Promise<Company> {
    await this.findCompanyById(companyId);
    const companyMongo = await this.companyModel.findByIdAndUpdate(companyId, data);

    if (!companyMongo) {
      throw new Error('Company not found');
    }

    return CompanyMapper.fromMongo(companyMongo.toObject());
  }

  async deleteCompany(companyId: string): Promise<void> {
    await this.companyModel.findByIdAndDelete(companyId);
  }
}
