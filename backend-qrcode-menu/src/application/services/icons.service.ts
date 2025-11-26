import { Inject, Injectable } from "@nestjs/common";
import { ICONS_REPOSITORY, type IconsRepository } from "@domain/repositories/icons.repository";

@Injectable()
export class IconsService {
    constructor(
        @Inject(ICONS_REPOSITORY)
        private readonly iconsRepository: IconsRepository,
    ) { }

    create(data: any) {
        return this.iconsRepository.create(data);
    }
}