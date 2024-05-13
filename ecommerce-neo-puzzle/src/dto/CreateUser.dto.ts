import { ApiHideProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";
import { Orders } from "src/entities/orders.entity";

export class CreateUserDto {
    @ApiHideProperty()
    id:string;
    @ApiHideProperty()
    orders: Orders[];

    /**
     * Name of the user, must be at least 3 characters long and at most 80 characters long
     * @example 'John Doe'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    /**
     * Email of the user, must be a valid email
     * @example jDoe@mail.com
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
     * Password of the user, must be at least 8 characters long and at most 15 characters long
     * @example P@ssword123!
     */
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, { message: 'Password too weak' })
    @MinLength(8)
    @MaxLength(15)
    password: string;

    /**
     * Confirm password of the user, must be the same as the password
     * @example P@ssword123!
     */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    @ApiHideProperty()
    @IsEmpty()
    isAdmin: boolean;

    /**
     * Address of the user, must be at least 3 characters long and at most 80 characters long
     * @example '123, Main Street, Apt 4'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    /**
     * Phone number of the user, must be a number
     * @example 1234567890
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /**
     * Country of the user, must be at least 3 characters long and at most 20 characters long
     * @example 'United States'
     */
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    country: string;

    /**
     * City of the user, must be at least 5 characters long and at most 20 characters long
     * @example 'New York'
     */
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    city: string;
}


export class LoginUserDto extends PickType(CreateUserDto, [
    'email',
    'password'
]) {}