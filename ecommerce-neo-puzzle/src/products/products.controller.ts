import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Products } from 'src/entities/products.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getProducts(@Query('page') page: string,@Query('limit') limit: string){
        if (!page || !limit) return this.productsService.getProducts(1, 5);
        return this.productsService.getProducts(Number(page), Number(limit));
    }

    @Get('seeder')
    //@UseGuards(AuthGuard)
    async addProducts(){
        return this.productsService.addProducts();
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: Products){
        return this.productsService.updateProduct(id, product);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)    
    async deleteProduct(@Param('id', ParseUUIDPipe) id: string){
        return this.productsService.deleteProduct(id);
    }
}
