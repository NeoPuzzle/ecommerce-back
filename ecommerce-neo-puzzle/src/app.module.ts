import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/categories.entity';
import { Product } from './products/products.entity';
import { PreloadService } from './helpers/preload.data';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product]),
    ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => 
        configService.get('typeorm')
    }),
    AuthModule, ProductsModule, UsersModule, CategoriesModule, OrdersModule],
  controllers: [],
  providers: [PreloadService],
})
export class AppModule {}
