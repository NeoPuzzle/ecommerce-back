import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from './users.interface';
import { User } from './users.entity';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) {}

    getUsers(page: number, limit: number){
        return this.usersRepository.getUsers(page, limit);
    }
    getUserById(id: string) {
        return this.usersRepository.getUserById(id);
    }
    createUser(user: IUser) {
        return this.usersRepository.createUser(user);
    }
    updateUser(id: string, user: IUser) { 
        return this.usersRepository.updateUser(id, user);
    }
    deleteUser(id: string) {
        return this.usersRepository.deleteUser(id);
    }
}
