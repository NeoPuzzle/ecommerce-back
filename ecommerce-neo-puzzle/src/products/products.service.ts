import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/entities/products.entity';

@Injectable()
export class ProductsService {

    constructor(private readonly productsRepository: ProductsRepository) {}

    async getProducts(page: number, limit: number) {
        return this.productsRepository.getProducts(page, limit);
    }

    // async getProductById(id: string) {
    //     return this.productsRepository.getProductById(id);
    // }

    async addProducts() {
        return this.productsRepository.addProducts();
    }

    async updateProduct(id: string, product: Products) {
        return this.productsRepository.updateProduct(id, product);
    }

    async deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id);
    }

    // preLoadProducts() {
    //     return this.productsRepository.preLoadProducts();
    // }
}
