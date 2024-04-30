import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "../entities/categories.entity";
import { Repository } from "typeorm";
import * as data from '../data/data.json';

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Categories)
        private categoryRepository: Repository<Categories>
    ) {}
    
    async getCategories() {
        return await this.categoryRepository.find();
        
    }
    
    async addCategories() {
        data?.map(async (element) => {
            await this.categoryRepository
                .createQueryBuilder()
                .insert()
                .into(Categories)
                .values({name: element.category})
                .orIgnore()
                .execute();
        });
        return 'Categories added successfully';
    }
    
}