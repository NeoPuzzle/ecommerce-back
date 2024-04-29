import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { IProduct } from './products.interface';

@Injectable()
export class ProductsService {

    constructor(private readonly productsRepository: ProductsRepository) {}

    async getProducts() {
        return this.productsRepository.getProducts();
    }

    async getProductById(id: string) {
        return this.productsRepository.getProductById(id);
    }

    async createProduct(product: IProduct) {
        return this.productsRepository.createProduct(product);
    }

    async updateProduct(id: string, product: IProduct) {
        return this.productsRepository.updateProduct(id, product);
    }

    async deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id);
    }

    preLoadProducts() {
        return this.productsRepository.preLoadProducts();
    }
}
