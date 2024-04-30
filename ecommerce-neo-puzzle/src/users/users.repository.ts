import { Injectable } from "@nestjs/common";
import { readdir } from "fs/promises";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../entities/users.entity";
import { Repository } from "typeorm";


@Injectable()
export class UsersRepository {

    constructor(
        @InjectRepository(Users) 
        private userRepository: Repository<Users>
    ) {}


    async getUsers(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const users = await this.userRepository.find({
            take: limit,
            skip: skip,
        });
        return users.map(({password, ...userNoPassword}) => userNoPassword);
    }
    
    async getUserById(id: string) {
        const user = await this.userRepository.findOne({
            where: {id},
            relations: {
                orders: true
            },
        });
        if (!user) return `User with id ${id} not found`;
        const {password, ...userNoPassword} = user
        return userNoPassword;
        
    }
    async addUser(user: Users) {
        const newUser = await this.userRepository.save(user);
        const { password, ...userNoPassword } = newUser;
        return userNoPassword;
    }
    async updateUser(id: string, user: Users) {
        await this.userRepository.update(id, user);
        const updatedUser = await this.userRepository.findOneBy({id});
        const { password, ...userNoPassword } = updatedUser;
        return userNoPassword;
    }
    async deleteUser(id: string) {
        const user = await this.userRepository.findOneBy({id});
        if (!user) return `User with id ${id} not found`;
        this.userRepository.remove(user);
        const { password, ...userNoPassword } = user;
        return userNoPassword;
        
    }

    getUserByEmail(email: string) {
        return this.userRepository.findOneBy({email});
        
    }
}