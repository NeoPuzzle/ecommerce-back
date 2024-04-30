import { Injectable } from "@nestjs/common";
import { Products } from "../entities/products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categories } from "src/entities/categories.entity";
import * as data from '../data/data.json';


@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
        @InjectRepository(Categories)
        private categoryRepository: Repository<Categories>,
    ) {}
    

    async getProducts(page: number, limit: number): Promise<Products[]> {
        let products = await this.productRepository.find({
            relations: {
                category: true,
            },
        });
        const start = (page - 1) * limit;
        const end = page + limit;
        products = products.slice(start, end);

        return products;
    }

    // async getProductById(id: string) {
    //     const product = this.products.findIndex(product => product.id === id);
    //     if (product === -1) return `Product with id ${id} not found`;
    //     return this.products[product];
    // }

    async getProduct(id: string) {
        const product = this.productRepository.findOneBy({id});
        if (!product) return `Product with id ${id} not found`;
        return product;
    }

    // async createProduct(product:  IProduct) {
    //     const id = this.products.length + 1;
    //     this.products = [...this.products, { id, ...product }];
    //     return { id, ...product };
    // }

    async addProducts() {
        const categories = await this.categoryRepository.find();
        data?.map(async (element) => {
            const category = categories.find(
                (category) => category.name === element.category,
            );

            const product = new Products();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.category = category;
            product.stock = element.stock;
            product.category = category;
            product.imgUrl = element.imgUrl;

            await this.productRepository
                .createQueryBuilder()
                .insert()
                .into(Products)
                .values(product)
                .orUpdate(["description", "price", "imgUrl", "stock"], ["name"])
                .execute();
        });

        return 'Products created';
    }
    
    async updateProduct(id: string, product: Products) {
        await this.productRepository.update(id, product);
        const updatedProduct = await this.productRepository.findOneBy({
            id,
        });
        return updatedProduct;
    }    

    async deleteProduct(id: string) {
        await this.productRepository.delete(id);
        return `Product with id ${id} deleted`;  
    }
}