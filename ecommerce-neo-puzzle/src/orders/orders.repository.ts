import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { OrderDetails } from 'src/orderdetails/orderdetails.entity';
import { OrderDto } from 'src/dto/order.dto';
import { User } from 'src/users/users.entity';

// @Injectable()
export class OrdersRepository extends Repository<Order> {

    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(OrderDetails)
        private orderDetailsRepository: Repository<OrderDetails>,
        
    ){
        super(
            orderRepository.target,
            orderRepository.manager,
            orderRepository.queryRunner,
        );
    }

    async addOrder(userId: string, productcIds: string[]): Promise<{orderId: string, orderDetailsId: string, price: number}> {
        const user = await this.userRepository.findOneBy({id: userId});

        if(!user){
            throw new Error('User not found');
        }
        const order = new Order();
        order.user = user;

        const products = await this.productRepository.findByIds(productcIds);

        const availableProducts = products.filter(product => product.stock > 0);    

        if(availableProducts.length !== productcIds.length){
            throw new Error('Some products are not available');
        }

        const totalPrice = availableProducts.reduce((total, product) => total + product.price, 0);

        const orderDetails = new OrderDetails();
        orderDetails.price = totalPrice;

        const savedOrderDetails = await this.orderDetailsRepository.manager.save(orderDetails);
    

        order.orderDetails = orderDetails;

        for (const product of availableProducts) {
            product.stock--;
        }

        await this.productRepository.save(availableProducts);

        return {
            orderId: order.id,
            price: orderDetails.price,
            orderDetailsId: orderDetails.id,
        }
    }

    async getOrder(orderId: string): Promise<{order: Order, orderDetails: OrderDetails}> {
        const order = await this.orderRepository.findOne({where: {id: orderId}});
        if(!order){
            throw new Error(`Order with id ${orderId} not found`);
        }

        const orderDetails = await this.orderDetailsRepository.findOne({
            where: {
                order: order
            },
            relations: ['product']
        });

        if(!orderDetails){
            throw new Error(`Order details for order with id ${orderId} not found`);
        }

        return { order, orderDetails };
    }
}
