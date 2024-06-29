import { Module } from '@nestjs/common';
import { UserFavoritesService } from './user-favorites.service';
import { UserFavoritesController } from './user-favorites.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HelpersService } from 'src/helpers/helpers.service';

@Module({
  controllers: [UserFavoritesController],
  providers: [UserFavoritesService, PrismaService, HelpersService],
})
export class UserFavoritesModule {}
