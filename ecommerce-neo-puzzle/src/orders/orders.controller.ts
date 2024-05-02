import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/CreateOrder.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @Get(':id')
    @UseGuards(AuthGuard)
    async getOrder(@Param('id') id: string) {
            return this.ordersService.getOrder(id);
            
    }

    @Post()
    @UseGuards(AuthGuard)
    async addOrder(@Body() order: CreateOrderDto){
        const {userId, products} = order;
            return this.ordersService.addOrder(userId, products);
    }
}
