import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from '../entities/orders.entity';
import { Not, Repository } from 'typeorm';
import { Products } from 'src/entities/products.entity';
import { OrderDetails } from 'src/entities/orderdetails.entity';
import { Users } from 'src/entities/users.entity';
import { CreateOrderDto } from 'src/dto/CreateOrder.dto';

@Injectable()
export class OrdersRepository {

    constructor(
        @InjectRepository(Orders)
        private orderRepository: Repository<Orders>,
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
        @InjectRepository(OrderDetails)
        private orderDetailsRepository: Repository<OrderDetails>,
        
    ){}

    async addOrder(userId: string, products: any){

        const user = await this.userRepository.findOneBy({id: userId});

        if(!user){
            // throw new Error('User not found');
            throw new NotFoundException('User not found');
        }
        const order = new Orders();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.orderRepository.save(order);


        let total = 0;
        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productRepository.findOne({
                    where: { id: element.id }
                });
                if(!product){
                    // throw new Error(`Product with id ${element.productId} not found`);
                    throw new NotFoundException(`Product with id ${element.id} not found`);
                }

                total += Number(product.price);
                console.log(total);

                await this.productRepository.update(
                    {id: element.id},
                    {stock: product.stock - 1}
                );  

                return product;
            })
        );

        const orderDetails = new OrderDetails();
        orderDetails.price = Number(Number(total).toFixed(2));
        orderDetails.products = productsArray;
        orderDetails.order = newOrder;

        await this.orderDetailsRepository.save(orderDetails);

        return  await this.orderRepository.find({
            where: {id: newOrder.id},
            relations: {
                orderDetails: true,
            }
        });
    }

    getOrder(id: string) {
        const order = this.orderRepository.findOne({
            where: {id},
            relations: {
                orderDetails: {
                    products: true,
                },
            },
            });
        if(!order){
            // throw new Error(`Order with id ${id} not found`);
            return `Order with id ${id} not found`
        }

        return order;
    }
}
