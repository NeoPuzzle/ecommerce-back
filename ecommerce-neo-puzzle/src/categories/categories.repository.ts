import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { Repository } from "typeorm";
import { CategoryDto } from "src/dto/category.dto";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}
    
    async getCategories() {
        const categories = await this.categoryRepository.find();
        return categories;
    }
    
    async addCategory(categories: CategoryDto) {
        const existingCategory = await this.categoryRepository.findOne({where: {name: categories.name}});
        if (existingCategory) return `Category ${categories.name} already exists`;
        const newCategory = await this.categoryRepository.create(categories);
        this.categoryRepository.save(newCategory);
        return newCategory;
    }
    
}