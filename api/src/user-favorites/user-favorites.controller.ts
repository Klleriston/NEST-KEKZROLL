import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserFavoritesService } from './user-favorites.service';
import { CreateUserFavoriteDto } from './dto/create-user-favorite.dto';

@Controller('user-favorites')
export class UserFavoritesController {
  constructor(private readonly userFavoritesService: UserFavoritesService) {}

  @Post()
  create(@Body() createUserFavoriteDto: CreateUserFavoriteDto) {
    return this.userFavoritesService.create(createUserFavoriteDto);
  }

  @Get()
  findAll() {
    return this.userFavoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userFavoritesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFavoritesService.remove(id);
  }
}
