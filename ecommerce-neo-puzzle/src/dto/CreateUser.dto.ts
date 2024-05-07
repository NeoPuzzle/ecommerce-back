import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, Min, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";
import { Orders } from "src/entities/orders.entity";

export class CreateUserDto {

    id:string;
    orders: Orders[];

    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty(
        {
            description: 'Name of the user, must be at least 3 characters long and at most 80 characters long, must be a string',
            example: 'John Doe'
        }
    )
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty(
        {
            description: 'Email of the user, must be a valid email, must be a string',
            example: 'jDoe@mail.com'
        }
    )
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, { message: 'Password too weak' })
    @MinLength(8)
    @MaxLength(15)
    @ApiProperty(
        {
            description: 'Password of the user, must be at least 8 characters long and at most 15 characters long, must be a string',
            example: 'P@ssword123!'
        }
    )
    password: string;

    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    @ApiProperty(
        {
            description: 'Confirm password of the user, must be the same as the password, must be a string',
            example: 'P@ssword123!'
        }
    )
    confirmPassword: string;

    @IsEmpty()
    isAdmin: boolean;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty(
        {
            description: 'Address of the user, must be at least 3 characters long and at most 80 characters long, must be a string',
            example: '123, Main Street, Apt 4'
        }
    )
    address: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty(
        {
            description: 'Phone number of the user, must be a number',
            example: 1234567890
        }
    )
    phone: number;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty(
        {
            description: 'Country of the user, must be at least 3 characters long and at most 20 characters long, must be a string',
            example: 'United States'
        }
    )
    country: string;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    @ApiProperty(
        {
            description: 'City of the user, must be at least 5 characters long and at most 20 characters long, must be a string',
            example: 'New York'
        }
    )
    city: string;
}


export class LoginUserDto extends PickType(CreateUserDto, [
    'email',
    'password'
]) {}