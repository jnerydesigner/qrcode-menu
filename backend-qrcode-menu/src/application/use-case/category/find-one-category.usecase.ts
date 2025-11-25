import { CATEGORY_REPOSITORY, type CategoryRepository } from "@domain/repositories/category.repository";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class FindOneCategoryUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: CategoryRepository,
    ) { }

    async execute(categoryId: string) {
        return await this.categoryRepository.findOneById(categoryId);
    }

}