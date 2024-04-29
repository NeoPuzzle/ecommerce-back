import { Injectable } from "@nestjs/common";
import { IUser } from "./users.interface";
import { readdir } from "fs/promises";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";


// @Injectable()
export class UsersRepository extends Repository<User> {

    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>
    ) {
        super(
            userRepository.target,
            userRepository.manager,
            userRepository.queryRunner
        );
    }

    private users: IUser[] 
    
    
    // private users: IUser[] = [
    //     {
    //         id: "1",
    //         email: "user1@example.com",
    //         name: "John Doe",
    //         password: "password1",
    //         address: "123 Main Street",
    //         phone: "123-456-7890",
    //         country: "USA",
    //         city: "New York"
    //     },
    //     {
    //         id: "2",
    //         email: "user2@example.com",
    //         name: "Jane Smith",
    //         password: "password2",
    //         address: "456 Elm Street",
    //         phone: "987-654-3210",
    //         country: "USA",
    //         city: "Los Angeles"
    //     },
    //     {
    //         id: "3",
    //         email: "user3@example.com",
    //         name: "Alice Johnson",
    //         password: "password3",
    //         address: "789 Oak Street",
    //         phone: "555-123-4567",
    //         country: "USA",
    //         city: "Chicago"
    //     },
    //     {
    //         id: "4",
    //         email: "user4@example.com",
    //         name: "Bob Brown",
    //         password: "password4",
    //         address: "321 Pine Street",
    //         phone: "222-333-4444",
    //         country: "USA",
    //         city: "Houston"
    //     },
    //     {
    //         id: "5",
    //         email: "user5@example.com",
    //         name: "Emily Davis",
    //         password: "password5",
    //         address: "654 Maple Street",
    //         phone: "777-888-9999",
    //         country: "USA",
    //         city: "San Francisco"
    //     },
    //     {
    //         id: "6",
    //         email: "user6@example.com",
    //         name: "Michael Wilson",
    //         password: "password6",
    //         address: "987 Cedar Street",
    //         phone: "444-555-6666",
    //         country: "USA",
    //         city: "Seattle"
    //     }
    // ];
    

    async getUsers(page: number, limit: number) {
        const start = (page - 1) * limit;
        const end = start + limit;
        const usersList = this.users.slice(start, end);
        return usersList.map(({password, ...userNoPassword}) => userNoPassword)
    }
    async getUserById(id: string) {
        const user = await this.userRepository.manager.findOne(id, {relations: ['orders']});
        if (!user) return `User with id ${id} not found`;

        if(!(user instanceof User)) return user;
        const {password, ...userNoPassword} = user
        return userNoPassword;
        
    }
    async createUser(user: Omit<IUser, 'id'>) {
        this.users.push({...user, id: user.email});
        //return user.id;
        const {password, ...userNoPassword} = user;
        return userNoPassword;
    }
    async updateUser(id: string, user: IUser) {
        const foundIndex = this.users.findIndex(user => user.id === id);
        if (foundIndex === -1) return `User with id ${id} not found`;
        this.users[foundIndex] = {...this.users[foundIndex], ...user};
        return this.users[foundIndex].id;
    }
    async deleteUser(id: string) {
        const foundIndex = this.users.findIndex(user => user.id === id);
        if (foundIndex === -1) return `User with id ${id} not found`;
        this.users.splice(foundIndex, 1);
        return `User with id ${id} deleted`;
        
    }

    getUserByEmail(email: string) {
        return this.users.find(user => user.email === email);
        
    }
}