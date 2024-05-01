import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class MaxSizeValidatorPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        const minSize = 200000;
        if (value.length < minSize) {
            throw new Error('Tamano de archivo permitido de hasta 200kb');
        }
        return value;
    }
}
