import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService,
    ) {}

    @Post('uploadImage/:id')
    @UseGuards(AuthGuard)
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
                    fileType: /(jpg|jpeg|png|svg|gif)$/,
                }),
            ]
        }),
    ) file: Express.Multer.File) {
        return this.filesService.uploadImage(file, productId);
    }

    
}
