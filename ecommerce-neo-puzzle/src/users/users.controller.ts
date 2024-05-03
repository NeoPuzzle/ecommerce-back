import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '../entities/users.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page: string, @Query('limit') limit: string){
        if (page && limit){
            return this.usersService.getUsers(Number(page), Number(limit));
        }
        return this.usersService.getUsers(1, 5);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string){
        return this.usersService.getUserById(id);
    }

    // @Post()
    // createUser(@Body() user: CreateUserDto){
    //     return this.usersService.addUser(user);
    // }

    @Put(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateUser(@Param('id') id: string, @Body() user: Users){
        return this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(id);
    }
}
