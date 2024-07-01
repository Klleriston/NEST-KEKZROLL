import { Test, TestingModule } from '@nestjs/testing';
import { AnimeService } from './anime.service';
import { PrismaService } from '../prisma/prisma.service';
import { HelpersService } from '../helpers/helpers.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { Anime } from '@prisma/client';
import { HttpException } from '@nestjs/common';

describe('AnimeService', () => {
  // Instâncias dos serviços que serão testados
  let service: AnimeService;
  let prismaService: PrismaService;
  let helpersService: HelpersService;

  beforeEach(async () => {
    // Configuração para módulo de testes
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimeService,
        {
          provide: PrismaService,
          useValue: {
            anime: {
              // Mocks para não chamar o banco de dados
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
            noContent: jest.fn().mockImplementation(() => {
              throw new HttpException({ message: 'No content' }, 204);
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AnimeService>(AnimeService);
    prismaService = module.get<PrismaService>(PrismaService);
    helpersService = module.get<HelpersService>(HelpersService);
  });

  it('Deve ser definido corretamente (modulo de testes services)', () => {
    expect(service).toBeDefined();
  });

  describe('Rota criar anime (create)', () => {
    it('Deve ser criado corretamente', async () => {
      const createAnimeDTO: CreateAnimeDto = {
        title: 'testTitle',
        description: 'descricao Teste',
        studio: 'testeStudio Anime',
        date_aired: new Date('2024-01-02'),
      };
      const anime: Anime = {
        id: 'uuid-1234',
        title: 'testTitle',
        description: 'descricao Teste',
        studio: 'testeStudio Anime',
        date_aired: new Date('2024-01-02'),
      };

      jest.spyOn(prismaService.anime, 'create').mockResolvedValue(anime);

      const result = await service.create(createAnimeDTO);
      expect(result).toEqual({ message: 'Anime created successfully:', anime });
      expect(prismaService.anime.create).toHaveBeenCalledWith({
        data: createAnimeDTO,
      });
    });

    it('Deve retornar um erro ao criar um anime', async () => {
      const createAnimeDTO: CreateAnimeDto = {
        title: 'testTitle',
        description: 'descricao Teste',
        studio: 'testeStudio Anime',
        date_aired: new Date('2024-01-02'),
      };

      jest.spyOn(prismaService.anime, 'create').mockRejectedValue(new Error());
      jest.spyOn(helpersService, 'badRequest').mockImplementation(() => {
        throw new HttpException({ message: 'Anime not created' }, 400);
      });

      try {
        await service.create(createAnimeDTO);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual({ message: 'Anime not created' });
        expect(error.status).toBe(400);
      }

      expect(helpersService.badRequest).toHaveBeenCalledWith(
        'Anime not created',
      );
    });
  });

  describe('Encontrar animes', () => {
    it('Deve retornar um anime', async () => {
      const anime: Anime = {
        id: 'uuid-1234',
        title: 'testTitle',
        description: 'descricao Teste',
        studio: 'testeStudio Anime',
        date_aired: new Date('2024-01-02'),
      };

      jest.spyOn(prismaService.anime, 'findUnique').mockResolvedValue(anime);

      const result = await service.findOne('uuid-1234');
      expect(result).toEqual(anime);
      expect(prismaService.anime.findUnique).toHaveBeenCalledWith({
        where: { id: 'uuid-1234' },
      });
    });

    it('Deve retornar um anime não encontrado', async () => {
      jest.spyOn(prismaService.anime, 'findUnique').mockResolvedValue(null);
      jest.spyOn(helpersService, 'notFound').mockImplementation(() => {
        throw new HttpException({ message: 'Anime not found' }, 404);
      });

      try {
        await service.findOne('uuid-1234');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual({ message: 'Anime not found' });
        expect(error.status).toBe(404);
      }

      expect(helpersService.notFound).toHaveBeenCalledWith('Anime not found');
    });

    it('Deve listar todos os animes', async () => {
      const animes: Anime[] = [
        {
          id: 'uuid-1234',
          title: 'testTitle',
          description: 'descricao Teste',
          studio: 'testeStudio Anime',
          date_aired: new Date('2024-01-02'),
        },
        {
          id: 'uuid-5678',
          title: 'testTitle Season 2',
          description: 'descricao Teste Season 2',
          studio: 'testeStudio Anime Season 2',
          date_aired: new Date('2024-01-02'),
        },
      ];
      jest.spyOn(prismaService.anime, 'findMany').mockResolvedValue(animes);

      const result = await service.findAll();
      expect(result).toEqual(animes);
      expect(prismaService.anime.findMany).toHaveBeenCalledWith();
    });

    it('Deve retornar uma lista vazia', async () => {
      const animes: Anime[] = [];

      jest.spyOn(prismaService.anime, 'findMany').mockResolvedValue(animes);
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

  describe('Deletar anime', () => {
    it('Deve deletar um anime', async () => {
      const anime: Anime = {
        id: 'uuid-1234',
        title: 'testTitle',
        description: 'descricao Teste',
        studio: 'testeStudio Anime',
        date_aired: new Date('2024-01-02'),
      };

      jest.spyOn(prismaService.anime, 'findUnique').mockResolvedValue(anime);
      jest.spyOn(prismaService.anime, 'delete').mockResolvedValue(anime);

      const result = await service.remove('uuid-1234');
      expect(result).toEqual({ message: 'Anime deleted successfully' });
      expect(prismaService.anime.delete).toHaveBeenCalledWith({
        where: { id: 'uuid-1234' },
      });
    });

    it('Deve retornar um erro ao deletar um anime', async () => {
      const anime: Anime = {
        id: 'uuid-1234',
        title: 'testTitle',
        description: 'descricao Teste',
        studio: 'testeStudio Anime',
        date_aired: new Date('2024-01-02'),
      };

      jest.spyOn(prismaService.anime, 'findUnique').mockResolvedValue(anime);
      jest.spyOn(prismaService.anime, 'delete').mockRejectedValue(new Error());
      jest
        .spyOn(helpersService, 'internalServerError')
        .mockImplementation(() => {
          throw new HttpException({ message: 'Anime not deleted' }, 500);
        });

      try {
        await service.remove('uuid-1234');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual({ message: 'Anime not deleted' });
        expect(error.status).toBe(500);
      }
      expect(helpersService.internalServerError).toHaveBeenCalledWith(
        'Anime not deleted',
      );
    });
  });
});
