import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "src/entities/products.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty(
        {
            description: 'User ID of the user, must be a valid UUID',
            example: '48216f66-a556-4d49-b18f-50c5c8e5da1f'
        }
    )
    userId: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ApiProperty(
        {
            description: 'Products in the order, must be an array of products',
            example: [
                {
                    "id": "48216f66-a556-4d49-b18f-50c5c8e5da1f"
                },
                {
                    "id": "fe03ed92-1fb1-40bb-8790-bb73cd3ab57d"
                }
            ]
        }
    )
    products: Partial<Products>[];
}