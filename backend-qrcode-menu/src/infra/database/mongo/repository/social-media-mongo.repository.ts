import { SocialMediaEntity } from '@domain/entities/social-media.entity';
import { SocialMediaMapper } from '@domain/mappers/social-media.mapper';
import { SocialMediaRepository } from '@domain/repositories/social-media.repository';
import { toObjectId } from '@infra/utils/objectid-converter.util';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocialMedia as SocialMediaMongo } from '../schema/social-media.schema';
import { normalizeSvgBeforeSave } from '@infra/utils/normalize-svg-before-save';

@Injectable()
export class SocialMediaMongoRepository implements SocialMediaRepository {
    constructor(
        @InjectModel(SocialMediaMongo.name)
        private readonly socialMediaModel: Model<SocialMediaMongo>,
    ) { }

    async save(socialMedia: SocialMediaEntity): Promise<SocialMediaEntity> {

        const socialMediaMapper = SocialMediaMapper.toMongo(socialMedia);

        const svgPath = normalizeSvgBeforeSave(socialMedia.svgPath);
        const created = new this.socialMediaModel({ ...socialMediaMapper, svg_path: svgPath });
        const saved = await created.save();

        return SocialMediaMapper.fromMongo(saved.toObject());
    }

    async findAll(): Promise<SocialMediaEntity[]> {
        const socialMedias = await this.socialMediaModel.find().lean();

        return socialMedias.map((socialMedia) =>
            SocialMediaMapper.fromMongo(socialMedia as any),
        );
    }

    async findById(id: string): Promise<SocialMediaEntity> {
        const socialMediaDoc = await this.socialMediaModel
            .findById(toObjectId(id))
            .lean();

        if (!socialMediaDoc) {
            throw new Error(`Social media with ID ${id} not found`);
        }

        return SocialMediaMapper.fromMongo(
            socialMediaDoc as SocialMediaMongo & { created_at?: Date },
        );
    }

    async findByCompanyId(companyId: string): Promise<SocialMediaEntity[]> {
        const socialMedias = await this.socialMediaModel
            .find({ company_id: toObjectId(companyId) })
            .lean();

        return socialMedias.map((socialMedia) =>
            SocialMediaMapper.fromMongo(
                socialMedia as SocialMediaMongo & { created_at?: Date },
            ),
        );
    }

    async update(
        id: string,
        socialMedia: Partial<SocialMediaEntity>,
    ): Promise<SocialMediaEntity> {
        const updateData: any = {};

        if (socialMedia.name !== undefined) updateData.name = socialMedia.name;
        if (socialMedia.link !== undefined) updateData.link = socialMedia.link;
        if (socialMedia.svgPath !== undefined)
            updateData.svg_path = socialMedia.svgPath;
        if (socialMedia.slug !== undefined) updateData.slug = socialMedia.slug;

        const updated = await this.socialMediaModel
            .findByIdAndUpdate(toObjectId(id), updateData, { new: true })
            .lean();

        if (!updated) {
            throw new Error(`Social media with ID ${id} not found`);
        }

        return SocialMediaMapper.fromMongo(
            updated as SocialMediaMongo & { created_at?: Date },
        );
    }

    async delete(id: string): Promise<void> {
        const result = await this.socialMediaModel
            .findByIdAndDelete(toObjectId(id))
            .lean();

        if (!result) {
            throw new Error(`Social media with ID ${id} not found`);
        }
    }
}
