import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './users.interface';

@Injectable()
export class ProductsService {

    constructor(private readonly productsRepository: ProductsRepository) {}

    async getProducts(): Promise<Product[]> {
        return this.productsRepository.getProducts();
    }

    async getProductById(id: number): Promise<Product> {
        return this.productsRepository.getProductById(id);
    }

    async createProduct(product: Product): Promise<Product> {
        return this.productsRepository.createProduct(product);
    }

    async updateProduct(id: number, product: Product): Promise<Product> {
        return this.productsRepository.updateProduct(id, product);
    }

    async deleteProduct(id: number): Promise<void> {
        await this.productsRepository.deleteProduct(id);
    }
}
