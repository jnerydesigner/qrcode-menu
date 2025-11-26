import { IconsService } from "@application/services/icons.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller('icons')
export class IconController {
    constructor(
        private readonly iconsService: IconsService,
    ) { }

    @Post()
    create(@Body() data: any) {
        return this.iconsService.create(data);
    }
}