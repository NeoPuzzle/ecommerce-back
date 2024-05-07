import { Controller, FileTypeValidator, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseFilePipeBuilder, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService,
    ) {}

    @ApiBearerAuth()
    @Post('uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@Param('id', ParseUUIDPipe) productId: string, 
    @UploadedFile(
        // new ParseFilePipe({
        //     validators: [
        //         new MaxFileSizeValidator ({
        //             maxSize: 200000,
        //             message: 'File too large. Max size allowed is 200KB',
        //         }),
        //         new FileTypeValidator({
        //             fileType: /(jpg|jpeg|png|svg|gif)$/,
        //         }),
        //     ]
        // }),
        new ParseFilePipeBuilder()
            .addMaxSizeValidator({
                maxSize: 200000,
                message: 'File too large. Max size allowed is 200KB',
            })
            .addFileTypeValidator({
                fileType: /(jpg|jpeg|png|svg|gif)$/,
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            })
    ) file: Express.Multer.File) {
        return this.filesService.uploadImage(file, productId);
    }

    
}
