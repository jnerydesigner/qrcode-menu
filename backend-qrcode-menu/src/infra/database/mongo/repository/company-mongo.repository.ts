import { Company } from '@domain/entities/company.entity';
import { CompanyMapper } from '@domain/mappers/company.mapper';
import { CompanyRepository } from '@domain/repositories/company.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company as CompanyMongo } from '../schema/company.schema';
import { Product as ProductMongo } from '../schema/product.schema';
import { SocialMedia } from '../schema/social-media.schema';
import { LoggerService } from '@application/services/logger.service';
import { CompanyImageSchema, CompanyImage } from '../schema/company_image.schema';
import { toObjectId } from '@infra/utils/objectid-converter.util';

@Injectable()
export class CompanyMongoRepository implements CompanyRepository {
  constructor(
    @InjectModel(CompanyMongo.name)
    private readonly companyModel: Model<CompanyMongo>,
    @InjectModel(ProductMongo.name)
    private readonly productModel: Model<ProductMongo>,
    @InjectModel(SocialMedia.name)
    private readonly socialMediaModel: Model<SocialMedia>,
    @InjectModel(CompanyImage.name)
    private readonly companyImageModel: Model<CompanyImage>,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(CompanyMongoRepository.name);
  }




  async create(data: Company, imageCompany: { fullUrl: string, mediumUrl: string, smallUrl: string }): Promise<Company> {
    const companyMapper = CompanyMapper.toMongo(data);

    companyMapper.image = imageCompany.fullUrl;
    companyMapper.image_small = imageCompany.smallUrl;
    const created = new this.companyModel(companyMapper);
    const saved = await created.save();

    const companyObject = saved.toObject();
    const companyWithSocialMedia = {
      ...companyObject,
      social_medias: [],
    };

    return CompanyMapper.fromMongo(companyWithSocialMedia as any);
  }

  async findAll(): Promise<Company[] | null> {
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

    if (!companies || companies.length === 0) {
      return null;
    }

    // Fetch social media for each company
    const companiesWithSocialMedia = await Promise.all(
      companies.map(async (company) => {
        const socialMedias = await this.socialMediaModel
          .find({ company: company._id })
          .lean();

        return {
          ...company,
          social_medias: socialMedias,
        };
      })
    );

    this.logger.log(`Found ${companiesWithSocialMedia.length} companies`);

    return companiesWithSocialMedia.map((company) =>
      CompanyMapper.fromMongo(company as any),
    );
  }

  async findCompanyBySlug(slug: string): Promise<Company> {
    const company = await this.companyModel
      .findOne({ slug })
      .lean();


    this.logger.log(JSON.stringify(company));

    if (!company) {
      throw new Error('Company not found');
    }

    const socialMedias = await this.socialMediaModel
      .find({ company: company._id })
      .lean();





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
      social_medias: socialMedias,
      products: products,
    };



    return CompanyMapper.fromMongo(companyWithProducts as any);
  }


  async findCompanyById(companyId: string): Promise<Company> {
    const findCompany = await this.companyModel.findById(companyId).lean();
    if (!findCompany) {
      throw new Error('Company not found');
    }

    const socialMedias = await this.socialMediaModel
      .find({ company: findCompany._id })
      .lean();

    const companyWithSocialMedia = {
      ...findCompany,
      social_medias: socialMedias,
    };

    return CompanyMapper.fromMongo(companyWithSocialMedia as any);
  }

  async updateCompany(companyId: string, data: Company): Promise<Company> {
    await this.findCompanyById(companyId);
    const companyMapper = CompanyMapper.toMongo(data);
    const companyMongo = await this.companyModel.findByIdAndUpdate(companyId, companyMapper, { new: true }).lean().exec();

    if (!companyMongo) {
      throw new Error('Company not found');
    }

    const socialMedias = await this.socialMediaModel
      .find({ company: companyMongo._id })
      .lean();

    const companyWithSocialMedia = {
      ...companyMongo,
      social_medias: socialMedias,
    };

    return CompanyMapper.fromMongo(companyWithSocialMedia as any);
  }

  async deleteCompany(companyId: string): Promise<void> {
    await this.companyModel.findByIdAndDelete(companyId);
  }

  async createImagesCompany(image_full: string, image_medium: string, image_small: string, companyId: string): Promise<void> {
    const companyIdObject = toObjectId(companyId)
    await this.companyImageModel.create({ company: companyIdObject, image_full, image_medium, image_small });
  }
}
