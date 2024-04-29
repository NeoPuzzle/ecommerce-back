import { Module } from "@nestjs/common";
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from "./orders.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository])
  ],
  providers: [OrdersService],
  controllers: [OrdersController]
})

export class OrdersModule {}