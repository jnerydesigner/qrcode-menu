import { SocialMediaEntity } from '@domain/entities/social-media.entity';
import { SocialMedia as SocialMediaDocument } from '@infra/database/mongo/schema/social-media.schema';
import { toObjectId } from '@infra/utils/objectid-converter.util';

export class SocialMediaMapper {
    static toMongo(socialMedia: SocialMediaEntity) {

        const socialMediaCompanyObjectId = socialMedia.companyId
            ? toObjectId(socialMedia.companyId)
            : (function () {
                throw new Error('Company ID is required');
            })()

        const socialMediaObjectId = socialMedia.id
            ? toObjectId(socialMedia.id)
            : (function () {
                throw new Error('Company ID is required');
            })()

        console.log(socialMediaCompanyObjectId, socialMediaObjectId)
        return {
            _id: socialMediaObjectId,
            name: socialMedia.name,
            link: socialMedia.link,
            svg_path: socialMedia.svgPath,
            slug: socialMedia.slug,
            created_at: socialMedia.createdAt,
            updated_at: socialMedia.updatedAt,
            company: socialMediaCompanyObjectId
        };
    }

    static fromMongo(
        socialMedia: SocialMediaDocument & { created_at?: Date; updated_at?: Date },
    ): SocialMediaEntity {
        return new SocialMediaEntity(
            socialMedia.name,
            socialMedia.link,
            socialMedia.svg_path,
            socialMedia.slug,
            socialMedia.created_at,
            socialMedia.updated_at,
            socialMedia._id.toString(),
            socialMedia.company.toString(),
        );
    }
}
