import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @IsEmail()
    email: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, { message: 'Password too weak' })
    @MinLength(8)
    @MaxLength(15)
    password: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @IsNotEmpty()
    phone: number;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    city: string;
}