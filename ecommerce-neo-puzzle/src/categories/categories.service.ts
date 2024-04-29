import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoryDto } from 'src/dto/category.dto';

@Injectable()
export class CategoriesService {

    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    getCategories() {
        return this.categoriesRepository.getCategories();
    }

    addCategory(categories: CategoryDto) {
        return this.categoriesRepository.addCategory(categories);
    }
}
