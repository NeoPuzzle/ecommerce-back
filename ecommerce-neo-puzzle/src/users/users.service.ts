import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from '../entities/users.entity';
import { CreateUserDto } from 'src/dto/CreateUser.dto';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) {}

    getUsers(page: number, limit: number){
        return this.usersRepository.getUsers(page, limit);
    }
    getUserById(id: string) {
        return this.usersRepository.getUserById(id);
    }
    addUser(createUserDto: CreateUserDto) {
        return this.usersRepository.addUser(createUserDto);
    }
    updateUser(id: string, user: Users) { 
        return this.usersRepository.updateUser(id, user);
    }
    deleteUser(id: string) {
        return this.usersRepository.deleteUser(id);
    }
}
