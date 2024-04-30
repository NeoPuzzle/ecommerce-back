import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '../entities/users.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from 'src/dto/CreateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    getUsers(@Query('page') page: string, @Query('limit') limit: string){
        if (page && limit){
            return this.usersService.getUsers(Number(page), Number(limit));
        }
        return this.usersService.getUsers(1, 5);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id') id: string){
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto){
        return this.usersService.addUser(createUserDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() user: Users){
        return this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(id);
    }
}
