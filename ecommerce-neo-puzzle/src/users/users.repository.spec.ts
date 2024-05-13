import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/CreateUser.dto';

const mockUsersRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

let usersRepository: UsersRepository;
let usersDbRepository: Repository<Users>;

describe('UsersRepository', () => {
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {provide: getRepositoryToken(Users),
          useFactory: mockUsersRepository},
        ],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
    usersDbRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
  });
});

describe('getUsers', () => {
  it('gets all users from the repository', async () => {
    const mockUsers: CreateUserDto[] = [
      {id: 'fd758d36-11b3-4eb5-a036-16feaf69ef54', name: 'renzo beni', email: 'rbennet@mail.com', password: 'P@ssword123!', confirmPassword: 'P@ssword123!', isAdmin: false, phone: 1234567890, country: 'USA', address: '123, Main Street, Apt 4', city: 'New York', orders: []},
      {id: 'fd758d36-11b3-4eb5-e745-16feaf69ef54', name: 'raul benit', email: 'jashhf@mail.com', password: 'P@ssword123!', confirmPassword: 'P@ssword123!',  isAdmin: false, phone: 1234567890, country: 'USA', address: '123, Main Street, Apt 4', city: 'New York', orders: []}];
    usersDbRepository.find = jest.fn().mockResolvedValue(mockUsers);

    const result = await usersRepository.getUsers(1, 10);
    //expect(result.map(({password, ...userNoPassword}) => userNoPassword)).toEqual(mockUsers);

  });

  it('should throw an error if the repository fails to get users', async () => {
    usersDbRepository.find = jest.fn().mockRejectedValue(new Error('Failed to get users'));
    await expect(usersRepository.getUsers(1, 10)).rejects.toThrow();
  });

});




