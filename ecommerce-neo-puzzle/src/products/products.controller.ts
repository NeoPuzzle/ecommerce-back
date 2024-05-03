import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Products } from 'src/entities/products.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getProducts(@Query('page') page: string,@Query('limit') limit: string){
        if (!page || !limit) return this.productsService.getProducts(1, 5);
        return this.productsService.getProducts(Number(page), Number(limit));
    }

    // @Get(':id')
    // async getProductById(@Param('id') id: string){
    //     return this.productsService.getProductById(id);
    // }

    @Get('seeder')
    //@UseGuards(AuthGuard)
    async addProducts(){
        return this.productsService.addProducts();
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateProduct(@Param('id') id: string, @Body() product: Products){
        return this.productsService.updateProduct(id, product);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteProduct(@Param('id') id: string){
        return this.productsService.deleteProduct(id);
    }
}
