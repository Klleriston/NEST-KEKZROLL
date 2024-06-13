import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { AnimeService } from './anime/anime.service';
import { UserController } from './user/user.controller';
import { AnimeController } from './anime/anime.controller';
import { UserModule } from './user/user.module';
import { AnimeModule } from './anime/anime.module';
import { UserFavoritesModule } from './user-favorites/user-favorites.module';

@Module({
  imports: [UserModule, AnimeModule, UserFavoritesModule],
  controllers: [UserController, AnimeController],
  providers: [UserService, AnimeService],
})
export class AppModule {}
