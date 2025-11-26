import { IconsService } from '@application/services/icons.service';
import { Module } from '@nestjs/common';
import { IconController } from '@presenters/controllers/icons/icon.controller';

@Module({
  providers: [
    IconsService
  ],
  controllers: [IconController],
})
export class IconsModule { }
