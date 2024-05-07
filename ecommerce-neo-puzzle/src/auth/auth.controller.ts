import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/dto/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getAuth(){
        return this.authService.getAuth();
    }

    @Post('signup')
    addUser(@Body() user: CreateUserDto){
        return this.authService.signUp(user);
    }

    @Post('signin')
    async signIn(@Body() user: LoginUserDto){
        return this.authService.signIn(user.email, user.password);
    }
}
