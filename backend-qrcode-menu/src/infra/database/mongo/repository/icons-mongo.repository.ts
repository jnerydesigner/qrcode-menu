import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IconsRepository } from '@domain/repositories/icons.repository';
import { Icons as IconsMongo } from '../schema/icons.schema';

@Injectable()
export class IconsMongoRepository implements IconsRepository {
  constructor(
    @InjectModel(IconsMongo.name)
    private readonly iconsModel: Model<IconsMongo>,
  ) { }

  async create(data: any): Promise<any> {
    const created = new this.iconsModel(data);
    const saved = await created.save();
    return saved;
  }


}
