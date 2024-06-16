import { Injectable } from '@nestjs/common';
import { CreateUserFavoriteDto } from './dto/create-user-favorite.dto'; 

@Injectable()
export class UserFavoritesService {
  create(createUserFavoriteDto: CreateUserFavoriteDto) {
    return 'This action adds a new userFavorite';
  }

  findAll() {
    return `This action returns all userFavorites`;
  }

  findOne(id: string) {
    return `This action returns a #${id} userFavorite`;
  }

  remove(id: string) {
    return `This action removes a #${id} userFavorite`;
  }
}
