import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getAuth(){
        return this.authService.getAuth();
    }

    @Post('signin')
    async signIn(@Body() credentials: {email: string, password: string}): Promise<string>{
        const { email, password } = credentials;
        return this.authService.signIn(email, password);
    }
}
