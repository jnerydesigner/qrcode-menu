import { Company } from '@domain/entities/company.entity';
import { CompanyMapper } from '@domain/mappers/company.mapper';
import { CompanyRepository } from '@domain/repositories/company.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company as CompanyMongo } from '../schema/company.schema';

@Injectable()
export class CompanyMongoRepository implements CompanyRepository {
  constructor(
    @InjectModel(CompanyMongo.name)
    private readonly companyModel: Model<CompanyMongo>,
  ) {}

  async create(data: Company): Promise<Company> {
    const companyMapper = CompanyMapper.toMongo(data);
    console.log({ companyMapper });
    const created = new this.companyModel(companyMapper);
    const saved = await created.save();

    return CompanyMapper.fromMongo(saved.toObject());
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.companyModel.find().lean();

    return companies.map((company) =>
      CompanyMapper.fromMongo(company as CompanyMongo & { created_at?: Date }),
    );
  }
}
