import { Injectable } from '@nestjs/common';
import { CreateUserFavoriteDto } from './dto/create-user-favorite.dto'; 
import { PrismaService } from 'src/prisma/prisma.service';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class UserFavoritesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly helpersService: HelpersService
  ) {}

  async create(createUserFavoriteDto: CreateUserFavoriteDto) {
    try {
     const { user_id, anime_title } = createUserFavoriteDto;

     const user = await this.prismaService.user.findUnique({ where: { id: user_id } });
     if (!user) return this.helpersService.notFound('User not found');

     const anime = await this.prismaService.anime.findFirst({ where:{ title: anime_title} });
     if (!anime) return this.helpersService.notFound('Anime not found');

     const favorite = await this.prismaService.user_favorites.create({ 
      data: {
        user_id,
        anime_id: anime.id
      },
     })
     return { message: 'Favorite added successfully', favorite};
    } catch (error) {
      return this.helpersService.badRequest('Favorite not added')
    }
  }

  async findAll() {
    const lists = await this.prismaService.user_favorites.findMany();
    if (lists.length == 0) return this.helpersService.noContent('');
    return lists;
  }
}
