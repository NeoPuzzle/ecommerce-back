import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '../entities/users.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(
        @Query('page') page: string, 
        @Query('limit') limit: string
    ){
        if (page && limit){
            return this.usersService.getUsers(Number(page), Number(limit));
        }
        return this.usersService.getUsers(1, 5);
    }

    @ApiBearerAuth()
    @Get(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string){
        return this.usersService.getUserById(id);
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: Users){
        return this.usersService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN)
    deleteUser(@Param('id', ParseUUIDPipe) id: string){
        return this.usersService.deleteUser(id);
    }
}
