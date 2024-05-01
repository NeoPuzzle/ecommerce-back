import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "src/entities/products.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    // @IsNotEmpty()
    @IsArray()
    // @ArrayNotEmpty()
    @ArrayMinSize(1)
    products: Partial<Products>[];
}