import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {

    constructor(private readonly usersRepository: UsersRepository) {}
    
    getAuth(){
        return 'Get all auth';
    }

    async signIn(email: string, password: string) {
        if(!email || !password) return 'Invalid credentials';
        const user = this.usersRepository.getUserByEmail(email);
        if(!user) return 'User not found';
        if(user.password === password) return 'Usuario logueado';
        return 'Invalid credentials';
    }
}
