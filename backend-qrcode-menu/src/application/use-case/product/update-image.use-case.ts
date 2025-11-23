import { ResizeImageService } from '@application/services/resize-image.service';
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
    private readonly resizeImageService: ResizeImageService,
  ) { }
  async execute(productId: string, file: Express.Multer.File) {
    const product = await this.productRepository.findOne(productId);


    const existsImages = await this.productRepository.verifyExistsImagesproduct(productId);

    if (!existsImages) {
      const images = await this.resizeImageService.processImage(file.buffer, product.slug);

      const fullUrl = await this.uploadService.uploadFile(images.file_full, product.slug, "full");
      const mediumUrl = await this.uploadService.uploadFile(images.file_medium, product.slug, "medium");
      const smallUrl = await this.uploadService.uploadFile(images.file_small, product.slug, "small");

      return this.productRepository.updateImage(productId, fullUrl.url, mediumUrl.url, smallUrl.url);
    }



    await this.uploadService.deleteFile(existsImages.image);
    await this.uploadService.deleteFile(existsImages.imageMedium);
    await this.uploadService.deleteFile(existsImages.imageSmall);

    const images = await this.resizeImageService.processImage(file.buffer, product.slug);

    const fullUrl = await this.uploadService.uploadFile(images.file_full, product.slug, "full");
    const mediumUrl = await this.uploadService.uploadFile(images.file_medium, product.slug, "medium");
    const smallUrl = await this.uploadService.uploadFile(images.file_small, product.slug, "small");

    const response = await this.productRepository.updateImage(productId, fullUrl.url, mediumUrl.url, smallUrl.url);


    console.log("Response", response)
    return response;
  }
}

