import { Injectable } from '@nestjs/common';
import { OrderDto } from 'src/dto/order.dto';
import { OrdersRepository } from './orders.repository';
import { Order } from './orders.entity';
import { OrderDetails } from 'src/orderdetails/orderdetails.entity';

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {}

    async addOrder(order: OrderDto) {
        return this.ordersRepository.addOrder(order.userId, order.products.map(product => product.id));
    }
    getOrder(orderId: string): Promise<{ order: Order, orderDetails: OrderDetails }> {
        return this.ordersRepository.getOrder(orderId);
    }
}
