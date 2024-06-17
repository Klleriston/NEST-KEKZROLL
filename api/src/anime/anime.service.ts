import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class AnimeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly helpersService: HelpersService,
  ) {}

  async create(createAnimeDto: CreateAnimeDto) {
    try {
      const anime = await this.prismaService.anime.create({
        data: {
          ...createAnimeDto,
        },
      });
      return { message: 'Anime created successfully:', anime };
    } catch (error) {
      return this.helpersService.badRequest('Anime not created');
    }
  }

  async findAll() {
    const animes = await this.prismaService.anime.findMany();
    if (animes.length == 0) return this.helpersService.noContent('');
    return animes;
  }

  async findOne(id: string) {
    const anime = await this.prismaService.anime.findUnique({ where: { id: id } } );
    if (!anime) return this.helpersService.notFound('Anime not found');
    return anime;
  }

  async remove(id: string) {
    const anime = await this.prismaService.anime.findUnique({where:{id:id}});
    if (!anime) return this.helpersService.badRequest('Anime not found');
    try {
      await this.prismaService.anime.delete({ where: { id: id } });
      return {message: "Anime deleted successfully"};
    } catch (error) {
      this.helpersService.internalServerError('Anime not deleted');
    }
  }
}
