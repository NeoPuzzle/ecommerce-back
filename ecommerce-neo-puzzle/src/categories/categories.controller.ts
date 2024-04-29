import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from 'src/dto/category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get('seeder')
    getCategories(){
        return this.categoriesService.getCategories();
    }

    @Post()
    async addCategory(@Body() categories: CategoryDto){
        return this.categoriesService.addCategory(categories);
    }
}
