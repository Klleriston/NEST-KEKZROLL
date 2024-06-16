import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { HelpersService } from '../helpers/helpers.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { HttpException } from '@nestjs/common';

describe('UserService', () => {
  //instancias dos servicos que serao testados
  let service: UserService;
  let prismaService: PrismaService;
  let helpersService: HelpersService;

  beforeEach(async () => {
    //configuracao para modulo de testes
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              //mocks para nao chamar o banco de dados
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: HelpersService,
          useValue: {
            throwCustomError: jest
              .fn()
              .mockImplementation((message: string, status: number) => {
                throw new HttpException({ message }, status);
              }),
            badRequest: jest.fn().mockImplementation((message: string) => {
              throw new HttpException({ message }, 400);
            }),
            notFound: jest.fn().mockImplementation((message: string) => {
              throw new HttpException({ message }, 404);
            }),
            internalServerError: jest
              .fn()
              .mockImplementation((message: string) => {
                throw new HttpException({ message }, 500);
              }),
            unauthorized: jest.fn().mockImplementation((message: string) => {
              throw new HttpException({ message }, 401);
            }),
            forbidden: jest.fn().mockImplementation((message: string) => {
              throw new HttpException({ message }, 403);
            }),
            noContent: jest.fn().mockImplementation((message: string) => {
              throw new HttpException({ message }, 204);
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    helpersService = module.get<HelpersService>(HelpersService);
  });

  it('Deve ser definido corretamente (modulo de testes services)', () => {
    expect(service).toBeDefined();
  });

  describe('Rota criar usuario (create)', () => {
    it('Deve ser criado corretamente', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
      };
      const user: User = {
        id: 'uuid-1234',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(user);

      const result = await service.create(createUserDto);
      expect(result).toEqual({ message: 'User created successfully:', user });
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: createUserDto,
      });
    });

    it('Deve retornar um erro ao criar um usuario', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(prismaService.user, 'create').mockRejectedValue(new Error());
      jest.spyOn(helpersService, 'badRequest').mockImplementation(() => {
        throw new HttpException({ message: 'User not created' }, 400);
      });

      try {
        await service.create(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual({ message: 'User not created' });
        expect(error.status).toBe(400);
      }

      expect(helpersService.badRequest).toHaveBeenCalledWith(
        'User not created',
      );
    });
  });

  describe('Encontrar usuarios', () => {
    it('Deve retornar um usuario', async () => {
      const user: User = {
        id: 'uuid-1234',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

      const result = await service.findOne('uuid-1234');
      expect(result).toEqual(user);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'uuid-1234' },
      });
    });

    it('Deve retornar um usuario nao encontrado', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(helpersService, 'notFound').mockImplementation(() => {
        throw new HttpException({ message: 'User not found' }, 404);
      });

      try {
        await service.findOne('uuid-1234');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual({ message: 'User not found' });
        expect(error.status).toBe(404);
      }

      expect(helpersService.notFound).toHaveBeenCalledWith('User not found');
    });

    it('Deve listar todos os usuarios', async () => {
      const users: User[] = [
        {
          id: 'uuid-1234',
          username: 'testuser',
          email: 'test@email.com',
          password: 'password',
        },
        {
          id: 'uuid-5678',
          username: 'testuser2',
          email: 'test2@email.com',
          password: 'password2',
        },
      ];
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(result);
      expect(prismaService.user.findMany).toHaveBeenCalledWith();
    });

    it('Deve retornar uma lista vazia', async () => {
      const users: User[] = [];

      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);
      jest.spyOn(helpersService, 'noContent').mockImplementation(() => {
        throw new HttpException({ message: 'No content' }, 204);
      });

      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual({ message: 'No content' });
        expect(error.status).toBe(204);
      }
    });
  });

  describe('Deletar usuario', () => {
    it('Deve deletar um usuario', async () => {
      const user: User = {
        id: 'uuid-1234',
        username: 'testuser',
        email: 'test@email.com',
        password: 'password',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(prismaService.user, 'delete').mockResolvedValue(user);

      const result = await service.remove('uuid-1234');
      expect(result).toEqual({ message: 'User deleted successfully' });
      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: { id: 'uuid-1234' },
      });
    });

    it('Deve retornar um erro ao deletar um usuario', async () => {
      const user: User = {
        id: 'uuid-1234',
        username: 'testuser',
        email: 'test@email.com',
        password: 'password',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(prismaService.user, 'delete').mockRejectedValue(new Error());
      jest
        .spyOn(helpersService, 'internalServerError')
        .mockImplementation(() => {
          throw new HttpException({ message: 'User not deleted' }, 500);
        });

      try {
        await service.remove('uuid-1234');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual({ message: 'User not deleted' });
        expect(error.status).toBe(500);
      }
      expect(helpersService.internalServerError).toHaveBeenCalledWith(
        'User not deleted',
      );
    });
  });
});
