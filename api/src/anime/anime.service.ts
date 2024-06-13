import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnimeService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createAnimeDto: CreateAnimeDto) {
    return this.prismaService.anime.create({
      data: {
        ...createAnimeDto,
      },
    });
  }

  async findAll() {
    return this.prismaService.anime.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.anime.findUnique({
      where: {
        anime_id: id,
      },
    }); 
  }

  async remove(id: number) {
    return this.prismaService.anime.delete({
      where: {
        anime_id: id,
      },
    });
  }
}
