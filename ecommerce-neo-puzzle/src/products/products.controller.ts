import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './users.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getProducts(): Promise<Product[]>{
        return this.productsService.getProducts();
    }

    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<Product>{
        return this.productsService.getProductById(Number(id));
    }

    @Post()
    @UseGuards(AuthGuard)
    async createProduct(@Body() product: Product): Promise<Product>{
        return this.productsService.createProduct(product);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateProduct(@Param('id') id: string, @Body() product: Product): Promise<Product>{
        return this.productsService.updateProduct(Number(id), product);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteProduct(@Param('id') id: string): Promise<void>{
        return this.productsService.deleteProduct(Number(id));
    }
}
