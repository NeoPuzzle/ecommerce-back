import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { Categories } from './entities/categories.entity';
import { Products } from './entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categories, Products]),
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
  providers: [],
})
export class AppModule {}
