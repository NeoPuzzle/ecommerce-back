import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService,
    ) {}

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@Param('id') productId: string, 
    @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator ({
                    maxSize: 200000,
                    message: 'File too large. Max size allowed is 200KB',
                }),
                new FileTypeValidator({
                    fileType: /(jpg|jpeg|png|webp)$/,
                }),
            ]
        }),
    ) file: Express.Multer.File) {
        return this.filesService.uploadImage(file, productId);
    }

    
}
