import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsUUID, ValidateNested } from "class-validator";
// import { Type } from "class-transformer";
import { CreateProductDto } from "./CreateProduct.dto";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    // @Type(() => CreateProductDto)
    products: CreateProductDto[];
}