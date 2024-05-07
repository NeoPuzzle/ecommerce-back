import { Injectable, NotFoundException } from "@nestjs/common";
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
        if (!users.length) throw new NotFoundException('No users found');
        return users.map(({password, ...userNoPassword}) => userNoPassword);
    }
    
    async getUserById(id: string) {
        const user = await this.userRepository.findOne({
            where: {id},
            relations: {
                orders: true
            },
        });
        if (!user) throw new NotFoundException(`User with id ${id} not found`);

        const {isAdmin, ...userNoAdmin} = user;
        const {password, ...userNoPassword} = userNoAdmin;
        return userNoPassword;
        
    }
    async addUser(user: Users) {
        const newUser = await this.userRepository.save(user);
        const dbUser = await this.userRepository.findOneBy({id: newUser.id});
        const { password, ...userNoPassword } = dbUser;
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
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        this.userRepository.remove(user);
        const { password, ...userNoPassword } = user;
        return userNoPassword;
        
    }

    getUserByEmail(email: string) {
        return this.userRepository.findOneBy({email});
        
    }
}