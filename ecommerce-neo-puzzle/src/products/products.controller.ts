import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from './products.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getProducts(){
        return this.productsService.getProducts();
    }

    @Get('seeder')
    async preLoadProducts(){
        return this.productsService.preLoadProducts();
    }

    @Get(':id')
    async getProductById(@Param('id') id: string){
        return this.productsService.getProductById(id);
    }

    @Post()
    //@UseGuards(AuthGuard)
    async createProduct(@Body() product: IProduct){
        return this.productsService.createProduct(product);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateProduct(@Param('id') id: string, @Body() product: IProduct){
        return this.productsService.updateProduct(id, product);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteProduct(@Param('id') id: string){
        return this.productsService.deleteProduct(id);
    }
}
