import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { OrderDto } from 'src/dto/order.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @Get(':id')
    async getOrder(@Param('id') id: string) {
        try {
            const order = await this.ordersService.getOrder(id);
            return {success: true, data: order}
        } catch (error) {
            return { success: false, error: error.message}
        }
    }

    @Post()
    async addOrder(@Body() orderDto: OrderDto){
        try {
            const order = this.ordersService.addOrder(orderDto);
            return {success: true, data: order}
        } catch (error) {
            return {success: false, error: error.message}
        }
    }
}
