import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [FilesService, CloudinaryConfig, FileUploadRepository],
  controllers: [FilesController]
})
export class FilesModule {}
