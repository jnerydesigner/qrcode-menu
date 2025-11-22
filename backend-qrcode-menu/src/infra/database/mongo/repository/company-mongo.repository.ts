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
    console.log({ companyMapper });
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

    // Buscar produtos que pertencem a essa company
    const products = await this.productModel
      .find({ company: company._id })
      .populate('category')
      .populate('ingredients')
      .lean();

    console.log("Company Mongo", company);
    console.log("Products found:", products.length);

    // Adicionar os produtos ao objeto company
    const companyWithProducts = {
      ...company,
      products: products
    };

    return CompanyMapper.fromMongo(companyWithProducts as any as CompanyMongo & { created_at?: Date });
  }
}
