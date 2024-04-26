import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.interface';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) {}

    getUsers(){
        return this.usersRepository.getUsers();
    }
    getUserById(id: number): Promise<User> {
        return this.usersRepository.getUserById(id);
    }
    createUser(user: User): Promise<User> {
        return this.usersRepository.createUser(user);
    }
    updateUser(id: number, user: User): Promise<User> { 
        return this.usersRepository.updateUser(id, user);
    }
    deleteUser(id: number): void | Promise<void> {
        return this.usersRepository.deleteUser(id);
    }
}
