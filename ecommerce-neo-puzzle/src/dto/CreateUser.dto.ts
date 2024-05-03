import { PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";
import { Orders } from "src/entities/orders.entity";

export class CreateUserDto {

    id:string;
    orders: Orders[];

    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, { message: 'Password too weak' })
    @MinLength(8)
    @MaxLength(15)
    password: string;

    @IsEmpty()
    isAdmin: boolean;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    country: string;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    city: string;
}


export class LoginUserDto extends PickType(CreateUserDto, [
    'email',
    'password'
]) {}