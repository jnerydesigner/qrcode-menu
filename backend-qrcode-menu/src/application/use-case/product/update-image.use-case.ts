import { S3UploadService } from '@application/services/s3-upload.service';
import { ProductEntity } from '@domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '@domain/repositories/product.repository';
import { Inject } from '@nestjs/common';

export class UpdateImageProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    private readonly uploadService: S3UploadService,
  ) { }
  async execute(productId: string, file: Express.Multer.File) {
    const product = await this.productRepository.findOne(productId);

    if (product.image.length <= 0) {
      throw new Error('Product Image not found');
    }

    await this.uploadService.deleteFile(product.image);

    const upload = await this.uploadService.uploadFile(file, product.slug);

    return this.productRepository.updateImage(productId, upload.url);
  }
}

