import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/categories.entity';
import { preloadCategories } from 'src/data/categories.data';
import { preloadProducts } from 'src/data/products.data';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PreloadService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

async preloadCategoriesAndProducts() {
    const categories = await this.categoryRepository.find();
    if (categories.length) return console.log('Categories already preloaded');
    for await (const category of preloadCategories) {
        const newCategory = this.categoryRepository.create(category);
        await this.categoryRepository.save(newCategory);
        }

    const products = await this.productRepository.find();
    if (products.length) return console.log('Products already preloaded');
    for await (const product of preloadProducts) {
    const newProduct = this.productRepository.create(product);
    await this.productRepository.save(newProduct); 
        }
    console.log('Preloading products and categories..');
    }
}

