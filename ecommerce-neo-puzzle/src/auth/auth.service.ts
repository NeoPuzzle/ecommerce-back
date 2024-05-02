import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly usersRepository: UsersRepository,
                private readonly jwtService: JwtService,
    ) {}
    
    getAuth(){
        return 'Get all auth';
    }

    async signUp(user: CreateUserDto) {
        const newUser = await this.usersRepository.getUserByEmail(user.email);
        if(newUser) throw new BadRequestException('User already exists');

        const hashedPassword = await bcrypt.hash(user.password, 10);
        if(!hashedPassword) throw new BadRequestException('Error hashing password');
        this.usersRepository.addUser({...user, password: hashedPassword});

        return { success: 'User created successfully'}
    }

    async signIn(email: string, password: string) {
        const user = await this.usersRepository.getUserByEmail(email);
        if(!user) throw new BadRequestException('User not found');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) throw new BadRequestException('Invalid credentials');

        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email,
        }

        const token = this.jwtService.sign(userPayload);

        
        return { success: 'User logged in successfully', token}
    }
}
