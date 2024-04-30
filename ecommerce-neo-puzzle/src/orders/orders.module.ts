import { Module } from "@nestjs/common";
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from "./orders.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { OrderDetails } from "src/entities/orderdetails.entity";
import { Users } from "src/entities/users.entity";
import { Products } from "src/entities/products.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders]),
    TypeOrmModule.forFeature([OrderDetails]),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Products])
  ],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController]
})

export class OrdersModule {}