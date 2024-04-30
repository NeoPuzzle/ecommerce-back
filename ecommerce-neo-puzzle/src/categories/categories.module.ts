import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from '../entities/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categories])
  ],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
