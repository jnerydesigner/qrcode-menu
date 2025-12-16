import { Injectable } from "@nestjs/common";
import { MagicLinkRepository } from "@domain/repositories/magic-link.repository";
import { MagicLinkEntity } from "@domain/entities/magic-link.entity";
import { MagicLink, MagicLinkStatus } from "@infra/database/mongo/schema/magic-link.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { toObjectId } from "@infra/utils/objectid-converter.util";

@Injectable()
export class MagicLinkMongoRepository implements MagicLinkRepository {
    constructor(
        @InjectModel(MagicLink.name) private magicLinkModel: Model<MagicLink>
    ) { }
    async create(data: MagicLinkEntity): Promise<MagicLinkEntity> {
        const magicLink = new this.magicLinkModel({
            email: data.email,
            magic_link: data.magicLink,
            status: data.status,
            created_at: data.createdAt,
            updated_at: data.updatedAt
        });
        return magicLink.save().then((magicLink) => {
            return MagicLinkEntity.builder()
                .withId(magicLink._id.toString())
                .withEmail(magicLink.email)
                .withMagicLink(magicLink.magic_link)
                .withStatus(magicLink.status)
                .withCreatedAt(magicLink.created_at)
                .withUpdatedAt(magicLink.updated_at)
                .build();
        });
    }
    async findOne(email: string): Promise<MagicLinkEntity | null> {
        const magicLink = await this.magicLinkModel.findOne({ email }).lean().exec();
        if (!magicLink) {
            return null;
        }
        return MagicLinkEntity.builder()
            .withId(magicLink._id.toString())
            .withEmail(magicLink.email)
            .withMagicLink(magicLink.magic_link)
            .withStatus(magicLink.status)
            .withCreatedAt(magicLink.created_at)
            .withUpdatedAt(magicLink.updated_at)
            .build();
    }
    async update(id: string, magicLink: string): Promise<MagicLinkEntity> {
        const updatedMagicLink = await this.magicLinkModel
            .findByIdAndUpdate(
                toObjectId(id),
                {
                    magic_link: magicLink,
                    status: MagicLinkStatus.RESENT,
                    updated_at: new Date()
                },
                { new: true }
            )
            .lean()
            .exec();

        if (!updatedMagicLink) {
            throw new Error('Magic link not found');
        }

        return MagicLinkEntity.builder()
            .withId(updatedMagicLink._id.toString())
            .withEmail(updatedMagicLink.email)
            .withMagicLink(updatedMagicLink.magic_link)
            .withStatus(updatedMagicLink.status)
            .withCreatedAt(updatedMagicLink.created_at)
            .withUpdatedAt(updatedMagicLink.updated_at)
            .build();
    }

    async delete(id: string): Promise<void> {
        await this.magicLinkModel.deleteOne({ _id: toObjectId(id) }).exec();
    }

}