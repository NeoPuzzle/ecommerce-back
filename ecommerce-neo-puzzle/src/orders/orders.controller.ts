import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @Get(':id')
    async getOrder(@Param('id') id: string) {
            return this.ordersService.getOrder(id);
            
    }

    @Post()
    async addOrder(@Body() order: any){
        const {userId, products} = order;
            return this.ordersService.addOrder(userId, products);
    }
}
