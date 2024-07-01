import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import * as bcrypt from 'bcrypt';



describe('AuthController', () => {
  let app: INestApplication;
  let authService: AuthService;
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'testSecret',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        UserService,
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: HelpersService,
          useValue: {
            badRequest: jest.fn(),
            forbidden: jest.fn(),
            notFound: jest.fn(),
            internalServerError: jest.fn(),
            noContent: jest.fn(),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('Deve registrar um novo usuário', async () => {
    const createUserDto: CreateUserDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: "senha",
    };

    jest.spyOn(userService, 'create').mockResolvedValue({
      ...createUserDto,
      id: 'uuid-1234',
    } as any);

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(createUserDto)
      .expect(201);

      expect(response.body).toEqual({
        message: 'User created successfully:',
        user: {
          id: 'uuid-1234',
          username: 'testuser',
          email: 'test@example.com',
          password: "senha",
        },
      });
  });

});
