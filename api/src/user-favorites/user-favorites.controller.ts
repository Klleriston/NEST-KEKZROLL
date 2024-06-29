import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserFavoritesService } from './user-favorites.service';
import { CreateUserFavoriteDto } from './dto/create-user-favorite.dto';

@Controller('favorites')
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
}
