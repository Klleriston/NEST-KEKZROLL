import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('Deve ser definido corretamente (modulo de testes)', () => {
    expect(controller).toBeDefined();
  });

  describe('Rota criar usuario (create)', () => {
    it('Deve criar um usuario', async () => {
      const createUserDto: CreateUserDto = { username: 'testuser', email: 'test@example.com', password: 'password' };
      const user: User = { id: 'uuid-1234', username: 'testuser', email: 'test@example.com', password: 'password' };
  
      jest.spyOn(controller, 'create').mockResolvedValue({ message: 'User created successfully:', user });
  
      const result = await controller.register(createUserDto);
      expect(result).toEqual({ message: 'User created successfully:', user });
      expect(controller.register).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('Rota encontrar todos usuarios (findAll)', () => {
    it('Deve retornar todos os usuarios', async () => {
      const users: User[] = [
        { id: 'uuid-1234', username: 'testuser1', email: 'test1@example.com', password: 'password' },
        { id: 'uuid-5678', username: 'testuser2', email: 'test2@example.com', password: 'password' },
      ];
  
      jest.spyOn(controller, 'findAll').mockResolvedValue(users);
  
      const result = await controller.findAll();
      expect(result).toEqual(users);
      expect(controller.findAll).toHaveBeenCalled();
    });
  });
  
  describe('Rota eencontrar um usuario (findOne)', () => {
    it('Deve retornar um usuario', async () => {
      const user: User = { id: 'uuid-1234', username: 'testuser', email: 'test@example.com', password: 'password' };
  
      jest.spyOn(controller, 'findOne').mockResolvedValue(user);
  
      const result = await controller.findOne('uuid-1234');
      expect(result).toEqual(user);
      expect(controller.findOne).toHaveBeenCalledWith('uuid-1234');
    });
  });
  
  describe('Rota remover um usuario', () => {
    it('Deve remover um usuario', async () => {
      jest.spyOn(controller, 'remove').mockResolvedValue('User deleted successfully');
  
      const result = await controller.remove('uuid-1234');
      expect(result).toEqual('User deleted successfully');
      expect(controller.remove).toHaveBeenCalledWith('uuid-1234');
    });
  });
}); 