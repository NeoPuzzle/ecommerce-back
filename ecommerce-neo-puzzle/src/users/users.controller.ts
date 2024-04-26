import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getUsers(): Promise<User[]>{
        return this.usersService.getUsers();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getUserById(@Param('id') id: string): Promise<User>{
        return this.usersService.getUserById(Number(id));
    }

    @Post()
    async createUser(@Body() user: User): Promise<User>{
        return this.usersService.createUser(user);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateUser(@Param('id') id: string, @Body() user: User): Promise<User>{
        return this.usersService.updateUser(Number(id), user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteUser(@Param('id') id: string): Promise<void>{
        return this.usersService.deleteUser(Number(id));
    }
}
