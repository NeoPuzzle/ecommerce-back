import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { FileUploadRepository } from './files.repository';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
        private readonly filesUploadRepository: FileUploadRepository
    ) {}

    async uploadImage(file: Express.Multer.File, productId: string) {
        const product = await this.productsRepository.findOneBy({id: productId});
        if (!product) throw new NotFoundException(`Product with id ${productId} not found`);

        const uploadedImage = await  this.filesUploadRepository.uploadImage(file);
        if (!uploadedImage) throw new BadRequestException('Image could not be uploaded');

        await this.productsRepository.update(product.id, {
            imgUrl: uploadedImage.url,
        });

        const updatedProduct = await this.productsRepository.findOneBy({id: productId});

        return updatedProduct;
    }
}
