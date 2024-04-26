import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {

    constructor(private readonly usersRepository: UsersRepository) {}
    
    getAuth(){
        return 'Get all auth';
    }

    async signIn(email: string, password: string): Promise<string> {
        return this.usersRepository.signIn(email, password);
    }
}
