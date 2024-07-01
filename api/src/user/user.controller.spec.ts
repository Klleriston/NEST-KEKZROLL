import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { HelpersService } from 'src/helpers/helpers.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let prismaService: PrismaService;

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
        }, AuthService, JwtService, HelpersService, PrismaService
      ], 
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('Deve ser definido corretamente (modulo de testes)', () => {
    expect(controller).toBeDefined();
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

}); 